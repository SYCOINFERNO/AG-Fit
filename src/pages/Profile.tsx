import React, { useState } from 'react';
import { useHealthStore } from '../lib/store';
import { Check } from 'lucide-react';

export default function Metrics() {
  const { metrics, updateMetrics } = useHealthStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save the data
    localStorage.setItem('healthMetrics', JSON.stringify(metrics));
    
    // Show success message
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Update Your Health Metrics</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              value={metrics.weight || ''}
              onChange={(e) => updateMetrics({ weight: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              value={metrics.height || ''}
              onChange={(e) => updateMetrics({ height: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Body Fat %</label>
            <input
              type="number"
              value={metrics.bodyFat || ''}
              onChange={(e) => updateMetrics({ bodyFat: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={metrics.age || ''}
              onChange={(e) => updateMetrics({ age: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={metrics.gender}
              onChange={(e) => updateMetrics({ gender: e.target.value as 'male' | 'female' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <select
              value={metrics.activityLevel}
              onChange={(e) => updateMetrics({ activityLevel: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Activity</option>
              <option value="moderate">Moderate Activity</option>
              <option value="active">Active</option>
              <option value="very-active">Very Active</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Goal</label>
            <select
              value={metrics.goalType}
              onChange={(e) => updateMetrics({ goalType: e.target.value as 'lose' | 'maintain' | 'gain' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          >
            Save Changes
          </button>
          
          {showSuccess && (
            <div className="flex items-center text-green-600">
              <Check className="h-5 w-5 mr-1" />
              <span>Saved successfully!</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}