import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useHealthStore } from '../lib/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Profile() {
  const { user } = useUser();
  const metrics = useHealthStore((state) => state.metrics);

  // Mock data for the weight progress chart
  const data = [
    { date: '2025-01', weight: 97 },
    { date: '2025-02', weight: 94 },
    { date: '2025-03', weight: metrics.weight },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.imageUrl}
            alt={user?.fullName || 'Profile'}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.fullName}</h2>
            <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Weight Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold">Exercise Recommendation</h4>
            <p className="text-gray-600">Based on your goal to {metrics.goalType} weight, we recommend {metrics.goalType === 'lose' ? '45-60 minutes of cardio' : '30-45 minutes of strength training'} 4-5 times per week.</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold">Nutrition Tip</h4>
            <p className="text-gray-600">Aim for {metrics.goalType === 'gain' ? 'caloric surplus' : metrics.goalType === 'lose' ? 'caloric deficit' : 'maintenance calories'} of {calculateCalories()} calories per day.</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold">Hydration Reminder</h4>
            <p className="text-gray-600">Remember to drink at least {Math.round(metrics.weight * 0.033)} liters of water daily.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateCalories() {
  const metrics = useHealthStore.getState().metrics;
  const tdee = 10 * metrics.weight + 6.25 * metrics.height - 5 * metrics.age + (metrics.gender === 'male' ? 5 : -161);
  const modifier = metrics.goalType === 'gain' ? 500 : metrics.goalType === 'lose' ? -500 : 0;
  return Math.round(tdee + modifier);
}