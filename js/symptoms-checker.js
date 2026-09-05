// ==========================================
// NET-HEALTH SYMPTOMS CHECKER
// ==========================================


// ==========================================
// DOM ELEMENTS
// ==========================================

const symptomSearch =
    document.getElementById("symptom-search");

const symptomOptions =
    document.getElementById("symptom-options");

const selectedSymptomsContainer =
    document.getElementById("selected-symptoms");

const checkSymptomsBtn =
    document.getElementById("check-symptoms-btn");

const resetSymptomsBtn =
    document.getElementById("reset-symptoms-btn");

const symptomResults =
    document.getElementById("symptom-results");


// ==========================================
// DATABASE
// ==========================================

let conditions = [];


// ==========================================
// SELECTED SYMPTOMS
// ==========================================

let selectedSymptoms = [];


// ==========================================
// LOAD DISEASE DATABASE
// ==========================================

async function loadSymptoms() {

    try {

        conditions = await window.NetHealthDiseaseData.load();

        console.log(
            "Disease database available to Symptoms Checker:",
            conditions.length
        );

        createSymptomList();

    } catch (error) {

        console.error(
            "Failed to load disease database:",
            error
        );

        symptomResults.innerHTML = `

            <div class="no-results">

                <h2>
                    Unable to load disease database
                </h2>

                <p>
                    The disease database could not be loaded.
                    Please check the data files and try again.
                </p>

            </div>

        `;

    }

}


// ==========================================
// CREATE SYMPTOM LIST
// ==========================================

function createSymptomList() {

    const symptoms = new Set();


    conditions.forEach(condition => {

        if (Array.isArray(condition.commonSymptoms)) {

            condition.commonSymptoms.forEach(symptom => {

                symptoms.add(
                    symptom.toLowerCase().trim()
                );

            });

        }


        if (Array.isArray(condition.lessCommonSymptoms)) {

            condition.lessCommonSymptoms.forEach(symptom => {

                symptoms.add(
                    symptom.toLowerCase().trim()
                );

            });

        }

        if (Array.isArray(condition.keySymptoms)) {

            condition.keySymptoms.forEach(symptom => {

                symptoms.add(
                    symptom.toLowerCase().trim()
                );

            });

        }

    });


    const sortedSymptoms =
        Array.from(symptoms).sort();


    displaySymptomOptions(sortedSymptoms);

}


// ==========================================
// DISPLAY SYMPTOM OPTIONS
// ==========================================

function displaySymptomOptions(symptoms) {

    symptomOptions.innerHTML = "";


    if (symptoms.length === 0) {

        symptomOptions.innerHTML = `

            <p class="no-symptoms">
                No symptoms found.
            </p>

        `;

        return;

    }


    symptoms.forEach(symptom => {

        const option =
            document.createElement("button");

        option.type = "button";

        option.className =
            "symptom-option";

        option.textContent = symptom;

        option.addEventListener(
            "click",
            () => selectSymptom(symptom)
        );

        symptomOptions.appendChild(option);

    });

}


// ==========================================
// SEARCH SYMPTOMS
// ==========================================

symptomSearch.addEventListener(
    "input",
    () => {

        const searchTerm =
            symptomSearch.value
                .trim()
                .toLowerCase();


        const allSymptoms =
            getAllSymptoms();


        const filteredSymptoms =
            allSymptoms.filter(symptom =>
                symptom.includes(searchTerm)
            );


        displaySymptomOptions(
            filteredSymptoms
        );

    }
);


// ==========================================
// GET ALL SYMPTOMS
// ==========================================

function getAllSymptoms() {

    const symptoms = new Set();


    conditions.forEach(condition => {

        if (Array.isArray(condition.commonSymptoms)) {

            condition.commonSymptoms.forEach(symptom => {

                symptoms.add(
                    symptom.toLowerCase().trim()
                );

            });

        }


        if (Array.isArray(condition.lessCommonSymptoms)) {

            condition.lessCommonSymptoms.forEach(symptom => {

                symptoms.add(
                    symptom.toLowerCase().trim()
                );

            });

        }

        if (Array.isArray(condition.keySymptoms)) {

            condition.keySymptoms.forEach(symptom => {

                symptoms.add(
                    symptom.toLowerCase().trim()
                );

            });

        }

    });


    return Array.from(symptoms).sort();

}


// ==========================================
// SELECT SYMPTOM
// ==========================================

function selectSymptom(symptom) {

    if (
        selectedSymptoms.includes(symptom)
    ) {

        return;

    }


    selectedSymptoms.push(symptom);


    displaySelectedSymptoms();


    symptomSearch.value = "";


    displaySymptomOptions(
        getAllSymptoms()
    );

}


// ==========================================
// DISPLAY SELECTED SYMPTOMS
// ==========================================

function displaySelectedSymptoms() {

    selectedSymptomsContainer.innerHTML = "";


    if (selectedSymptoms.length === 0) {

        selectedSymptomsContainer.innerHTML = `

            <p class="empty-symptoms">
                No symptoms selected yet.
            </p>

        `;

        return;

    }


    selectedSymptoms.forEach(symptom => {

        const tag =
            document.createElement("div");

        tag.className =
            "selected-symptom";


        tag.innerHTML = `

            <span>
                ${symptom}
            </span>

            <button
                type="button"
                aria-label="Remove ${symptom}">

                &times;

            </button>

        `;


        tag.querySelector("button")
            .addEventListener(
                "click",
                () => removeSymptom(symptom)
            );


        selectedSymptomsContainer
            .appendChild(tag);

    });

}


// ==========================================
// REMOVE SYMPTOM
// ==========================================

