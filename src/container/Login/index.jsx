import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowLeft,
  FaKey,
  FaPhoneAlt
} from 'react-icons/fa';
import { supabase } from '../../lib/supabase';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '', // Email or Mobile / Username
    password: '',
    rememberMe: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'error' | 'success', text: '' }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    const { identifier, password, rememberMe } = formData;

    if (!identifier.trim() || !password.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'કૃપા કરીને તમારો ઈમેઈલ/મોબાઈલ નંબર અને પાસવર્ડ દાખલ કરો.'
      });
      return;
    }

    setIsLoading(true);

    try {
      const cleanId = identifier.trim();
      const cleanPass = password.trim();

      // ૧. Supabase ના 'admin_users' ટેબલમાંથી યુઝર ચેક કરવો
      let dbUser = null;
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('id, name, username, email, role, password')
          .or(`email.ilike.${cleanId},username.ilike.${cleanId}`)
          .eq('password', cleanPass)
          .maybeSingle();

        if (!error && data) {
          dbUser = data;
        } else if (error) {
          console.warn('Supabase admin_users query notice:', error.message);
        }
      } catch (dbErr) {
        console.warn('Supabase db query error:', dbErr);
      }

      // ૨. જો ટેબલમાં યુઝર મળી જાય તો લૉગિન સફળ!
      if (dbUser) {
        const sessionUser = {
          id: dbUser.id,
          name: dbUser.name || dbUser.username,
          username: dbUser.username,
          email: dbUser.email,
          role: dbUser.role || 'admin',
          loginAt: new Date().toISOString()
        };

        if (rememberMe) {
          localStorage.setItem('cpps_admin_session', JSON.stringify(sessionUser));
        } else {
          sessionStorage.setItem('cpps_admin_session', JSON.stringify(sessionUser));
        }

        setStatusMessage({
          type: 'success',
          text: `સ્વાગત છે, ${sessionUser.name}! લૉગિન સફળ થયું છે.`
        });

        setTimeout(() => {
          navigate('/admin/marksheets');
        }, 1200);
        return;
      }

      // ૩. ડિફોલ્ટ બેકઅપ ક્રેડેન્શિયલ (જો હજુ DB ખાલી હોય અથવા ટેસ્ટિંગ માટે)
      const isDefaultAdmin =
        (cleanId.toLowerCase() === 'admin' || cleanId.toLowerCase() === 'admin@cppssurat.com') &&
        (cleanPass === 'cpps@2025' || cleanPass === 'admin');

      if (isDefaultAdmin) {
        const sessionUser = {
          name: 'Super Admin',
          username: 'admin',
          email: 'admin@cppssurat.com',
          role: 'admin',
          loginAt: new Date().toISOString()
        };

        if (rememberMe) {
          localStorage.setItem('cpps_admin_session', JSON.stringify(sessionUser));
        } else {
          sessionStorage.setItem('cpps_admin_session', JSON.stringify(sessionUser));
        }

        setStatusMessage({
          type: 'success',
          text: 'લૉગિન સફળ! ડેશબોર્ડ પર લઈ જઈ રહ્યા છીએ...'
        });

        setTimeout(() => {
          navigate('/admin/marksheets');
        }, 1200);
        return;
      }

      // ૪. જો કશું જ મેચ ન થાય તો એરર
      setStatusMessage({
        type: 'error',
        text: 'અમાન્ય યુઝરનેમ/ઈમેઈલ અથવા પાસવર્ડ. કૃપા કરીને સાચી વિગત દાખલ કરો.'
      });
    } catch (err) {
      console.error('Login error:', err);
      setStatusMessage({
        type: 'error',
        text: 'લૉગિન કરવામાં કોઈ સમસ્યા આવી. કૃપા કરીને થોડીવાર પછી પ્રયાસ કરો.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="max-w-md w-full space-y-6">
        {/* Back to Home Link */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 hover:text-cyan-700 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            <span>મુખ્ય પેજ પર પાછા જાઓ</span>
          </Link>
          <span className="text-[11px] bg-slate-200/70 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
            સુરક્ષિત લૉગિન
          </span>
        </div>

        {/* Login Card */}
        <div className="relative rounded-3xl overflow-hidden glass-card p-7 sm:p-9 shadow-xl border border-cyan-200 bg-white/90 backdrop-blur-md">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-500 to-cyan-400"></div>

          {/* Header & Logo */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3.5 rounded-2xl bg-gradient-to-br from-cyan-600 via-teal-600 to-cyan-700 text-white flex items-center justify-center text-2xl shadow-md ring-4 ring-cyan-100">
              <FaUserShield />
            </div>
            <span className="inline-block px-3 py-1 bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-bold rounded-full uppercase tracking-wider mb-2">
              શ્રી ચાર પરગણા પ્રજાપતિ સમાજ
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              એડમિન લૉગિન
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              સમાજ સંચાલન અને વિદ્યાર્થી અરજી ચકાસણી પોર્ટલ
            </p>
          </div>

          {/* Status Alert Message */}
          {statusMessage && (
            <div
              className={`mb-5 p-3.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-start space-x-2.5 transition-all ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                  : 'bg-rose-50 text-rose-900 border border-rose-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <FaCheckCircle className="text-emerald-600 text-base flex-shrink-0 mt-0.5" />
              ) : (
                <FaExclamationCircle className="text-rose-600 text-base flex-shrink-0 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username / Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                ઈમેઈલ / યુઝરનેમ / મોબાઈલ નંબર
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaEnvelope className="text-xs sm:text-sm" />
                </div>
                <input
                  type="text"
                  name="identifier"
                  required
                  autoFocus
                  value={formData.identifier}
                  onChange={handleInputChange}
                  placeholder="admin@cppssurat.com અથવા યુઝરનેમ"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-800 text-sm transition-all bg-white"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  પાસવર્ડ
                </label>
                <span className="text-[11px] text-cyan-700 hover:underline cursor-pointer">
                  પાસવર્ડ ભૂલી ગયા?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaLock className="text-xs sm:text-sm" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-800 text-sm transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? 'પાસવર્ડ છુપાવો' : 'પાસવર્ડ બતાવો'}
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 cursor-pointer"
                />
                <span className="font-medium">મને યાદ રાખો (Remember me)</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>ચકાસણી ચાલુ છે...</span>
                </>
              ) : (
                <>
                  <FaSignInAlt className="text-sm" />
                  <span>લૉગિન કરો</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Help Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              માત્ર અધિકૃત કમિટી અને કારોબારી સભ્યો માટે જ • CPPS સુરત
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

