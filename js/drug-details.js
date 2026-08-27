// ==========================================
// NET-HEALTH DRUG DETAILS
// ==========================================


// ===== GET DRUG ID FROM URL =====

const params = new URLSearchParams(window.location.search);

const drugId = Number(params.get("id"));


// ===== DOM ELEMENTS =====

const drugHeader =
    document.getElementById("drug-header");

const drugOverview =
    document.getElementById("drug-overview");

const drugIndications =
    document.getElementById("drug-indications");

const drugDosage =
    document.getElementById("drug-dosage");

const drugContraindications =
    document.getElementById("drug-contraindications");

const drugSideEffects =
    document.getElementById("drug-side-effects");

const drugWarnings =
    document.getElementById("drug-warnings");

const drugPregnancy =
    document.getElementById("drug-pregnancy");

const drugBreastfeeding =
    document.getElementById("drug-breastfeeding");


// ===== LOAD DRUG DATABASE =====

async function loadDrug() {

    try {

        const response =
            await fetch("../data/drugs.json");


        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        const drugs =
            await response.json();


        // ===== FIND DRUG =====

        const drug =
            drugs.find(
                item => Number(item.id) === drugId
            );


        if (!drug) {

            showError(
                "Medicine not found",
                "The requested medicine does not exist in the drug database."
            );

            return;
        }


        // ===== DISPLAY DRUG =====

        displayDrug(drug);


    } catch (error) {

        console.error(
            "Failed to load drug database:",
            error
        );


        showError(
            "Unable to load medicine",
            "The drug database could not be loaded. Please try again later."
        );

    }

}


// ==========================================
// DISPLAY ERROR
// ==========================================

function showError(title, message) {

    const errorHTML = `

        <div class="no-results">

            <h2>
                ${title}
            </h2>

            <p>
                ${message}
            </p>

        </div>

    `;


    drugHeader.innerHTML = errorHTML;

}


// ==========================================
// DISPLAY DRUG
// ==========================================

function displayDrug(drug) {


    // ======================================
    // HEADER
    // ======================================

    drugHeader.innerHTML = `

        <div class="detail-header">

            <h1>
                ${drug.genericName}
            </h1>


            <div class="detail-badges">

                <span class="${drug.prescriptionOnly ? "rx" : "otc"}">

                    ${
                        drug.prescriptionOnly
                            ? "Rx Only"
                            : "OTC"
                    }

                </span>


                ${
                    drug.essentialMedicine

                        ? `
                            <span class="essential">
                                Essential Medicine
                            </span>
                          `

                        : ""
                }

            </div>

        </div>

    `;


    // ======================================
    // OVERVIEW
    // ======================================

    drugOverview.innerHTML = `

        <div class="detail-grid">


            <div class="detail-item">

                <strong>
                    Brand Names
                </strong>

                <p>
                    ${
                        drug.brandNames?.length
                            ? drug.brandNames.join(", ")
                            : "Information not available."
                    }
                </p>

            </div>


            <div class="detail-item">

                <strong>
                    Category
                </strong>

                <p>
                    ${drug.category || "Information not available."}
                </p>

            </div>


            <div class="detail-item">

                <strong>
                    Drug Class
                </strong>

                <p>
                    ${drug.drugClass || "Information not available."}
                </p>

            </div>


            <div class="detail-item">

                <strong>
                    Dosage Forms
                </strong>

                <p>
                    ${
                        drug.dosageForms?.length
                            ? drug.dosageForms.join(", ")
                            : "Information not available."
                    }
                </p>

            </div>


            <div class="detail-item">

                <strong>
                    Strengths
                </strong>

                <p>
                    ${
                        drug.strengths?.length
                            ? drug.strengths.join(", ")
                            : "Information not available."
                    }
                </p>

            </div>


        </div>

    `;


    // ======================================
    // INDICATIONS
    // ======================================

    drugIndications.innerHTML = createList(
        drug.indications
    );


    // ======================================
    // DOSAGE
    // ======================================

    drugDosage.innerHTML = `

        <div class="detail-grid">


            <div class="detail-item">

                <strong>
                    Adult Dose
                </strong>

                <p>
                    ${
                        drug.dosing?.adult?.dose
                        || "Information not available."
                    }
                </p>

            </div>


            <div class="detail-item">

                <strong>
                    Adult Frequency
                </strong>

                <p>
                    ${
                        drug.dosing?.adult?.frequency
                        || "Information not available."
                    }
                </p>

            </div>


            <div class="detail-item">

                <strong>
                    Adult Maximum Daily Dose
                </strong>

                <p>
                    ${
                        drug.dosing?.adult?.maxDailyDose
                        || "Information not available."
                    }
                </p>

            </div>


            <div class="detail-item">

                <strong>
                    Paediatric Dose
                </strong>

                <p>
                    ${
                        drug.dosing?.paediatric?.mgPerKg
                            ? `${drug.dosing.paediatric.mgPerKg} mg/kg`
                            : "Information not available."
                    }
                </p>

            </div>


            <div class="detail-item">

                <strong>
                    Paediatric Frequency
                </strong>

                <p>
                    ${
                        drug.dosing?.paediatric?.frequency
                        || "Information not available."
                    }
                </p>

            </div>


            <div class="detail-item">

                <strong>
                    Paediatric Maximum Daily Dose
                </strong>

                <p>
                    ${
                        drug.dosing?.paediatric?.maxDailyDose
                        || "Information not available."
                    }
                </p>

            </div>


        </div>

    `;


    // ======================================
    // CONTRAINDICATIONS
    // ======================================

    drugContraindications.innerHTML =
        createList(
            drug.contraindications
        );


    // ======================================
    // SIDE EFFECTS
    // ======================================

    drugSideEffects.innerHTML =
        createList(
            drug.sideEffects
        );


    // ======================================
    // WARNINGS
    // ======================================

    drugWarnings.innerHTML =
        createList(
            drug.warnings
        );


    // ======================================
    // PREGNANCY
    // ======================================

    drugPregnancy.innerHTML = `

        <div class="detail-item">

            <strong>
                Pregnancy
            </strong>

            <p>
                ${
                    drug.pregnancy
                    || "Information not available."
                }
            </p>

        </div>

    `;


    // ======================================
    // BREASTFEEDING
    // ======================================

    drugBreastfeeding.innerHTML = `

        <div class="detail-item">

            <strong>
                Breastfeeding
            </strong>

            <p>
                ${
                    drug.breastfeeding
                    || "Information not available."
                }
            </p>

        </div>

    `;

}


// ==========================================
// CREATE LIST
// ==========================================

function createList(items) {

    if (!Array.isArray(items) || items.length === 0) {

        return `
            <p>
                Information not available.
            </p>
        `;

    }


    return `

        <ul>

            ${
                items
                    .map(
                        item => `<li>${item}</li>`
                    )
                    .join("")
            }

        </ul>

    `;

}


// ==========================================
// START
// ==========================================

loadDrug();