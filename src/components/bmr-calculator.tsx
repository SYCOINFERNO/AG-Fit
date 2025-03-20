import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const BMRCalculator = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateBMR = () => {
    if (weight && height && age) {
      let bmrValue;
      if (gender === 'male') {
        bmrValue = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmrValue = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      setBmr(bmrValue);
    }
  };

  const getBMRCategory = (bmr: number) => {
    if (gender === 'male') {
      if (bmr < 1600) return { category: 'Low BMR', color: 'text-yellow-600' };
      if (bmr < 1900) return { category: 'Normal BMR', color: 'text-green-600' };
      return { category: 'High BMR', color: 'text-blue-600' };
    } else {
      if (bmr < 1400) return { category: 'Low BMR', color: 'text-yellow-600' };
      if (bmr < 1700) return { category: 'Normal BMR', color: 'text-green-600' };
      return { category: 'High BMR', color: 'text-blue-600' };
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <div className="flex items-center justify-center mb-6">
        <Calculator className="h-8 w-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">BMR Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : '')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter weight"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : '')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter height"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age (years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value ? parseFloat(e.target.value) : '')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as 'male' | 'female')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          onClick={calculateBMR}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate BMR
        </button>

        {bmr !== null && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold">Your BMR: {bmr.toFixed(0)} calories/day</p>
            <p className={`text-lg font-semibold ${getBMRCategory(bmr).color}`}>
              Category: {getBMRCategory(bmr).category}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This is the number of calories your body burns at complete rest.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMRCalculator;