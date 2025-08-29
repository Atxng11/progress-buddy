const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Activities API
  async getActivities() {
    return this.request('/activities');
  }

  async getActivity(id) {
    return this.request(`/activities/${id}`);
  }

  async createActivity(activityData) {
    return this.request('/activities', {
      method: 'POST',
      body: activityData,
    });
  }

  async updateActivity(id, activityData) {
    return this.request(`/activities/${id}`, {
      method: 'PUT',
      body: activityData,
    });
  }

  async deleteActivity(id) {
    return this.request(`/activities/${id}`, {
      method: 'DELETE',
    });
  }

  async completeActivity(id) {
    return this.request(`/activities/${id}/complete`, {
      method: 'PATCH',
    });
  }

  // Logs API
  async getLogs(activityId = null) {
    const queryParam = activityId ? `?activity_id=${activityId}` : '';
    return this.request(`/logs${queryParam}`);
  }

  async getLog(id) {
    return this.request(`/logs/${id}`);
  }

  async createLog(logData) {
    return this.request('/logs', {
      method: 'POST',
      body: logData,
    });
  }

  async updateLog(id, logData) {
    return this.request(`/logs/${id}`, {
      method: 'PUT',
      body: logData,
    });
  }

  async deleteLog(id) {
    return this.request(`/logs/${id}`, {
      method: 'DELETE',
    });
  }

  async getLogStats(activityId) {
    return this.request(`/logs/activity/${activityId}/stats`);
  }

  // Notifications API
  async sendAchievementNotification(activityId, message) {
    return this.request('/notifications/achievement', {
      method: 'POST',
      body: { activity_id: activityId, message },
    });
  }

  async sendGoalCompletedNotification(activityId) {
    return this.request('/notifications/goal-completed', {
      method: 'POST',
      body: { activity_id: activityId },
    });
  }

  async sendWeeklySummary(activityId) {
    return this.request('/notifications/weekly-summary', {
      method: 'POST',
      body: { activity_id: activityId },
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();
