import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBuilding, FaUsers, FaHandsHelping, FaHistory, FaAward, FaImages, FaPhoneAlt } from 'react-icons/fa';
import { GiScrollQuill, GiTempleDoor } from 'react-icons/gi';
import { BsCheckCircleFill, BsArrowRight } from 'react-icons/bs';
import News from './News';
import Advertisement from './Advertisement';
import Silder from '../../components/Silder';
import Marquees from '../../components/Marquees';

const Home = () => {
  const { t } = useTranslation();

  const stats = [
    { label: 'પરગણા પ્રદેશો', value: '૪+', desc: 'વાવ, થરાદ, સુઈગામ, ભાભર' },
    { label: 'સંકળાયેલા ગામો', value: '૨૫+', desc: 'વતન અને સરહદી વિસ્તારો' },
    { label: 'જ્ઞાતિ પરિવારો', value: '૧૫૦૦+', desc: 'સુરત ખાતે વસવાટ' },
    { label: 'કારોબારી સભ્યો', value: '૨૬', desc: 'સમાજ સેવા માટે કટિબદ્ધ' },
  ];

  const initiatives = [
    {
      title: 'શિક્ષણ & સરસ્વતી સન્માન',
      desc: 'તેજસ્વી વિદ્યાર્થીઓનું વાર્ષિક સન્માન, પુસ્તક સહાય અને ઉચ્ચ અભ્યાસ માટે માર્ગદર્શન.',
      icon: <FaGraduationCap className="text-2xl text-amber-500" />,
      color: 'border-amber-200 hover:border-amber-400',
    },
    {
      title: 'સમાજ વાડી & ભવન નિર્માણ',
      desc: 'જ્ઞાતિજનોના સામાજિક તથા શુભ પ્રસંગો માટે સુરત ખાતે અદ્યતન સમાજ ભવનનું નિર્માણ.',
      icon: <GiTempleDoor className="text-2xl text-purple-600" />,
      color: 'border-purple-200 hover:border-purple-400',
    },
    {
      title: 'સ્નેહમિલન & સાંસ્કૃતિક ઉત્સવ',
      desc: 'વાર્ષિક સ્નેહમિલન, સમૂહ ભોજન, નવરાત્રિ રાસ-ગરબા અને ભવ્ય પાટોત્સવનું આયોજન.',
      icon: <FaUsers className="text-2xl text-cyan-600" />,
      color: 'border-cyan-200 hover:border-cyan-400',
    },
    {
      title: 'આરોગ્ય & સામાજિક સુરક્ષા',
      desc: 'જરૂરિયાતમંદ પરિવારોને તબીબી સારવાર, બ્લડ ડોનેશન અને આકસ્મિક સંજોગોમાં સહાય.',
      icon: <FaHandsHelping className="text-2xl text-teal-600" />,
      color: 'border-teal-200 hover:border-teal-400',
    },
  ];

  const quickLinks = [
    { title: 'સમાજનો ઇતિહાસ', link: '/history', desc: 'પૌરાણિક વારસો અને સુરતમાં વિકાસ યાત્રા', icon: <FaHistory className="text-cyan-600" /> },
    { title: 'કારોબારી કમિટી', link: '/committee', desc: 'હોદ્દેદારો અને કારોબારી સભ્યોની યાદી', icon: <FaAward className="text-amber-500" /> },
    { title: 'અમારા વિશે', link: '/about', desc: 'સમાજ પરિચય, ઉદ્દેશ્યો અને બંધારણ', icon: <FaBuilding className="text-emerald-600 text-xl" /> },
    { title: 'ફોટો-વિડિયો ગેલેરી', link: '/gallery', desc: 'કાર્યક્રમો અને ઉત્સવોની યાદગાર પળો', icon: <FaImages className="text-sky-600" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
      {/* Marquee Announcement Bar */}
      <div className="glass-card rounded-2xl py-3 px-5 text-cyan-900 font-semibold text-sm border-cyan-200 shadow-md">
        <Marquees />
      </div>

      {/* Hero Slider */}
      <Silder />

      {/* Welcome & 3 Core Message Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-cyan-600 font-bold text-xs sm:text-sm uppercase tracking-wider block mb-1">
            આદર્શ વિચારધારા
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Welcome & Vision */}
          <div className="glass-card glass-card-hover rounded-3xl p-7 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
            <div>
              <span className="inline-block px-3 py-1 bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold rounded-full mb-3">
                જ્ઞાતિ આવકાર
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t('welcome')}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {t('description')}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-cyan-600 font-bold text-xs flex items-center justify-between">
              <span>દીપથી દીપ પ્રગટાવીએ</span>
              <span>✨</span>
            </div>
          </div>

          {/* Card 2: Donation & Giving Value */}
          <div className="glass-card glass-card-hover rounded-3xl p-7 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
            <div>
              <span className="inline-block px-3 py-1 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold rounded-full mb-3">
                સમર્પણ ભાવ
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                સમાજ સેવા અને દાનનો મહિમા
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {t('description-extra')}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-teal-600 font-bold text-xs flex items-center justify-between">
              <span>જ્ઞાતિ ગંગા પવિત્ર પર્વ</span>
              <span>🙏</span>
            </div>
          </div>

          {/* Card 3: Community Unity & Future Goal */}
          <div className="glass-card glass-card-hover rounded-3xl p-7 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
            <div>
              <span className="inline-block px-3 py-1 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold rounded-full mb-3">
                સંગઠન શક્તિ
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                ચાર પરગણા એકતા & યુવા વિકાસ
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                સુરતમાં વસતા વાવ, થરાદ, સુઈગામ અને ભાભરના તમામ જ્ઞાતિજનો વચ્ચે પરસ્પર સ્નેહભાવ, યુવાનો માટે રોજગારી-ઉદ્યોગ માર્ગદર્શન અને કન્યા કેળવણીને પ્રોત્સાહન આપવું એ આપણી પ્રાથમિકતા છે.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-sky-600 font-bold text-xs flex items-center justify-between">
              <span>{t('thankyou-god')}</span>
              <span>🚩</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats Bar */}
      <section className="glass-card rounded-3xl p-6 sm:p-10 shadow-lg border-slate-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {stats.map((stat, index) => (
            <div key={index} className={`p-3 ${index > 0 ? 'pt-4 lg:pt-0' : ''}`}>
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-800 mb-1">
                {stat.label}
              </div>
              <p className="text-xs text-slate-500">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Activities / Initiatives */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-cyan-600 font-bold text-xs sm:text-sm uppercase tracking-wider block mb-1">
            સેવાકીય પ્રવૃત્તિઓ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            સમાજના મુખ્ય સેવા કાર્યો
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item, idx) => (
            <div
              key={idx}
              className={`glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between border ${item.color} group`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>
              <div className="text-xs font-bold text-teal-600 flex items-center space-x-1">
                <BsCheckCircleFill className="text-[11px]" />
                <span>સક્રિય પ્રવૃત્તિ</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News Slider Component */}
      <News />

      {/* Business Directory Slider Component */}
      <Advertisement />

      {/* Quick Navigation Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-cyan-600 font-bold text-xs sm:text-sm uppercase tracking-wider block mb-1">
            મુખ્ય વિભાગો
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            સમાજ પોર્ટલના મુખ્ય પેજીસ
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between group border-slate-200"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 group-hover:text-cyan-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold text-cyan-600 group-hover:translate-x-1 transition-transform">
                <span>વિગતવાર જુઓ</span>
                <BsArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Banner / Call to Action */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center shadow-lg border-cyan-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500"></div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
          સમાજ સંગઠનમાં સહભાગી બનો
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6">
          આપણા સમાજની કોઈપણ માહિતી, સૂચન કે સહાય માટે કાર્યાલય અથવા સંપર્ક ફોર્મ દ્વારા અમારો સંપર્ક કરો.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-cyan-600/25 transition-all"
        >
          <FaPhoneAlt className="text-xs" />
          <span>સંપર્ક કરો (Contact Us)</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
