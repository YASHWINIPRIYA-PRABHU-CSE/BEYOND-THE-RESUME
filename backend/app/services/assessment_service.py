from typing import List, Dict, Any

ASSESSMENT_CATEGORIES = [
    {
        "id": 1,
        "category": "Programming & Core CS",
        "title": "Core Programming & OOP Fundamentals",
        "description": "Evaluates understanding of control structures, OOP principles, memory allocation, and debugging.",
        "time_limit_minutes": 10,
        "questions": [
            {
                "id": 101,
                "question_text": "What is the primary difference between abstraction and encapsulation in Object-Oriented Programming?",
                "option_a": "Abstraction hides complexity by showing only essentials; Encapsulation binds data and code together hiding internal representation.",
                "option_b": "Abstraction is achieved only by interfaces; Encapsulation is achieved only by abstract classes.",
                "option_c": "Encapsulation hides complexity; Abstraction binds data and code.",
                "option_d": "There is no functional difference; they are interchangeable terms.",
                "correct_option": "A",
                "explanation": "Abstraction focuses on 'what' the object does and exposes only essential features, whereas Encapsulation bundles data and methods while restricting direct access.",
                "difficulty": "Easy"
            },
            {
                "id": 102,
                "question_text": "In Python, which built-in data structure provides O(1) average-time complexity for key lookups?",
                "option_a": "List",
                "option_b": "Tuple",
                "option_c": "Dictionary (Dict)",
                "option_d": "Deque",
                "correct_option": "C",
                "explanation": "Python dictionaries are implemented via hash tables, providing O(1) average time complexity for lookups, insertions, and deletions.",
                "difficulty": "Easy"
            },
            {
                "id": 103,
                "question_text": "What happens when a child thread attempts to access a variable modified by another thread without synchronization primitives?",
                "option_a": "The compiler will prevent compilation automatically.",
                "option_b": "A race condition occurs, potentially causing inconsistent data read/writes.",
                "option_c": "The OS automatically puts the thread in sleep state until the write finishes.",
                "option_d": "The memory address is automatically duplicated.",
                "correct_option": "B",
                "explanation": "Without locks or mutex synchronization, concurrent access causes race conditions and undefined behavior.",
                "difficulty": "Medium"
            }
        ]
    },
    {
        "id": 2,
        "category": "Data Structures & Algorithms",
        "title": "DSA & Computational Complexity",
        "description": "Tests time/space complexity analysis, tree traversals, dynamic programming, and graph algorithms.",
        "time_limit_minutes": 12,
        "questions": [
            {
                "id": 201,
                "question_text": "What is the worst-case time complexity of QuickSort when a naive pivot selection (e.g. always first element) is used on an already sorted array?",
                "option_a": "O(N log N)",
                "option_b": "O(N)",
                "option_c": "O(N^2)",
                "option_d": "O(log N)",
                "correct_option": "C",
                "explanation": "On already sorted inputs with naive pivot selection, QuickSort degenerates to unbalanced partitions of size 1 and N-1, resulting in O(N^2) complexity.",
                "difficulty": "Medium"
            },
            {
                "id": 202,
                "question_text": "Which algorithm is optimal for finding the single-source shortest path in a graph with non-negative edge weights?",
                "option_a": "Bellman-Ford Algorithm",
                "option_b": "Dijkstra's Algorithm",
                "option_c": "Floyd-Warshall Algorithm",
                "option_d": "Depth First Search (DFS)",
                "correct_option": "B",
                "explanation": "Dijkstra's algorithm efficiently computes single-source shortest paths in O((V + E) log V) time when edge weights are strictly non-negative.",
                "difficulty": "Medium"
            },
            {
                "id": 203,
                "question_text": "Which property defines an optimal substructure in Dynamic Programming?",
                "option_a": "Subproblems can be evaluated independently without any memoization.",
                "option_b": "An optimal solution to the problem contains optimal solutions to its subproblems.",
                "option_c": "The problem can always be solved greedily without backtracking.",
                "option_d": "The graph contains no directed cycles.",
                "correct_option": "B",
                "explanation": "Optimal substructure means the globally optimal solution can be constructed from optimal solutions of its constituent subproblems.",
                "difficulty": "Hard"
            }
        ]
    },
    {
        "id": 3,
        "category": "Database & SQL",
        "title": "Relational Databases & SQL Optimization",
        "description": "Covers indexing strategies, ACID guarantees, transaction isolation levels, and SQL joins.",
        "time_limit_minutes": 10,
        "questions": [
            {
                "id": 301,
                "question_text": "Why does adding a B-Tree index on a frequently queried column accelerate SELECT queries but potentially slow down INSERT/UPDATE operations?",
                "option_a": "Indexes consume all CPU cache during writes.",
                "option_b": "The database must rebalance and update the B-Tree index structure alongside inserting the raw table row.",
                "option_c": "Indexes lock the entire database table during write transactions.",
                "option_d": "Indexes change the column data type to binary.",
                "correct_option": "B",
                "explanation": "Every write operation requires modifying both the table heap/clustered index and all associated secondary B-Tree structures, incurring write overhead.",
                "difficulty": "Medium"
            },
            {
                "id": 302,
                "question_text": "Which SQL clause filters grouped rows after an aggregation function has been computed?",
                "option_a": "WHERE",
                "option_b": "HAVING",
                "option_c": "ORDER BY",
                "option_d": "FILTER",
                "correct_option": "B",
                "explanation": "WHERE filters rows before aggregation; HAVING filters aggregated groups created by GROUP BY.",
                "difficulty": "Easy"
            }
        ]
    },
    {
        "id": 4,
        "category": "Machine Learning & AI",
        "title": "Machine Learning & Model Evaluation",
        "description": "Tests concepts across supervised learning, bias-variance tradeoff, regularization, and classification metrics.",
        "time_limit_minutes": 10,
        "questions": [
            {
                "id": 401,
                "question_text": "When evaluating a model on an imbalanced dataset where detecting rare positive cases is critical, which metric is preferable over simple Accuracy?",
                "option_a": "Mean Absolute Error",
                "option_b": "F1-Score / PR-AUC",
                "option_c": "R-Squared",
                "option_d": "Silhouette Score",
                "correct_option": "B",
                "explanation": "Accuracy can be deceptively high by predicting only the majority class. Precision-Recall AUC or F1-Score balances false positives and false negatives.",
                "difficulty": "Medium"
            },
            {
                "id": 402,
                "question_text": "What type of regularization adds a penalty equal to the absolute value of the magnitude of coefficients (L1 penalty), promoting feature sparsity?",
                "option_a": "Ridge Regularization",
                "option_b": "Lasso Regularization",
                "option_c": "Dropout Regularization",
                "option_d": "Batch Normalization",
                "correct_option": "B",
                "explanation": "Lasso (L1) regularization drives less important feature weights strictly to zero, performing implicit feature selection.",
                "difficulty": "Medium"
            }
        ]
    }
]

