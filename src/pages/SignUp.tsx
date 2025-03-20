import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { Activity } from 'lucide-react';

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Activity className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join AG-Fit
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start your fitness journey today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-blue-100/50 sm:rounded-lg sm:px-10">
          <ClerkSignUp
            routing="path"
            path="/sign-up"
            afterSignUpUrl="/metrics"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                card: 'shadow-none',
                footer: 'hidden'
              }
            }}
            unsafeMetadata={{
              password_requirements: {
                min_length: 12,
                require_numbers: true,
                require_special_chars: true,
                require_uppercase: true,
                require_lowercase: true
              }
            }}
          />
          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-blue-800">Password Requirements:</h3>
              <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                <li>At least 12 characters long</li>
                <li>Include uppercase and lowercase letters</li>
                <li>Include numbers</li>
                <li>Include special characters</li>
                <li>Must not be a commonly used password</li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?{' '}
                  <a href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}