import { useState, useEffect } from 'react'
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'
import LogForm from './components/LogForm'
import LogList from './components/LogList'
import ApiService from './services/api.js'

import './App.css'

function App() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load activities on component mount
  useEffect(() => {
    loadActivities();
  }, []);

  // Load logs when an activity is selected
  useEffect(() => {
    if (selectedActivity) {
      loadLogs(selectedActivity.id);
    } else {
      setLogs([]);
    }
  }, [selectedActivity]);

  const loadActivities = async () => {
    try {
      setIsLoading(true);
      const activitiesData = await ApiService.getActivities();
      setActivities(activitiesData);
      setError(null);
    } catch (error) {
      console.error('Failed to load activities:', error);
      setError('Failed to load activities. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadLogs = async (activityId) => {
    try {
      const logsData = await ApiService.getLogs(activityId);
      setLogs(logsData);
    } catch (error) {
      console.error('Failed to load logs:', error);
      setError('Failed to load logs.');
    }
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
  };

  const handleSendNotification = async (message = '') => {
    if (!selectedActivity || !selectedActivity.buddy_email) {
      alert('No accountability partner email set for this activity.');
      return;
    }

    try {
      await ApiService.sendAchievementNotification(selectedActivity.id, message);
      alert('Notification sent to your accountability partner!');
    } catch (error) {
      console.error('Failed to send notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!confirm('Are you sure you want to delete this goal? This action cannot be undone.')) {
      return;
    }

    try {
      await ApiService.deleteActivity(activityId);
      
      // Remove from local state
      setActivities(prev => prev.filter(activity => activity.id !== activityId));
      
      // Clear selection if deleted activity was selected
      if (selectedActivity && selectedActivity.id === activityId) {
        setSelectedActivity(null);
        setLogs([]);
      }
      
      alert('Goal deleted successfully!');
    } catch (error) {
      console.error('Failed to delete activity:', error);
      alert('Failed to delete goal. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading Progress Buddy...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-400 mb-4">Error</div>
          <div className="text-gray-300 mb-4">{error}</div>
          <button
            onClick={loadActivities}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">Progress Buddy</h1>
          <p className="text-gray-300">Track your goals, log your progress, stay accountable</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ActivityForm
              setActivities={setActivities}
              onActivityCreated={loadActivities}
            />
          </div>
          
          <div className="space-y-6">
            <ActivityList
              activities={activities}
              onSelect={handleActivitySelect}
              selectedActivity={selectedActivity}
              onDelete={handleDeleteActivity}
            />
            
            {selectedActivity && (
              <div className="bg-gray-800/80 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-400">
                    {selectedActivity.name}
                  </h2>
                  {selectedActivity.buddy_email && (
                    <button
                      onClick={() => handleSendNotification()}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Notify Buddy
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LogForm
                    selectedActivity={selectedActivity}
                    setLogs={setLogs}
                  />
                  <LogList
                    logs={logs}
                    activity={selectedActivity}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
