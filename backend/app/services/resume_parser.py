import re
import io
from typing import List, Dict, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None

try:
    import docx
except ImportError:
    docx = None

SKILL_TAXONOMY = {
    "Programming Languages": [
        "python", "java", "c++", "c", "c#", "javascript", "typescript", "go", "golang", 
        "rust", "ruby", "php", "swift", "kotlin", "scala", "r", "dart", "sql", "bash", "shell"
    ],
    "Frameworks & Libraries": [
        "react", "angular", "vue", "next.js", "node.js", "express", "django", "flask", 
        "fastapi", "spring boot", "asp.net", "tailwind css", "bootstrap", "pandas", 
        "numpy", "scikit-learn", "tensorflow", "pytorch", "keras", "opencv", "graphql"
    ],
    "Databases & Storage": [
        "postgresql", "mysql", "mongodb", "redis", "sqlite", "oracle", "cassandra", 
        "elasticsearch", "dynamodb", "firebase", "supabase"
    ],
    "Cloud & DevOps": [
        "aws", "azure", "gcp", "docker", "kubernetes", "git", "github", "gitlab", 
        "ci/cd", "terraform", "ansible", "linux", "jenkins", "nginx", "prometheus", "grafana"
    ],
    "Core Computer Science": [
        "data structures", "algorithms", "dsa", "object oriented programming", "oops", 
        "database management", "dbms", "computer networks", "operating systems", "system design"
    ],
    "Soft Skills": [
        "problem solving", "communication", "leadership", "teamwork", "critical thinking", 
        "time management", "agile", "scrum", "collaboration", "adaptability", "presentation"
    ]
}

ROLE_SKILL_PROFILES = {
    "Software Developer": [
        "python", "java", "c++", "data structures", "algorithms", "git", "sql", "linux", "oops", "system design"
    ],
    "Full Stack Developer": [
        "javascript", "typescript", "react", "node.js", "express", "sql", "mongodb", "html", "css", "docker", "git", "tailwind css", "rest api"
    ],
    "Data Scientist": [
        "python", "pandas", "numpy", "scikit-learn", "sql", "machine learning", "data visualization", "statistics", "tensorflow", "pytorch"
    ],
    "Machine Learning Engineer": [
        "python", "machine learning", "deep learning", "pytorch", "tensorflow", "scikit-learn", "docker", "fastapi", "mlops", "data structures"
    ],
    "Cloud & DevOps Engineer": [
        "aws", "docker", "kubernetes", "linux", "ci/cd", "terraform", "bash", "git", "azure", "networking", "python"
    ],
    "Cybersecurity Analyst": [
        "networking", "linux", "python", "wireshark", "cryptography", "penetration testing", "siem", "firewalls", "vulnerability assessment"
    ],
    "Data Analyst": [
        "sql", "python", "excel", "power bi", "tableau", "pandas", "statistics", "data cleaning", "reporting", "communication"
    ]
}

SECTION_HEADERS = {
    "Education": [r"\beducation\b", r"\bacademics?\b", r"\bqualification\b", r"\bdegrees?\b"],
    "Technical Skills": [r"\btechnical skills\b", r"\bskills?\b", r"\btechnologies\b", r"\btech stack\b", r"\bcompetencies\b"],
    "Experience": [r"\bexperience\b", r"\bwork experience\b", r"\binternships?\b", r"\bemployment\b"],
    "Projects": [r"\bprojects?\b", r"\bacademic projects\b", r"\bkey projects\b", r"\bpersonal projects\b"],
    "Certifications": [r"\bcertifications?\b", r"\blicenses?\b", r"\bcertificates?\b"],
    "Achievements": [r"\bachievements?\b", r"\bawards?\b", r"\bhackathons?\b", r"\bhonors?\b"]
}

WEAK_ACTION_VERBS = [
    "worked on", "helped", "assisted", "responsible for", "handled", "participated in", "learned"
]

