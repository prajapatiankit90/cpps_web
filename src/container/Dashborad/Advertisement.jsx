import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  FaGem, 
  FaTshirt, 
  FaBuilding, 
  FaTools, 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaCheckCircle, 
  FaBullhorn, 
  FaStore, 
  FaUserTie,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { BsStars, BsShieldCheck } from 'react-icons/bs';

const Advertisement = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const businessCategories = [
    { id: 'all', label: 'તમામ વ્યાપાર', icon: <FaStore /> },
    { id: 'diamond', label: 'હીરા & જ્વેલરી', icon: <FaGem className="text-amber-500" /> },
    { id: 'textile', label: 'ટેક્સટાઇલ & કાપડ', icon: <FaTshirt className="text-cyan-600" /> },
    { id: 'realestate', label: 'બિલ્ડર્સ & બાંધકામ', icon: <FaBuilding className="text-teal-600" /> },
    { id: 'services', label: 'ટેકનિકલ & એન્જિનિયરિંગ', icon: <FaTools className="text-purple-600" /> },
  ];

  const businesses = [
    {
      id: 1,
      title: 'શ્રી ધરણીધર ડાયમંડ્સ & જ્વેલરી',
      slogan: 'વિશ્વાસ અને શુદ્ધતાનું પ્રતીક - નેચરલ પોલિશ્ડ ડાયમંડ્સ',
      category: 'diamond',
      categoryLabel: 'હીરા & જ્વેલરી',
      owner: 'પ્રજાપતિ રમેશભાઈ ગોવિંદભાઈ',
      village: 'બેણપ',
      location: 'મહિધરપુરા હીરાબજાર, સુરત',
      contact: '9825112345',
      whatsapp: '919825112345',
      highlights: ['નેચરલ સીવીડી & રીયલ ડાયમંડ્સ', 'હોલસેલ અને રીટેલ સપ્લાય', 'લેબ સર્ટિફાઇડ જ્વેલરી'],
      badgeColor: 'from-amber-500 to-yellow-500',
      icon: <FaGem className="text-amber-500 text-2xl" />,
    },
    {
      id: 2,
      title: 'મા અંબે ટેક્સટાઇલ & એમ્બ્રોઇડરી',
      slogan: 'લેટેસ્ટ ડિઝાઇનર સાડી અને ડ્રેસ મટિરિયલ ઉત્પાદક',
      category: 'textile',
      categoryLabel: 'ટેક્સટાઇલ ઉદ્યોગ',
      owner: 'પ્રજાપતિ દિનેશભાઈ કરશનભાઈ',
      village: 'ખોરડાં',
      location: 'રિંગ રોડ ટેક્સટાઇલ માર્કેટ, સુરત',
      contact: '9925234567',
      whatsapp: '919925234567',
      highlights: ['મલ્ટી-હેડ એમ્બ્રોઇડરી વર્ક', 'ડિઝાઇનર પાર્ટીવેર સાડી', 'ઓલ ઇન્ડિયા ટ્રાન્સપોર્ટ સગવડ'],
      badgeColor: 'from-cyan-600 to-teal-500',
      icon: <FaTshirt className="text-cyan-600 text-2xl" />,
    },
    {
      id: 3,
      title: 'પ્રજાપતિ ડેવલપર્સ & કન્સ્ટ્રક્શન',
      slogan: 'આપના સપનાનું ઘર બનાવો મજબૂત અને વાસ્તુશાસ્ત્ર મુજબ',
      category: 'realestate',
      categoryLabel: 'રિયલ એસ્ટેટ & બિલ્ડર્સ',
      owner: 'પ્રજાપતિ મહેશભાઈ નાગજીભાઈ',
      village: 'મમાણા',
      location: 'પાલ-અડાજણ / વરાછા, સુરત',
      contact: '9879345678',
      whatsapp: '919879345678',
      highlights: ['૨ & ૩ BHK લક્ઝુરિયસ ફ્લેટ્સ', 'કોમર્શિયલ શોપ્સ & ઓફિસ', '૧૦૦% રેરા એપ્રૂવ્ડ પ્રોજેક્ટ્સ'],
      badgeColor: 'from-teal-600 to-emerald-500',
      icon: <FaBuilding className="text-teal-600 text-2xl" />,
    },
    {
      id: 4,
      title: 'શ્રી ગણેશ એન્જિનિયરિંગ & મશીનરી',
      slogan: 'ઇન્ડસ્ટ્રીયલ મશીનરી રિપેરિંગ અને લેથવર્ક સોલ્યુશન્સ',
      category: 'services',
      categoryLabel: 'ટેકનિકલ સેવાઓ',
      owner: 'પ્રજાપતિ હરેશભાઈ ભીખાભાઈ',
      village: 'ભાટવર',
      location: 'કતારગામ જીઆઈડીસી, સુરત',
      contact: '9913456789',
      whatsapp: '919913456789',
      highlights: ['સીએનસી લેથ મશીન વર્ક', 'ફેબ્રિકેશન & ઇન્ડસ્ટ્રીયલ પાર્ટ્સ', '૨૪x૭ ઓનસાઇટ સર્વિસ સપોર્ટ'],
      badgeColor: 'from-purple-600 to-indigo-500',
      icon: <FaTools className="text-purple-600 text-2xl" />,
    },
  ];

  const filteredBusinesses = businesses.filter((biz) => {
    if (selectedCategory === 'all') return true;
    return biz.category === selectedCategory;
  });

  return (
    <section className="space-y-10 py-6">
      {/* Header with Unique Samaj Business Branding */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 px-4 py-1.5 rounded-full text-cyan-800 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm">
          <BsStars className="text-amber-500" />
          <span>સમાજ વ્યાપાર અને ઉદ્યોગ મંચ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          જ્ઞાતિજનોના પ્રતિષ્ઠિત વ્યાપાર & સેવાઓ
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          "સમાજનો વેપાર, સમાજ સાથે સહકાર" — સુરતમાં વસતા ચાર પરગણા પ્રજાપતિ ઉદ્યોગસાહસિકો અને વેપારી ભાઈઓની વિશ્વસનીય પ્રોફાઇલ્સ.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Category Pills Switcher */}
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {businessCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-cyan-600/20 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Grid of Innovative Business Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredBusinesses.map((biz) => (
          <div
            key={biz.id}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border-slate-200 bg-white flex flex-col justify-between shadow-md relative overflow-hidden group"
          >
            {/* Top Gradient Highlight */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${biz.badgeColor}`}></div>

            <div>
              {/* Header: Icon, Category & Verified Badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {biz.icon}
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-200 mb-1">
                      {biz.categoryLabel}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {biz.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-bold shadow-xs whitespace-nowrap">
                  <FaCheckCircle className="text-emerald-600" />
                  <span>વેરિફાઇડ</span>
                </div>
              </div>

              {/* Slogan */}
              <p className="text-xs sm:text-sm font-medium text-cyan-800 bg-cyan-50/60 p-2.5 rounded-xl border border-cyan-100 mb-4">
                "{biz.slogan}"
              </p>

              {/* Owner Info & Village Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-4">
                <div className="flex items-center space-x-1.5">
                  <FaUserTie className="text-slate-400 flex-shrink-0" />
                  <span>સંચાલક: <strong className="text-slate-800">{biz.owner}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-semibold text-[11px]">
                    વતન ગામ: {biz.village}
                  </span>
                </div>
                <div className="sm:col-span-2 flex items-center space-x-1.5 text-slate-500 pt-1">
                  <FaMapMarkerAlt className="text-rose-500 flex-shrink-0" />
                  <span className="truncate">{biz.location}</span>
                </div>
              </div>

              {/* Key Highlights / Specialties */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-6">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                  મુખ્ય સેવાઓ / વિશેષતા:
                </span>
                {biz.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 flex-shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar: Direct Phone Call & WhatsApp Connect */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`tel:${biz.contact}`}
                className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <FaPhoneAlt className="text-[10px]" />
                <span>કોલ કરો ({biz.contact})</span>
              </a>

              <a
                href={`https://wa.me/${biz.whatsapp}?text=${encodeURIComponent('જય ધરણીધર, હું શ્રી ચાર પરગણા પ્રજાપતિ સમાજ પોર્ટલ પરથી આપની બિઝનેસ પ્રોફાઇલ જોઈને સંપર્ક કરું છું.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <FaWhatsapp className="text-sm" />
                <span>વોટ્સએપ</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Creative "Add Your Business" Callout Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-cyan-200 bg-gradient-to-r from-cyan-50 via-teal-50 to-sky-50 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-600 text-white flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
            <FaBullhorn />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              શું તમે પણ સમાજ મંચ પર આપના વ્યાપારની જાહેરાત આપવા માંગો છો?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              સુરતમાં વસતા ૧૫૦૦+ પરિવારો અને સમગ્ર જ્ઞાતિ સુધી આપના વ્યવસાયની માહિતી પહોંચાડો.
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all whitespace-nowrap"
        >
          <span>બિઝનેસ રજીસ્ટ્રેશન કરો</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </Link>
      </div>
    </section>
  );
};

export default Advertisement;