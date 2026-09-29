"""
Beyond The Resume - Comprehensive Educational ML Syllabus Module
Provides interactive simulations, data, and conceptual foundations for Units 1 through 5.
"""

import numpy as np

class SyllabusExplorations:
    @staticmethod
    def get_unit1_regression_demo(degree: int = 1):
        np.random.seed(42)
        x = np.linspace(30, 95, 25)
        y_true = 3.5 + 0.08 * (x - 30) + 0.0018 * ((x - 30) ** 2)
        noise = np.random.normal(0, 0.4, len(x))
        y = np.round(y_true + noise, 2)

        coeffs = np.polyfit(x, y, deg=min(degree, 3))
        poly = np.poly1d(coeffs)
        y_pred = np.round(poly(x), 2)

        points = [{"coding_score": float(x_val), "actual_salary_lpa": float(y_val), "predicted_salary_lpa": float(p_val)} 
                  for x_val, y_val, p_val in zip(x, y, y_pred)]

        mse = float(np.mean((y - y_pred) ** 2))
        rmse = float(np.sqrt(mse))
        r2 = float(1.0 - (np.sum((y - y_pred) ** 2) / np.sum((y - np.mean(y)) ** 2)))

        return {
            "unit": "Unit 1: Introduction to Machine Learning & Regression",
            "degree": degree,
            "metrics": {"r2_score": round(r2, 4), "mse": round(mse, 4), "rmse": round(rmse, 4)},
            "points": points,
            "formula": str(poly),
            "explanation": (
                f"Degree {degree} Polynomial Regression. As degree increases, model capacity expands; "
                f"however, overly high degrees risk overfitting to sample variance."
            )
        }

    @staticmethod
    def get_unit3_activation_functions():
        z = np.linspace(-5.0, 5.0, 41)
        sigmoid = 1.0 / (1.0 + np.exp(-z))
        tanh = np.tanh(z)
        relu = np.maximum(0, z)
        leaky_relu = np.where(z > 0, z, 0.05 * z)

        data = [
            {
                "z": round(float(val), 2),
                "sigmoid": round(float(s), 4),
                "tanh": round(float(t), 4),
                "relu": round(float(r), 4),
                "leaky_relu": round(float(lr), 4)
            }
            for val, s, t, r, lr in zip(z, sigmoid, tanh, relu, leaky_relu)
        ]

        return {
            "unit": "Unit 3: Neural Networks & Deep Learning",
            "title": "Interactive Activation Functions Visualizer",
            "data": data,
            "descriptions": {
                "Sigmoid": "S-shaped curve [0, 1]. Historically used for binary probabilities; suffers from vanishing gradients at extreme values.",
                "Tanh": "Zero-centered S-curve [-1, 1]. Stronger gradients than Sigmoid for hidden layers.",
                "ReLU": "Rectified Linear Unit max(0, z). Default standard for deep networks due to non-saturating gradients and fast convergence.",
                "LeakyReLU": "max(alpha * z, z). Prevents 'dying ReLU' neurons by allowing a small gradient when z < 0."
            }
        }

    @staticmethod
    def get_unit5_gradient_descent_simulation(learning_rate: float = 0.1, iterations: int = 15):
        w = 8.5
        history = []

        for step in range(iterations):
            cost = (w - 3.5) ** 2 + 2.0
            grad = 2.0 * (w - 3.5)
            history.append({
                "step": step + 1,
                "weight": round(float(w), 3),
                "loss": round(float(cost), 4),
                "gradient": round(float(grad), 4)
            })
            w = w - learning_rate * grad

        return {
            "unit": "Unit 5: Optimization & Reinforcement Learning",
            "title": "Gradient Descent Optimization Simulator",
            "learning_rate": learning_rate,
            "iterations": iterations,
            "convergence_state": "Converged" if abs(w - 3.5) < 0.1 else "Diverging" if abs(w) > 50 else "In Progress",
            "optimal_weight": 3.5,
            "final_weight": round(float(w), 3),
            "trajectory": history
        }

    @staticmethod
    def get_unit5_qlearning_demo():
        q_table = [
            {"state": "Foundation", "Solve LeetCode": 4.5, "Build Full-Stack App": 6.8, "Do Internship": 2.1, "Take Assessment": 3.5},
            {"state": "Core Dev", "Solve LeetCode": 7.2, "Build Full-Stack App": 8.5, "Do Internship": 6.4, "Take Assessment": 5.0},
            {"state": "Project & DSA Sprint", "Solve LeetCode": 9.1, "Build Full-Stack App": 8.0, "Do Internship": 7.9, "Take Assessment": 7.5},
            {"state": "Interview Preparation", "Solve LeetCode": 8.8, "Build Full-Stack App": 6.0, "Do Internship": 5.2, "Take Assessment": 9.4}
        ]

        return {
            "unit": "Unit 5: Reinforcement Learning (Q-Learning) Playground",
            "description": "Simulates an agent learning optimal career actions through rewards (placements, skill boosts) and penalty transitions.",
            "q_table": q_table,
            "discount_factor_gamma": 0.95,
            "exploration_epsilon": 0.10,
            "insight": "Highest Q-value actions dynamically recommend the optimal next learning step depending on current readiness stage."
        }

syllabus_explorations = SyllabusExplorations()
