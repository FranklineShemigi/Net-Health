// ==========================================
// NET-HEALTH
// CONSULTATION BOOKING
// ==========================================


// ==========================================
// DOM ELEMENTS
// ==========================================

const professional =
    document.getElementById("professional");

const consultationType =
    document.getElementById("consultation-type");

const consultationDate =
    document.getElementById("consultation-date");

const consultationTime =
    document.getElementById("consultation-time");

const consultationReason =
    document.getElementById("consultation-reason");

const bookBtn =
    document.getElementById("book-consultation-btn");

const resetBtn =
    document.getElementById("reset-consultation-btn");

const consultationResult =
    document.getElementById("consultation-result");


// ==========================================
// SET MINIMUM DATE
// Prevent selecting dates in the past
// ==========================================

const today =
    new Date().toISOString().split("T")[0];

consultationDate.min = today;


// ==========================================
// BOOK CONSULTATION
// ==========================================

bookBtn.addEventListener("click", () => {

    // ======================================
    // GET VALUES
    // ======================================

    const selectedProfessional =
        professional.value;

    const selectedType =
        consultationType.value;

    const selectedDate =
        consultationDate.value;

    const selectedTime =
        consultationTime.value;

    const reason =
        consultationReason.value.trim();


    // ======================================
    // VALIDATE FORM
    // ======================================

    if (
        !selectedProfessional ||
        !selectedType ||
        !selectedDate ||
        !selectedTime ||
        !reason
    ) {

        consultationResult.innerHTML = `

            <div class="warning-box">

                <h3>
                    Incomplete Information
                </h3>

                <p>
                    Please complete all consultation
                    details before booking.
                </p>

            </div>

        `;

        return;

    }


    // ======================================
    // CREATE BOOKING ID
    // ======================================

    const bookingId =
        "NH-" +
        Date.now().toString().slice(-6);


    // ======================================
    // CREATE CONSULTATION OBJECT
    // ======================================

    const consultation = {

        id: bookingId,

        professional:
            selectedProfessional,

        type:
            selectedType,

        date:
            selectedDate,

        time:
            selectedTime,

        reason:
            reason,

        status:
            "Pending",

        createdAt:
            new Date().toISOString()

    };


    // ======================================
    // GET EXISTING BOOKINGS
    // ======================================

    const existingBookings =
        JSON.parse(
            localStorage.getItem(
                "netHealthConsultations"
            )
        ) || [];


    // ======================================
    // SAVE BOOKING
    // ======================================

    existingBookings.push(
        consultation
    );


    localStorage.setItem(
        "netHealthConsultations",
        JSON.stringify(
            existingBookings
        )
    );


    // ======================================
    // DISPLAY SUCCESS
    // ======================================

    consultationResult.innerHTML = `

        <div class="consultation-success">

            <h3>
                ✅ Consultation Requested
            </h3>

            <p>
                Your consultation request has
                been submitted successfully.
            </p>


            <div class="result-item">

                <strong>
                    Booking ID
                </strong>

                <span>
                    ${bookingId}
                </span>

            </div>


            <div class="result-item">

                <strong>
                    Professional
                </strong>

                <span>
                    ${formatProfessional(
                        selectedProfessional
                    )}
                </span>

            </div>


            <div class="result-item">

                <strong>
                    Consultation
                </strong>

                <span>
                    ${formatConsultationType(
                        selectedType
                    )}
                </span>

            </div>


            <div class="result-item">

                <strong>
                    Date
                </strong>

                <span>
                    ${selectedDate}
                </span>

            </div>


            <div class="result-item">

                <strong>
                    Time
                </strong>

                <span>
                    ${selectedTime}
                </span>

            </div>


            <div class="result-item">

                <strong>
                    Status
                </strong>

                <span>
                    Pending
                </span>

            </div>


            <p class="disclaimer">

                A healthcare professional will need
                to confirm the consultation before it
                is considered scheduled.

            </p>

        </div>

    `;

});


// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click", () => {

    professional.value = "";

    consultationType.value = "";

    consultationDate.value = "";

    consultationTime.value = "";

    consultationReason.value = "";


    consultationResult.innerHTML = `

        <h3>
            Consultation Status
        </h3>

        <p>
            Complete the form above to request
            a consultation.
        </p>

    `;

});


// ==========================================
// FORMAT PROFESSIONAL
// ==========================================

function formatProfessional(value) {

    const professionals = {

        doctor:
            "Doctor",

        nurse:
            "Nurse",

        pharmacist:
            "Pharmacist",

        "clinical-officer":
            "Clinical Officer"

    };


    return professionals[value] ||
        value;

}


// ==========================================
// FORMAT CONSULTATION TYPE
// ==========================================

function formatConsultationType(value) {

    const types = {

        general:
            "General Consultation",

        medication:
            "Medication Consultation",

        "follow-up":
            "Follow-up Consultation",

        "health-education":
            "Health Education"

    };


    return types[value] ||
        value;

}