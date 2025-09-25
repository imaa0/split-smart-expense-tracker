import React from 'react';
import { 
  Calculator, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Shield,
  CreditCard,
  Users,
  Zap,
  Award,
  Globe
} from 'lucide-react';

export default function ProfessionalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Stay Updated with SplitSmart</h3>
            <p className="text-gray-300 mb-6">
              Get the latest updates on new features, tips for better expense management, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                SplitSmart
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The ultimate solution for tracking group expenses and splitting bills effortlessly. 
              Trusted by over 100,000+ users worldwide to manage their shared expenses with friends, 
              family, and colleagues.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">100K+</div>
                <div className="text-sm text-gray-400">Happy Users</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">$50M+</div>
                <div className="text-sm text-gray-400">Split Amount</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>support@splitsmart.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>San Francisco, CA 94107</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Product</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group">
                <Zap className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                <span>Features</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group">
                <CreditCard className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                <span>Pricing</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group">
                <Shield className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                <span>Security</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group">
                <Users className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                <span>Enterprise</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group">
                <Globe className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                <span>API</span>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">About Us</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Careers</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Press Kit</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Blog</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Partners</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Help Center</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Contact Us</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Why Choose SplitSmart?</h3>
            <p className="text-gray-400">Trusted features that make expense splitting effortless</p>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-medium text-white mb-1">Bank-Level Security</h4>
              <p className="text-sm text-gray-400">Your data is protected with 256-bit encryption</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-medium text-white mb-1">Lightning Fast</h4>
              <p className="text-sm text-gray-400">Split expenses in seconds, not minutes</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-medium text-white mb-1">Team Friendly</h4>
              <p className="text-sm text-gray-400">Perfect for groups of any size</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all">
                <Award className="w-6 h-6 text-orange-400" />
              </div>
              <h4 className="font-medium text-white mb-1">Award Winning</h4>
              <p className="text-sm text-gray-400">#1 expense splitting app of 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm">
              <p>© 2024 SplitSmart. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <span>Made with ❤️ in San Francisco</span>
                <span>•</span>
                <span>Available in 25+ countries</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}