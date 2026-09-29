from fastapi import APIRouter, Query
from ..services.ml_service import ml_service
from ..services.syllabus_explorations import syllabus_explorations

router = APIRouter(prefix="/ml-insights", tags=["Model Evaluation & Syllabus Explorations"])

@router.get("/metrics")
def get_metrics():
    return ml_service.get_metrics()

@router.get("/syllabus/unit1-regression")
def get_unit1_regression(degree: int = Query(1, ge=1, le=3)):
    return syllabus_explorations.get_unit1_regression_demo(degree=degree)

@router.get("/syllabus/unit3-activation")
def get_unit3_activation():
    return syllabus_explorations.get_unit3_activation_functions()

@router.get("/syllabus/unit5-gradient-descent")
def get_unit5_gradient_descent(
    learning_rate: float = Query(0.1, ge=0.01, le=1.0),
    iterations: int = Query(15, ge=5, le=30)
):
    return syllabus_explorations.get_unit5_gradient_descent_simulation(
        learning_rate=learning_rate,
        iterations=iterations
    )

@router.get("/syllabus/unit5-qlearning")
def get_unit5_qlearning():
    return syllabus_explorations.get_unit5_qlearning_demo()

@router.get("/responsible-ai")
def get_responsible_ai_audit():
    metrics = ml_service.get_metrics()
    fairness = metrics.get("fairness_and_limitations", {})
    return {
        "framework": "Responsible AI, Data Privacy & Fairness Governance Framework",
        "transparency_principles": [
            {
                "principle": "Transparent Benchmark Disclosure",
                "description": "Models are trained on an empirical 25,000 synthetic cohort calibrated to actual university placement distributions. It is explicitly labeled as an educational intelligence platform, not a deterministic hiring verdict."
            },
            {
                "principle": "Explainability & Interpretability by Design",
                "description": "Every readiness estimation provides human-interpretable feature contribution vectors (SHAP/coefficients) highlighting practical steps rather than black-box rejections."
            },
            {
                "principle": "Fairness & Demographic Parity Auditing",
                "description": "Placement parity across departments is monitored to avoid systemic algorithmic bias against non-CS streams (e.g. ECE / EE)."
            },
            {
                "principle": "Student Data Privacy & Anonymization",
                "description": "Recruiter discovery views operate on anonymized identifiers (e.g. Talent-BTR-10291) with PII hidden until the candidate authorizes mutual engagement."
            }
        ],
        "departmental_parity": fairness.get("departmental_parity", {}),
        "disclaimer": fairness.get("responsible_ai_notice", "Predictions provide guidance and growth opportunities; they must never be used as exclusionary filters.")
    }
