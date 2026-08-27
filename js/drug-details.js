// ===== GET DRUG ID FROM URL =====

const params = new URLSearchParams(window.location.search);
const drugId = Number(params.get("id"));

// ===== GET CONTAINER =====

const detailsContainer = document.getElementById("drug-details");

// ===== LOAD DATABASE AND RENDER =====

async function loadDrug() {

    let drugs = [];

    try {

        const response = await fetch("../data/drugs.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        drugs = await response.json();

    } catch (error) {

        console.error("Failed to load drug database:", error);

        detailsContainer.innerHTML = `
            <div class="no-results">
                <h2>Unable to load medicine</h2>
                <p>The drug database could not be loaded.</p>
            </div>
        `;

        return;

    }

    const drug = drugs.find(d => d.id === drugId);

    renderDrug(drug);

}

// ===== RENDER DRUG =====

function renderDrug(drug) {

if (!drug) {

    detailsContainer.innerHTML = `
        <div class="no-results">
            <h2>Medicine not found</h2>
            <p>The requested medicine does not exist.</p>
        </div>
    `;

} else {

    detailsContainer.innerHTML = `
        <div class="drug-details-card">

    <div class="detail-header">

    <h1>${drug.genericName}</h1>

    <div class="detail-badges">

        <span class="${drug.prescriptionOnly ? "rx" : "otc"}">
            ${drug.prescriptionOnly ? "Rx Only" : "OTC"}
        </span>

        ${
            drug.essentialMedicine
                ? `<span class="essential">Essential Medicine</span>`
                : ""
        }

    </div>

</div>

<div class="detail-section">

    <h2>Overview</h2>

    <div class="detail-grid">

        <div class="detail-item">
            <strong>Brand Names</strong>
            <p>${drug.brandNames.join(", ")}</p>
        </div>

        <div class="detail-item">
            <strong>Category</strong>
            <p>${drug.category}</p>
        </div>

        <div class="detail-item">
            <strong>Drug Class</strong>
            <p>${drug.drugClass}</p>
        </div>

        <div class="detail-item">
            <strong>Dosage Forms</strong>
            <p>${drug.dosageForms.join(", ")}</p>
        </div>

        <div class="detail-item">
            <strong>Strengths</strong>
            <p>${drug.strengths.join(", ")}</p>
        </div>

    </div>

</div>
        
    <div class="detail-section">
            <h2>Indications</h2>

            <ul>
                ${
                    drug.indications
                        ? drug.indications.map(item => `<li>${item}</li>`).join("")
                        : "<li>Information not available.</li>"
                }
            </ul>
    </div>

          <div class="detail-section">

    <h2>Adult Dose</h2>

    <div class="detail-grid">

        <div class="detail-item">
            <strong>Dose</strong>
            <p>${drug.dosing.adult.dose}</p>
        </div>

        <div class="detail-item">
            <strong>Frequency</strong>
            <p>${drug.dosing.adult.frequency}</p>
        </div>

        <div class="detail-item">
            <strong>Maximum Daily Dose</strong>
            <p>${drug.dosing.adult.maxDailyDose}</p>
        </div>

    </div>

</div>

   <div class="detail-section">
    <h2>Paediatric Dose</h2>
    <div class="detail-grid">
        <div class="detail-item">
            <strong>Dose</strong>
            <p>${drug.dosing.paediatric.mgPerKg} mg/kg</p>
        </div>
        <div class="detail-item">
            <strong>Frequency</strong>
            <p>${drug.dosing.paediatric.frequency}</p>
        </div>
        <div class="detail-item">
            <strong>Maximum Daily Dose</strong>
            <p>${drug.dosing.paediatric.maxDailyDose}</p>
        </div>
    </div>
</div>

    <div class="detail-section">
            <h2>Contraindications</h2>

            <ul>
                ${
                    drug.contraindications
                        ? drug.contraindications.map(item => `<li>${item}</li>`).join("")
                        : "<li>Information not available.</li>"
                }
            </ul>
    </div>

    <div class="detail-section">

            <h2>Side Effects</h2>

            <ul>
                ${
                    drug.sideEffects
                        ? drug.sideEffects.map(item => `<li>${item}</li>`).join("")
                        : "<li>Information not available.</li>"
                }
            </ul>
    </div>

            <div class="detail-section warning-box">

                <h2>Warnings</h2>

                <ul>
                    ${
                        drug.warnings
                            ? drug.warnings.map(item => `<li>${item}</li>`).join("")
                            : "<li>Information not available.</li>"
                    }
                </ul>

            </div>

          <div class="detail-section">

    <h2>Pregnancy & Breastfeeding</h2>

    <div class="detail-grid">

        <div class="detail-item">
            <strong>Pregnancy</strong>
            <p>${drug.pregnancy || "Information not available."}</p>
        </div>

        <div class="detail-item">
            <strong>Breastfeeding</strong>
            <p>${drug.breastfeeding || "Information not available."}</p>
        </div>

    </div>

</div>

            <button class="print-btn" onclick="window.print()">
                Print Drug Information
            </button>

        </div>
    `;
}

}

// ===== START =====

loadDrug();