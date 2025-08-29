export default function ActivityList({ activities, onSelect, selectedActivity, onDelete }) {
  if (activities.length === 0) {
    return (
      <div className="bg-gray-800/80 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Your Goals</h2>
        <p className="text-gray-300">No goals created yet. Create your first SMART goal!</p>
      </div>
    );
  }

  function handleNotifyBuddy(activity) {
    fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: activity.buddy_email,
        goal: activity.name // or any goal details you want to send
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Notification sent!');
      } else {
        alert('Failed to send notification.');
      }
    });
  }

  return (
    <div className="bg-gray-800/80 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Your Goals</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 rounded-lg transition-all ${
              selectedActivity?.id === activity.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-100'
            }`}
          >
            <div className="flex justify-between items-start">
              <div
                className="flex-1 cursor-pointer"
                onClick={() => onSelect(activity)}
              >
                <h3 className="font-semibold text-lg">{activity.name}</h3>
                {activity.description && (
                  <p className="text-sm opacity-80 mt-1">{activity.description}</p>
                )}
                <div className="mt-2 text-xs opacity-70">
                  <div>Target: {activity.measurable}</div>
                  <div>Due: {new Date(activity.timebound).toLocaleDateString()}</div>
                  {activity.buddy_email && (
                    <div>Buddy: {activity.buddy_email}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                {activity.completed && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    ✓ Completed
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(activity.id);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-colors"
                  title="Delete Goal"
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotifyBuddy(activity);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded transition-colors"
                  title="Notify Buddy"
                >
                  🔔 Notify Buddy
                </button>
                <span className="text-xs opacity-60">
                  Created: {new Date(activity.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
