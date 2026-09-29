from typing import List, Dict, Any

CAREER_PATHS = [
    {
        "role_name": "Full Stack Developer",
        "category": "Software Engineering",
        "typical_salary_range": "6.0 - 18.0 LPA",
        "industry_demand": "Very High",
        "core_skills": ["javascript", "typescript", "react", "node.js", "sql", "git", "rest api", "html", "css"],
        "advanced_skills": ["docker", "mongodb", "redis", "ci/cd", "system design", "graphql"],
        "recommended_projects": [
            "Real-time Collaborative Whiteboard (React, WebSockets, Node.js)",
            "Multi-tenant SaaS E-Commerce Platform with Stripe Checkout & Microservices"
        ],
        "typical_responsibilities": "Design and build client-side UI components and scalable server-side REST/GraphQL APIs."
    },
    {
        "role_name": "Software Developer (Core Backend)",
        "category": "Software Engineering",
        "typical_salary_range": "6.5 - 20.0 LPA",
        "industry_demand": "High",
        "core_skills": ["python", "java", "c++", "data structures", "algorithms", "sql", "git", "oops"],
        "advanced_skills": ["system design", "distributed systems", "multithreading", "linux", "redis"],
        "recommended_projects": [
            "High-Throughput In-Memory Key-Value Store with TTL & WAL persistence",
            "Distributed URL Shortener & Analytics Gateway handling rate limiting"
        ],
        "typical_responsibilities": "Write robust, optimized algorithms, architect database schemas, and build fault-tolerant backend services."
    },
    {
        "role_name": "Data Scientist",
        "category": "Data & AI",
        "typical_salary_range": "7.0 - 22.0 LPA",
        "industry_demand": "Very High",
        "core_skills": ["python", "pandas", "numpy", "scikit-learn", "sql", "statistics", "data visualization"],
        "advanced_skills": ["deep learning", "nlp", "tensorflow", "pytorch", "feature engineering", "a/b testing"],
        "recommended_projects": [
            "Customer Churn Prediction Engine with SHAP Interpretability & Streamlit UI",
            "Algorithmic Credit Risk Assessment with Bias & Fairness Auditing"
        ],
        "typical_responsibilities": "Formulate predictive statistical models, uncover business trends, and communicate insights to leadership."
    },
    {
        "role_name": "Machine Learning Engineer",
        "category": "Data & AI",
        "typical_salary_range": "8.0 - 24.0 LPA",
        "industry_demand": "Exponential",
        "core_skills": ["python", "machine learning", "deep learning", "pytorch", "fastapi", "docker", "data structures"],
        "advanced_skills": ["mlops", "transformers", "hugging face", "onnx", "distributed training", "kubernetes"],
        "recommended_projects": [
            "Production RAG (Retrieval-Augmented Generation) Pipeline with Vector Database",
            "Real-Time Computer Vision Inference Service deployed on Containerized Cloud"
        ],
        "typical_responsibilities": "Deploy, optimize, and monitor deep learning models in production environments with robust MLOps pipelines."
    },
    {
        "role_name": "Cloud & DevOps Engineer",
        "category": "Infrastructure",
        "typical_salary_range": "6.5 - 19.0 LPA",
        "industry_demand": "High",
        "core_skills": ["linux", "docker", "aws", "git", "ci/cd", "bash", "networking"],
        "advanced_skills": ["kubernetes", "terraform", "ansible", "prometheus", "grafana", "helm"],
        "recommended_projects": [
            "GitOps Multi-Stage CI/CD Pipeline on Kubernetes with Automated Canary Rollouts",
            "Terraform Infrastructure as Code (IaC) for Resilient AWS High-Availability VPC"
        ],
        "typical_responsibilities": "Automate deployment infrastructure, maintain cloud security posture, and ensure 99.99% system reliability."
    },
    {
        "role_name": "Cybersecurity Analyst",
        "category": "Security",
        "typical_salary_range": "5.5 - 16.0 LPA",
        "industry_demand": "Growing",
        "core_skills": ["networking", "linux", "python", "cryptography", "wireshark", "vulnerability assessment"],
        "advanced_skills": ["siem", "penetration testing", "burp suite", "incident response", "reverse engineering"],
        "recommended_projects": [
            "Automated Vulnerability Scanner & Port Auditing CLI Utility",
            "Network Intrusion Detection System (NIDS) utilizing Snort & ELK Stack"
        ],
        "typical_responsibilities": "Monitor security alerts, conduct vulnerability scans, and implement robust defenses against intrusion."
    },
    {
        "role_name": "Data Analyst",
        "category": "Data & Business",
        "typical_salary_range": "4.5 - 12.0 LPA",
        "industry_demand": "Consistent",
        "core_skills": ["sql", "excel", "power bi", "tableau", "python", "statistics", "data cleaning"],
        "advanced_skills": ["business intelligence", "etl", "reporting", "storytelling with data"],
        "recommended_projects": [
            "Executive Sales Performance & Customer Lifetime Value Dashboard in Power BI",
            "Automated SQL ETL Pipeline transforming transactional data into Star Schema"
        ],
        "typical_responsibilities": "Query enterprise databases, craft interactive dashboards, and translate metrics into actionable growth strategies."
    }
]

