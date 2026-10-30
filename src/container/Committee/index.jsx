import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserTie, FaPhoneAlt, FaSearch, FaThLarge, FaList, FaShieldAlt, FaAward, FaMapMarkerAlt } from 'react-icons/fa';

const Committee = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [filterRole, setFilterRole] = useState('all'); // 'all', 'officers', 'members'
  const [searchQuery, setSearchQuery] = useState('');

  const members = [
    { id: 1, role: 'પ્રમુખશ્રી', name: 'જીવાભાઈ રતાભાઈ', mobile: '9979511169', village: 'પાડણ', category: 'officers', badgeColor: 'from-amber-500 to-yellow-500', isKeyLeader: true },
    { id: 2, role: 'ઉપ-પ્રમુખશ્રી', name: 'પીરાભાઈ માવજીભાઈ', mobile: '9574790731', village: 'કોરેટી', category: 'officers', badgeColor: 'from-cyan-600 to-teal-500', isKeyLeader: true },
    { id: 3, role: 'મંત્રીશ્રી', name: 'ભરતભાઈ હીરાભાઈ', mobile: '8469398662', village: 'મમાણા', category: 'officers', badgeColor: 'from-teal-600 to-emerald-500', isKeyLeader: true },
    { id: 4, role: 'ખજાનચીશ્રી', name: 'કાનજીભાઈ ભગાભાઇ', mobile: '9825766844', village: 'અભેપુરા', category: 'officers', badgeColor: 'from-purple-600 to-indigo-500', isKeyLeader: true },
    { id: 5, role: 'સહમંત્રીશ્રી', name: 'વાલજીભાઈ માવજીભાઈ', mobile: '9913657397', village: 'મમાણા', category: 'officers', badgeColor: 'from-sky-500 to-blue-500', isKeyLeader: false },
    { id: 6, role: 'સહમંત્રીશ્રી', name: 'રાજેશભાઈ ગંગારામભાઈ', mobile: '9016833040', village: 'ઉમેદપુરા', category: 'officers', badgeColor: 'from-sky-500 to-blue-500', isKeyLeader: false },
    { id: 7, role: 'સહમંત્રીશ્રી', name: 'મનીષભાઈ નાગજીભાઈ', mobile: '9913758622', village: 'કોરેટી', category: 'officers', badgeColor: 'from-sky-500 to-blue-500', isKeyLeader: false },
    { id: 8, role: 'મીડિયા કન્વીનર શ્રી', name: 'અશોકભાઈ દુદાભાઈ', mobile: '9998872970', village: 'દુદોસણ', category: 'officers', badgeColor: 'from-pink-500 to-rose-500', isKeyLeader: false },
    { id: 9, role: 'કારોબારીશ્રી', name: 'અલ્પેશભાઈ ગંગદાસભાઈ', mobile: '9638578181', village: 'બેણપ', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 10, role: 'કારોબારીશ્રી', name: 'આશિષભાઈ હરજીભાઈ', mobile: '9925400781', village: 'ખોરડાં', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 11, role: 'કારોબારીશ્રી', name: 'ગણેશભાઇ કરશનભાઈ', mobile: '9879931294', village: 'ભાટવરવાસ', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 12, role: 'કારોબારીશ્રી', name: 'અરજણભાઇ રવજીભાઈ', mobile: '8780965088', village: 'લીંબાળા', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 13, role: 'કારોબારીશ્રી', name: 'મોહનભાઈ પાતાભાઈ', mobile: '9427982756', village: 'સુઈગામ', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 14, role: 'કારોબારીશ્રી', name: 'જલ્પેશભાઈ હરજીભાઈ', mobile: '8140860775', village: 'જામપુર', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 15, role: 'કારોબારીશ્રી', name: 'કરશનભાઈ દાનાભાઈ', mobile: '9726979769', village: 'વાવ', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 16, role: 'કારોબારીશ્રી', name: 'ઈશ્વરભાઈ ભીખાભાઈ', mobile: '9904967873', village: 'ભાટવર', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 17, role: 'કારોબારીશ્રી', name: 'નગાભાઇ રણછોડભાઈ', mobile: '9723216072', village: 'કોરેટી', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 18, role: 'કારોબારીશ્રી', name: 'પથુભાઈ નાગજીભાઈ', mobile: '9925724518', village: 'દેવપુરા', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 19, role: 'કારોબારીશ્રી', name: 'દેવશીભાઇ સવજીભાઈ', mobile: '9726567562', village: 'જામપુર', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 20, role: 'કારોબારીશ્રી', name: 'દાનાભાઈ કરશનભાઈ', mobile: '9913102680', village: 'મમાણા', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 21, role: 'કારોબારીશ્રી', name: 'દલાભાઈ રૂપસીભાઈ', mobile: '9624083908', village: 'કોરેટી', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 22, role: 'કારોબારીશ્રી', name: 'ભૂરાભાઈ જામાભાઈ', mobile: '9879790193', village: 'ઉંચપા', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 23, role: 'કારોબારીશ્રી', name: 'જામાભાઈ ધર્માભાઈ', mobile: '9913659918', village: 'અશારા', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 24, role: 'કારોબારીશ્રી', name: 'માવાભાઈ રવજીભાઈ', mobile: '9979968938', village: 'ભાટવર', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 25, role: 'કારોબારીશ્રી', name: 'પ્રેમાભાઈ જગતાભાઈ', mobile: '9924678164', village: 'થરાદ', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
    { id: 26, role: 'કારોબારીશ્રી', name: 'રાજાભાઈ રામાભાઈ', mobile: '9624120520', village: 'રાછેણા', category: 'members', badgeColor: 'from-slate-600 to-slate-500', isKeyLeader: false },
  ];

  const keyLeaders = members.filter((m) => m.isKeyLeader);

  const filteredMembers = members.filter((member) => {
    const matchesFilter = filterRole === 'all' || member.category === filterRole;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.mobile.includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-14 shadow-lg text-center border-cyan-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="inline-flex items-center space-x-2 bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full text-cyan-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          <FaShieldAlt className="text-base" />
          <span>સમાજ સેવા અને વ્યવસ્થાપન</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
          ચાર પરગણા પ્રજાપતિ સમાજ, સુરત
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-cyan-700 tracking-wide mb-4">
          કારોબારી કમિટી
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          સમાજના સર્વાંગી વિકાસ, શિક્ષણ, સંગઠન અને સુવ્યવસ્થા માટે નિષ્ઠાપૂર્વક કાર્યરત કર્મઠ કારોબારી સભ્યો અને પદાધિકારીશ્રીઓ.
        </p>
      </div>

      {/* Main Office Bearers (Key Leadership) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-cyan-600 font-bold text-xs sm:text-sm uppercase tracking-wider block mb-1">
            મુખ્ય પદાધિકારીશ્રીઓ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            સમાજના મુખ્ય હોદ્દેદારો
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyLeaders.map((leader) => (
            <div
              key={leader.id}
              className="glass-card glass-card-hover rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between text-center group border-slate-200"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${leader.badgeColor}`}></div>

              {/* Role Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3.5 py-1 bg-gradient-to-r ${leader.badgeColor} text-white text-xs font-bold rounded-full shadow-sm`}>
                  {leader.role}
                </span>
              </div>

              {/* Avatar Icon Circle */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 text-2xl shadow-sm group-hover:scale-110 transition-transform mb-4">
                <FaUserTie />
              </div>

              {/* Name & Village */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-cyan-600 transition-colors">
                  {leader.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center justify-center space-x-1">
                  <FaMapMarkerAlt className="text-cyan-600 text-[11px]" />
                  <span>ગામ: <strong className="text-slate-800">{leader.village}</strong></span>
                </p>
              </div>

              {/* Direct Call Button */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`tel:${leader.mobile}`}
                  className="inline-flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow transition-all"
                >
                  <FaPhoneAlt className="text-[10px]" />
                  <span>{leader.mobile}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Committee Members Section */}
      <section className="glass-card rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              સંપૂર્ણ કારોબારી કમિટી ડિરેક્ટરી
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              કુલ {filteredMembers.length} સભ્યો દર્શાવેલ છે.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FaSearch className="text-sm" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="નામ, ગામ કે નંબર શોધો..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="કાર્ડ્સ વ્યુ"
              >
                <FaThLarge />
                <span className="hidden sm:inline">કાર્ડ્સ</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ટેબલ વ્યુ"
              >
                <FaList />
                <span className="hidden sm:inline">ટેબલ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setFilterRole('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filterRole === 'all'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            તમામ સભ્યો ({members.length})
          </button>
          <button
            onClick={() => setFilterRole('officers')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filterRole === 'officers'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <FaAward className="text-amber-500" />
            <span>હોદ્દેદારો / પદાધિકારીઓ (8)</span>
          </button>
          <button
            onClick={() => setFilterRole('members')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filterRole === 'members'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <FaUserTie className="text-cyan-600" />
            <span>કારોબારી સભ્યો (18)</span>
          </button>
        </div>

        {/* Content Display based on View Mode */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-cyan-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                      #{member.id}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {member.role}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center space-x-1 mb-4">
                    <FaMapMarkerAlt className="text-cyan-600 text-[10px]" />
                    <span>ગામ: <strong className="text-slate-700">{member.village}</strong></span>
                  </p>
                </div>

                <a
                  href={`tel:${member.mobile}`}
                  className="flex items-center justify-center space-x-2 py-2 px-3 bg-slate-50 hover:bg-cyan-600 hover:text-white text-slate-800 font-mono text-xs rounded-xl border border-slate-200 hover:border-cyan-600 transition-colors"
                >
                  <FaPhoneAlt className="text-[10px] text-cyan-600 group-hover:text-white" />
                  <span>{member.mobile}</span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[11px] sm:text-xs tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-4 py-3.5 text-center">ક્રમ</th>
                  <th scope="col" className="px-4 py-3.5">હોદ્દો</th>
                  <th scope="col" className="px-4 py-3.5">નામ</th>
                  <th scope="col" className="px-4 py-3.5">મોબાઇલ નંબર</th>
                  <th scope="col" className="px-4 py-3.5">ગામ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-cyan-50/50 transition-colors">
                    <td className="px-4 py-3 text-center font-bold text-slate-500">
                      {member.id}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-xs border border-cyan-200">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {member.name}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      <a
                        href={`tel:${member.mobile}`}
                        className="inline-flex items-center space-x-1.5 text-cyan-600 hover:text-cyan-800 hover:underline font-semibold"
                      >
                        <FaPhoneAlt className="text-[10px]" />
                        <span>{member.mobile}</span>
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium">
                      {member.village}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Committee;
