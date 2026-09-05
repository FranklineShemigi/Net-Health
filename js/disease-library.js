// ==========================================
// NET-HEALTH DISEASE LIBRARY
// ==========================================
(function () {
    "use strict";

    const els = {
        search: document.getElementById("disease-search"),
        category: document.getElementById("category-filter"),
        subCategory: document.getElementById("subcategory-filter"),
        site: document.getElementById("site-filter"),
        etiology: document.getElementById("etiology-filter"),
        urgency: document.getElementById("urgency-filter"),
        clear: document.getElementById("clear-filters"),
        count: document.getElementById("disease-count"),
        grid: document.getElementById("disease-grid"),
        detail: document.getElementById("disease-detail")
    };

    let diseases = [];

    const esc = value => String(value ?? "").replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));
    const arr = value => Array.isArray(value) ? value : [];
    const norm = value => String(value ?? "").trim().toLowerCase();

    function populate(select, values, placeholder) {
        const current = select.value;
        select.innerHTML = `<option value="">${placeholder}</option>`;
        values.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
        if (values.includes(current)) select.value = current;
    }

    function valuesFor(field, source = diseases) {
        return [...new Set(source.map(d => String(d[field] || "").trim()).filter(Boolean))].sort((a,b) => a.localeCompare(b));
    }

    function filteredDiseases() {
        const q = norm(els.search.value);
        return diseases.filter(d => {
            const searchMatch = !q || [d.name,d.category,d.subCategory,d.anatomicalSite,d.etiology,d.description]
                .some(v => norm(v).includes(q));
            return searchMatch &&
                (!els.category.value || norm(d.category) === norm(els.category.value)) &&
                (!els.subCategory.value || norm(d.subCategory) === norm(els.subCategory.value)) &&
                (!els.site.value || norm(d.anatomicalSite) === norm(els.site.value)) &&
                (!els.etiology.value || norm(d.etiology) === norm(els.etiology.value)) &&
                (!els.urgency.value || norm(d.urgency) === norm(els.urgency.value));
        });
    }

    function refreshDependentFilters() {
        const category = els.category.value;
        const categoryDiseases = category ? diseases.filter(d => norm(d.category) === norm(category)) : diseases;
        populate(els.subCategory, valuesFor("subCategory", categoryDiseases), "All sub-categories");
        const sub = els.subCategory.value;
        const scoped = categoryDiseases.filter(d => !sub || norm(d.subCategory) === norm(sub));
        populate(els.site, valuesFor("anatomicalSite", scoped), "All anatomical sites");
        populate(els.etiology, valuesFor("etiology", scoped), "All etiologies");
        populate(els.urgency, valuesFor("urgency", scoped), "All urgency levels");
    }

    function renderList() {
        els.detail.hidden = true;
        els.detail.innerHTML = "";
        const results = filteredDiseases();
        els.count.textContent = `${results.length} of ${diseases.length} diseases`;
        if (!results.length) {
            els.grid.innerHTML = `<div class="library-empty"><h2>No diseases found</h2><p>Try removing a filter or changing your search.</p></div>`;
            return;
        }
        els.grid.innerHTML = results.map((d, index) => `
            <article class="disease-card">
                <div class="disease-card-top">
                    <span class="disease-number">${index + 1}</span>
                    <span class="urgency ${esc(norm(d.urgency) || "moderate")}">${esc(d.urgency || "Not specified")}</span>
                </div>
                <h2>${esc(d.name)}</h2>
                <p class="disease-description">${esc(d.description || "No description available.")}</p>
                <div class="disease-meta">
                    <span><b>Category</b>${esc(d.category || "Not specified")}</span>
                    <span><b>Sub-category</b>${esc(d.subCategory || "Not specified")}</span>
                    <span><b>Site</b>${esc(d.anatomicalSite || "Not specified")}</span>
                    <span><b>Etiology</b>${esc(d.etiology || "Not specified")}</span>
                </div>
                <button class="view-disease" type="button" data-index="${diseases.indexOf(d)}">View disease</button>
            </article>
        `).join("");
        els.grid.querySelectorAll(".view-disease").forEach(btn => btn.addEventListener("click", () => showDetail(diseases[Number(btn.dataset.index)])));
    }

    function list(title, items) {
        if (!items.length) return "";
        return `<section class="detail-section"><h3>${title}</h3><ul>${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>`;
    }

    function showDetail(d) {
        els.grid.innerHTML = "";
        els.count.textContent = d.name;
        els.detail.hidden = false;
        els.detail.innerHTML = `
            <button id="back-to-library" class="back-library" type="button">← Back to Disease Library</button>
            <div class="detail-heading"><div><span class="about-badge">Disease Reference</span><h1>${esc(d.name)}</h1></div><span class="urgency ${esc(norm(d.urgency) || "moderate")}">${esc(d.urgency || "Not specified")}</span></div>
            <p class="detail-description">${esc(d.description || "No description available.")}</p>
            <div class="classification-grid">
                <div><b>Category</b><span>${esc(d.category || "Not specified")}</span></div>
                <div><b>Sub-category</b><span>${esc(d.subCategory || "Not specified")}</span></div>
                <div><b>Anatomical site</b><span>${esc(d.anatomicalSite || "Not specified")}</span></div>
                <div><b>Etiology</b><span>${esc(d.etiology || "Not specified")}</span></div>
            </div>
            ${list("Key Symptoms", arr(d.keySymptoms))}
            ${list("Common Symptoms", arr(d.commonSymptoms))}
            ${list("Less Common Symptoms", arr(d.lessCommonSymptoms))}
            ${list("Risk Factors", arr(d.riskFactors))}
            ${list("Warning Signs", arr(d.warningSigns))}
            ${d.whenToSeekCare ? `<section class="care-panel"><h3>When to Seek Care</h3><p>${esc(d.whenToSeekCare)}</p></section>` : ""}
            <div class="symptom-disclaimer">⚠️ <strong>Educational reference:</strong> This information is not a diagnosis or a substitute for professional medical assessment.</div>
        `;
        document.getElementById("back-to-library").addEventListener("click", renderList);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function update() { renderList(); }

    [els.search, els.subCategory, els.site, els.etiology, els.urgency].forEach(el => el.addEventListener("input", update));
    els.category.addEventListener("change", () => { refreshDependentFilters(); update(); });
    els.subCategory.addEventListener("change", () => { refreshDependentFilters(); update(); });
    els.clear.addEventListener("click", () => {
        els.search.value = ""; els.category.value = "";
        refreshDependentFilters();
        els.subCategory.value = ""; els.site.value = ""; els.etiology.value = ""; els.urgency.value = "";
        renderList();
    });

    window.NetHealthDiseaseLibrary = { showDisease: showDetail };

    window.NetHealthDiseaseData.load().then(data => {
        diseases = data;
        populate(els.category, valuesFor("category"), "All categories");
        refreshDependentFilters();
        renderList();
    }).catch(error => {
        console.error(error);
        els.count.textContent = "Unable to load diseases";
        els.grid.innerHTML = `<div class="library-empty"><h2>Unable to load disease database</h2><p>${esc(error.message)}</p></div>`;
    });
})();
