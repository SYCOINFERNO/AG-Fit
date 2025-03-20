import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';

const TDEECalculator = () => {
  const [bmr, setBmr] = useState<number | ''>('');
  const [activityLevel, setActivityLevel] = useState<number>(1.2);
  const [tdee, setTdee] = useState<number | null>(null);

  const calculateTDEE = () => {
    if (bmr) {
      const tdeeValue = Number(bmr) * activityLevel;
      setTdee(tdeeValue);
    }
  };

  const getActivityDescription = (level: number) => {
    const descriptions = {
      1.2: 'Little or no exercise, desk job',
      1.375: 'Light exercise 1-3 days/week',
      1.55: 'Moderate exercise 3-5 days/week',
      1.725: 'Heavy exercise 6-7 days/week',
      1.9: 'Very heavy exercise, physical job, training 2x/day'
    };
    return descriptions[level as keyof typeof descriptions];
  };

  const getTDEECategory = (tdee: number) => {
    if (tdee < 2000) return { category: 'Low TDEE', color: 'text-yellow-600' };
    if (tdee < 2500) return { category: 'Moderate TDEE', color: 'text-green-600' };
    if (tdee < 3000) return { category: 'High TDEE', color: 'text-orange-600' };
    return { category: 'Very High TDEE', color: 'text-red-600' };
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <div className="flex items-center justify-center mb-6">
        <Dumbbell className="h-8 w-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">TDEE Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">BMR (calories/day)</label>
          <input
            type="number"
            value={bmr}
            onChange={(e) => setBmr(e.target.value ? parseFloat(e.target.value) : '')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your BMR"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Activity Level</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={1.2}>Sedentary</option>
            <option value={1.375}>Lightly Active</option>
            <option value={1.55}>Moderately Active</option>
            <option value={1.725}>Very Active</option>
            <option value={1.9}>Extremely Active</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">{getActivityDescription(activityLevel)}</p>
        </div>

        <button
          onClick={calculateTDEE}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate TDEE
        </button>

        {tdee !== null && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold">Your TDEE: {tdee.toFixed(0)} calories/day</p>
            <p className={`text-lg font-semibold ${getTDEECategory(tdee).color}`}>
              Category: {getTDEECategory(tdee).category}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This is your total daily energy expenditure based on your activity level.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TDEECalculator;