import os

class Settings:
    PROJECT_NAME: str = "Beyond The Resume"
    TAGLINE: str = "Your resume shows where you are. Your potential shows where you can go."
    VERSION: str = "2.0.0"
    API_PREFIX: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "beyond-the-resume-super-secret-jwt-key-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./beyond_the_resume.db")
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "uploads")

settings = Settings()
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
