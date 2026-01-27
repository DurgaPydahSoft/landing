import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { authAPI } from '../services/api';

const Login = ({ portalInfo, onLoginSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Check if this is the student portal (for unified login)
  const isStudentPortal = portalInfo?.portalId === 'student-portal';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      // Unified login - no role parameter, backend will check rbac_users first, then student_credentials
      const response = await authAPI.login(formData.username, formData.password);

      if (response.success) {
        // Store tokens
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Generate SSO token for the portal (will cache automatically)
        if (portalInfo?.portalId) {
          try {
            // Force new token generation after login (don't use cache)
            const tokenResponse = await authAPI.generatePortalToken(portalInfo.portalId, true);
            
            if (tokenResponse.success) {
              // For Student Portal, determine redirect URL based on user's databaseSource
              let redirectUrl = portalInfo.url;
              
              if (isStudentPortal) {
                const userDatabaseSource = response.data.user.databaseSource;
                const baseUrl = new URL(portalInfo.url).origin;
                
                // If user is from rbac_users, redirect to /login (staff/admin)
                // If user is from student_credentials, redirect to /student/login (student)
                if (userDatabaseSource === 'rbac_users') {
                  redirectUrl = `${baseUrl}/login`;
                } else {
                  // student_credentials or other - use /student/login
                  redirectUrl = `${baseUrl}/student/login`;
                }
              }
              
              // Redirect to portal with encrypted token
              const portalUrl = new URL(redirectUrl);
              portalUrl.searchParams.set('token', tokenResponse.data.encryptedToken);
              
              // Redirect to portal
              window.location.href = portalUrl.toString();
            } else {
              setLoginError('Failed to generate portal access token');
            }
          } catch (tokenError) {
            console.error('Token generation error:', tokenError);
            setLoginError('Failed to generate portal access token. Please try again.');
          }
        } else {
          // If no portal info, just call success callback
          onLoginSuccess?.(response.data);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full blur-[80px] lg:blur-[120px] opacity-[0.05]"
          style={{ backgroundColor: portalInfo?.color || '#4f46e5' }}
        />
        <motion.div
          animate={{
            y: [0, 60, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] lg:blur-[150px] opacity-[0.03]"
          style={{ backgroundColor: portalInfo?.color || '#0ea5e9' }}
        />
      </div>

      <div className="w-full max-w-md relative z-10 mx-auto">
        {/* Back button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="mb-4 sm:mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm sm:text-base"
          >
            <ArrowRight className="rotate-180" size={18} />
            Back to Portals
          </motion.button>
        )}

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 lg:p-10 w-full"
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: `${portalInfo?.color || '#4f46e5'}15`,
                color: portalInfo?.color || '#4f46e5',
              }}
            >
              <Lock size={28} className="sm:w-8 sm:h-8" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2">
              Portal Access
            </h1>
            {portalInfo && (
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Sign in to access <span className="font-bold" style={{ color: portalInfo.color }}>
                  {portalInfo.title}
                </span>
              </p>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={20} className="text-slate-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 ${
                    errors.username
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                  }`}
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle size={14} />
                  {errors.username}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle size={14} />
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Error Message */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
              >
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 font-medium">{loginError}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full py-3.5 sm:py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base"
              style={{
                backgroundColor: portalInfo?.color || '#4f46e5',
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Secure authentication powered by{' '}
              <span className="font-semibold text-slate-700">CRM Gateway</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
