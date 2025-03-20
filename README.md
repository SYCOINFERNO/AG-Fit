# AG-Fit: Personal Fitness & Health Tracking Platform

[image](https://github.com/user-attachments/assets/ab014ad3-b9c8-4a6b-87a9-aeb48b97a159)


AG-Fit is a comprehensive fitness and health tracking application that helps users monitor their health metrics, track progress, and receive personalized recommendations for their fitness journey.

## 🌟 Features

### Authentication & Security
- Secure Google Sign-In integration using Clerk
- Protected routes and session management
- Seamless authentication flow

### Health Metrics Management
- Input and track key health indicators:
  - Body fat percentage
  - Height and weight
  - Age and gender
  - Activity level
  - Fitness goals

### Advanced Health Calculations
- Automated calculations for:
  - Body Mass Index (BMI)
  - Basal Metabolic Rate (BMR)
  - Total Daily Energy Expenditure (TDEE)
  - Personalized calorie intake recommendations

### Progress Tracking
- Interactive charts and graphs
- Historical data visualization
- Progress comparisons over time

### Personalized Recommendations
- Custom exercise plans
- Tailored meal suggestions
- Hydration reminders
- Goal-specific advice

## 🚀 Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Clerk Authentication
- Lucide React Icons
- Recharts for data visualization

### Backend
- Node.js
- Express.js
- Clerk API

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ag-fit.git
```

2. Install dependencies:
```bash
cd ag-fit
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 Configuration

### Clerk Authentication Setup

1. Create a Clerk account at [clerk.dev](https://clerk.dev)
2. Set up a new application in Clerk dashboard
3. Configure Google OAuth in the Clerk dashboard
4. Add your Clerk keys to the `.env` file

## 📱 Usage

1. Visit the application URL
2. Sign in using Google authentication
3. Complete your health profile
4. Access your personalized dashboard
5. Track your progress and receive recommendations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Virinchi Deevi - [YourGitHub](https://github.com/SYCOINFERNO)
- Sai Mahin 

## 🙏 Acknowledgments

- Thanks to all contributors
- Clerk team for authentication solutions
- React and Node.js communities

## 📞 Support

For support, email support@ag-fit.com or create an issue in the repository.
