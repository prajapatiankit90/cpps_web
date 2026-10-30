import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaFacebookF, FaWhatsapp, FaYoutube, FaInstagram, FaChevronRight } from 'react-icons/fa';
import { GiTempleDoor, GiReceiveMoney } from 'react-icons/gi';
import footerImage from '../../assets/image/footer.jpg';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-[#0f2744] via-[#091b30] to-[#050f1c] text-white mt-16 border-t border-cyan-500/20 shadow-2xl relative overflow-hidden">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Logo & Samaj Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-lg flex-shrink-0 bg-white/5">
                <img
                  src={footerImage}
                  alt="શ્રી ચાર પરગણા પ્રજાપતિ સમાજ લોગો"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
                  શ્રી ચાર પરગણા પ્રજાપતિ સમાજ
                </h4>
                <span className="text-xs text-cyan-300 font-semibold tracking-wider block">
                  સુરત, ગુજરાત
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              વાવ, થરાદ, સુઈગામ અને ભાભર પ્રદેશના જ્ઞાતિજનોનું સુરતમાં ગૌરવશાળી સંગઠન. શિક્ષણ, સેવા અને સંસ્કાર દ્વારા સમાજના સર્વાંગી વિકાસ માટે કટિબદ્ધ.
            </p>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <span>🚩 જય ધરણીધર | એકતા એ જ બળ</span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h5 className="text-sm sm:text-base font-bold uppercase tracking-wider text-cyan-400 mb-4 pb-2 border-b border-white/10 flex items-center space-x-2">
              <span>મુખ્ય લિંક્સ</span>
            </h5>
            <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-cyan-300 flex items-center space-x-1.5 transition-colors group">
                  <FaChevronRight className="text-[9px] text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t('homePage')}</span>
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-cyan-300 flex items-center space-x-1.5 transition-colors group">
                  <FaChevronRight className="text-[9px] text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t('extraPage')}</span>
                </Link>
              </li>
              {/* <li>
                <Link to="/donors" className="hover:text-cyan-300 flex items-center space-x-1.5 transition-colors group">
                  <FaChevronRight className="text-[9px] text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t('donorPage')}</span>
                </Link>
              </li> */}
              <li>
                <Link to="/committee" className="hover:text-cyan-300 flex items-center space-x-1.5 transition-colors group">
                  <FaChevronRight className="text-[9px] text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t('committeePage')}</span>
                </Link>
              </li>
              <li>
                <Link to="/trusti" className="hover:text-cyan-300 flex items-center space-x-1.5 transition-colors group">
                  <FaChevronRight className="text-[9px] text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t('trustiPage')}</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-cyan-300 flex items-center space-x-1.5 transition-colors group">
                  <FaChevronRight className="text-[9px] text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t('photoPage')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-300 flex items-center space-x-1.5 transition-colors group">
                  <FaChevronRight className="text-[9px] text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>About Us (અમારા વિશે)</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-300 flex items-center space-x-1.5 transition-colors group">
                  <FaChevronRight className="text-[9px] text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Contact Us (સંપર્ક)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Latest Events & News (3 cols) */}
          <div className="lg:col-span-3">
            <h5 className="text-sm sm:text-base font-bold uppercase tracking-wider text-cyan-400 mb-4 pb-2 border-b border-white/10">
              સમાચાર & કાર્યક્રમો
            </h5>
            <div className="space-y-3.5">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 text-sm">
                  📢
                </div>
                <div>
                  <Link
                    to="/gallery"
                    className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-2"
                  >
                    વાર્ષિક સ્નેહમિલન & જ્ઞાતિ ભોજન સમારોહનું આયોજન
                  </Link>
                  <small className="text-slate-400 text-[11px] block mt-0.5">સુરત • વાર્ષિક ઉત્સવ</small>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 text-sm">
                  🎓
                </div>
                <div>
                  <Link
                    to="/gallery"
                    className="text-xs font-semibold text-slate-200 group-hover:text-teal-300 transition-colors line-clamp-2"
                  >
                    સરસ્વતી સન્માન - તેજસ્વી વિદ્યાર્થી સન્માન સમારોહ
                  </Link>
                  <small className="text-slate-400 text-[11px] block mt-0.5">શૈક્ષણિક પ્રવૃત્તિ</small>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 text-sm">
                  🏢
                </div>
                <div>
                  <Link
                    to="/about"
                    className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 transition-colors line-clamp-2"
                  >
                    સમાજ ભવન અને વાડી નિર્માણ પ્રગતિ સમીક્ષા
                  </Link>
                  <small className="text-slate-400 text-[11px] block mt-0.5">સમાજ વિકાસ સહયોગ</small>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Social (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-sm sm:text-base font-bold uppercase tracking-wider text-cyan-400 mb-4 pb-2 border-b border-white/10">
              સંપર્ક
            </h5>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>સુરત, ગુજરાત, ભારત</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-cyan-400 flex-shrink-0" />
                <a href="tel:9979511169" className="hover:text-cyan-300 transition-colors font-mono">
                  99795 11169
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-cyan-400 flex-shrink-0" />
                <a href="/contact" className="hover:text-cyan-300 transition-colors">
                  સંપર્ક ફોર્મ
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block mb-2 font-semibold">સોશિયલ મીડિયા પર જોડાઓ:</span>
              <div className="flex items-center space-x-2">
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-cyan-600 flex items-center justify-center text-white text-xs transition-all duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-emerald-600 flex items-center justify-center text-white text-xs transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-600 flex items-center justify-center text-white text-xs transition-all duration-200"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-pink-600 flex items-center justify-center text-white text-xs transition-all duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 py-4 bg-[#040a14] text-center text-xs text-slate-400 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="m-0">
            © {new Date().getFullYear()}{' '}
            <span className="text-cyan-400 font-semibold">{t('main_header')}</span>. સર્વાધિકાર સુરક્ષિત.
          </p>
          <p className="m-0 text-[11px] text-slate-500">
            સર્જનહાર પ્રજાપતિ પરંપરા • જય ધરણીધર
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