class AssessmentService:
    @staticmethod
    def list_assessments() -> List[Dict[str, Any]]:
        return [
            {
                "id": a["id"],
                "category": a["category"],
                "title": a["title"],
                "description": a["description"],
                "time_limit_minutes": a["time_limit_minutes"],
                "total_questions": len(a["questions"])
            }
            for a in ASSESSMENT_CATEGORIES
        ]

    @staticmethod
    def get_assessment(assessment_id: int) -> Dict[str, Any]:
        matched = next((a for a in ASSESSMENT_CATEGORIES if a["id"] == assessment_id), ASSESSMENT_CATEGORIES[0])
        # Return questions without exposing correct options beforehand
        clean_questions = [
            {
                "id": q["id"],
                "question_text": q["question_text"],
                "option_a": q["option_a"],
                "option_b": q["option_b"],
                "option_c": q["option_c"],
                "option_d": q["option_d"],
                "difficulty": q["difficulty"]
            }
            for q in matched["questions"]
        ]
        return {
            "id": matched["id"],
            "category": matched["category"],
            "title": matched["title"],
            "description": matched["description"],
            "time_limit_minutes": matched["time_limit_minutes"],
            "total_questions": len(matched["questions"]),
            "questions": clean_questions
        }

    @staticmethod
    def grade_assessment(assessment_id: int, user_answers: Dict[int, str], claimed_skills: List[str] = None) -> Dict[str, Any]:
        matched = next((a for a in ASSESSMENT_CATEGORIES if a["id"] == assessment_id), ASSESSMENT_CATEGORIES[0])
        
        correct_count = 0
        total = len(matched["questions"])
        breakdown = []

        for q in matched["questions"]:
            q_id = q["id"]
            user_opt = user_answers.get(q_id, "").upper().strip()
            is_correct = (user_opt == q["correct_option"])
            if is_correct:
                correct_count += 1
            breakdown.append({
                "question_id": q_id,
                "question_text": q["question_text"],
                "user_selected": user_opt,
                "correct_option": q["correct_option"],
                "is_correct": is_correct,
                "explanation": q["explanation"]
            })

        percentage = round((correct_count / total) * 100, 1)

        # Skill Confidence vs Skill Evidence comparison
        evidence_level = "Verified Strong" if percentage >= 80 else "Developing" if percentage >= 50 else "Foundational Support Needed"
        
        confidence_vs_evidence = {
            "assessment_category": matched["category"],
            "claimed_skills_present": True,
            "demonstrated_score": f"{percentage}%",
            "evidence_status": evidence_level,
            "insight": (
                f"Your assessment performance ({percentage}%) provides tangible evidence to recruiters of your competency in {matched['category']}."
                if percentage >= 70 else
                f"While you list skills in this domain on your profile, your quiz score ({percentage}%) indicates opportunities to review underlying theoretical principles."
            )
        }

        return {
            "score": correct_count,
            "total": total,
            "percentage": percentage,
            "category": matched["category"],
            "skill_confidence_vs_evidence": confidence_vs_evidence,
            "detailed_feedback": breakdown
        }

assessment_service = AssessmentService()