class CareerEngine:
    @staticmethod
    def get_recommendations(user_skills: List[str], preferred_role: str = "") -> List[Dict[str, Any]]:
        user_skills_clean = [s.lower().strip() for s in user_skills]
        results = []

        for path in CAREER_PATHS:
            all_path_skills = path["core_skills"] + path["advanced_skills"]
            matches = [s for s in all_path_skills if any(u in s or s in u for u in user_skills_clean)]
            missing = [s for s in path["core_skills"] if s not in matches]

            # Match calculation: weighted
            core_matches = [s for s in path["core_skills"] if any(u in s or s in u for u in user_skills_clean)]
            score = int((len(core_matches) / len(path["core_skills"])) * 75 + (len(matches) / len(all_path_skills)) * 25)
            
            # Boost preferred role
            if preferred_role and preferred_role.lower() in path["role_name"].lower():
                score = min(98, score + 10)

            score = min(96, max(35, score))

            readiness = (
                "Interview Ready" if score >= 80 else
                "Moderate Prep Needed" if score >= 60 else
                "Early Stage Transition"
            )

            why = (
                f"You demonstrate strong capability in {', '.join([m.title() for m in core_matches[:3]]) or 'core analytical fundamentals'}. "
                f"Mastering {', '.join([m.title() for m in missing[:2]]) or 'advanced system architecture'} will elevate you to the top quartile of applicants."
            )

            results.append({
                "role_name": path["role_name"],
                "match_score": score,
                "readiness_level": readiness,
                "why_recommended": why,
                "matching_skills": [m.title() for m in matches],
                "missing_skills": [m.title() for m in missing],
                "suggested_projects": path["recommended_projects"],
                "typical_salary_range": path["typical_salary_range"],
                "industry_demand": path["industry_demand"]
            })

        results.sort(key=lambda x: x["match_score"], reverse=True)
        return results

    @staticmethod
    def analyze_skill_gap(target_role: str, user_skills: List[str]) -> Dict[str, Any]:
        matched_path = next((p for p in CAREER_PATHS if target_role.lower() in p["role_name"].lower()), CAREER_PATHS[0])
        user_skills_clean = [s.lower().strip() for s in user_skills]

        skills_list = []
        for s in matched_path["core_skills"]:
            is_present = any(u in s or s in u for u in user_skills_clean)
            skills_list.append({
                "skill_name": s.title(),
                "category": "Core Foundation",
                "importance": "Critical",
                "current_status": "Mastered" if is_present else "Missing",
                "recommended_action": "Reinforce with advanced problem solving" if is_present else f"Complete a structured 2-week sprint covering {s.title()} fundamentals",
                "learning_resource": f"Official {s.title()} Documentation & FreeCodeCamp / LeetCode"
            })

        for s in matched_path["advanced_skills"]:
            is_present = any(u in s or s in u for u in user_skills_clean)
            skills_list.append({
                "skill_name": s.title(),
                "category": "Advanced Specialization",
                "importance": "High",
                "current_status": "Mastered" if is_present else "Developing",
                "recommended_action": "Deploy inside an end-to-end portfolio project" if is_present else f"Build a prototype integrating {s.title()}",
                "learning_resource": f"Hands-on architectural tutorials & GitHub starter templates for {s.title()}"
            })

        missing_count = sum(1 for item in skills_list if item["current_status"] != "Mastered")
        gap_pct = int((missing_count / len(skills_list)) * 100)

        radar_data = [
            {"subject": "Architecture & System Design", "Current": 62, "Required": 85},
            {"subject": "Core Coding & Algorithms", "Current": 78, "Required": 88},
            {"subject": "Database Optimization", "Current": 70, "Required": 80},
            {"subject": "Deployment & Cloud", "Current": 55, "Required": 75},
            {"subject": "Testing & Code Quality", "Current": 60, "Required": 80},
            {"subject": "Domain Specialization", "Current": 68, "Required": 85}
        ]

        return {
            "target_role": matched_path["role_name"],
            "overall_gap_percentage": gap_pct,
            "skills": skills_list,
            "radar_data": radar_data
        }

    @staticmethod
    def get_next_three_moves(user_data: dict) -> List[Dict[str, Any]]:
        coding = user_data.get("coding_score", 65)
        resume_score = user_data.get("resume_score", 70)
        projects_count = user_data.get("projects_count", 2)
        role = user_data.get("preferred_role", "Full Stack Developer")

        moves = []
        if coding < 70:
            moves.append({
                "step": 1,
                "title": "Master Two-Pointer & Sliding Window Patterns",
                "impact": "+15% Coding Readiness",
                "urgency": "High Priority",
                "description": "Solve 15 curated LeetCode Medium problems focusing on Array and Hash Map patterns to pass initial technical screening rounds.",
                "timeline": "Next 7 Days"
            })
        else:
            moves.append({
                "step": 1,
                "title": "Complete 1 Full Mock Technical Interview",
                "impact": "+12% Interview Readiness",
                "urgency": "High Priority",
                "description": "Practice verbalizing your thought process and time complexity analysis under timed interview conditions.",
                "timeline": "This Weekend"
            })

        if projects_count < 3:
            moves.append({
                "step": 2,
                "title": f"Ship a Production Capstone in {role}",
                "impact": "+20% Resume Standing",
                "urgency": "Critical Priority",
                "description": "Build an end-to-end deployed web application with authentication, database persistence, and a live demo URL on your portfolio.",
                "timeline": "Next 14 Days"
            })
        else:
            moves.append({
                "step": 2,
                "title": "Add Quantifiable Metrics to Resume Bullets",
                "impact": "+10% Recruiter Shortlist Rate",
                "urgency": "Medium Priority",
                "description": "Replace vague descriptions with measurable outcomes: 'Reduced latency by 35%' or 'Served 1,000+ API requests'.",
                "timeline": "Next 48 Hours"
            })

        moves.append({
            "step": 3,
            "title": "Attempt Domain Assessment Benchmark",
            "impact": "+18% Talent Visibility",
            "urgency": "High Priority",
            "description": "Take the standardized skill assessment to convert claimed profile skills into verified recruiter-visible credentials.",
            "timeline": "Next 3 Days"
        })

        return moves

career_engine = CareerEngine()
