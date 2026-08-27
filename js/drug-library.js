// ==========================================
// NET-HEALTH DRUG LIBRARY
// ==========================================


// ===== DOM ELEMENTS =====

const drugList = document.getElementById("drug-list");
const searchInput = document.getElementById("search");


// ===== DRUG DATABASE =====

let drugs = [];


// ==========================================
// SORT DRUGS A-Z
// ==========================================

function sortDrugsAlphabetically(drugArray) {

    return [...drugArray].sort((a, b) => {

        const nameA =
            a.genericName?.trim().toLowerCase() || "";

        const nameB =
            b.genericName?.trim().toLowerCase() || "";

        return nameA.localeCompare(nameB);

    });

}


// ==========================================
// DISPLAY DRUGS
// ==========================================

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


    // Sort medicines A-Z

    const sortedDrugs =
        sortDrugsAlphabetically(drugArray);


    // Track the current alphabetical letter

    let currentLetter = "";


    sortedDrugs.forEach(drug => {

        const medicineName =
            drug.genericName?.trim() || "Unknown";


        // Get first letter

        const firstLetter =
            medicineName.charAt(0).toUpperCase();


        // Create alphabetical heading
        // whenever the letter changes

        if (firstLetter !== currentLetter) {

            currentLetter = firstLetter;

            drugList.innerHTML += `

                <div class="drug-letter-heading">

                    <span>
                        ${currentLetter}
                    </span>

                </div>

            `;

        }


        // Add medicine card

        drugList.innerHTML += `

            <div
                class="drug-card"
                onclick="openDrug(${drug.id})"
            >

                <div class="drug-card-header">

                    <h3>
                        ${drug.genericName}
                    </h3>

                    <span class="${
                        drug.prescriptionOnly
                            ? "rx"
                            : "otc"
                    }">

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


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener("input", () => {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    // Show everything when search is empty

    if (searchTerm === "") {

        displayDrugs(drugs);

        return;

    }


    // Search database

    const filteredDrugs =
        drugs.filter(drug => {

            const genericName =
                drug.genericName?.toLowerCase() || "";

            const brandNames =
                drug.brandNames
                    ?.join(" ")
                    .toLowerCase() || "";

            const category =
                drug.category?.toLowerCase() || "";

            const drugClass =
                drug.drugClass?.toLowerCase() || "";

            const dosageForms =
                drug.dosageForms
                    ?.join(" ")
                    .toLowerCase() || "";

            const strengths =
                drug.strengths
                    ?.join(" ")
                    .toLowerCase() || "";


            return (

                genericName.includes(searchTerm) ||

                brandNames.includes(searchTerm) ||

                category.includes(searchTerm) ||

                drugClass.includes(searchTerm) ||

                dosageForms.includes(searchTerm) ||

                strengths.includes(searchTerm)

            );

        });


    // Search results also appear A-Z

    displayDrugs(filteredDrugs);

});


// ==========================================
// OPEN DRUG DETAILS
// ==========================================

function openDrug(id) {

    window.location.href =
        `drug-details.html?id=${id}`;

}


// ==========================================
// LOAD DATABASE
// ==========================================

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


        // Sort database

        drugs =
            sortDrugsAlphabetically(drugs);


        // Display medicines

        displayDrugs(drugs);


    } catch (error) {

        console.error(
            "Failed to load drug database:",
            error
        );


        drugList.innerHTML = `

            <div class="no-results">

                <h3>
                    Unable to load medicines
                </h3>

                <p>
                    The drug database could not be loaded.
                </p>

            </div>

        `;

    }

}


// ==========================================
// START
// ==========================================

loadDrugs();