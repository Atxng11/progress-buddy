export default function LogList({ logs, activity }) {
  if (!activity) {
    return null;
  }

  // Filter logs for the current activity
  const filteredLogs = logs.filter(log => log.activity_id === activity.id);

  if (filteredLogs.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Progress Log</h3>
        <p className="text-gray-600">No progress logged yet. Start tracking your progress!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Progress Log ({filteredLogs.length} entries)
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredLogs.map((log) => (
          <div key={log.id} className="bg-white p-3 rounded border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">
              {new Date(log.created_at).toLocaleString()}
            </div>
            <div className="text-gray-800">{log.text}</div>
            {log.metrics && (
              <div className="text-xs text-gray-500 mt-1">
                Metrics: {typeof log.metrics === 'string' ? log.metrics : JSON.stringify(log.metrics)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
