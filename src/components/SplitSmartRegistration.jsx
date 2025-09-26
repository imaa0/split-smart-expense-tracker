import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calculator,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Github,
  Facebook,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../contexts/useAuth';

export default function SplitSmartRegistration() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName': {
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        return '';
      }
      
      case 'email': {
        if (!value.trim()) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      }
      
      case 'password': {
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        return '';
      }
      
      case 'confirmPassword': {
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      }
      
      default:
        return '';
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle input blur for validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    });
    
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {

    if (!validateForm()) return;

    setIsSubmitting(true);

    const result = await register(formData.fullName, formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ submit: result.message });
    }

    setIsSubmitting(false);
  };

  // Social login handlers
  const handleGithubLogin = () => {
    // Implement GitHub OAuth
    console.log('GitHub login');
  };

  const handleFacebookLogin = () => {
    // Implement Facebook OAuth
    console.log('Facebook login');
  };

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return '';
    if (errors[fieldName]) return 'error';
    if (formData[fieldName]) return 'success';
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SplitSmart</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">
              Start tracking expenses and splitting bills with your friends effortlessly.
            </p>
          </div>

          {/* Profile Avatar */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIyNCIgcj0iMTAiIGZpbGw9IiM2QjcyODAiLz4KPHBhdGggZD0iTTEwIDU2QzEwIDQ0IDIwIDM2IDMyIDM2QzQ0IDM2IDU0IDQ0IDU0IDU2SDE2WiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  getFieldStatus('fullName') === 'error' ? 'text-red-400' : 
                  getFieldStatus('fullName') === 'success' ? 'text-green-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.fullName && touched.fullName
                      ? 'border-red-300 bg-red-50' 
                      : formData.fullName && !errors.fullName
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                />
                {getFieldStatus('fullName') === 'success' && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                )}
                {getFieldStatus('fullName') === 'error' && (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
                )}
              </div>
              {errors.fullName && touched.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  getFieldStatus('email') === 'error' ? 'text-red-400' : 
                  getFieldStatus('email') === 'success' ? 'text-green-400' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email && touched.email
                      ? 'border-red-300 bg-red-50' 
                      : formData.email && !errors.email
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                />
                {getFieldStatus('email') === 'success' && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                )}
                {getFieldStatus('email') === 'error' && (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
                )}
              </div>
              {errors.email && touched.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  getFieldStatus('password') === 'error' ? 'text-red-400' : 
                  getFieldStatus('password') === 'success' ? 'text-green-400' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password && touched.password
                      ? 'border-red-300 bg-red-50' 
                      : formData.password && !errors.password
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  getFieldStatus('confirmPassword') === 'error' ? 'text-red-400' : 
                  getFieldStatus('confirmPassword') === 'success' ? 'text-green-400' : 'text-gray-400'
                }`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.confirmPassword && touched.confirmPassword
                      ? 'border-red-300 bg-red-50' 
                      : formData.confirmPassword && !errors.confirmPassword
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Register'
              )}
            </button>

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-center">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGithubLogin}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </button>
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Facebook
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}