import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Slider1 from '../assets/image/Slider1.jpg';
import Slider2 from '../assets/image/Slider2.jpg';
import Slider3 from '../assets/image/Slider3.jpg';

const Silder = () => {
  const slides = [
    {
      img: Slider1,
      title: 'શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત',
      desc: 'વાવ, થરાદ, સુઈગામ અને ભાભર પ્રદેશના જ્ઞાતિજનોનું સુરતમાં ગૌરવપૂર્ણ સંગઠન.',
      badge: 'એકતા અને ગૌરવ',
    },
    {
      img: Slider2,
      title: 'શ્રી ધરણીધર ભગવાનની અસીમ કૃપા',
      desc: 'સૌ જ્ઞાતિજનો પર સુખ, શાંતિ, સદભાવના અને સમૃદ્ધિના આશીર્વાદ સદા વરસતા રહે.',
      badge: 'જય ધરણીધર',
    },
    {
      img: Slider3,
      title: 'સેવા, સહકાર અને શિક્ષણ સંગમ',
      desc: 'નવી પેઢીના ઉજ્જવળ ભવિષ્ય, યુવા ઉત્કર્ષ અને સમાજના સર્વાંગી વિકાસ માટે કટિબદ્ધ.',
      badge: 'શિક્ષણ અને સેવા',
    },
  ];

  return (
    <div className="w-full mt-2 rounded-3xl overflow-hidden glass-card shadow-2xl border-cyan-500/30">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[340px] sm:h-[440px] md:h-[500px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d14]/95 via-[#070d14]/45 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold rounded-full mb-2">
                  {slide.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-white drop-shadow-md">
                  {slide.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-200 drop-shadow max-w-xl leading-relaxed">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Silder;