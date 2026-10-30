import React from 'react';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { t } = useTranslation();

  const images = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/847483/pexels-photo-847483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Image 1',
      description: 'Description for Image 1',
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/847483/pexels-photo-847483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Image 2',
      description: 'Description for Image 2',
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/847483/pexels-photo-847483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Image 3',
      description: 'Description for Image 3',
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/847483/pexels-photo-847483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Image 4',
      description: 'Description for Image 4',
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/847483/pexels-photo-847483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Image 5',
      description: 'Description for Image 5',
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/847483/pexels-photo-847483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Image 6',
      description: 'Description for Image 6',
    },
  ];

  return (
    <section className="py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide inline-block relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-cyan-400 after:to-teal-400 after:rounded-full">
          {t('trustiPage')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="glass-card glass-card-hover rounded-2xl overflow-hidden group"
          >
            <div className="h-52 w-full overflow-hidden bg-slate-900/60 relative">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-5 bg-slate-900/40">
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {image.title}
              </h3>
              <p className="text-xs text-slate-400">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
