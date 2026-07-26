// ===== DOM ELEMENTS =====

const drugList = document.querySelector("#drug-list");
const searchInput = document.querySelector("#search");

// ===== DISPLAY DRUGS =====

function displayDrugs(drugArray) {

    drugList.innerHTML = "";
    
    if (drugArray.length === 0) {

    drugList.innerHTML = `
        <div class="no-results">
            <h3>No medicines found</h3>
            <p>Try another search term.</p>
        </div>
    `;

    return;

}

    drugArray.forEach(drug => {

        drugList.innerHTML += `

            
<div class="drug-card"
     onclick="openDrug(${drug.id})">
                <div class="drug-card-header">
                    <h3>${drug.genericName}</h3>
                    <span class="${drug.prescriptionOnly ? "rx" : "otc"}">
                        ${drug.prescriptionOnly ? "Rx" : "OTC"}
                    </span>
                </div>

                <p><strong>Category:</strong> ${drug.category}</p>
                <p><strong>Class:</strong> ${drug.drugClass}</p>
                <p><strong>Brands:</strong> ${drug.brandNames.join(", ")}</p>

                ${
                    drug.essentialMedicine
                        ? `<span class="essential">Essential Medicine</span>`
                        : ""
                }

            </div>

        `;

    });

}

// ===== SEARCH =====
searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase();
    const filtered = drugs.filter(drug =>
        drug.genericName.toLowerCase().includes(search) ||
        drug.category.toLowerCase().includes(search)
    );
    displayDrugs(filtered);
});

// ===== START =====

displayDrugs(drugs);
function openDrug(id){
    window.location.href =
        `drug-details.html?id=${id}`;
}

