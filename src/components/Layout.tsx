import React from 'react';
import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom';
import { UserButton, useUser, useAuth } from '@clerk/clerk-react';
import { Activity, Home, LineChart, UserCircle, Calculator, Scale, Dumbbell } from 'lucide-react';

export default function Layout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-gray-900 font-bold">
                <Activity className="h-6 w-6 text-blue-600 mr-2" />
                AG-Fit
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <Link to="/bmi-calculator" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                  <Scale className="h-4 w-4 mr-1" />
                  BMI
                </Link>
                <Link to="/bmr-calculator" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                  <Calculator className="h-4 w-4 mr-1" />
                  BMR
                </Link>
                <Link to="/tdee-calculator" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                  <Dumbbell className="h-4 w-4 mr-1" />
                  TDEE
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                <Home className="h-5 w-5" />
              </Link>
              <Link to="/metrics" className="text-gray-600 hover:text-gray-900">
                <LineChart className="h-5 w-5" />
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                <UserCircle className="h-5 w-5" />
              </Link>
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}