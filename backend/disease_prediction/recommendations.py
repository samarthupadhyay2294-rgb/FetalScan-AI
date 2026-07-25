"""Clinical recommendation text."""

def build_recommendations(disease: dict) -> list[str]:
    primary = disease.get("primary_condition", "Normal")
    base = [
        "Repeat scan with standardized plane if image quality is suboptimal.",
        "Correlate findings with maternal history and prior imaging.",
    ]
    mapping = {
        "Normal": ["Continue routine prenatal follow-up per local guidelines."],
        "Possible Microcephaly": [
            "Refer to maternal-fetal medicine for detailed neurosonography.",
            "Consider TORCH screening and genetic counseling.",
        ],
        "Possible Macrocephaly": [
            "Evaluate for ventriculomegaly and additional cranial anomalies.",
            "Consider follow-up MRI if clinically indicated.",
        ],
        "Possible Hydrocephalus": [
            "Assess lateral ventricles and posterior fossa structures.",
            "Urgent specialist referral recommended for comprehensive evaluation.",
        ],
        "Possible Dolichocephaly": [
            "Review head shape in multiple planes.",
            "Assess for positional molding vs structural dolichocephaly.",
        ],
        "Possible Brachycephaly": [
            "Review head shape in coronal and axial planes.",
            "Differentiate positional brachycephaly from synostosis patterns.",
        ],
    }
    return base + mapping.get(primary, ["Specialist review advised."])
