import { useState } from 'react';
import ApiService from '../services/api.js';

export default function LogForm({ selectedActivity, setLogs }) {
  const [logEntry, setLogEntry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logEntry.trim() || !selectedActivity) return;

    setIsLoading(true);
    try {
      const newLog = await ApiService.createLog({
        activity_id: selectedActivity.id,
        text: logEntry.trim(),
      });

      setLogs(prev => [...prev, newLog]);
      setLogEntry('');
    } catch (error) {
      console.error('Failed to create log:', error);
      alert('Failed to save log entry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Log Progress for {selectedActivity?.name}</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          placeholder="What did you do? (e.g., '3 sets of 10 pushups', 'Solved 2 LeetCode problems')"
          value={logEntry}
          onChange={(e) => setLogEntry(e.target.value)}
          required
          disabled={isLoading}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !logEntry.trim()}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          {isLoading ? 'Saving...' : 'Add Log Entry'}
        </button>
      </form>
    </div>
  );
}