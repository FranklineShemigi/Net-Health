// ==========================================
// NET-HEALTH DOSE CALCULATOR
// ==========================================


// ==========================================
// DOM ELEMENTS
// ==========================================

const medicineSearch =
    document.getElementById("medicine-search");

const medicineList =
    document.getElementById("medicine-list");

const medicineInput =
    document.getElementById("medicine");

const weight =
    document.getElementById("weight");

const age =
    document.getElementById("age");

const calculateBtn =
    document.getElementById("calculate-btn");

const resetBtn =
    document.getElementById("reset-btn");

const result =
    document.getElementById("result");


// ==========================================
// DRUG DATABASE
// ==========================================

let drugs = [];


// ==========================================
// LOAD DRUG DATABASE
// ==========================================

async function loadDrugs() {

    try {

        const response =
            await fetch("../data/drugs.json");


        if (!response.ok) {

            throw new Error(
                `Failed to load drugs.json: ${response.status}`
            );

        }


        drugs =
            await response.json();


        console.log(
            "Drug database loaded:",
            drugs.length
        );


        // Enable medicine search
        medicineSearch.disabled = false;

        medicineSearch.placeholder =
            "Search medicine...";


    } catch (error) {

        console.error(
            "Drug database loading error:",
            error
        );


        // Keep search usable for debugging
        medicineSearch.disabled = false;

        medicineSearch.placeholder =
            "Search medicine...";


        result.innerHTML = `

            <h2>
                Result
            </h2>

            <p>
                Unable to load the medicine database.
            </p>

            <small>
                Check that drugs.json is available at:
                ../data/drugs.json
            </small>

        `;

    }

}


// Start loading database
loadDrugs();


// ==========================================
// SHOW MEDICINES A-Z
// ==========================================

function showMedicines(filteredDrugs) {

    medicineList.innerHTML = "";


    // Make a copy before sorting
    const sortedDrugs =
        filteredDrugs
            .slice()
            .sort((a, b) =>
                a.genericName.localeCompare(
                    b.genericName,
                    undefined,
                    {
                        sensitivity: "base"
                    }
                )
            );


    // No medicines found
    if (sortedDrugs.length === 0) {

        medicineList.innerHTML = `

            <div class="medicine-option">

                No medicines found

            </div>

        `;

        return;

    }


    // Display medicines
    sortedDrugs.forEach(drug => {

        const option =
            document.createElement("div");


        option.className =
            "medicine-option";


        option.dataset.id =
            drug.id;


        option.textContent =
            drug.genericName;


        medicineList.appendChild(option);

    });

}


// ==========================================
// OPEN MEDICINE LIST
// ==========================================

medicineSearch.addEventListener(
    "focus",
    () => {

        if (drugs.length === 0) {
            return;
        }


        showMedicines(drugs);

    }
);


// ==========================================
// SEARCH MEDICINES
// ==========================================

medicineSearch.addEventListener(
    "input",
    () => {

        const search =
            medicineSearch.value
                .trim()
                .toLowerCase();


        if (drugs.length === 0) {
            return;
        }


        const filteredDrugs =
            drugs.filter(drug => {


                // Generic name
                const name =
                    drug.genericName
                        ?.toLowerCase() || "";


                // Brand names
                const brands =
                    Array.isArray(drug.brandNames)
                        ? drug.brandNames
                            .join(" ")
                            .toLowerCase()
                        : "";


                // Drug category
                const category =
                    drug.category
                        ?.toLowerCase() || "";


                return (

                    name.includes(search) ||

                    brands.includes(search) ||

                    category.includes(search)

                );

            });


        showMedicines(filteredDrugs);

    }
);


// ==========================================
// SELECT MEDICINE
// ==========================================

medicineList.addEventListener(
    "click",
    (event) => {


        const option =
            event.target.closest(
                ".medicine-option"
            );


        if (!option) {
            return;
        }


        // Ignore "No medicines found"
        if (!option.dataset.id) {
            return;
        }


        const selectedId =
            Number(option.dataset.id);


        const drug =
            drugs.find(
                item =>
                    item.id === selectedId
            );


        if (!drug) {
            return;
        }


        // Display selected medicine
        medicineSearch.value =
            drug.genericName;


        // Store medicine ID
        medicineInput.value =
            drug.id;


        // Close dropdown
        medicineList.innerHTML = "";

    }
);


