import { useState } from 'react';
import ApiService from '../services/api.js';

export default function ActivityForm({ setActivities, onActivityCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [specific, setSpecific] = useState('');
  const [measurable, setMeasurable] = useState('');
  const [achievable, setAchievable] = useState('');
  const [relevant, setRelevant] = useState('');
  const [timebound, setTimebound] = useState('');
  const [buddyEmail, setBuddyEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newActivity = await ApiService.createActivity({
        name,
        description,
        specific,
        measurable,
        achievable,
        relevant,
        timebound,
        buddy_email: buddyEmail
      });

      // Update the activities list
      setActivities(prev => [...prev, newActivity]);

      // Call callback if provided
      if (onActivityCreated) {
        onActivityCreated(newActivity);
      }

      // Reset form
      setName('');
      setDescription('');
      setSpecific('');
      setMeasurable('');
      setAchievable('');
      setRelevant('');
      setTimebound('');
      setBuddyEmail('');
    } catch (error) {
      console.error('Failed to create activity:', error);
      alert('Failed to create activity. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

return (
    <form
        onSubmit={handleSubmit}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center py-10"
    >
        <h2 className="text-4xl font-extrabold mb-8 tracking-tight text-blue-400 drop-shadow-lg">
            Add New SMART Goal
        </h2>

        <div className="bg-gray-800/80 rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6">
            <div>
                <label className="block text-lg font-semibold mb-2">Goal Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your goal name"
                />
            </div>

            <div>
                <label className="block text-lg font-semibold mb-2">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe your goal"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    rows={2}
                />
            </div>

            <div>
                <label className="block text-lg font-semibold mb-2">Specific:</label>
                <input
                    type="text"
                    value={specific}
                    onChange={e => setSpecific(e.target.value)}
                    placeholder="What exactly do you want to accomplish?"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-lg font-semibold mb-2">Measurable:</label>
                <input
                    type="text"
                    value={measurable}
                    onChange={e => setMeasurable(e.target.value)}
                    placeholder="How will you track progress?"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-lg font-semibold mb-2">Achievable:</label>
                <input
                    type="text"
                    value={achievable}
                    onChange={e => setAchievable(e.target.value)}
                    placeholder="Is this realistic given your resources?"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-lg font-semibold mb-2">Relevant (Why this matters):</label>
                <input
                    type="text"
                    value={relevant}
                    onChange={e => setRelevant(e.target.value)}
                    placeholder="Why is this important to you?"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-lg font-semibold mb-2">Completion Date:</label>
                <input
                    type="date"
                    value={timebound}
                    onChange={e => setTimebound(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-lg font-semibold mb-2">Accountability Partner Email:</label>
                <input
                    type="email"
                    value={buddyEmail}
                    onChange={e => setBuddyEmail(e.target.value)}
                    placeholder="Enter a friend's email"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 transition-colors text-white font-bold px-4 py-3 rounded-xl shadow-lg mt-4"
            >
                {isLoading ? 'Creating Goal...' : 'Add Goal'}
            </button>
        </div>
    </form>
);
}