import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsHouseFill } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const Contact = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          Contact Us
        </h2>
        <p className="text-slate-600 text-base leading-relaxed">
          {t('ContactSymbol')}
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Form card */}
      <div className="glass-card rounded-3xl shadow-lg p-6 sm:p-10 border-slate-200 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500"></div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-semibold text-slate-700 mb-2">
              {t('Full-name')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="તમારું પૂરું નામ"
            />
          </div>

          {/* Grid for Phone, Village, Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                {t('Phone-Number')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-600">
                  <FaPhoneAlt />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="મોબાઈલ નંબર"
                />
              </div>
            </div>

            {/* Village */}
            <div>
              <label htmlFor="village" className="block text-sm font-semibold text-slate-700 mb-2">
                {t('Village-Name')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-600 text-lg">
                  <BsHouseFill />
                </span>
                <input
                  type="text"
                  id="village"
                  name="village"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="ગામનું નામ"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                {t('Email')}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-600 text-lg">
                  <HiMail />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Email ID"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
              {t('Message')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="તમારો સંદેશ અહીં લખો..."
            ></textarea>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-base rounded-xl shadow-md transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Submit Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
