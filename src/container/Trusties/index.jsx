import React from 'react';
import { useTranslation } from 'react-i18next';
import footerImage from '../../assets/image/footer.jpg';

const TrustiPage = () => {
  const { t } = useTranslation();

  const data = [
    { id: 1, title: 'પ્રજાપતિ અલ્પેશભાઈ ગંગદાસભાઈ', description: 'બેણપ' },
    { id: 2, title: 'પ્રજાપતિ આશિષભાઈ હરજીભાઈ', description: 'ખોરડાં' },
    { id: 3, title: 'પ્રજાપતિ ભરતભાઈ હીરાભાઈ', description: 'મમાણા' },
    { id: 4, title: 'પ્રજાપતિ કાનજીભાઈ ભગાભાઇ', description: 'અભેપુરા' },
    { id: 5, title: 'પ્રજાપતિ વાલજીભાઈ માવજીભાઈ', description: 'મમાણા' },
    { id: 6, title: 'પ્રજાપતિ ગણેશભાઇ કરશનભાઈ', description: 'ભાટવરવાસ' },
    { id: 7, title: 'પ્રજાપતિ જલ્પેશભાઈ હરજીભાઈ', description: 'જામપુર' },
    { id: 8, title: 'પ્રજાપતિ અરજણભાઇ રવજીભાઈ', description: 'લીંબાળા' },
    { id: 9, title: 'પ્રજાપતિ પીરાભાઈ માવજીભાઈ', description: 'કોરેટી' },
    { id: 10, title: 'પ્રજાપતિ રાજેશભાઈ ગંગારામભાઈ', description: 'ઉમેદપૂરા' },
    { id: 11, title: 'પ્રજાપતિ જીવાભાઈ રતાભાઈ', description: 'પાડણ' },
    { id: 12, title: 'પ્રજાપતિ મોહનભાઈ પાતાભાઈ', description: 'સુઈગામ' },
    { id: 13, title: 'પ્રજાપતિ ગણેશભાઈ હરજીભાઈ', description: 'અશારા' },
    { id: 14, title: 'પ્રજાપતિ કરશનભાઈ દાનાભાઈ', description: 'વાવ' },
    { id: 15, title: 'પ્રજાપતિ અશોકભાઈ દુદાભાઈ', description: 'દુદોસણ' },
    { id: 16, title: 'પ્રજાપતિ ઈશ્વરભાઈ ભીખાભાઈ', description: 'ભાટવર' },
    { id: 17, title: 'પ્રજાપતિ મોહનભાઈ ગંગારામભાઈ', description: 'રાછેણા' },
    { id: 18, title: 'પ્રજાપતિ તલાભાઈ નાગજીભાઈ', description: 'ભાટવર' },
    { id: 19, title: 'પ્રજાપતિ નગાભાઇ રણછોડભાઈ', description: 'કોરેટી' },
    { id: 20, title: 'પ્રજાપતિ પથુભાઈ નાગજીભાઈ', description: 'દેવપુરા' },
    { id: 21, title: 'પ્રજાપતિ દેવશી ભાઈ', description: 'જામપુર' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-wide inline-block relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1.5 after:bg-gradient-to-r after:from-cyan-500 after:to-teal-500 after:rounded-full">
          {t('trustiPage')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 hover:border-cyan-400 rounded-2xl overflow-hidden flex flex-col group shadow-sm hover:shadow-md transition-all"
          >
            <div className="h-52 w-full overflow-hidden bg-slate-100 relative">
              <img
                src={footerImage}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-cyan-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {item.description}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-grow justify-between text-center bg-white">
              <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-cyan-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                ગામ: <span className="text-slate-700 font-semibold">{item.description}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustiPage;