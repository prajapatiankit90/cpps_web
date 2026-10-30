import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWpforms, FaExternalLinkAlt, FaCheck, FaCopy, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FORM_SHORT_URL = 'https://forms.gle/vfgj5DvrkB2sM5Q57';
const FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdYH2oH_Ydfe2-bzbaJn_gbcgFGDWuujK4JkpjVBCkMmACG2w/viewform?embedded=true';

const OnlineForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(FORM_SHORT_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-6 sm:p-10 shadow-lg text-center border-cyan-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="inline-flex items-center space-x-2 bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full text-cyan-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
          <FaWpforms className="text-sm" />
          <span>ઓનલાઈન રજીસ્ટ્રેશન ફોર્મ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          કૃપા કરીને નીચે આપેલ ફોર્મમાં જરૂરી તમામ વિગતો સાચી અને સ્પષ્ટ ભરીને સબમિટ કરો.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={FORM_SHORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <span>નવી વિન્ડોમાં ફોર્મ ખોલો</span>
            <FaExternalLinkAlt className="text-xs" />
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
          >
            {copied ? (
              <>
                <FaCheck className="text-teal-600 text-xs" />
                <span className="text-teal-700">લિંક કોપી થઈ ગઈ!</span>
              </>
            ) : (
              <>
                <FaCopy className="text-slate-500 text-xs" />
                <span>લિંક કોપી કરો</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notice alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 text-amber-900 text-xs sm:text-sm">
        <FaInfoCircle className="text-amber-600 mt-0.5 text-base flex-shrink-0" />
        <p className="leading-relaxed">
          <strong>માહિતી:</strong> જો નીચે આપેલું ફોર્મ લોડ થવામાં સમય લે અથવા ગુગલ સાઇન-ઇન માંગે, તો ઉપર આપેલા{' '}
          <strong>"નવી વિન્ડોમાં ફોર્મ ખોલો"</strong> બટન પર ક્લિક કરીને તમે સીધું તમારા મોબાઇલમાં કે બ્રાઉઝરમાં ફોર્મ ભરી શકો છો.
        </p>
      </div>

      {/* Form Card with iFrame */}
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[700px]">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 space-y-3">
            <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600 text-sm font-medium">ગૂગલ ફોર્મ લોડ થઈ રહ્યું છે...</p>
          </div>
        )}

        {/* Embedded Google Form iframe */}
        <iframe
          src={FORM_EMBED_URL}
          title="Google Form"
          width="100%"
          height="1000"
          className="w-full border-0 rounded-3xl"
          onLoad={() => setIsLoading(false)}
        >
          Loading Google Form...
        </iframe>
      </div>

      {/* Footer Support Card */}
      <div className="glass-card rounded-2xl p-6 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="text-base font-bold text-slate-900">ફોર્મ ભરવામાં કોઈ મુશ્કેલી આવે છે?</h3>
          <p className="text-xs text-slate-500 mt-1">
            સમાજના કાર્યાલય અથવા હોદ્દેદારોનો સંપર્ક કરવા માટે અમારો સંપર્ક પેજ જુઓ.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 transition-colors"
        >
          <FaPhoneAlt className="text-xs text-cyan-600" />
          <span>સંપર્ક કરો (Contact Us)</span>
        </Link>
      </div>
    </div>
  );
};

export default OnlineForm;
