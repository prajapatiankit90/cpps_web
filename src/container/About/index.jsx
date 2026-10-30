import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaGraduationCap,
  FaHandsHelping,
  FaBuilding,
  FaHeart,
  FaEye,
  FaBullseye,
  FaAward,
  FaPhoneAlt,
  FaShieldAlt
} from 'react-icons/fa';
import { GiTempleDoor, GiScrollQuill, GiReceiveMoney } from 'react-icons/gi';
import { BsCheckCircleFill, BsStars } from 'react-icons/bs';
import Slider1 from '../../assets/image/Slider1.jpg';
import Slider2 from '../../assets/image/Slider2.jpg';
import Slider3 from '../../assets/image/Slider3.jpg';
import footerImage from '../../assets/image/footer.jpg';

const AboutUs = () => {
  const { t } = useTranslation();

  const values = [
    {
      title: 'એકતા અને બંધુત્વ',
      desc: 'ચાર પરગણાના તમામ જ્ઞાતિજનો વચ્ચે પારિવારિક પ્રેમ, ભાઈચારો અને સંગઠનની અતૂટ ભાવના.',
      icon: <FaUsers className="text-cyan-600 text-2xl" />,
      color: 'border-cyan-200 hover:border-cyan-400',
    },
    {
      title: 'શિક્ષણ અને તેજસ્વી ભવિષ્ય',
      desc: 'દરેક બાળક-બાળકી ઉચ્ચ અભ્યાસ કરે તે માટે વાર્ષિક સરસ્વતી સન્માન અને શૈક્ષણિક સહાય.',
      icon: <FaGraduationCap className="text-amber-500 text-2xl" />,
      color: 'border-amber-200 hover:border-amber-400',
    },
    {
      title: 'નિઃસ્વાર્થ સેવા અને સહકાર',
      desc: 'જરૂરિયાતમંદ દર્દીઓને મેડિકલ સહાય, આકસ્મિક રાહત અને આપત્તિ સમયે પરિવાર બનીને ઊભા રહેવું.',
      icon: <FaHandsHelping className="text-teal-600 text-2xl" />,
      color: 'border-teal-200 hover:border-teal-400',
    },
    {
      title: 'સંસ્કૃતિ અને ધાર્મિક પરંપરા',
      desc: 'શ્રી ધરણીધર ભગવાન અને કુળદેવીના સંસ્કારો, પાટોત્સવ અને સંત પરંપરાનું જતન કરવું.',
      icon: <GiTempleDoor className="text-purple-600 text-2xl" />,
      color: 'border-purple-200 hover:border-purple-400',
    },
    {
      title: 'પારદર્શક શાસન અને વહીવટ',
      desc: 'સમાજના દરેક ફંડ અને દાનનો ૧૦૦% પારદર્શક, પ્રમાણિક અને નિયમિત હિસાબ રાખવો.',
      icon: <FaShieldAlt className="text-emerald-600 text-2xl" />,
      color: 'border-emerald-200 hover:border-emerald-400',
    },
    {
      title: 'યુવા & મહિલા સશક્તિકરણ',
      desc: 'યુવાનોને વ્યાપાર-રોજગારમાં માર્ગદર્શન અને બહેનોને સામાજિક-સાંસ્કૃતિક કાર્યોમાં પ્રોત્સાહન.',
      icon: <BsStars className="text-rose-500 text-2xl" />,
      color: 'border-rose-200 hover:border-rose-400',
    },
  ];

  const activities = [
    {
      title: 'વાર્ષિક સ્નેહમિલન સમારોહ',
      desc: 'સુરતમાં વસતા ૧૫૦૦+ પરિવારોનું વાર્ષિક સ્નેહ સંમેલન અને જ્ઞાતિ સમૂહ ભોજન.',
      tag: 'વાર્ષિક મહોત્સવ',
    },
    {
      title: 'સરસ્વતી સન્માન એવોર્ડ',
      desc: 'ધોરણ ૧૦, ૧૨ તથા ડિગ્રી કોર્સમાં શ્રેષ્ઠ ગુણ મેળવનાર વિદ્યાર્થીઓનું ભવ્ય સન્માન.',
      tag: 'શિક્ષણ પ્રોત્સાહન',
    },
    {
      title: 'સમાજ વાડી & ભવન નિર્માણ',
      desc: 'જ્ઞાતિજનોના શુભ અને સામાજિક પ્રસંગો માટે અદ્યતન સુવિધાસભર ભવન નિર્માણ કાર્ય.',
      tag: 'સમાજ નિર્માણ',
    },
    {
      title: 'તબીબી & મેડિકલ રાહત ફંડ',
      desc: 'ગંભીર બીમારી કે આકસ્મિક સારવાર માટે ગરીબ દર્દીઓને આર્થિક તથા માર્ગદર્શક સહાય.',
      tag: 'આરોગ્ય સેવા',
    },
    {
      title: 'સ્પોર્ટ્સ & યુવા મહોત્સવ',
      desc: 'યુવાઓમાં સ્વાસ્થ્ય, સ્પોર્ટ્સમેનશિપ અને નેતૃત્વ ખીલે તે માટે ક્રિકેટ ટુર્નામેન્ટ.',
      tag: 'યુવા મંચ',
    },
    {
      title: 'મહિલા મંડળ સાંસ્કૃતિક મંચ',
      desc: 'રસોઈ સ્પર્ધા, નવરાત્રિ રાસ-ગરબા અને મહિલા સશક્તિકરણ લક્ષી કાર્યક્રમો.',
      tag: 'મહિલા વિકાસ',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-14 shadow-lg text-center border-cyan-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="inline-flex items-center space-x-2 bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full text-cyan-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          <GiScrollQuill className="text-base" />
          <span>પરિચય અને ઉદ્દેશ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          અમારા વિશે (About Us)
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત એ વાવ, થરાદ, સુઈગામ અને ભાભર ક્ષેત્રના સુરતમાં વસતા તમામ પરિવારોનું એક ગૌરવશાળી, પ્રગતિશીલ અને સેવાભાવી સંગઠન છે.
        </p>
      </div>

      {/* Main Story & Introduction Section */}
      <section className="glass-card rounded-3xl p-6 sm:p-10 shadow-lg border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-cyan-700 font-bold text-xs sm:text-sm uppercase tracking-wider block">
              અમારી ઓળખ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              એકતા, શિક્ષણ અને સંસ્કારનો પવિત્ર સંગમ
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              વતન ભૂમિથી સુરતની ઔદ્યોગિક નગરીમાં આવીને વસેલા આપણા સમાજના પરિવારોએ પોતાની સખત મહેનત, પ્રામાણિકતા અને સમર્પણથી હીરા, ટેક્સટાઇલ, કન્સ્ટ્રક્શન અને પ્રોફેશનલ ક્ષેત્રોમાં આગવી ઓળખ ઊભી કરી છે.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              આ સંગઠનનો મુખ્ય હેતુ જ્ઞાતિજનોને એકબીજા સાથે જોડવા, નવી પેઢીને સંસ્કાર અને ઉચ્ચ શિક્ષણ પૂરું પાડવું, તથા જરૂરિયાતમંદ પરિવારોને હંમેશા પડખે ઊભા રહેવાનો છે.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-cyan-700">૧૫૦૦+</div>
                <div className="text-xs text-slate-600 font-semibold mt-1">સુરત ખાતે પરિવારો</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-teal-700">૨૬</div>
                <div className="text-xs text-slate-600 font-semibold mt-1">નિષ્ઠાવાન કારોબારી સભ્યો</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <img
                src={footerImage}
                alt="શ્રી ચાર પરગણા પ્રજાપતિ સમાજ સુરત"
                className="relative rounded-3xl shadow-md w-full max-w-lg object-cover border border-slate-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="glass-card glass-card-hover rounded-3xl p-8 border-cyan-200 relative overflow-hidden flex flex-col justify-between shadow-md">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
          <div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 text-2xl mb-5 shadow-sm">
              <FaEye />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              અમારું વિઝન (Our Vision)
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              "શ્રી ચાર પરગણા પ્રજાપતિ સમાજના પ્રત્યેક પરિવાર અને યુવાન શૈક્ષણિક, સામાજિક તથા આર્થિક રીતે સ્વાવલંબી અને સશક્ત બને અને સમાજમાં ગૌરવભેર આગળ વધે."
            </p>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-center space-x-2">
              <BsCheckCircleFill className="text-cyan-600 flex-shrink-0" />
              <span>૧૦૦% શિક્ષિત અને સંસ્કારી નવી પેઢી</span>
            </li>
            <li className="flex items-center space-x-2">
              <BsCheckCircleFill className="text-cyan-600 flex-shrink-0" />
              <span>સમૃદ્ધ અને આત્મનિર્ભર જ્ઞાતિજનો</span>
            </li>
          </ul>
        </div>

        {/* Mission Card */}
        <div className="glass-card glass-card-hover rounded-3xl p-8 border-teal-200 relative overflow-hidden flex flex-col justify-between shadow-md">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
          <div>
            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 text-2xl mb-5 shadow-sm">
              <FaBullseye />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              અમારું મિશન (Our Mission)
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              "સેવા, સહકાર અને સંગઠનની ભાવના સાથે સમાજના દરેક વર્ગ સુધી સહાય પહોંચાડવી, વિદ્યાર્થીઓને પ્રોત્સાહન આપવું અને સમાજ ભવનનું નિર્માણ પૂર્ણ કરવું."
            </p>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-center space-x-2">
              <BsCheckCircleFill className="text-teal-600 flex-shrink-0" />
              <span>ગરીબ અને જરૂરિયાતમંદ પરિવારોને સમયસર સહાય</span>
            </li>
            <li className="flex items-center space-x-2">
              <BsCheckCircleFill className="text-teal-600 flex-shrink-0" />
              <span>પારદર્શક અને સેવાભાવી વહીવટ</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Core Values / 6 Pillars */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-cyan-600 font-bold text-xs sm:text-sm uppercase tracking-wider block mb-1">
            આપણા મૂળભૂત મૂલ્યો
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            સમાજના પાયાના સિદ્ધાંતો
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((item, idx) => (
            <div
              key={idx}
              className={`glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between border ${item.color} shadow-sm group`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Activities Section */}
      <section className="glass-card rounded-3xl p-6 sm:p-10 shadow-lg border-slate-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-cyan-600 font-bold text-xs sm:text-sm uppercase tracking-wider block mb-1">
            સમાજ નિર્માણ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            અમારી મુખ્ય સામાજિક પ્રવૃત્તિઓ
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-cyan-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-bold mb-3">
                  {act.tag}
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {act.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {act.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Navigation Appeal */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center shadow-lg border-cyan-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500"></div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
          સમાજ કાર્યમાં જોડાવો અને સહભાગી બનો
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6">
          આપણા સમાજની કોઈપણ પ્રવૃત્તિ, સૂચન કે શિક્ષણ સહાય માટે કાર્યાલય અથવા કારોબારી સભ્યોનો સંપર્ક કરો.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/committee"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
          >
            <FaUsers className="text-xs" />
            <span>કારોબારી કમિટી જુઓ</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl shadow-sm transition-all"
          >
            <FaPhoneAlt className="text-xs text-cyan-600" />
            <span>અમારો સંપર્ક કરો</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
