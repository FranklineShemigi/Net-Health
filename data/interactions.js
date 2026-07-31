const interactions = [
    {
        drug1: "Paracetamol",
        drug2: "Ibuprofen",
        severity: "Minor",
        message:
            "These medicines are commonly used together when clinically appropriate. Always follow the recommended doses.",
        recommendation:
            "Monitor total daily dose and avoid prolonged self-medication."
    },

    {
        drug1: "Ibuprofen",
        drug2: "Amoxicillin",
        severity: "None",
        message:
            "No clinically significant interaction is currently known.",
        recommendation:
            "Use as prescribed."
    },

    {
        drug1: "Paracetamol",
        drug2: "Amoxicillin",
        severity: "None",
        message:
            "No clinically significant interaction is currently known.",
        recommendation:
            "Use as prescribed."
    },

    {
        drug1: "Warfarin",
        drug2: "Ibuprofen",
        severity: "Major",
        message:
            "Ibuprofen may increase the risk of serious bleeding when combined with Warfarin.",
        recommendation:
            "Avoid this combination unless specifically directed by a healthcare professional."
    },

    {
        drug1: "Warfarin",
        drug2: "Paracetamol",
        severity: "Moderate",
        message:
            "High or prolonged doses of Paracetamol may increase Warfarin's anticoagulant effect.",
        recommendation:
            "Monitor INR closely if prolonged Paracetamol therapy is required."
    }
];