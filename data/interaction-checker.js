// ==========================================
// NET-HEALTH
// DRUG INTERACTION CHECKER
// ==========================================


// ==========================================
// DOM ELEMENTS
// ==========================================

const drugOneSearch =
    document.getElementById("drug-one-search");

const drugOneList =
    document.getElementById("drug-one-list");

const drugOneInput =
    document.getElementById("drug-one");


const drugTwoSearch =
    document.getElementById("drug-two-search");

const drugTwoList =
    document.getElementById("drug-two-list");

const drugTwoInput =
    document.getElementById("drug-two");


const checkBtn =
    document.getElementById("check-btn");

const interactionResult =
    document.getElementById("interaction-result");


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
                `HTTP error: ${response.status}`
            );

        }


        drugs = await response.json();


        // Make sure JSON is an array

        if (!Array.isArray(drugs)) {

            throw new Error(
                "drugs.json must contain an array."
            );

        }


        console.log(
            "Net-Health drug database loaded:",
            drugs.length,
            "medicines"
        );


        checkBtn.disabled = false;


    } catch (error) {

        console.error(
            "Failed to load drug database:",
            error
        );


        interactionResult.innerHTML = `

            <p>
                Unable to load the medicine database.
            </p>

        `;

    }

}


// ==========================================
// SEARCH MEDICINES
// ==========================================

function showMedicines(
    searchInput,
    medicineList,
    hiddenInput
) {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    medicineList.innerHTML = "";


    // If nothing has been typed,
    // show the first medicines

    const filteredDrugs =
        drugs
            .filter(drug => {

                const name =
                    String(
                        drug.genericName || ""
                    ).toLowerCase();


                return name.includes(searchTerm);

            })
            .sort((a, b) => {

                return String(
                    a.genericName || ""
                ).localeCompare(
                    String(
                        b.genericName || ""
                    )
                );

            })
            .slice(0, 10);


    // ======================================
    // NO RESULTS
    // ======================================

    if (filteredDrugs.length === 0) {

        medicineList.innerHTML = `

            <div class="medicine-option">
                No medicines found
            </div>

        `;

        medicineList.style.display =
            "block";

        return;

    }


    // ======================================
    // CREATE RESULTS
    // ======================================

    filteredDrugs.forEach(drug => {

        const option =
            document.createElement("div");


        option.className =
            "medicine-option";


        option.textContent =
            drug.genericName;


        option.dataset.id =
            drug.id;


        // ==================================
        // SELECT MEDICINE
        // ==================================

        option.addEventListener(
            "click",
            () => {

                searchInput.value =
                    drug.genericName;


                hiddenInput.value =
                    drug.id;


                medicineList.innerHTML =
                    "";


                medicineList.style.display =
                    "none";

            }
        );


        medicineList.appendChild(
            option
        );

    });


    medicineList.style.display =
        "block";

}


// ==========================================
// MEDICINE 1 SEARCH
// ==========================================

drugOneSearch.addEventListener(
    "input",
    () => {

        // Clear previous selection

        drugOneInput.value = "";


        showMedicines(
            drugOneSearch,
            drugOneList,
            drugOneInput
        );

    }
);


drugOneSearch.addEventListener(
    "focus",
    () => {

        showMedicines(
            drugOneSearch,
            drugOneList,
            drugOneInput
        );

    }
);


// ==========================================
// MEDICINE 2 SEARCH
// ==========================================

drugTwoSearch.addEventListener(
    "input",
    () => {

        // Clear previous selection

        drugTwoInput.value = "";


        showMedicines(
            drugTwoSearch,
            drugTwoList,
            drugTwoInput
        );

    }
);


drugTwoSearch.addEventListener(
    "focus",
    () => {

        showMedicines(
            drugTwoSearch,
            drugTwoList,
            drugTwoInput
        );

    }
);


// ==========================================
// CLOSE DROPDOWNS
// ==========================================

document.addEventListener(
    "click",
    event => {


        // Medicine 1

        if (
            !drugOneSearch.contains(
                event.target
            ) &&
            !drugOneList.contains(
                event.target
            )
        ) {

            drugOneList.style.display =
                "none";

        }


        // Medicine 2

        if (
            !drugTwoSearch.contains(
                event.target
            ) &&
            !drugTwoList.contains(
                event.target
            )
        ) {

            drugTwoList.style.display =
                "none";

        }

    }
);


// ==========================================
// FIND INTERACTION
// ==========================================

function findInteraction(
    nameOne,
    nameTwo
) {

    return interactions.find(
        entry => {

            return (

                (
                    entry.drug1 === nameOne &&
                    entry.drug2 === nameTwo
                )

                ||

                (
                    entry.drug1 === nameTwo &&
                    entry.drug2 === nameOne
                )

            );

        }
    );

}


// ==========================================
// CHECK INTERACTION
// ==========================================

checkBtn.addEventListener(
    "click",
    () => {


        const idOne =
            Number(
                drugOneInput.value
            );


        const idTwo =
            Number(
                drugTwoInput.value
            );


        // ==================================
        // VALIDATION
        // ==================================

        if (!idOne || !idTwo) {

            interactionResult.innerHTML = `

                <p>
                    Please select two medicines
                    from the search results.
                </p>

            `;

            return;

        }


        // ==================================
        // SAME MEDICINE
        // ==================================

        if (idOne === idTwo) {

            interactionResult.innerHTML = `

                <p>
                    Please select two different
                    medicines.
                </p>

            `;

            return;

        }


        // ==================================
        // FIND DRUGS
        // ==================================

        const drugOne =
            drugs.find(
                drug =>
                    Number(drug.id) === idOne
            );


        const drugTwo =
            drugs.find(
                drug =>
                    Number(drug.id) === idTwo
            );


        if (!drugOne || !drugTwo) {

            interactionResult.innerHTML = `

                <p>
                    Medicine information could
                    not be found.
                </p>

            `;

            return;

        }


        // ==================================
        // FIND INTERACTION
        // ==================================

        const interaction =
            findInteraction(
                drugOne.genericName,
                drugTwo.genericName
            );


        // ==================================
        // NO INTERACTION DATA
        // ==================================

        if (!interaction) {

            interactionResult.innerHTML = `

                <div class="interaction-result">

                    <span class="severity none">
                        No known interaction on file
                    </span>

                    <h4>
                        ${drugOne.genericName}
                        +
                        ${drugTwo.genericName}
                    </h4>

                    <p>
                        No interaction data is
                        currently available for
                        this medicine combination.
                    </p>

                    <p>
                        This does not confirm that
                        the combination is completely
                        safe. Always verify using
                        current clinical references.
                    </p>

                </div>

            `;

            return;

        }


        // ==================================
        // INTERACTION FOUND
        // ==================================

        const severity =
            String(
                interaction.severity || "Unknown"
            );


        const severityClass =
            severity.toLowerCase();


        interactionResult.innerHTML = `

            <div class="interaction-result">

                <span class="severity ${severityClass}">
                    ${severity}
                </span>

                <h4>
                    ${drugOne.genericName}
                    +
                    ${drugTwo.genericName}
                </h4>

                <p>
                    ${interaction.message}
                </p>

                <p>
                    <strong>
                        Recommendation:
                    </strong>

                    ${interaction.recommendation}
                </p>

            </div>

        `;

    }
);


// ==========================================
// INITIAL STATE
// ==========================================

checkBtn.disabled = true;


// ==========================================
// START DATABASE
// ==========================================

loadDrugs();