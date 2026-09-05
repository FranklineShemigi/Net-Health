// ==========================================
// NET-HEALTH DISEASE DATA ENGINE
// ==========================================
(function () {
    "use strict";

    const MANIFEST_PATH = "../data/diseases-manifest.json";
    let database = [];
    let loaded = false;
    let loadingPromise = null;

    const asArray = value => Array.isArray(value) ? value : [];
    const clean = value => String(value ?? "").trim();
    const normaliseText = value => clean(value).toLowerCase().replace(/\s+/g, " ");

    function normaliseDisease(disease, sourceFile) {
        return {
            ...disease,
            sourceFile,
            name: clean(disease.name),
            category: clean(disease.category),
            subCategory: clean(disease.subCategory),
            anatomicalSite: clean(disease.anatomicalSite),
            etiology: clean(disease.etiology),
            description: clean(disease.description),
            commonSymptoms: asArray(disease.commonSymptoms),
            lessCommonSymptoms: asArray(disease.lessCommonSymptoms),
            keySymptoms: asArray(disease.keySymptoms),
            riskFactors: asArray(disease.riskFactors),
            warningSigns: asArray(disease.warningSigns),
            urgency: clean(disease.urgency),
            whenToSeekCare: clean(disease.whenToSeekCare)
        };
    }

    async function loadDiseaseDatabase() {
        if (loaded) return database;
        if (loadingPromise) return loadingPromise;

        loadingPromise = (async () => {
            const manifestResponse = await fetch(MANIFEST_PATH, { cache: "no-cache" });
            if (!manifestResponse.ok) {
                throw new Error(`Could not load disease manifest: HTTP ${manifestResponse.status}`);
            }

            const manifest = await manifestResponse.json();
            if (!Array.isArray(manifest)) {
                throw new Error("Disease manifest must contain an array.");
            }

            const settled = await Promise.allSettled(manifest.map(async entry => {
                const file = clean(entry.file);
                if (!file) throw new Error("Disease manifest contains an entry without a file name.");

                const response = await fetch(`../data/diseases/${encodeURIComponent(file).replace(/%2F/g, "/")}`, { cache: "no-cache" });
                if (!response.ok) throw new Error(`Could not load ${file}: HTTP ${response.status}`);

                const diseases = await response.json();
                if (!Array.isArray(diseases)) throw new Error(`${file} must contain an array of diseases.`);
                return diseases.map(disease => normaliseDisease(disease, file));
            }));

            const failures = [];
            const results = [];
            settled.forEach((outcome, i) => {
                if (outcome.status === "fulfilled") {
                    results.push(outcome.value);
                } else {
                    const file = clean(manifest[i] && manifest[i].file) || `entry ${i}`;
                    failures.push({ file, message: outcome.reason && outcome.reason.message });
                }
            });

            if (failures.length) {
                console.error(`Net-Health: ${failures.length} disease file(s) failed to load:`, failures);
            }

            database = results.flat().filter(disease => disease.name);
            loaded = failures.length === 0;
            window.diseaseDatabase = database;
            window.NetHealthDiseaseLoadErrors = failures;
            console.log(`Net-Health disease database loaded: ${database.length} records${failures.length ? ` (${failures.length} file(s) failed — see console.error above)` : ""}.`);

            if (database.length === 0 && failures.length) {
                const detail = failures.map(f => `${f.file}: ${f.message}`).join("; ");
                throw new Error(`Failed to load any disease data. ${detail}`);
            }
            return database;
        })();

        try {
            return await loadingPromise;
        } finally {
            loadingPromise = null;
        }
    }

    function getAll() { return database; }

    function uniqueValues(field) {
        return [...new Set(database.map(item => clean(item[field])).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    }

    function search(query) {
        const q = normaliseText(query);
        if (!q) return database;
        return database.filter(disease => [
            disease.name,
            disease.category,
            disease.subCategory,
            disease.anatomicalSite,
            disease.etiology,
            disease.description
        ].some(value => normaliseText(value).includes(q)));
    }

    function filter(filters = {}) {
        return database.filter(disease => {
            const matches = (field, selected) => !selected || normaliseText(disease[field]) === normaliseText(selected);
            return matches("category", filters.category) &&
                   matches("subCategory", filters.subCategory) &&
                   matches("anatomicalSite", filters.anatomicalSite) &&
                   matches("etiology", filters.etiology) &&
                   matches("urgency", filters.urgency);
        });
    }

    window.NetHealthDiseaseData = { load: loadDiseaseDatabase, getAll, uniqueValues, search, filter };
})();