function removeSymptom(symptom) {

    selectedSymptoms =
        selectedSymptoms.filter(
            item => item !== symptom
        );


    displaySelectedSymptoms();

}


// ==========================================
// CHECK SYMPTOMS
// ==========================================

checkSymptomsBtn.addEventListener(
    "click",
    checkSymptoms
);


// ==========================================
// MATCH CONDITIONS
// ==========================================

function checkSymptoms() {

    if (selectedSymptoms.length === 0) {

        symptomResults.innerHTML = `

            <div class="no-results">

                <h3>
                    No symptoms selected
                </h3>

                <p>
                    Please select at least one symptom
                    before checking.
                </p>

            </div>

        `;

        return;

    }


    const results =
        conditions.map(condition => {

            const commonSymptoms =
                Array.isArray(
                    condition.commonSymptoms
                )
                    ? condition.commonSymptoms
                        .map(symptom =>
                            symptom.toLowerCase().trim()
                        )
                    : [];


            const lessCommonSymptoms =
                Array.isArray(
                    condition.lessCommonSymptoms
                )
                    ? condition.lessCommonSymptoms
                        .map(symptom =>
                            symptom.toLowerCase().trim()
                        )
                    : [];


            const keySymptoms =
                Array.isArray(
                    condition.keySymptoms
                )
                    ? condition.keySymptoms
                        .map(symptom =>
                            symptom.toLowerCase().trim()
                        )
                    : [];


            let score = 0;

            let matchedSymptoms = [];


            selectedSymptoms.forEach(symptom => {

                if (
                    keySymptoms.includes(symptom)
                ) {

                    score += 4;

                    matchedSymptoms.push(symptom);

                }

                else if (
                    commonSymptoms.includes(symptom)
                ) {

                    score += 3;

                    matchedSymptoms.push(symptom);

                }

                else if (
                    lessCommonSymptoms.includes(symptom)
                ) {

                    score += 1;

                    matchedSymptoms.push(symptom);

                }

            });


            return {

                condition,
                score,
                matchedSymptoms

            };

        });


    const rankedResults =
        results
            .filter(result =>
                result.score > 0
            )
            .sort(
                (a, b) =>
                    b.score - a.score
            );


    displayResults(rankedResults);

}


// ==========================================
// DISPLAY RESULTS
// ==========================================

function displayResults(results) {

    if (results.length === 0) {

        symptomResults.innerHTML = `

            <div class="no-results">

                <h3>
                    No close matches found
                </h3>

                <p>
                    The selected symptoms do not
                    closely match the conditions in
                    the current database.
                </p>

                <p>
                    This does not mean that nothing is
                    wrong. Consider seeking professional
                    medical assessment if symptoms persist
                    or worsen.
                </p>

            </div>

        `;

        return;

    }


    const topResults =
        results.slice(0, 5);


    let html = `

        <h2>
            Possible Conditions
        </h2>

        <p class="results-introduction">

            Based on the symptoms selected,
            these are some possible conditions
            associated with them.

        </p>

    `;


    topResults.forEach((result, index) => {

        const condition =
            result.condition;


        const matchedSymptoms =
            result.matchedSymptoms;


        const urgencyClass =
            condition.urgency
                ? condition.urgency.toLowerCase()
                : "moderate";


        html += `

            <div class="condition-result">

                <div class="condition-header">

                    <div>

                        <span class="condition-rank">
                            #${index + 1}
                        </span>

                        <h3>
                            ${condition.name}
                        </h3>

                    </div>


                    <span class="urgency ${urgencyClass}">
                        ${condition.urgency || "moderate"}
                    </span>

                </div>


                <p class="condition-description">

                    ${condition.description || ""}

                </p>


                <div class="matched-section">

                    <strong>
                        Matching symptoms:
                    </strong>

                    <div class="matched-symptoms">

                        ${
                            matchedSymptoms
                                .map(symptom =>
                                    `<span>${symptom}</span>`
                                )
                                .join("")
                        }

                    </div>

                </div>


                ${
                    Array.isArray(
                        condition.warningSigns
                    ) &&
                    condition.warningSigns.length > 0

                        ? `

                            <div class="warning-box">

                                <h4>
                                    ⚠️ Warning Signs
                                </h4>

                                <ul>

                                    ${
                                        condition.warningSigns
                                            .map(sign =>
                                                `<li>${sign}</li>`
                                            )
                                            .join("")
                                    }

                                </ul>

                            </div>

                          `

                        : ""

                }


                ${
                    condition.whenToSeekCare

                        ? `

                            <div class="care-advice">

                                <strong>
                                    When to seek care:
                                </strong>

                                <p>
                                    ${condition.whenToSeekCare}
                                </p>

                            </div>

                          `

                        : ""

                }

            </div>

        `;

    });


    html += `

        <div class="symptom-disclaimer">

            ⚠️ <strong>Important:</strong>

            These are possible conditions, not a
            diagnosis. Many medical conditions share
            similar symptoms. A qualified healthcare
            professional may need to perform an
            examination or tests to determine the cause.

        </div>

    `;


    symptomResults.innerHTML = html;

}


// ==========================================
// RESET
// ==========================================

resetSymptomsBtn.addEventListener(
    "click",
    () => {

        selectedSymptoms = [];


        symptomSearch.value = "";


        displaySelectedSymptoms();


        displaySymptomOptions(
            getAllSymptoms()
        );


        symptomResults.innerHTML = `

            <h2>
                Possible Conditions
            </h2>

            <p>
                Your possible results will appear
                here after you select your symptoms.
            </p>

        `;

    }
);


// ==========================================
// START
// ==========================================

loadSymptoms();

