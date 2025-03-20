import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useHealthStore } from '../lib/store';
import { Activity, Target, Droplets, Flame, Scale, Heart, TrendingUp, Calendar } from 'lucide-react';

export default function Dashboard() {
  const { user } = useUser();
  const metrics = useHealthStore((state) => state.metrics);

  const calculateBMI = () => {
    if (!metrics.weight || !metrics.height) return 0;
    return (metrics.weight / ((metrics.height / 100) ** 2)).toFixed(1);
  };

  const calculateTDEE = () => {
    if (!metrics.weight || !metrics.height || !metrics.age) return 0;
    const bmr = 10 * metrics.weight + 6.25 * metrics.height - 5 * metrics.age + (metrics.gender === 'male' ? 5 : -161);
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9,
    };
    return (bmr * activityMultipliers[metrics.activityLevel]).toFixed(0);
  };

  const getBMICategory = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-yellow-600' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-orange-600' };
    return { text: 'Obese', color: 'text-red-600' };
  };

  const getCalorieAdjustment = () => {
    const adjustment = metrics.goalType === 'lose' ? -500 : metrics.goalType === 'gain' ? 500 : 0;
    return parseInt(calculateTDEE()) + adjustment;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user?.imageUrl}
            alt={user?.firstName || 'Profile'}
            className="h-16 w-16 rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h2>
            <p className="text-gray-600">Let's check your health metrics for today</p>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Scale className="h-8 w-8 text-blue-600" />
                <h3 className="ml-3 text-lg font-semibold">BMI</h3>
              </div>
              <span className={`font-semibold ${getBMICategory().color}`}>
                {getBMICategory().text}
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-blue-900">{calculateBMI()}</p>
            <p className="mt-2 text-sm text-blue-600">Body Mass Index</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <Flame className="h-8 w-8 text-green-600" />
              <h3 className="ml-3 text-lg font-semibold">Daily Calories</h3>
            </div>
            <p className="mt-4 text-3xl font-bold text-green-900">{getCalorieAdjustment()}</p>
            <p className="mt-2 text-sm text-green-600">Recommended daily intake</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <Droplets className="h-8 w-8 text-purple-600" />
              <h3 className="ml-3 text-lg font-semibold">Water Goal</h3>
            </div>
            <p className="mt-4 text-3xl font-bold text-purple-900">{Math.round(metrics.weight * 0.033)} L</p>
            <p className="mt-2 text-sm text-purple-600">Daily water intake target</p>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Heart className="h-5 w-5 text-red-500 mr-2" />
            Health Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Weight</span>
              <span className="font-semibold">{metrics.weight} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Height</span>
              <span className="font-semibold">{metrics.height} cm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Body Fat</span>
              <span className="font-semibold">{metrics.bodyFat}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
            Goals & Activity
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Goal Type</span>
              <span className="font-semibold capitalize">{metrics.goalType} weight</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Activity Level</span>
              <span className="font-semibold capitalize">{metrics.activityLevel.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Exercise</span>
              <span className="font-semibold">{metrics.activityLevel === 'sedentary' ? '15-30' : '30-60'} minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
          Today's Health Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900">Nutrition Tip</h4>
            <p className="text-indigo-700 text-sm mt-1">
              {metrics.goalType === 'lose' 
                ? 'Focus on protein-rich foods to maintain muscle mass while in a caloric deficit.'
                : metrics.goalType === 'gain'
                ? 'Include healthy fats and complex carbs to support your muscle gain journey.'
                : 'Maintain a balanced diet with plenty of whole foods and vegetables.'}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900">Exercise Tip</h4>
            <p className="text-indigo-700 text-sm mt-1">
              {metrics.activityLevel === 'sedentary'
                ? 'Start with short walks and gradually increase activity.'
                : 'Mix cardio and strength training for optimal results.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}