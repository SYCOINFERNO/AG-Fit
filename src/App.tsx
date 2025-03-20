import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Metrics from './pages/Metrics';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BMICalculator from './components/bmi-calculator'; // Import BMI Calculator
import TDEECalculator from './components/tdee-calculator'; // Import TDEE Calculator
import BMRCalculator from './components/bmr-calculator'; // Import BMR Calculator

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk Publishable Key');
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} /> {/* Add BMI Calculator route */}
            <Route path="/tdee-calculator" element={<TDEECalculator />} /> {/* Add TDEE Calculator route */}
            <Route path="/bmr-calculator" element={<BMRCalculator />} /> {/* Add BMR Calculator route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;