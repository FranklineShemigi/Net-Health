// ===== DOM ELEMENTS =====

const medicine = document.querySelector("#medicine");
const weight = document.querySelector("#weight");
const age = document.querySelector("#age");
const calculateBtn = document.querySelector("#calculate-btn");
const resetBtn = document.querySelector("#reset-btn");
const result = document.querySelector("#result");

// ===== LOAD MEDICINES =====

drugs.forEach(drug => {

    const option = document.createElement("option");

    option.value = drug.genericName;
    option.textContent = drug.genericName;

    medicine.appendChild(option);

});

// ===== CALCULATE DOSE =====

calculateBtn.addEventListener("click", () => {

    const selectedMedicine = medicine.value;
    const patientWeight = Number(weight.value);
    const patientAge = Number(age.value);

    // ===== VALIDATE INPUT =====

    if (!selectedMedicine || !patientWeight || !patientAge) {

        result.innerHTML = `
            <p>Please complete all fields.</p>
        `;

        return;

    }

    // ===== FIND MEDICINE =====

    const drug = drugs.find(
        item => item.genericName === selectedMedicine
    );

    if (!drug) {

        result.innerHTML = `
            <p>Medicine not found.</p>
        `;

        return;

    }

    // ===== CALCULATE DOSE =====

    const dose = Math.round(
        patientWeight * drug.dosing.paediatric.mgPerKg
    );

    // ===== DISPLAY RESULT =====

    result.innerHTML = `
        <div class="dose-result">

            <h2>💊 Dose Calculation</h2>

            <div class="result-item">
                <strong>Medicine</strong>
                <span>${drug.genericName}</span>
            </div>

            <div class="result-item">
                <strong>Weight</strong>
                <span>${patientWeight} kg</span>
            </div>

            <div class="result-item">
                <strong>Age</strong>
                <span>${patientAge} years</span>
            </div>

            <div class="result-item highlight">
                <strong>Recommended Dose</strong>
                <span>${dose} mg per dose</span>
            </div>

            <div class="result-item">
                <strong>Frequency</strong>
                <span>${drug.dosing.paediatric.frequency}</span>
            </div>

            <div class="result-item">
                <strong>Maximum Daily Dose</strong>
                <span>${drug.dosing.paediatric.maxDailyDose}</span>
            </div>

            <div class="disclaimer">
                ⚠ Educational support only. Always verify doses using current clinical guidelines and professional judgement.
            </div>

        </div>
    `;

});

// ===== RESET =====

resetBtn.addEventListener("click", () => {

    medicine.value = "";
    weight.value = "";
    age.value = "";

    result.innerHTML = `
        <h2>Result</h2>
        <p>Dose calculations will appear here.</p>
    `;

});