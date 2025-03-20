import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HealthMetrics {
  weight: number;
  height: number;
  bodyFat: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goalType: 'lose' | 'maintain' | 'gain';
}

interface HealthStore {
  metrics: HealthMetrics;
  updateMetrics: (metrics: Partial<HealthMetrics>) => void;
}

// Load initial state from localStorage if available
const getInitialState = (): HealthMetrics => {
  const stored = localStorage.getItem('healthMetrics');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    weight: 0,
    height: 0,
    bodyFat: 0,
    age: 0,
    gender: 'male',
    activityLevel: 'sedentary',
    goalType: 'maintain',
  };
};

export const useHealthStore = create<HealthStore>((set) => ({
  metrics: getInitialState(),
  updateMetrics: (newMetrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics },
    })),
}));