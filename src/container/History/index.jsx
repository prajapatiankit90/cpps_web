import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLandmark, FaUsers, FaHandsHelping, FaGraduationCap, FaAward, FaHistory } from 'react-icons/fa';
import { GiTempleDoor, GiScrollQuill } from 'react-icons/gi';
import { BsStars, BsShieldCheck } from 'react-icons/bs';
import footerImage from '../../assets/image/footer.jpg';

const History = () => {
  const { t } = useTranslation();

  const timelineEvents = [
    {
      year: 'પ્રારંભિક યુગ',
      title: 'ચાર પરગણાથી સુરત તરફ પ્રયાણ',
      desc: 'વાવ, થરાદ, સુઈગામ, ભાભર અને આસપાસના ગામોમાંથી જ્ઞાતિજનોએ રોજીરોટી અને ઉજ્જવળ ભવિષ્ય માટે સુરત શહેર તરફ પ્રયાણ કર્યું. હીરા ઉદ્યોગ, કાપડ બજાર અને બાંધકામ ક્ષેત્રે પોતાની પ્રામાણિકતા અને સખત પરિશ્રમથી અનોખી ઓળખ બનાવી.',
      icon: <FaHistory className="text-cyan-600 text-lg" />,
    },
    {
      year: 'સંગઠનની શરૂઆત',
      title: 'શ્રી ચાર પરગણા પ્રજાપતિ સમાજની સ્થાપના',
      desc: 'સુરતમાં વસતા તમામ ચાર પરગણા પ્રજાપતિ પરિવારોને એક છત્ર હેઠળ લાવવા, પરસ્પર સુખ-દુઃખમાં સહભાગી થવા અને જ્ઞાતિની એકતા મજબૂત કરવા વડીલો દ્વારા સમાજ સંગઠનની રચના કરવામાં આવી.',
      icon: <FaUsers className="text-teal-600 text-lg" />,
    },
    {
      year: 'સામાજિક ઉત્કર્ષ',
      title: 'સ્નેહમિલન અને સમૂહ કાર્યોનો પ્રારંભ',
      desc: 'વાર્ષિક સ્નેહમિલન, સમૂહ લગ્નોત્સવ, અને સરસ્વતી સન્માન સમારોહ જેવા કાર્યોનું આયોજન શરૂ થયું. સમાજના તેજસ્વી વિદ્યાર્થીઓને પ્રોત્સાહિત કરી ઉચ્ચ શિક્ષણ તરફ વાળવાના સાર્થક પ્રયાસો થયા.',
      icon: <FaAward className="text-amber-500 text-lg" />,
    },
    {
      year: 'ભવન અને વાડી નિર્માણ',
      title: 'સમાજ ભવનનું સપનું સાકાર',
      desc: 'જ્ઞાતિજનો અને ઉદારમના દાતાશ્રીઓના આર્થિક તેમજ નૈતિક સહયોગથી સમાજના સામાજિક પ્રસંગો અને કાર્યો માટે પોતાનું સમાજ ભવન/વાડીનું નિર્માણ કાર્ય હાથ ધરવામાં આવ્યું.',
      icon: <GiTempleDoor className="text-purple-600 text-lg" />,
    },
    {
      year: 'આધુનિક યુગ',
      title: 'ડિજિટલ કનેક્ટિવિટી અને યુવા સશક્તિકરણ',
      desc: 'આજના 21મી સદીના ડિજિટલ યુગમાં વેબસાઇટ, સોશિયલ મીડિયા અને મોબાઇલ એપ દ્વારા સમાજના દરેક પરિવારને જોડવા અને યુવા પેઢીને ટેકનોલોજી તથા બિઝનેસમાં આગળ લાવવા સતત કાર્યરત.',
      icon: <BsStars className="text-cyan-600 text-lg" />,
    },
  ];

  const pillars = [
    {
      title: 'સેવા (Service)',
      desc: 'જરૂરિયાતમંદ જ્ઞાતિજનોને મેડિકલ, આર્થિક તથા કુદરતી આપત્તિ સમયે સહાય કરવી એ સમાજનો પ્રાથમિક ધર્મ છે.',
      icon: <FaHandsHelping className="text-3xl text-cyan-600 mb-3" />,
    },
    {
      title: 'સહકાર (Cooperation)',
      desc: 'એકબીજાના સુખ-દુઃખમાં સહભાગી થઈ, વ્યાપાર-ધંધામાં પરસ્પર સહયોગ આપી સૌનો સાથ, સૌનો વિકાસ સાધવો.',
      icon: <FaUsers className="text-3xl text-teal-600 mb-3" />,
    },
    {
      title: 'શિક્ષણ (Education)',
      desc: 'દરેક બાળક અને બાળકી ઉચ્ચ શિક્ષણ મેળવે, સ્પર્ધાત્મક પરીક્ષાઓમાં સફળ થાય તે માટે માર્ગદર્શન અને સન્માન પૂરું પાડવું.',
      icon: <FaGraduationCap className="text-3xl text-amber-500 mb-3" />,
    },
    {
      title: 'સંસ્કાર (Culture & Values)',
      desc: 'આપણી પૌરાણિક સંસ્કૃતિ, સંત પરંપરા અને કુટુંબ ભાવનાને નવી પેઢીમાં ઉજાગર રાખવી.',
      icon: <BsShieldCheck className="text-3xl text-emerald-600 mb-3" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-14 shadow-lg text-center border-cyan-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="inline-flex items-center space-x-2 bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full text-cyan-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
          <GiScrollQuill className="text-base" />
          <span>ગૌરવશાળી વારસો અને પરંપરા</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          શ્રી ચાર પરગણા પ્રજાપતિ સમાજનો ઇતિહાસ
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          "નાત વિના ગત નથી અને સંગઠન વિના વિકાસ નથી" — આપણી પૌરાણિક સંસ્કૃતિ, ચાર પરગણાની પવિત્ર ભૂમિથી સુરતની કર્મભૂમિ સુધીની ભવ્ય અને પ્રેરણાદાયી જીવનયાત્રા.
        </p>
      </div>

      {/* Origin and Heritage Section */}
      <section className="glass-card rounded-3xl p-6 sm:p-10 shadow-lg border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed">
            <div className="inline-flex items-center space-x-2 text-cyan-700 font-bold text-sm">
              <FaLandmark />
              <span>પૌરાણિક મૂળ અને મહિમા</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              સૃષ્ટિના સર્જનહાર પ્રજાપતિ પરંપરા
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700">
              પ્રજાપતિ સમાજનો ઇતિહાસ સૃષ્ટિના આદિકાળ જેટલો પ્રાચીન અને ગૌરવશાળી છે. ભગવાન બ્રહ્માજીના માનસપુત્ર તરીકે પ્રજાપતિ પરંપરા આ પૃથ્વી પર પ્રથમ કલાકાર, નિર્માણકર્તા અને સર્જક તરીકે જાણીતી છે. માટીમાંથી અદભુત કલાકૃતિઓ સર્જીને માનવ સભ્યતાને આકાર આપવાનું કાર્ય પ્રજાપતિ સમાજે કર્યું છે.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              આપણો સમાજ ધર્મનિષ્ઠ, પરિશ્રમી, સંતોષી અને સેવાભાવી રહ્યો છે. ભગવાન શ્રી ધરણીધર અને કુળદેવી માતાજીના આશીર્વાદથી આપણે હંમેશા સત્ય અને સદાચારના માર્ગે અગ્રેસર રહ્યા છીએ.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <img
                src={footerImage}
                alt="સમાજનો વારસો"
                className="relative rounded-2xl shadow-md w-full max-w-sm object-cover border border-slate-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Char Pargana Region & Migration to Surat */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 text-2xl mb-2">
            <FaLandmark />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            ચાર પરગણા ક્ષેત્ર (વતન ભૂમિ)
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            વાવ, થરાદ, સુઈગામ, ભાભર અને બનાસકાંઠા તેમજ પાટણ જિલ્લાના પવિત્ર સરહદી વિસ્તારોમાં વસતા આપણા પૂર્વજોની આ કર્મભૂમિ છે. કઠિન ભૌગોલિક પરિસ્થિતિઓમાં પણ ખુમારી, ઈમાનદારી અને પરસ્પર ભાઈચારો જાળવી રાખનાર આપણો સમાજ સંસ્કારોની ખાણ રહ્યો છે.
          </p>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 text-2xl mb-2">
            <FaHistory />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            સુરતમાં આગમન અને વિકાસ
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            સમય જતાં રોજીરોટી અને વિકાસની તકો શોધતાં પરિવારો સુરત તરફ આગળ વધ્યા. સુરતના હીરા ઉદ્યોગ (Diamond Industry), ટેક્સટાઇલ માર્કેટ, બાંધકામ અને વેપાર ક્ષેત્રમાં સમાજના યુવાનોએ પોતાની અથાક મહેનતથી આગવું સ્થાન બનાવ્યું અને સમાજનું નામ રોશન કર્યું.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="glass-card rounded-3xl p-6 sm:p-12 shadow-lg border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider block mb-2">
            વિકાસ યાત્રા
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            સમાજના ઐતિહાસિક સીમાચિહ્નો
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative border-l-2 border-cyan-200 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
          {timelineEvents.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[37px] sm:-left-[45px] top-1 w-8 h-8 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-cyan-50 transition-all">
                {item.icon}
              </div>

              {/* Content Card */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-sm border-slate-200 bg-white">
                <span className="inline-block px-3 py-1 bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold rounded-full mb-2">
                  {item.year}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Pillars of Samaj */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider block mb-2">
            મૂળભૂત સિદ્ધાંતો
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            સમાજના ચાર મુખ્ય સ્તંભો
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-6 text-center shadow-sm flex flex-col items-center border-slate-200 bg-white"
            >
              {pillar.icon}
              <h3 className="text-lg font-bold text-slate-900 mb-2">{pillar.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action / Vision */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center shadow-lg border-cyan-200 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500"></div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          ભાવિ પેઢી માટે આપણો સંકલ્પ
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6">
          આપણા વડીલોએ આપેલા સંસ્કારો અને એકતાના વારસાને આગળ ધપાવી, નવી પેઢીને શિક્ષણ, ઉદ્યોગ અને સામાજિક સેવામાં અગ્રેસર બનાવવી એ આપણી સહિયારી જવાબદારી છે.
        </p>
        <div className="text-cyan-700 font-bold text-base sm:text-lg">
          — શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત
        </div>
      </div>
    </div>
  );
};

export default History;