// ==========================================
// CALCULATE DOSE
// ==========================================

calculateBtn.addEventListener(
    "click",
    () => {


        const selectedMedicine =
            Number(
                medicineInput.value
            );


        const patientWeight =
            Number(
                weight.value
            );


        const patientAge =
            Number(
                age.value
            );


        // ==================================
        // VALIDATE MEDICINE
        // ==================================

        if (!selectedMedicine) {

            result.innerHTML = `

                <h2>
                    Result
                </h2>

                <p>
                    Please select a medicine.
                </p>

            `;

            return;

        }


        // ==================================
        // VALIDATE WEIGHT
        // ==================================

        if (
            !patientWeight ||
            patientWeight <= 0
        ) {

            result.innerHTML = `

                <h2>
                    Result
                </h2>

                <p>
                    Please enter a valid
                    patient weight.
                </p>

            `;

            return;

        }


        // ==================================
        // VALIDATE AGE
        // ==================================

        if (
            !patientAge ||
            patientAge < 0
        ) {

            result.innerHTML = `

                <h2>
                    Result
                </h2>

                <p>
                    Please enter a valid
                    patient age.
                </p>

            `;

            return;

        }


        // ==================================
        // FIND MEDICINE
        // ==================================

        const drug =
            drugs.find(
                item =>
                    item.id === selectedMedicine
            );


        if (!drug) {

            result.innerHTML = `

                <h2>
                    Result
                </h2>

                <p>
                    Medicine not found.
                </p>

            `;

            return;

        }


        // ==================================
        // PAEDIATRIC DOSING
        // ==================================

        const paediatric =
            drug.dosing?.paediatric;


        if (
            !paediatric ||
            typeof paediatric.mgPerKg !== "number"
        ) {

            result.innerHTML = `

                <h2>
                    Result
                </h2>

                <p>

                    Paediatric dosing information
                    is not available for

                    <strong>
                        ${drug.genericName}
                    </strong>.

                </p>

            `;

            return;

        }


        // ==================================
        // CALCULATE DOSE
        // ==================================

        const dose =
            Math.round(
                patientWeight *
                paediatric.mgPerKg
            );


        // ==================================
        // DISPLAY RESULT
        // ==================================

        result.innerHTML = `

            <div class="dose-result">


                <h2>
                    💊 Dose Calculation
                </h2>


                <div class="result-item">

                    <strong>
                        Medicine
                    </strong>

                    <span>
                        ${drug.genericName}
                    </span>

                </div>


                <div class="result-item">

                    <strong>
                        Weight
                    </strong>

                    <span>
                        ${patientWeight} kg
                    </span>

                </div>


                <div class="result-item">

                    <strong>
                        Age
                    </strong>

                    <span>
                        ${patientAge} years
                    </span>

                </div>


                <div class="result-item highlight">

                    <strong>
                        Recommended Dose
                    </strong>

                    <span>
                        ${dose} mg per dose
                    </span>

                </div>


                <div class="result-item">

                    <strong>
                        Frequency
                    </strong>

                    <span>
                        ${paediatric.frequency}
                    </span>

                </div>


                <div class="result-item">

                    <strong>
                        Maximum Daily Dose
                    </strong>

                    <span>
                        ${paediatric.maxDailyDose}
                    </span>

                </div>


                <div class="disclaimer">

                    ⚠ Educational support only.

                    Always verify doses using
                    current clinical guidelines
                    and professional judgement.

                </div>


            </div>

        `;

    }
);


// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener(
    "click",
    () => {


        medicineSearch.value = "";

        medicineInput.value = "";

        medicineList.innerHTML = "";

        weight.value = "";

        age.value = "";


        result.innerHTML = `

            <h2>
                Result
            </h2>

            <p>
                Dose calculations will appear here.
            </p>

        `;

    }
);