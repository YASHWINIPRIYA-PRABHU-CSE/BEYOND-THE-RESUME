import re
from typing import List, Dict, Any

INTERVIEW_QUESTION_BANK = [
    {
        "id": 1,
        "role": "Software Developer",
        "category": "Technical Core",
        "question": "Explain the difference between a Process and a Thread. How does the Operating System handle context switching between them?",
        "star_guidance": "Define both terms clearly, contrast memory sharing vs isolation, and explain overhead in context switching.",
        "expected_keywords": ["process", "thread", "memory space", "virtual memory", "context switch", "pcb", "stack", "overhead"]
    },
    {
        "id": 2,
        "role": "Full Stack Developer",
        "category": "System Design",
        "question": "How would you design a scalable authentication system using JWT? What security vulnerabilities (e.g. XSS, CSRF) must you safeguard against?",
        "star_guidance": "Explain token generation, storage in httpOnly cookies, token refresh strategy, and defense against token theft.",
        "expected_keywords": ["jwt", "httponly", "cookie", "xss", "csrf", "refresh token", "signature", "secret key", "cors"]
    },
    {
        "id": 3,
        "role": "Data Scientist",
        "category": "Machine Learning",
        "question": "How do you detect and handle overfitting in a decision tree model? Contrast pre-pruning with post-pruning techniques.",
        "star_guidance": "Mention cross-validation, train-test divergence, max_depth, min_samples_split, cost-complexity pruning (ccp_alpha).",
        "expected_keywords": ["overfitting", "max_depth", "pruning", "cross-validation", "bias-variance", "min_samples_split", "generalization"]
    },
    {
        "id": 4,
        "role": "Machine Learning Engineer",
        "category": "Production ML",
        "question": "Walk me through how you deploy and monitor a machine learning model in production to detect data drift and concept drift.",
        "star_guidance": "Explain API wrapping (FastAPI/Docker), telemetry logging, baseline distribution vs production distribution, and retraining triggers.",
        "expected_keywords": ["data drift", "concept drift", "monitoring", "fastapi", "docker", "telemetry", "retraining", "ks-test", "distribution"]
    },
    {
        "id": 5,
        "role": "All Roles",
        "category": "Behavioral (STAR Method)",
        "question": "Describe a difficult technical bug or team disagreement you encountered on a recent project. How did you resolve it?",
        "star_guidance": "Structure with Situation (the project context), Task (the roadblock), Action (your specific initiative), and Result (quantifiable outcome).",
        "expected_keywords": ["situation", "task", "action", "result", "resolved", "collaborated", "debugged", "outcome", "learned"]
    }
]

class InterviewService:
    @staticmethod
    def get_questions_for_role(role: str) -> List[Dict[str, Any]]:
        role_lower = role.lower()
        matched = [q for q in INTERVIEW_QUESTION_BANK if q["role"] == "All Roles" or q["role"].lower() in role_lower]
        if not matched:
            matched = INTERVIEW_QUESTION_BANK
        return matched

    @staticmethod
    def evaluate_answer(question_id: int, user_answer: str, role: str) -> Dict[str, Any]:
        q = next((item for item in INTERVIEW_QUESTION_BANK if item["id"] == question_id), INTERVIEW_QUESTION_BANK[0])
        ans_lower = user_answer.lower().strip()
        word_count = len(ans_lower.split())

        # Keyword matching
        expected = q["expected_keywords"]
        found_keywords = [kw for kw in expected if kw in ans_lower]
        missing_keywords = [kw for kw in expected if kw not in found_keywords]

        # STAR indicator check for behavioral questions
        star_markers = ["situation", "task", "action", "result", "when", "decided", "implemented", "achieved", "finally"]
        star_count = sum(1 for m in star_markers if m in ans_lower)

        # Scoring heuristics
        # 1. Clarity score (based on structure and length)
        if word_count < 25:
            clarity = 40
        elif word_count < 60:
            clarity = 65
        elif word_count < 200:
            clarity = 85
        else:
            clarity = 80 # slightly long

        # 2. Completeness score (based on keywords hit)
        completeness = int(min(95, max(30, (len(found_keywords) / max(1, len(expected))) * 100)))

        # 3. STAR / Reasoning alignment
        star_score = int(min(95, max(45, (star_count / 5.0) * 100)))

        # Overall composite
        overall = int((clarity * 0.3) + (completeness * 0.45) + (star_score * 0.25))

        # Actionable feedback
        feedback_lines = []
        if completeness >= 75:
            feedback_lines.append("Excellent technical depth! You accurately hit the core engineering concepts expected for this question.")
        elif completeness >= 50:
            feedback_lines.append("Solid foundation. You touched upon key points, but expanding on edge cases and trade-offs would strengthen your response.")
        else:
            feedback_lines.append("Your answer is somewhat brief or misses several foundational concepts. Be sure to articulate definitions, mechanism details, and trade-offs.")

        if word_count < 40:
            feedback_lines.append("Recommendation: In real interviews, elaborate with an example from a project you built to demonstrate practical command.")

        strong_points = [
            f"Demonstrated awareness of {kw.title()}" for kw in found_keywords[:3]
        ]
        if not strong_points:
            strong_points = ["Constructed a readable response with clear intent"]

        missing_concepts = [
            f"Discussion of {kw.title()} and associated trade-offs" for kw in missing_keywords[:3]
        ]

        improvement_plan = (
            f"Review the concept of '{missing_keywords[0].title() if missing_keywords else 'system trade-offs'}' "
            f"and formulate a 90-second response using the STAR framework (Situation, Task, Action, Result)."
        )

        return {
            "overall_score": overall,
            "clarity_score": clarity,
            "completeness_score": completeness,
            "star_alignment_score": star_score,
            "feedback": " ".join(feedback_lines),
            "strong_points": strong_points,
            "missing_concepts": missing_concepts,
            "improvement_plan": improvement_plan
        }

interview_service = InterviewService()
