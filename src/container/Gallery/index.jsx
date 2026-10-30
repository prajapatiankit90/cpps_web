import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaImage, FaPlay, FaVideo, FaTimes, FaCalendarAlt, FaTag } from 'react-icons/fa';
import { BsImages } from 'react-icons/bs';
import Slider1 from '../../assets/image/Slider1.jpg';
import Slider2 from '../../assets/image/Slider2.jpg';
import Slider3 from '../../assets/image/Slider3.jpg';
import footerImage from '../../assets/image/footer.jpg';

const GalleryPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const mediaItems = [
    {
      id: 1,
      type: 'photo',
      category: 'gatherings',
      title: 'વાર્ષિક સ્નેહમિલન સમારોહ - ૨૦૨૩',
      desc: 'સુરત ખાતે આયોજિત ભવ્ય વાર્ષિક સ્નેહમિલન અને જ્ઞાતિ ભોજન સમારોહ.',
      date: '૧૫ ડિસેમ્બર ૨૦૨૩',
      src: Slider1,
      tag: 'સ્નેહમિલન',
    },
    {
      id: 2,
      type: 'video',
      category: 'events',
      title: 'શ્રી ધરણીધર ભગવાન પાટોત્સવ & મહા આરતી',
      desc: 'સમાજના મંદિરે યોજાયેલ ભવ્ય પાટોત્સવ, મહાપૂજા અને મહાઆરતીનું જીવંત પ્રસારણ.',
      date: '૧૦ જાન્યુઆરી ૨૦૨૪',
      duration: '૦૫:૨૪',
      thumbnail: Slider2,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tag: 'ધાર્મિક ઉત્સવ',
    },
    {
      id: 3,
      type: 'photo',
      category: 'events',
      title: 'સરસ્વતી સન્માન સમારોહ - તેજસ્વી તારલાઓનું સન્માન',
      desc: 'ધોરણ ૧૦, ૧૨ અને કોલેજમાં ઉત્કૃષ્ટ પરિણામ મેળવનાર વિદ્યાર્થીઓનું સન્માન.',
      date: '૨૫ ઓગસ્ટ ૨૦૨૩',
      src: Slider3,
      tag: 'શિક્ષણ',
    },
    {
      id: 4,
      type: 'video',
      category: 'gatherings',
      title: 'શ્રી ચાર પરગણા પ્રજાપતિ યુવા સંગઠન ક્રિકેટ ટુર્નામેન્ટ',
      desc: 'સુરતના ગ્રાઉન્ડ ખાતે સમાજના યુવા ટીમો વચ્ચે યોજાયેલ રોમાંચક ક્રિકેટ મેચની હાઇલાઇટ્સ.',
      date: '૧૨ ફેબ્રુઆરી ૨૦૨૪',
      duration: '૦૮:૧૫',
      thumbnail: footerImage,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tag: 'રમત-ગમત',
    },
    {
      id: 5,
      type: 'photo',
      category: 'events',
      title: 'સમાજ ભવન અને વાડી નિર્માણ પ્રગતિ નિરીક્ષણ',
      desc: 'સમાજના ટ્રસ્ટીશ્રીઓ અને કારોબારી સભ્યો દ્વારા નિર્માણ કાર્યની સમીક્ષા.',
      date: '૫ માર્ચ ૨૦૨૪',
      src: footerImage,
      tag: 'નિર્માણ કાર્ય',
    },
    {
      id: 6,
      type: 'video',
      category: 'events',
      title: 'સમાજના વડીલો અને અગ્રણીઓનું માર્ગદર્શક ઉદ્બોધન',
      desc: 'સમાજના સર્વાંગી વિકાસ અને શિક્ષણ ક્ષેત્રે નવી યોજનાઓ અંગે વડીલોનું વક્તવ્ય.',
      date: '૧૮ એપ્રિલ ૨૦૨૪',
      duration: '૧૨:૪૦',
      thumbnail: Slider1,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tag: 'માર્ગદર્શન',
    },
    {
      id: 7,
      type: 'photo',
      category: 'gatherings',
      title: 'નવરાત્રિ મહોત્સવ અને રાસ-ગરબા ઉત્સવ',
      desc: 'જ્ઞાતિજનો અને પરિવાર સાથે સુરત ખાતે ઉત્સાહપૂર્વક ઉજવાયેલ નવરાત્રિ મહોત્સવ.',
      date: '૨૨ ઓક્ટોબર ૨૦૨૩',
      src: Slider2,
      tag: 'નવરાત્રિ',
    },
    {
      id: 8,
      type: 'photo',
      category: 'events',
      title: 'મહિલા મંડળ રસોઈ સ્પર્ધા અને સાંસ્કૃતિક કાર્યક્રમ',
      desc: 'સમાજની બહેનો દ્વારા આયોજિત સ્વાદિષ્ટ વાનગી સ્પર્ધા અને સાંસ્કૃતિક પ્રસ્તુતિ.',
      date: '૮ માર્ચ ૨૦૨૪',
      src: Slider3,
      tag: 'મહિલા મંચ',
    },
  ];

  const filteredItems = mediaItems.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'photos') return item.type === 'photo';
    if (activeFilter === 'videos') return item.type === 'video';
    return item.category === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-12 shadow-lg text-center border-cyan-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="inline-flex items-center space-x-2 bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full text-cyan-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          <BsImages className="text-base" />
          <span>યાદગાર પળો અને ઉત્સવો</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          ફોટો અને વિડિયો ગેલેરી
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત દ્વારા આયોજિત વિવિધ સામાજિક, ધાર્મિક, શૈક્ષણિક અને સાંસ્કૃતિક કાર્યક્રમોની સ્મૃતિઓ.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-cyan-600 border border-slate-200'
          }`}
        >
          બધા (All)
        </button>
        <button
          onClick={() => setActiveFilter('photos')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
            activeFilter === 'photos'
              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-cyan-600 border border-slate-200'
          }`}
        >
          <FaImage className="text-xs" />
          <span>ફોટોઝ (Photos)</span>
        </button>
        <button
          onClick={() => setActiveFilter('videos')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
            activeFilter === 'videos'
              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-cyan-600 border border-slate-200'
          }`}
        >
          <FaVideo className="text-xs" />
          <span>વિડિયોઝ (Videos)</span>
        </button>
        <button
          onClick={() => setActiveFilter('gatherings')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
            activeFilter === 'gatherings'
              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-cyan-600 border border-slate-200'
          }`}
        >
          સ્નેહમિલન (Gatherings)
        </button>
        <button
          onClick={() => setActiveFilter('events')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
            activeFilter === 'events'
              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:text-cyan-600 border border-slate-200'
          }`}
        >
          સામાજિક પ્રસંગો (Events)
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className="bg-white border border-slate-200 hover:border-cyan-400 rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
          >
            {/* Image / Thumbnail Container */}
            <div className="relative h-60 w-full overflow-hidden bg-slate-100">
              <img
                src={item.type === 'photo' ? item.src : item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent group-hover:opacity-90 transition-opacity"></div>

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10">
                <FaTag className="text-[10px] text-cyan-400" />
                <span>{item.tag}</span>
              </div>

              {/* Video Play Icon / Photo Icon Overlay */}
              {item.type === 'video' ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-cyan-500 transition-all duration-300 pl-1">
                    <FaPlay className="text-lg" />
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-white">
                    {item.duration}
                  </span>
                </div>
              ) : (
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs text-white flex items-center space-x-1.5 border border-white/10">
                  <FaImage className="text-cyan-400" />
                  <span>Photo</span>
                </div>
              )}
            </div>

            {/* Info Card Details */}
            <div className="p-5 flex flex-col flex-grow justify-between bg-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center space-x-1.5">
                  <FaCalendarAlt className="text-cyan-600" />
                  <span>{item.date}</span>
                </span>
                <span className="text-cyan-600 font-bold group-hover:underline">
                  {item.type === 'video' ? 'વિડિયો જુઓ →' : 'મોટો ફોટો જુઓ →'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Video Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl glass-card rounded-3xl overflow-hidden shadow-2xl border-cyan-400 bg-white">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Close"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Modal Body */}
            <div className="p-1 sm:p-2">
              {selectedMedia.type === 'video' ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
                  <iframe
                    src={selectedMedia.videoUrl}
                    title={selectedMedia.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/10">
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
                  />
                </div>
              )}

              {/* Modal Caption */}
              <div className="p-4 sm:p-6 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-bold rounded-full border border-cyan-200">
                    {selectedMedia.tag}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center space-x-1.5">
                    <FaCalendarAlt className="text-cyan-600" />
                    <span>{selectedMedia.date}</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {selectedMedia.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedMedia.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
