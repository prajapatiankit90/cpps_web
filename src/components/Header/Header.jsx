import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaGooglePlusG, FaWpforms, FaGraduationCap, FaUserLock, FaSignOutAlt } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session =
      localStorage.getItem('cpps_admin_session') ||
      sessionStorage.getItem('cpps_admin_session');
    setIsLoggedIn(!!session);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('cpps_admin_session');
    sessionStorage.removeItem('cpps_admin_session');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Topbar */}
      <div className="bg-[#212529] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          <ul className="flex items-center space-x-2 m-0 p-0 list-none">
            <li>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-cyan-600 transition-all duration-200 text-sm"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-cyan-600 transition-all duration-200 text-sm"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-cyan-600 transition-all duration-200 text-sm"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-cyan-600 transition-all duration-200 text-sm"
                aria-label="Pinterest"
              >
                <FaPinterestP />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-cyan-600 transition-all duration-200 text-sm"
                aria-label="Google Plus"
              >
                <FaGooglePlusG />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar */}
      <nav className="mx-background-top-linear px-4 sm:px-6 lg:px-8 py-3 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white hover:text-cyan-200 transition-colors"
          >
            {t('main_header')}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-black/20 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-cyan-200 transition-colors"
            >
              {t('homePage')}
            </Link>
            <Link
              to="/history"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-cyan-200 transition-colors"
            >
              {t('extraPage')}
            </Link>
            <Link
              to="/members"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-cyan-200 transition-colors"
            >
              {t('membersPage')}
            </Link>
            {/* <Link
              to="/donors"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-cyan-200 transition-colors"
            >
              {t('donorPage')}
            </Link> */}
            <Link
              to="/committee"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-cyan-200 transition-colors"
            >
              {t('committeePage')}
            </Link>
            {/* <Link
              to="/trusti"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-cyan-200 transition-colors"
            >
              {t('trustiPage')}
            </Link> */}
            <Link
              to="/gallery"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-cyan-200 transition-colors"
            >
              {t('photoPage')}
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-cyan-200 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-cyan-200 transition-colors"
            >
              Contact Us
            </Link>

            {/* માત્ર લૉગિન થયેલ એડમિન માટે જ વિદ્યાર્થી યાદી દેખાશે */}
            {isLoggedIn && (
              <Link
                to="/student-list"
                className="px-3 py-2 rounded-md text-sm font-bold text-cyan-200 hover:bg-white/10 transition-colors"
              >
                વિદ્યાર્થી યાદી
              </Link>
            )}

            <Link
              to="/student-marksheet"
              className="ml-2 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-bold bg-teal-500 hover:bg-teal-400 text-white shadow transition-all hover:scale-105"
            >
              <FaGraduationCap className="text-xs" />
              <span>માર્કશીટ અપલોડ</span>
            </Link>

            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="ml-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/80 hover:bg-rose-600 text-white transition-all flex items-center space-x-1.5 border border-rose-400/40 cursor-pointer"
                title="લૉગઆઉટ કરો"
              >
                <FaSignOutAlt className="text-xs" />
                <span>લૉગઆઉટ</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center space-x-1.5 border border-white/20"
                title="એડમિન લૉગિન"
              >
                <FaUserLock className="text-xs text-cyan-300" />
                <span>લૉગિન</span>
              </Link>
            )}
           
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/20 flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
            >
              {t('homePage')}
            </Link>
            <Link
              to="/history"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
            >
              {t('extraPage')}
            </Link>
            <Link
              to="/members"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
            >
              {t('membersPage')}
            </Link>
            {/* <Link
              to="/donors"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
            >
              {t('donorPage')}
            </Link> */}
            <Link
              to="/committee"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
            >
              {t('committeePage')}
            </Link>
            <Link
              to="/trusti"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
            >
              {t('trustiPage')}
            </Link>
            <Link
              to="/gallery"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
            >
              {t('photoPage')}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
            >
              Contact Us
            </Link>

            {/* માત્ર લૉગિન થયેલ એડમિન માટે જ વિદ્યાર્થી યાદી દેખાશે */}
            {isLoggedIn && (
              <Link
                to="/student-list"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-bold text-cyan-300 hover:bg-white/10"
              >
                વિદ્યાર્થી યાદી (Admin)
              </Link>
            )}

            <Link
              to="/student-marksheet"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-bold bg-teal-500 text-white shadow"
            >
              <FaGraduationCap className="text-sm" />
              <span>માર્કશીટ અપલોડ</span>
            </Link>
            <Link
              to="/form"
              onClick={() => setIsOpen(false)}
              className="mt-1 inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-bold bg-amber-400 text-slate-900 shadow"
            >
              <FaWpforms className="text-sm" />
              <span>{t('formPage')}</span>
            </Link>

            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="mt-2 inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-bold bg-rose-600/80 hover:bg-rose-700 text-white border border-rose-500 w-full"
              >
                <FaSignOutAlt className="text-sm" />
                <span>એડમિન લૉગઆઉટ</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                <FaUserLock className="text-sm text-cyan-300" />
                <span>એડમિન લૉગિન</span>
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;