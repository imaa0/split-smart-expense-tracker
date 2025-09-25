import React from 'react';
import { 
  Calculator, 
  CreditCard, 
  BarChart3, 
  Users, 
  Receipt, 
  CheckCircle,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';

export default function SplitSmartLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SplitSmart</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
              <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How It Works</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium">Login</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Split Expenses. Settle Bills. Stay Stress-Free.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track group expenses, auto-calculate who owes whom, and settle payments easily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium text-lg">
              Get Started
            </button>
            <button className="text-blue-600 hover:text-blue-800 font-medium text-lg">
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-green-200 via-yellow-200 to-red-200 rounded-2xl p-12 min-h-96">
            {/* Phone mockups */}
            <div className="absolute top-8 left-8">
              <div className="w-16 h-28 bg-gray-800 rounded-lg shadow-lg"></div>
            </div>
            
            {/* Hands with receipts */}
            <div className="absolute top-12 right-16">
              <div className="w-20 h-16 bg-pink-300 rounded-full opacity-80"></div>
              <div className="w-16 h-20 bg-white rounded shadow-md mt-2"></div>
            </div>
            
            <div className="absolute top-16 left-20">
              <div className="w-18 h-14 bg-pink-300 rounded-full opacity-80"></div>
              <div className="w-14 h-18 bg-white rounded shadow-md mt-1"></div>
            </div>
            
            {/* Tablet mockup */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-48 h-32 bg-gray-800 rounded-lg shadow-lg">
                <div className="w-full h-full bg-white rounded-lg m-1 p-2">
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="w-16 h-12 bg-pink-300 rounded-full opacity-80 absolute -top-4 -left-8"></div>
              <div className="w-16 h-12 bg-pink-300 rounded-full opacity-80 absolute -top-4 -right-8"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Features you'll love</h2>
            <p className="text-xl text-gray-600">Everything you need to manage shared expenses.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Expenses</h3>
              <p className="text-gray-600">Easy expense logging with group visibility.</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Auto Split</h3>
              <p className="text-gray-600">Calculate balances automatically, no manual math required.</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Settle Payments</h3>
              <p className="text-gray-600">Make payments as payments are completed.</p>
            </div>
            
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reports & Analytics</h3>
              <p className="text-gray-600">Visual dashboards with charts and insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in just a few simple steps.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign Up</h3>
                  <p className="text-gray-600">Create your account in seconds.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Create or join a group</h3>
                  <p className="text-gray-600">Set up a group for your friends, family, or trip.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Add expenses</h3>
                  <p className="text-gray-600">Log expenses as they happen.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Settle balances</h3>
                  <p className="text-gray-600">See who owes what and settle up instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SplitSmart</span>
              </div>
              <p className="text-gray-600">© 2024 SplitSmart. All rights reserved.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">LINKS</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-gray-900">About</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">Privacy Policy</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">Terms of Service</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">SOCIAL</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}