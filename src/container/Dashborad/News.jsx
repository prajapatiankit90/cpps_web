import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaTag, 
  FaBullhorn, 
  FaGraduationCap, 
  FaBuilding, 
  FaHeartbeat, 
  FaTrophy, 
  FaTimes, 
  FaPhoneAlt, 
  FaExternalLinkAlt, 
  FaClock 
} from 'react-icons/fa';
import { GiTempleDoor, GiReceiveMoney } from 'react-icons/gi';
import { BsStars, BsArrowRight } from 'react-icons/bs';

import Slider1 from '../../assets/image/Slider1.jpg';
import Slider2 from '../../assets/image/Slider2.jpg';
import Slider3 from '../../assets/image/Slider3.jpg';
import footerImage from '../../assets/image/footer.jpg';

const News = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeNewsModal, setActiveNewsModal] = useState(null);

  const newsCategories = [
    { id: 'all', label: 'બધા સમાચાર' },
    { id: 'education', label: 'શૈક્ષણિક પરિપત્ર' },
    { id: 'development', label: 'ભવન & વિકાસ' },
    { id: 'events', label: 'સ્નેહમિલન & ઉત્સવો' },
    { id: 'health', label: 'આરોગ્ય & સેવા' },
  ];

  const newsList = [
    {
      id: 1,
      category: 'education',
      categoryLabel: 'શૈક્ષણિક પરિપત્ર',
      title: 'સરસ્વતી સન્માન સમારોહ ૨૦૨૪-૨૫: તેજસ્વી વિદ્યાર્થીઓ માટે રજીસ્ટ્રેશન શરૂ',
      shortDesc: 'ધોરણ ૧૦ (૮૦%+), ધોરણ ૧૨ (૭૫%+) તથા કોલેજ/ડિગ્રીમાં ઉત્કૃષ્ટ પરિણામ લાવનાર વિદ્યાર્થીઓનું ભવ્ય સન્માન કરવામાં આવશે.',
      fullContent: 'શ્રી ચાર પરગણા પ્રજાપતિ સમાજ સુરત દ્વારા આગામી વાર્ષિક ઉત્સવમાં શૈક્ષણિક વર્ષ ૨૦૨૩-૨૪ ના તેજસ્વી તારલાઓનું સરસ્વતી સન્માન ટ્રોફી અને પ્રમાણપત્ર આપી ગૌરવ વધારવામાં આવશે. તમામ વાલીશ્રીઓને વિનંતી કે વિદ્યાર્થીની માર્કશીટની નકલ, પાસપોર્ટ સાઈઝનો ફોટો અને આધારકાર્ડ સાથે કાર્યાલય અથવા મંત્રીશ્રીનો સંપર્ક કરવો.',
      date: '૧૫ ઓક્ટોબર ૨૦૨૪',
      deadline: 'છેલ્લી તારીખ: ૨૫ ઓક્ટોબર ૨૦૨૪',
      location: 'સમાજ ભવન કાર્યાલય, સુરત',
      coordinator: 'શ્રી ભરતભાઈ હીરાભાઈ (મંત્રીશ્રી)',
      phone: '8469398662',
      image: Slider2,
      isFeatured: true,
      badge: 'મહત્વપૂર્ણ નોટિસ',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      id: 2,
      category: 'development',
      categoryLabel: 'ભવન & વિકાસ',
      title: 'સમાજ વાડી & ભવન નિર્માણ: બીજા માળનું સ્લેબ કાર્ય સફળતાપૂર્વક પૂર્ણ',
      shortDesc: 'દાતાશ્રીઓના ઉદાર સહયોગ અને આશીર્વાદથી સુરત ખાતે અદ્યતન સમાજ ભવનનું બાંધકામ પૂર્ણતાના આરે.',
      fullContent: 'જ્ઞાતિજનો માટે ખુશીના સમાચાર છે કે સુરત ખાતે નિર્માણ પામી રહેલ સમાજ ભવનના બીજા માળનું સ્લેબ ઢાળવાનું કાર્ય પૂર્ણ થઈ ગયું છે. હવે આંતરિક પ્લાસ્ટર, ટાઇલ્સ અને ઇલેક્ટ્રિફિકેશનનું કામ શરૂ કરવામાં આવ્યું છે. આગામી ૬ મહિનામાં ભવનનું લોકાર્પણ કરવાનો સંકલ્પ છે. તમામ દાતાશ્રીઓનો સમાજ ઋણી છે.',
      date: '૧૦ ઓક્ટોબર ૨૦૨૪',
      deadline: 'લક્ષ્યાંક: માર્ચ ૨૦૨૫ લોકાર્પણ',
      location: 'સમાજ વાડી સાઇટ, સુરત',
      coordinator: 'શ્રી જીવાભાઈ રતાભાઈ (પ્રમુખશ્રી)',
      phone: '9979511169',
      image: Slider3,
      isFeatured: true,
      badge: 'સમાજ ગૌરવ',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    {
      id: 3,
      category: 'events',
      categoryLabel: 'સ્નેહમિલન & ઉત્સવો',
      title: 'વાર્ષિક સ્નેહમિલન અને જ્ઞાતિ સમૂહ ભોજન સમારોહનું ભવ્ય આયોજન',
      shortDesc: 'દિવાળી પર્વ બાદ સુરતમાં વસતા તમામ ચાર પરગણા પ્રજાપતિ પરિવારો માટે સ્નેહ સંમેલન.',
      fullContent: 'નૂતન વર્ષના સ્નેહમિલન અને જ્ઞાતિજનો વચ્ચે પરસ્પર પ્રેમ અને ભાઈચારો વધે તે હેતુથી વાર્ષિક સ્નેહમિલનનું આયોજન કરવામાં આવ્યું છે. જેમાં સાંસ્કૃતિક કાર્યક્રમો, સંતવાણી અને સમૂહ ભોજનનો સમાવેશ થશે. સમગ્ર પરિવાર સાથે પધારવા હાર્દિક નિમંત્રણ છે.',
      date: '૫ નવેમ્બર ૨૦૨૪',
      deadline: 'સમય: સવારે ૯:૦૦ થી સાંજે ૪:૦૦',
      location: 'સુરત પાર્ટી પ્લોટ, સુરત',
      coordinator: 'કારોબારી કમિટી, સુરત',
      phone: '9574790731',
      image: Slider1,
      isFeatured: false,
      badge: 'સ્નેહમિલન',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    },
    {
      id: 4,
      category: 'health',
      categoryLabel: 'આરોગ્ય & સેવા',
      title: 'વિશાળ રક્તદાન કેમ્પ અને વિનામૂલ્યે મેડિકલ હેલ્થ ચેકઅપ કેમ્પ',
      shortDesc: 'યુવા સંગઠન દ્વારા ૨૫૦+ રક્ત બોટલ એકત્ર કરવાનો અને જ્ઞાતિજનો માટે બોડી ચેકઅપનો સેવા યજ્ઞ.',
      fullContent: 'સમાજ સેવાના ભાગરૂપે લાયન્સ ક્લબ અને બ્લડ બેંકના સહયોગથી વિનામૂલ્યે ડાયાબિટીસ, બ્લડ પ્રેશર, આંખની તપાસ તથા રક્તદાન કેમ્પ યોજાશે. તબીબી નિષ્ણાંત ડોક્ટરો હાજર રહેશે અને જરૂરિયાતમંદોને દવાઓ પણ વિનામૂલ્યે અપાશે.',
      date: '૨૦ નવેમ્બર ૨૦૨૪',
      deadline: 'સમય: સવારે ૮:૩૦ થી બપોરે ૧:૦૦',
      location: 'સમાજ હોલ, સુરત',
      coordinator: 'શ્રી અશોકભાઈ દુદાભાઈ (મીડિયા કન્વીનર)',
      phone: '9998872970',
      image: footerImage,
      isFeatured: false,
      badge: 'સેવા પ્રવૃત્તિ',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 5,
      category: 'events',
      categoryLabel: 'રમત-ગમત મહોત્સવ',
      title: 'ચાર પરગણા પ્રજાપતિ પ્રીમિયર લીગ (CPPL-2024) ક્રિકેટ ટુર્નામેન્ટ',
      shortDesc: 'સુરત ખાતે સમાજના યુવાનો વચ્ચે ૧૬ ટીમોની રોમાંચક ડે-નાઇટ ક્રિકેટ ટુર્નામેન્ટ.',
      fullContent: 'યુવાઓમાં ખેલદિલી અને ફિટનેસ વધારવા માટે ભવ્ય ટેનિસ ક્રિકેટ ટુર્નામેન્ટનું આયોજન. વિજેતા અને ઉપવિજેતા ટીમને આકર્ષક ટ્રોફી અને રોકડ પુરસ્કાર અપાશે. ટીમ એન્ટ્રી માટે છેલ્લી તારીખ ૧૦ ડિસેમ્બર છે.',
      date: '૨૫ ડિસેમ્બર ૨૦૨૪',
      deadline: 'એન્ટ્રી ફી: ₹ ૨,૦૦૦ પ્રતિ ટીમ',
      location: 'સુરત ઇન્ટરનેશનલ ક્રિકેટ ગ્રાઉન્ડ',
      coordinator: 'યુવા મંડળ પ્રમુખશ્રી',
      phone: '9638578181',
      image: Slider2,
      isFeatured: false,
      badge: 'સ્પોર્ટ્સ',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    },
    {
      id: 6,
      category: 'development',
      categoryLabel: 'ધાર્મિક ઉત્સવ',
      title: 'શ્રી ધરણીધર ભગવાન વાર્ષિક પાટોત્સવ અને ૧૦૮ દીવડાંની મહાઆરતી',
      shortDesc: 'જ્ઞાતિજનો દ્વારા ભક્તિભાવપૂર્વક હવન, સંતવાણી અને મહાપ્રસાદનું ધાર્મિક આયોજન.',
      fullContent: 'સમાજ પર ધરણીધર પ્રભુની અસીમ કૃપા સદા બની રહે તે માટે શાસ્ત્રોક્ત વિધિથી યજ્ઞ, ધ્વજારોહણ અને ૧૦૮ દીપકોની મહાઆરતીનું આયોજન કરવામાં આવ્યું છે. તમામ પરિવારોને દર્શન અને મહાપ્રસાદનો લાભ લેવા ભાવભર્યું નિમંત્રણ.',
      date: '૧૪ જાન્યુઆરી ૨૦૨૫',
      deadline: 'મહાઆરતી: સાંજે ૭:૦૦ કલાકે',
      location: 'શ્રી ધરણીધર મંદિર પરિસર, સુરત',
      coordinator: 'શ્રી કાનજીભાઈ ભગાભાઇ (ખજાનચીશ્રી)',
      phone: '9825766844',
      image: Slider1,
      isFeatured: false,
      badge: 'ધાર્મિક',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    },
  ];

  const filteredNews = newsList.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  return (
    <section className="space-y-10 py-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 px-4 py-1.5 rounded-full text-cyan-800 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm">
          <FaBullhorn className="text-cyan-700" />
          <span>સમાચાર પત્રિકા & પરિપત્રો</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          નવીનતમ સમાચાર & પરિપત્રો
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          શ્રી ચાર પરગણા પ્રજાપતિ સમાજ સુરતની શૈક્ષણિક, સામાજિક, ધાર્મિક અને ભવન નિર્માણ લક્ષી તાજી અપડેટ્સ.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {newsCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedFilter(cat.id)}
            className={`px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm ${
              selectedFilter === cat.id
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-cyan-600/20 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* News Grid (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            onClick={() => setActiveNewsModal(news)}
            className="glass-card glass-card-hover rounded-3xl overflow-hidden border-slate-200 bg-white shadow-sm flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Image Banner */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Badge Tag */}
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${news.badgeColor}`}>
                  {news.badge}
                </span>

                {/* Date */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 text-xs text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <FaCalendarAlt className="text-cyan-400 text-[11px]" />
                  <span>{news.date}</span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 sm:p-6 space-y-3">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                  {news.categoryLabel}
                </span>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug">
                  {news.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {news.shortDesc}
                </p>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-700 group-hover:text-cyan-800">
              <span className="flex items-center space-x-1">
                <span>સંપૂર્ણ વિગત વાંચો</span>
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[11px] text-slate-500 font-normal truncate max-w-[120px]">
                {news.location}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive News Detail Modal */}
      {activeNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl glass-card rounded-3xl overflow-hidden shadow-2xl border-cyan-400 bg-white max-h-[90vh] flex flex-col">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveNewsModal(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Close"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-100 flex-shrink-0">
              <img
                src={activeNewsModal.image}
                alt={activeNewsModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex items-end p-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 shadow ${activeNewsModal.badgeColor}`}>
                    {activeNewsModal.badge}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
                    {activeNewsModal.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow">
              {/* Meta Info Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-cyan-600" />
                  <span>તારીખ: <strong className="text-slate-900">{activeNewsModal.date}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-amber-500" />
                  <span>સમય / મુદત: <strong className="text-slate-900">{activeNewsModal.deadline}</strong></span>
                </div>
                <div className="flex items-center space-x-2 sm:col-span-2">
                  <FaMapMarkerAlt className="text-rose-500" />
                  <span>સ્થળ: <strong className="text-slate-900">{activeNewsModal.location}</strong></span>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-800">
                  સંપૂર્ણ પરિપત્ર / વિગતવાર માહિતી:
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {activeNewsModal.fullContent}
                </p>
              </div>

              {/* Coordinator Contact Box */}
              <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-600 block">વધુ માહિતી માટે સંપર્ક:</span>
                  <strong className="text-sm text-slate-900">{activeNewsModal.coordinator}</strong>
                </div>
                <a
                  href={`tel:${activeNewsModal.phone}`}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow transition-all"
                >
                  <FaPhoneAlt className="text-[10px]" />
                  <span>કોલ કરો ({activeNewsModal.phone})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;