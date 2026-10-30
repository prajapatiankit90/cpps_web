import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCrown, FaHandsHelping, FaGraduationCap, FaBuilding, FaHeart, FaSearch, FaPhoneAlt } from 'react-icons/fa';
import { GiReceiveMoney, GiTrophyCup } from 'react-icons/gi';
import { BsCheckCircleFill } from 'react-icons/bs';

const Donors = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredDonors = [
    {
      id: 1,
      name: 'પ્રજાપતિ અલ્પેશભાઈ ગંગદાસભાઈ',
      village: 'બેણપ',
      amount: '₹ ૧૧,૧૧,૧૧૧/-',
      purpose: 'સમાજ વાડી નિર્માણ મુખ્ય દાતાશ્રી',
      badge: 'પરમ ભામાશા',
      tier: 'platinum',
    },
    {
      id: 2,
      name: 'શ્રી પ્રજાપતિ આશિષભાઈ હરજીભાઈ',
      village: 'ખોરડાં',
      amount: '₹ ૫,૫૫,૫૫૫/-',
      purpose: 'સમાજ ભવન હોલ નિર્માણ સહયોગ',
      badge: 'મુખ્ય દાતા',
      tier: 'gold',
    },
    {
      id: 3,
      name: 'શ્રી પ્રજાપતિ ભરતભાઈ હીરાભાઈ',
      village: 'મમાણા',
      amount: '₹ ૩,૩૩,૩૩૩/-',
      purpose: 'સરસ્વતી સન્માન શૈક્ષણિક ફંડ',
      badge: 'શિક્ષણ પ્રેરક',
      tier: 'gold',
    },
    {
      id: 4,
      name: 'શ્રી પ્રજાપતિ કાનજીભાઈ ભગાભાઇ',
      village: 'અભેપુરા',
      amount: '₹ ૨,૫૧,૦૦૦/-',
      purpose: 'વાર્ષિક સ્નેહમિલન & ભોજન સમારોહ પ્રાયોજક',
      badge: 'ઉત્સવ દાતા',
      tier: 'silver',
    },
  ];

  const donorsList = [
    { id: 1, name: 'પ્રજાપતિ અલ્પેશભાઈ ગંગદાસભાઈ', village: 'બેણપ', amount: '₹ ૧૧,૧૧,૧૧૧/-', category: 'building', purpose: 'વાડી નિર્માણ' },
    { id: 2, name: 'પ્રજાપતિ આશિષભાઈ હરજીભાઈ', village: 'ખોરડાં', amount: '₹ ૫,૫૫,૫૫૫/-', category: 'building', purpose: 'સમાજ ભવન' },
    { id: 3, name: 'પ્રજાપતિ ભરતભાઈ હીરાભાઈ', village: 'મમાણા', amount: '₹ ૩,૩૩,૩૩૩/-', category: 'education', purpose: 'શિક્ષણ ફંડ' },
    { id: 4, name: 'પ્રજાપતિ કાનજીભાઈ ભગાભાઇ', village: 'અભેપુરા', amount: '₹ ૨,૫૧,૦૦૦/-', category: 'events', purpose: 'સ્નેહમિલન' },
    { id: 5, name: 'પ્રજાપતિ વાલજીભાઈ માવજીભાઈ', village: 'મમાણા', amount: '₹ ૨,૦૦,૦૦૦/-', category: 'main', purpose: 'સમાજ વિકાસ' },
    { id: 6, name: 'પ્રજાપતિ ગણેશભાઇ કરશનભાઈ', village: 'ભાટવરવાસ', amount: '₹ ૧,૫૧,૦૦૦/-', category: 'building', purpose: 'વાડી નિર્માણ' },
    { id: 7, name: 'પ્રજાપતિ જલ્પેશભાઈ હરજીભાઈ', village: 'જામપુર', amount: '₹ ૧,૨૫,૦૦૦/-', category: 'education', purpose: 'વિદ્યાર્થી સહાય' },
    { id: 8, name: 'પ્રજાપતિ અરજણભાઇ રવજીભાઈ', village: 'લીંબાળા', amount: '₹ ૧,૧૧,૧૧૧/-', category: 'main', purpose: 'સામાજિક ફંડ' },
    { id: 9, name: 'પ્રજાપતિ પીરાભાઈ માવજીભાઈ', village: 'કોરેટી', amount: '₹ ૧,૦૧,૦૦૦/-', category: 'events', purpose: 'પાટોત્સવ સેવા' },
    { id: 10, name: 'પ્રજાપતિ રાજેશભાઈ ગંગારામભાઈ', village: 'ઉમેદપૂરા', amount: '₹ ૧,૦૦,૦૦૦/-', category: 'building', purpose: 'ભવન નિર્માણ' },
    { id: 11, name: 'પ્રજાપતિ જીવાભાઈ રતાભાઈ', village: 'પાડણ', amount: '₹ ૭૫,૦૦૦/-', category: 'education', purpose: 'પુસ્તક વિતરણ' },
    { id: 12, name: 'પ્રજાપતિ મોહનભાઈ પાતાભાઈ', village: 'સુઈગામ', amount: '₹ ૫૧,૦૦૦/-', category: 'events', purpose: 'સ્નેહમિલન' },
    { id: 13, name: 'પ્રજાપતિ ગણેશભાઈ હરજીભાઈ', village: 'અશારા', amount: '₹ ૫૧,૦૦૦/-', category: 'events', purpose: 'રાસ-ગરબા ઉત્સવ' },
    { id: 14, name: 'પ્રજાપતિ કરશનભાઈ દાનાભાઈ', village: 'વાવ', amount: '₹ ૫૧,૦૦૦/-', category: 'education', purpose: 'શૈક્ષણિક પ્રોત્સાહન' },
    { id: 15, name: 'પ્રજાપતિ અશોકભાઈ દુદાભાઈ', village: 'દુદોસણ', amount: '₹ ૫૦,૦૦૦/-', category: 'building', purpose: 'વાડી સુવિધા' },
    { id: 16, name: 'પ્રજાપતિ ઈશ્વરભાઈ ભીખાભાઈ', village: 'ભાટવર', amount: '₹ ૩૧,૦૦૦/-', category: 'events', purpose: 'ધાર્મિક ઉત્સવ' },
    { id: 17, name: 'પ્રજાપતિ મોહનભાઈ ગંગારામભાઈ', village: 'રાછેણા', amount: '₹ ૨૫,૦૦૦/-', category: 'education', purpose: 'સ્કોલરશીપ સહાય' },
    { id: 18, name: 'પ્રજાપતિ તલાભાઈ નાગજીભાઈ', village: 'ભાટવર', amount: '₹ ૨૫,૦૦૦/-', category: 'events', purpose: 'સમૂહ ભોજન' },
    { id: 19, name: 'પ્રજાપતિ નગાભાઇ રણછોડભાઈ', village: 'કોરેટી', amount: '₹ ૨૧,૦૦૦/-', category: 'building', purpose: 'સમાજ કાર્યાલય' },
    { id: 20, name: 'પ્રજાપતિ પથુભાઈ નાગજીભાઈ', village: 'દેવપુરા', amount: '₹ ૨૧,૦૦૦/-', category: 'education', purpose: 'વિદ્યાર્થી સન્માન' },
    { id: 21, name: 'પ્રજાપતિ દેવશી ભાઈ', village: 'જામપુર', amount: '₹ ૧૫,૦૦૦/-', category: 'events', purpose: 'યુવા મહોત્સવ' },
  ];

  const filteredDonors = donorsList.filter((donor) => {
    const matchesCategory =
      activeCategory === 'all'
        ? true
        : activeCategory === 'main'
        ? donor.category === 'main' || parseInt(donor.amount.replace(/[^0-9]/g, '')) >= 100000
        : donor.category === activeCategory;

    const matchesSearch =
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.purpose.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-14 shadow-lg text-center border-amber-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full text-amber-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          <GiTrophyCup className="text-base" />
          <span>સમાજના ભામાશા અને પ્રેરણાસ્રોત</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          ગૌરવવંતા દાતાશ્રીઓ
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          "લેનારા કરતા દેનાર મોટો હોય છે. લેનારનો હાથ નીચો હોય છે અને આપનારનો હાથ ઉપર એ નિર્ભય સત્ય છે." — સમાજના વિકાસમાં ઉદાર હાથે સહયોગ આપનાર તમામ દાતાશ્રીઓનું હૃદયપૂર્વક આભાર.
        </p>
      </div>

      {/* Featured Chief Donors */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-amber-600 font-bold text-xs sm:text-sm uppercase tracking-wider block mb-1">
            પરમ સહયોગીઓ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            મુખ્ય દાતાશ્રીઓનું ગૌરવ સન્માન
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDonors.map((donor) => (
            <div
              key={donor.id}
              className="glass-card glass-card-hover rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between text-center border-amber-200 group"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>

              {/* Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-full">
                  <FaCrown className="text-xs" />
                  <span>{donor.badge}</span>
                </span>
              </div>

              {/* Icon / Crown circle */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 text-2xl shadow-sm group-hover:scale-110 transition-transform mb-4">
                <GiReceiveMoney />
              </div>

              {/* Donor Name & Village */}
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                  {donor.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  ગામ: <span className="text-slate-800 font-semibold">{donor.village}</span>
                </p>
              </div>

              {/* Amount & Purpose */}
              <div className="pt-4 border-t border-slate-100 bg-amber-50/40 -mx-6 -mb-6 p-4 rounded-b-3xl">
                {/* <div className="text-xl font-extrabold text-amber-700 tracking-wide mb-1">
                  {donor.amount}
                </div> */}
                <p className="text-xs text-slate-600 leading-snug">
                  {donor.purpose}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Donors Directory Section */}
      <section className="glass-card rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              સમાજ દાતાશ્રીઓની નામાવલી
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              કુલ {filteredDonors.length} દાતાશ્રીઓની વિગતો દર્શાવેલ છે.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FaSearch className="text-sm" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="નામ કે ગામ શોધો..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            બધા દાતાશ્રીઓ ({donorsList.length})
          </button>
          <button
            onClick={() => setActiveCategory('main')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'main'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <FaCrown className="text-amber-500" />
            <span>મુખ્ય દાતાશ્રીઓ (₹ ૧ લાખ+)</span>
          </button>
          <button
            onClick={() => setActiveCategory('building')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'building'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <FaBuilding className="text-teal-600" />
            <span>વાડી/ભવન નિર્માણ</span>
          </button>
          <button
            onClick={() => setActiveCategory('education')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'education'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <FaGraduationCap className="text-amber-500" />
            <span>શૈક્ષણિક ફંડ</span>
          </button>
          <button
            onClick={() => setActiveCategory('events')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'events'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <FaHeart className="text-rose-500" />
            <span>સ્નેહમિલન & ઉત્સવ</span>
          </button>
        </div>

        {/* Donors List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDonors.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-cyan-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {item.name}
                  </h4>
                  <span className="inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-medium">
                    ગામ: {item.village}
                  </span>
                </div>
                {/* <span className="text-base font-extrabold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 whitespace-nowrap">
                  {item.amount}
                </span> */}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>હેતુ: <strong className="text-slate-800">{item.purpose}</strong></span>
                <span className="text-teal-600 flex items-center space-x-1 font-semibold">
                  <BsCheckCircleFill className="text-[10px]" />
                  <span>પ્રાપ્ત</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Donate / Appeal Section */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 border-cyan-200 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center space-x-2 text-cyan-700 font-bold text-xs uppercase tracking-wider">
              <FaHandsHelping />
              <span>સહયોગ માટે નમ્ર અપીલ</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              સમાજના ઉત્કર્ષ અને નિર્માણ કાર્યમાં સહભાગી બનો
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત દ્વારા શિક્ષણ પ્રોત્સાહન, ગરીબ વિદ્યાર્થીઓને સહાય, મેડિકલ રાહત તથા સમાજ ભવન/વાડી નિર્માણ માટે દાન સ્વીકારવામાં આવે છે. આપનું નાનું યોગદાન પણ સમાજને નવી ઊંચાઈ પર લઈ જઈ શકે છે.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                ✓ 100% પારદર્શક હિસાબ
              </div>
              <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                ✓ સત્તાવાર રસીદ
              </div>
              <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                ✓ વેબસાઇટ અને સ્મૃતિપત્રિકામાં નામ નોંધ
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-cyan-200 text-center space-y-4">
            <h3 className="text-lg font-bold text-slate-900">દાન સહયોગ સંપર્ક</h3>
            <p className="text-xs text-slate-600">
              બેંક ટ્રાન્સફર અથવા રસીદ મેળવવા માટે સમાજના કાર્યાલય અથવા ટ્રસ્ટીશ્રીઓનો સંપર્ક કરો.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              <FaPhoneAlt className="text-xs" />
              <span>સંપર્ક કરો (Contact Us)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donors;