STRONG_ACTION_VERBS = [
    "architected", "engineered", "spearheaded", "optimized", "implemented", "deployed", "designed", "automated", "built", "accelerated"
]

class ResumeParser:
    @staticmethod
    def extract_text_from_bytes(file_bytes: bytes, filename: str) -> str:
        name_lower = filename.lower()
        if name_lower.endswith(".pdf"):
            if not PdfReader:
                return "PDF parser not available. Upload TXT."
            try:
                reader = PdfReader(io.BytesIO(file_bytes))
                text_pages = [page.extract_text() or "" for page in reader.pages]
                return "\n".join(text_pages)
            except Exception as e:
                return f"Error parsing PDF: {str(e)}"

        elif name_lower.endswith(".docx"):
            if not docx:
                return "DOCX parser not available. Upload TXT."
            try:
                doc = docx.Document(io.BytesIO(file_bytes))
                return "\n".join([p.text for p in doc.paragraphs if p.text])
            except Exception as e:
                return f"Error parsing DOCX: {str(e)}"

        else: # TXT fallback
            try:
                return file_bytes.decode("utf-8", errors="ignore")
            except Exception as e:
                return str(e)

    @classmethod
    def analyze_resume(cls, text: str, target_role: str = "Software Developer") -> dict:
        text_clean = re.sub(r'\s+', ' ', text).strip()
        text_lower = text_clean.lower()

        # 1. Detect Sections
        detected_sections = {}
        section_completeness = {}
        for section, patterns in SECTION_HEADERS.items():
            found = any(re.search(pat, text_lower) for pat in patterns)
            detected_sections[section] = found
            section_completeness[section] = 100 if found else 0

        # 2. Extract Skills using Taxonomy
        extracted_skills = []
        skills_by_category = {}
        for category, skills in SKILL_TAXONOMY.items():
            category_matches = []
            for skill in skills:
                # Word boundary match
                pattern = r'(?<!\w)' + re.escape(skill) + r'(?!\w)'
                if re.search(pattern, text_lower):
                    extracted_skills.append(skill.title() if len(skill) > 3 else skill.upper())
                    category_matches.append(skill)
            if category_matches:
                skills_by_category[category] = category_matches

        # Deduplicate skills
        extracted_skills = sorted(list(set(extracted_skills)))

        # 3. Target Role Match & Missing Keywords (TF-IDF + Cosine Similarity)
        role_skills = ROLE_SKILL_PROFILES.get(target_role, ROLE_SKILL_PROFILES["Software Developer"])
        role_skills_str = " ".join(role_skills)
        
        # TF-IDF Cosine Similarity
        try:
            tfidf = TfidfVectorizer().fit([role_skills_str, text_lower])
            vecs = tfidf.transform([role_skills_str, text_lower])
            cos_sim = float(cosine_similarity(vecs[0:1], vecs[1:2])[0][0])
            role_match_pct = round(min(100.0, max(20.0, cos_sim * 100 * 1.5)), 1)
        except Exception:
            role_match_pct = 65.0

        matching_skills = [s for s in role_skills if re.search(r'(?<!\w)' + re.escape(s) + r'(?!\w)', text_lower)]
        missing_skills = [s.title() for s in role_skills if s not in matching_skills]

        # 4. Weak wording analysis
        weak_verbs_found = [verb for verb in WEAK_ACTION_VERBS if verb in text_lower]
        has_metrics = bool(re.search(r'\d+%', text_lower) or re.search(r'\$\d+', text_lower) or re.search(r'\d+x\b', text_lower) or re.search(r'reduced by \d+', text_lower))

        # 5. Calculate Explainable Resume Score (0 to 100)
        score = 30
        if detected_sections.get("Education"): score += 10
        if detected_sections.get("Technical Skills"): score += 15
        if detected_sections.get("Projects"): score += 20
        if detected_sections.get("Experience"): score += 15
        if detected_sections.get("Certifications"): score += 5
        if detected_sections.get("Achievements"): score += 5
        if len(extracted_skills) >= 8: score += 10
        if has_metrics: score += 5
        if len(weak_verbs_found) == 0: score += 5
        score = min(98, score)

        # 6. Actionable Improvements & Suggestions
        improvements = []
        if not detected_sections.get("Projects"):
            improvements.append("Add a dedicated 'Projects' section highlighting at least 2 full-stack or domain-specific apps.")
        if not detected_sections.get("Certifications"):
            improvements.append("Include verified industry certifications (e.g., AWS, Azure, Google Cloud, Meta) to substantiate technical claims.")
        if weak_verbs_found:
            improvements.append(f"Replace passive phrases like '{', '.join(weak_verbs_found[:3])}' with high-impact action verbs (e.g., 'Architected', 'Engineered', 'Optimized').")
        if not has_metrics:
            improvements.append("Quantify your project outcomes with metrics (e.g., 'Improved API latency by 35%' or 'Handled 5,000+ daily requests').")
        if missing_skills:
            improvements.append(f"To align better with '{target_role}', consider incorporating missing core skills: {', '.join(missing_skills[:4])}.")

        if not improvements:
            improvements.append("Excellent resume structure! Keep project descriptions updated with your most recent tech stack.")

        summary = (
            f"Resume analyzed against the '{target_role}' benchmark. Detected {len(extracted_skills)} technical skills "
            f"across {len(skills_by_category)} categories. Overall structural completeness is {score}/100 with a "
            f"{role_match_pct}% semantic role alignment."
        )

        return {
            "score": score,
            "role_match_percentage": role_match_pct,
            "extracted_skills": extracted_skills,
            "skills_by_category": skills_by_category,
            "detected_sections": detected_sections,
            "section_completeness": section_completeness,
            "matching_role_skills": [s.title() for s in matching_skills],
            "missing_role_skills": missing_skills,
            "weak_verbs_detected": weak_verbs_found,
            "has_quantifiable_metrics": has_metrics,
            "suggested_improvements": improvements,
            "summary": summary
        }

    @classmethod
    def match_job_description(cls, job_desc: str, student_skills: List[str], target_role: str = "") -> dict:
        desc_lower = job_desc.lower()
        extracted_jd_skills = []

        for category, skills in SKILL_TAXONOMY.items():
            for skill in skills:
                if re.search(r'(?<!\w)' + re.escape(skill) + r'(?!\w)', desc_lower):
                    extracted_jd_skills.append(skill)

        extracted_jd_skills = list(set(extracted_jd_skills))
        student_skills_clean = [s.lower().strip() for s in student_skills]

        matching = [s.title() for s in extracted_jd_skills if s in student_skills_clean]
        missing = [s.title() for s in extracted_jd_skills if s not in student_skills_clean]

        if extracted_jd_skills:
            match_pct = round((len(matching) / len(extracted_jd_skills)) * 100, 1)
        else:
            match_pct = 70.0

        improvements = []
        if missing:
            improvements.append(f"Add evidence or portfolio projects demonstrating proficiency in: {', '.join(missing[:4])}.")
        improvements.append("Tailor your resume summary statement to mirror the specific architectural keywords highlighted in the job post.")
        improvements.append("Ensure your GitHub repository has clean README documentation for repositories matching these technologies.")

        verdict = (
            "Highly Competitive Match" if match_pct >= 75 else
            "Strong Candidate with Minor Skill Gaps" if match_pct >= 50 else
            "Moderate Match: Preparation Recommended Before Applying"
        )

        return {
            "match_percentage": match_pct,
            "matching_skills": matching,
            "missing_skills": missing,
            "role_keywords_found": [s.title() for s in extracted_jd_skills[:8]],
            "recommended_improvements": improvements,
            "verdict": verdict
        }

resume_parser = ResumeParser()
