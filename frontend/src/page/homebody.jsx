import React from 'react';
import { DollarSign, Shield, TrendingUp, Zap, Users, BarChart3, Globe, Lock, Smartphone, Award } from 'lucide-react';

export default function HomeBody() {
  const rules = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your money is protected with military-grade encryption and multi-factor authentication."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Smart Investment Tracking",
      description: "Monitor your portfolio performance with real-time analytics and AI-powered insights."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Transactions",
      description: "Transfer money instantly with zero fees and lightning-fast processing speeds."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Get detailed reports and forecasts to make smarter financial decisions."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "Access your finances from anywhere in the world with our secure platform."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your financial data remains completely private with zero-knowledge architecture."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Manage your finances on-the-go with our intuitive mobile application."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Support",
      description: "Get 24/7 support from our team of certified financial professionals."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award Winning Platform",
      description: "Recognized as the best financial platform by industry experts worldwide."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Maximize Returns",
      description: "Optimize your investments with our intelligent algorithms and market analysis."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Smart Finance
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Made Simple</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Follow these 10 essential rules to manage your finances like a pro and secure your financial future.
            </p>
          </div>
        </div>
      </div>

      {/* 10 Rules Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            10 Golden Rules of 
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Finance</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master these fundamental principles to achieve financial success and security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rules.map((rule, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {rule.icon}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-blue-400 mr-4">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold text-white">{rule.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{rule.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <div className="flex items-center mb-6">
                <DollarSign className="w-8 h-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-white">FinanceFlow</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering financial success through smart technology and proven strategies.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <span className="text-white text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <span className="text-white text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-6">Product</h3>
              <ul className="space-y-3">
                {['Features', 'Security', 'Mobile App', 'API', 'Pricing', 'Updates'].map((item) => (
                  <li key={item}>
                    <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Press', 'Partners', 'Contact', 'Blog'].map((item) => (
                  <li key={item}>
                    <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {['Help Center', 'Documentation', 'Community', 'Training', 'Status', 'Contact'].map((item) => (
                  <li key={item}>
                    <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 FinanceFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
