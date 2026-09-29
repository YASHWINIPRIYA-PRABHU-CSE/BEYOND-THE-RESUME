const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('btr_token');
  const headers = {
    ...(options.headers || {}),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle FormData vs JSON
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      // Auto-fallback for demo without disrupting user
      console.warn("API 401 Unauthorized for endpoint", endpoint);
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const authApi = {
  login: (email, password) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  getMe: () => apiRequest('/auth/me'),
};

export const profileApi = {
  get: () => apiRequest('/profile'),
  update: (data) => apiRequest('/profile', {
    method: 'PUT',
    body: JSON.stringify(data)
  })
};

export const predictionsApi = {
  getOverview: () => apiRequest('/predictions/overview'),
  predictPlacement: (params) => apiRequest('/predictions/placement', {
    method: 'POST',
    body: JSON.stringify(params)
  }),
  predictSalary: (params) => apiRequest('/predictions/salary', {
    method: 'POST',
    body: JSON.stringify(params)
  }),
  getCluster: () => apiRequest('/predictions/cluster')
};

export const resumeApi = {
  upload: (formData) => apiRequest('/resume/upload', {
    method: 'POST',
    body: formData
  }),
  getLatest: () => apiRequest('/resume/latest'),
  matchJd: (data) => apiRequest('/resume/match-jd', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export const careerApi = {
  getRecommendations: () => apiRequest('/career/recommendations'),
  getSkillGap: (targetRole) => apiRequest(`/career/skill-gap?target_role=${encodeURIComponent(targetRole)}`),
  getNextThreeMoves: () => apiRequest('/career/next-three-moves'),
  getRoadmap: () => apiRequest('/career/roadmap'),
  toggleRoadmapItem: (itemId) => apiRequest(`/career/roadmap/toggle/${itemId}`, { method: 'POST' })
};

export const assessmentsApi = {
  list: () => apiRequest('/assessments'),
  get: (id) => apiRequest(`/assessments/${id}`),
  submit: (data) => apiRequest('/assessments/submit', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export const interviewApi = {
  getQuestions: (role) => apiRequest(`/interview/questions?role=${encodeURIComponent(role)}`),
  evaluate: (data) => apiRequest('/interview/evaluate', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export const recruiterApi = {
  search: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/recruiter/candidates?${query}`);
  },
  compare: (candidateIds) => apiRequest('/recruiter/compare', {
    method: 'POST',
    body: JSON.stringify({ candidate_ids: candidateIds })
  })
};

export const institutionApi = {
  getAnalytics: () => apiRequest('/institution/analytics')
};

export const mlInsightsApi = {
  getMetrics: () => apiRequest('/ml-insights/metrics'),
  getUnit1Regression: (degree) => apiRequest(`/ml-insights/syllabus/unit1-regression?degree=${degree}`),
  getUnit3Activation: () => apiRequest('/ml-insights/syllabus/unit3-activation'),
  getUnit5GradientDescent: (lr, iters) => apiRequest(`/ml-insights/syllabus/unit5-gradient-descent?learning_rate=${lr}&iterations=${iters}`),
  getUnit5QLearning: () => apiRequest('/ml-insights/syllabus/unit5-qlearning'),
  getResponsibleAI: () => apiRequest('/ml-insights/responsible-ai')
};
