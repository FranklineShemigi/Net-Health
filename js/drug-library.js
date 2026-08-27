// ==========================================
// NET-HEALTH DRUG LIBRARY
// ==========================================


// ===== DOM ELEMENTS =====

const drugList = document.getElementById("drug-list");
const searchInput = document.getElementById("search");


// ===== DRUG DATABASE =====

let drugs = [];


// ===== DISPLAY DRUGS =====

function displayDrugs(drugArray) {

    drugList.innerHTML = "";

    if (drugArray.length === 0) {

        drugList.innerHTML = `
            <div class="no-results">

                <h3>No medicines found</h3>

                <p>
                    Try another medicine, brand,
                    category, or drug class.
                </p>

            </div>
        `;

        return;
    }


    drugArray.forEach(drug => {

        drugList.innerHTML += `

            <div
                class="drug-card"
                onclick="openDrug(${drug.id})"
            >

                <div class="drug-card-header">

                    <h3>
                        ${drug.genericName}
                    </h3>

                    <span class="${drug.prescriptionOnly ? "rx" : "otc"}">

                        ${
                            drug.prescriptionOnly
                                ? "Rx"
                                : "OTC"
                        }

                    </span>

                </div>


                <p>
                    <strong>Category:</strong>
                    ${drug.category}
                </p>


                <p>
                    <strong>Class:</strong>
                    ${drug.drugClass}
                </p>


                <p>
                    <strong>Brands:</strong>
                    ${drug.brandNames.join(", ")}
                </p>


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

        `;

    });

}


// ===== SEARCH =====

searchInput.addEventListener("input", () => {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    if (searchTerm === "") {

        displayDrugs(drugs);

        return;
    }


    const filteredDrugs = drugs.filter(drug => {

        const genericName =
            drug.genericName?.toLowerCase() || "";

        const brandNames =
            drug.brandNames?.join(" ").toLowerCase() || "";

        const category =
            drug.category?.toLowerCase() || "";

        const drugClass =
            drug.drugClass?.toLowerCase() || "";

        const dosageForms =
            drug.dosageForms?.join(" ").toLowerCase() || "";

        const strengths =
            drug.strengths?.join(" ").toLowerCase() || "";


        return (
            genericName.includes(searchTerm) ||
            brandNames.includes(searchTerm) ||
            category.includes(searchTerm) ||
            drugClass.includes(searchTerm) ||
            dosageForms.includes(searchTerm) ||
            strengths.includes(searchTerm)
        );

    });


    displayDrugs(filteredDrugs);

});


// ===== OPEN DRUG DETAILS =====

function openDrug(id) {

    window.location.href =
        `drug-details.html?id=${id}`;

}


// ===== LOAD DATABASE =====

async function loadDrugs() {

    try {

        const response =
            await fetch("../data/drugs.json");

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }

        drugs = await response.json();

        displayDrugs(drugs);

    } catch (error) {

        console.error(
            "Failed to load drug database:",
            error
        );

        drugList.innerHTML = `
            <div class="no-results">

                <h3>Unable to load medicines</h3>

                <p>
                    The drug database could not be loaded.
                </p>

            </div>
        `;

    }

}


// ===== START =====

loadDrugs();