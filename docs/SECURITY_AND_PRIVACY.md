# Security, Authorization & Privacy Governance

## 1. Authentication & Cryptographic Standards
- **Password Protection**: Passwords are never stored in plaintext. They are salted and hashed using direct **Bcrypt** hashing with computational rounds sufficient to defeat dictionary and rainbow-table attacks.
- **Session Tokens**: Implements state-less **JSON Web Tokens (JWT)** signed via HMAC-SHA256 (`HS256`) containing standardized user claims (`sub`, `role`, and expiration `exp`).
- **Token Invalidation**: Expired tokens return `401 Unauthorized` with `WWW-Authenticate: Bearer` challenge headers.

---

## 2. Role-Based Access Control (RBAC)
Endpoints enforce declarative role verification:
- **Student**: Granted read/write access strictly to their own profile, resumes, roadmaps, and mock interview attempts.
- **Recruiter**: Permitted access only to anonymized candidate pools; cannot modify candidate records.
- **Institution**: Permitted access strictly to aggregated cohort metrics and anonymized at-risk identifier lists.
- **Admin**: Granted system health telemetry and model metric oversight.

---

## 3. Input Sanitization & File Upload Hardening
- **Strict File Whitelisting**: The resume upload pipeline restricts accepted MIME types to `.pdf`, `.docx`, and `.txt`. Executable, shell script, or macro-enabled files are rejected before buffer read.
- **Memory Buffer Bounds**: Maximum payload size is enforced at **10MB** to prevent denial-of-service memory exhaustion.
- **Safe Parsing Exception Trapping**: Document extractors (`pypdf`, `python-docx`) are wrapped in isolated try-except blocks ensuring malformed binary streams fail safely with structured HTTP 400 errors.

---

## 4. Candidate Privacy & Data Minimization
- **PII Scrubbing in Talent Discovery**: Recruiter views obfuscate candidate names, phone numbers, and physical residential addresses, replacing them with anonymous alphanumeric hashes (e.g. `Talent-BTR-10492`).
- **Reciprocal Contact Consent**: Recruiter inquiries initiate a connection request; personal contact details are withheld until the candidate authorizes mutual engagement.
