// ==========================================
// NET-HEALTH DRUG INTERACTION CHECKER
// ==========================================

// ===== DOM ELEMENTS =====

const drugOneSelect = document.getElementById("drug-one");
const drugTwoSelect = document.getElementById("drug-two");
const checkBtn = document.getElementById("check-btn");
const interactionResult = document.getElementById("interaction-result");

// ===== DRUG DATABASE =====

let drugs = [];

// ===== POPULATE DROPDOWNS =====

function populateSelect(select, drugList) {

    drugList
        .slice()
        .sort((a, b) => a.genericName.localeCompare(b.genericName))
        .forEach(drug => {

            const option = document.createElement("option");
            option.value = drug.id;
            option.textContent = drug.genericName;

            select.appendChild(option);

        });

}

// ===== LOAD DATABASE =====

async function loadDrugs() {

    try {

        const response = await fetch("../data/drugs.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        drugs = await response.json();

        populateSelect(drugOneSelect, drugs);
        populateSelect(drugTwoSelect, drugs);

        drugOneSelect.disabled = false;
        drugTwoSelect.disabled = false;
        checkBtn.disabled = false;

    } catch (error) {

        console.error("Failed to load drug database:", error);

        interactionResult.innerHTML = `
            <p>The drug database could not be loaded. Please try again later.</p>
        `;

    }

}

drugOneSelect.disabled = true;
drugTwoSelect.disabled = true;
checkBtn.disabled = true;
loadDrugs();

// ===== FIND INTERACTION =====

function findInteraction(nameOne, nameTwo) {

    return interactions.find(entry =>
        (entry.drug1 === nameOne && entry.drug2 === nameTwo) ||
        (entry.drug1 === nameTwo && entry.drug2 === nameOne)
    );

}

// ===== CHECK INTERACTION =====

checkBtn.addEventListener("click", () => {

    const idOne = Number(drugOneSelect.value);
    const idTwo = Number(drugTwoSelect.value);

    if (!idOne || !idTwo) {

        interactionResult.innerHTML = `
            <p>Please select two medicines.</p>
        `;

        return;

    }

    if (idOne === idTwo) {

        interactionResult.innerHTML = `
            <p>Please select two different medicines.</p>
        `;

        return;

    }

    const drugOne = drugs.find(d => d.id === idOne);
    const drugTwo = drugs.find(d => d.id === idTwo);

    const interaction = findInteraction(drugOne.genericName, drugTwo.genericName);

    if (!interaction) {

        interactionResult.innerHTML = `
            <span class="severity none">No known interaction on file</span>
            <p>
                No interaction data is currently available for
                <strong>${drugOne.genericName}</strong> and
                <strong>${drugTwo.genericName}</strong>.
                This does not confirm the combination is safe — always verify
                using current clinical references.
            </p>
        `;

        return;

    }

    const severityClass = interaction.severity.toLowerCase();

    interactionResult.innerHTML = `
        <span class="severity ${severityClass}">${interaction.severity}</span>
        <p>${interaction.message}</p>
        <p><strong>Recommendation:</strong> ${interaction.recommendation}</p>
    `;

});
