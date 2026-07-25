// ===== GET DRUG ID =====
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

// ===== FIND DRUG =====
const drug = drugs.find(item => item.id === id);
const details = document.querySelector("#drug-details");

// ===== DISPLAY =====
if(!drug){
    details.innerHTML = `
        <h2>Drug not found.</h2>
    `;
}

else{
    details.innerHTML = `
        <div class="drug-details-card">
            <div class="drug-card-header">
                <h1>${drug.genericName}</h1>
                <span class="${drug.prescriptionOnly ? "rx" : "otc"}">
                    ${drug.prescriptionOnly ? "Rx" : "OTC"}
                </span>
            </div>
            ${drug.prescriptionOnly ? `
                <div class="warning-box">
                    ⚠ This medicine should only be used under the guidance of a qualified healthcare professional.
                </div>
            ` : ""}
            <p><strong>Brand Names:</strong> ${drug.brandNames.join(", ")}</p>
            <p><strong>Category:</strong> ${drug.category}</p>
            <p><strong>Drug Class:</strong> ${drug.drugClass}</p>
            <p><strong>Dosage Forms:</strong> ${drug.dosageForms.join(", ")}</p>
            <p><strong>Strengths:</strong> ${drug.strengths.join(", ")}</p>
            <p><strong>Essential Medicine:</strong>
                ${drug.essentialMedicine ? "Yes" : "No"}
            </p>
            <button class="print-btn" onclick="window.print()">
                🖨 Print Drug Information
            </button>
        </div>
    `;
}