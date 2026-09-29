import os
import pandas as pd
from typing import List, Dict, Any, Optional

DATA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "data", "career_intelligence_25k.csv")

class RecruiterService:
    def __init__(self):
        self.df = None
        self._load_data()

    def _load_data(self):
        if os.path.exists(DATA_PATH):
            self.df = pd.read_csv(DATA_PATH)
        else:
            self.df = pd.DataFrame()

    def search_candidates(
        self,
        skill_query: Optional[str] = None,
        role: Optional[str] = None,
        min_readiness: int = 50,
        min_cgpa: float = 6.0,
        department: Optional[str] = None,
        limit: int = 25
    ) -> Dict[str, Any]:
        if self.df.empty:
            self._load_data()
        
        filtered = self.df.copy()
        filtered = filtered[filtered["cgpa"] >= min_cgpa]
        filtered = filtered[filtered["career_readiness_score"] >= min_readiness]

        if department and department != "All":
            filtered = filtered[filtered["department"] == department]

        if role and role != "All":
            filtered = filtered[filtered["preferred_role"] == role]

        # Anonymize candidate ID and map skills
        sample = filtered.head(limit)
        candidates = []

        skill_map_by_role = {
            "Full Stack Developer": ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
            "Software Developer": ["Java", "Python", "Data Structures", "System Design", "SQL"],
            "Data Scientist": ["Python", "Pandas", "Scikit-Learn", "Machine Learning", "SQL"],
            "Machine Learning Engineer": ["PyTorch", "TensorFlow", "FastAPI", "Docker", "Python"],
            "Cloud & DevOps Engineer": ["AWS", "Docker", "Kubernetes", "Linux", "Terraform"],
            "Cybersecurity Analyst": ["Network Security", "Linux", "Wireshark", "Python", "SIEM"],
            "Data Analyst": ["SQL", "Power BI", "Excel", "Python", "Tableau"]
        }

        for idx, row in sample.iterrows():
            cand_role = row["preferred_role"]
            cand_skills = skill_map_by_role.get(cand_role, ["Python", "SQL", "Git", "Problem Solving"])
            
            # Anonymized label
            anon_id = f"Talent-{row['student_id']}"
            readiness = int(row["career_readiness_score"])

            candidates.append({
                "candidate_id": anon_id,
                "department": row["department"],
                "cgpa": float(row["cgpa"]),
                "readiness_score": readiness,
                "coding_score": int(row["coding_score"]),
                "aptitude_score": int(row["aptitude_score"]),
                "communication_score": int(row["communication_score"]),
                "projects_count": int(row["projects_count"]),
                "internships_count": int(row["internships_count"]),
                "preferred_role": cand_role,
                "skills": cand_skills,
                "placement_probability": f"{int(min(98, readiness * 1.05))}%",
                "talent_tier": "Elite Ready" if readiness >= 80 else "Placement Ready" if readiness >= 65 else "Developing Talent"
            })

        return {
            "total_matched": len(filtered),
            "candidates": candidates,
            "analytics": {
                "avg_readiness": round(float(filtered["career_readiness_score"].mean()), 1) if not filtered.empty else 0,
                "avg_coding": round(float(filtered["coding_score"].mean()), 1) if not filtered.empty else 0,
                "elite_count": int((filtered["career_readiness_score"] >= 80).sum()) if not filtered.empty else 0
            }
        }

    def compare_candidates(self, candidate_ids: List[str]) -> List[Dict[str, Any]]:
        # Fetch candidate details
        results = []
        for c_id in candidate_ids[:3]:
            raw_id = c_id.replace("Talent-", "")
            match = self.df[self.df["student_id"] == raw_id]
            if not match.empty:
                row = match.iloc[0]
                results.append({
                    "candidate_id": c_id,
                    "department": row["department"],
                    "cgpa": float(row["cgpa"]),
                    "readiness_score": int(row["career_readiness_score"]),
                    "coding_score": int(row["coding_score"]),
                    "aptitude_score": int(row["aptitude_score"]),
                    "communication_score": int(row["communication_score"]),
                    "projects_count": int(row["projects_count"]),
                    "internships_count": int(row["internships_count"]),
                    "preferred_role": row["preferred_role"]
                })
        return results

recruiter_service = RecruiterService()
