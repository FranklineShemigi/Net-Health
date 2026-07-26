const drugs = [
{
    id: 1,
    genericName: "Paracetamol",
    brandNames: ["Panadol", "Calpol"],
    category: "Analgesic",
    drugClass: "Analgesic / Antipyretic",
    dosageForms: ["Tablet", "Syrup"],
    strengths: ["500 mg", "120 mg/5 mL"],
    prescriptionOnly: false,
    essentialMedicine: true,

    dosing: {

        adult: {
            dose: "500–1000 mg",
            frequency: "Every 4–6 hours",
            maxDailyDose: "4000 mg"
        },

        paediatric: {
            mgPerKg: 15,
            frequency: "Every 4–6 hours",
            maxDailyDose: "75 mg/kg/day"
        }

    }

},
    
    {
        id: 2,
        genericName: "Ibuprofen",
        brandNames: ["Brufen"],
        category: "Analgesic",
        drugClass: "NSAID",
        dosageForms: ["Tablet", "Suspension"],
        strengths: ["200 mg", "400 mg"],
        prescriptionOnly: false,
        essentialMedicine: true,
        
        dosing: {
    adult: {
        dose: "200–400 mg",
        frequency: "Every 6–8 hours",
        maxDailyDose: "2400 mg"
    },
    paediatric: {
        mgPerKg: 10,
        frequency: "Every 6–8 hours",
        maxDailyDose: "40 mg/kg/day"
    }

}
    },
    {
        id: 3,
        genericName: "Amoxicillin",
        brandNames: ["Amoxil"],
        category: "Antibiotic",
        drugClass: "Penicillin",
        dosageForms: ["Capsule", "Suspension"],
        strengths: ["250 mg", "500 mg"],
        prescriptionOnly: true,
        essentialMedicine: true,
        
        dosing: {
    adult: {
        dose: "500 mg",
        frequency: "Every 8 hours",
        maxDailyDose: "3000 mg"
    },
    paediatric: {
        mgPerKg: 25,
        frequency: "Every 8 hours",
        maxDailyDose: "1000 mg"
    }
}
    },
    {
        id: 4,
        genericName: "Ceftriaxone",
        brandNames: ["Rocephin"],
        category: "Antibiotic",
        drugClass: "Cephalosporin",
        dosageForms: ["Injection"],
        strengths: ["1 g"],
        prescriptionOnly: true,
        essentialMedicine: true,
        
        dosing: {
    adult: {
        dose: "1000–2000 mg",
        frequency: "Once daily",
        maxDailyDose: "4000 mg"
    },
    paediatric: {
        mgPerKg: 50,
        frequency: "Once daily",
        maxDailyDose: "2000 mg"
    }
}
    },

    {
        id: 5,
        genericName: "Metronidazole",
        brandNames: ["Flagyl"],
        category: "Antibiotic",
        drugClass: "Nitroimidazole",
        dosageForms: ["Tablet", "Injection"],
        strengths: ["200 mg", "400 mg", "500 mg"],
        prescriptionOnly: true,
        essentialMedicine: true,
        
        dosing: {
    adult: {
        dose: "400–500 mg",
        frequency: "Every 8 hours",
        maxDailyDose: "4000 mg"
    },
    paediatric: {
        mgPerKg: 7.5,
        frequency: "Every 8 hours",
        maxDailyDose: "30 mg/kg/day"
    }
}
    }
];