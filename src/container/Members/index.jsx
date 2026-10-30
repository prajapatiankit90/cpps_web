import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaUsers,
  FaUserPlus,
  FaSearch,
  FaPhoneAlt,
  FaTimes,
  FaCheckCircle,
  FaWhatsapp,
  FaSyncAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaExchangeAlt,
} from 'react-icons/fa';
import { supabase } from '../../lib/supabase';
import { toGujarati } from '../../utils/gujaratiTransliterator';

// Helper to convert DD-MM-YYYY to YYYY-MM-DD for database
const parseDateForDb = (dStr) => {
  if (!dStr) return null;
  const parts = dStr.split('-');
  if (parts.length === 3 && parts[0].length === 2 && parts[2].length === 4) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dStr;
};

// Helper to convert YYYY-MM-DD or ISO string to DD-MM-YYYY for display
const formatDateForDisplay = (dStr) => {
  if (!dStr) return '';
  // Handle ISO timestamp e.g. "2025-12-15T18:30:00.000Z"
  if (typeof dStr === 'string' && dStr.includes('T')) {
    const d = new Date(dStr);
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    }
  }
  const parts = String(dStr).split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return String(dStr);
};

// Cache keys for instant loading
const CACHE_KEY = 'cpps_members_cache_v1';

const parseNumber = (val) => {
  if (val === undefined || val === null || val === '') return null;
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
};

const parseContact = (val) => {
  if (!val || !String(val).trim()) return null;
  const cleaned = String(val).replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : null;
};

const Members = () => {
  const { t } = useTranslation();

  // Instant Members State from Cache if available
  const [members, setMembers] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (_) {}
    return [];
  });

  const [isLoading, setIsLoading] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return false; // Instant display!
        }
      }
    } catch (_) {}
    return true;
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Add Member Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({
    regNo: '',
    regDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
    name: '',
    contactNo: '',
    village: '',
    totalMembers: '4',
    totalMajor: '2',
    totalMinor: '2',
  });

  // Fetch live members exclusively from Supabase (Ultra-fast ~0.3s)
  const fetchMembers = useCallback(async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    }

    try {
      const { data, error } = await supabase
        .from('Members')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('Notice fetching members from Supabase:', error.message);
      } else {
        const mapped = (data || [])
          .filter((row) => {
            const rawName = String(row.Name || row.name || '').trim();
            const rawRegNo = String(row.Reg_no ?? row.reg_no ?? '').trim();
            const rawVillage = String(row.Village || row.village || '').trim();
            return rawName.length > 0 || rawRegNo.length > 0 || rawVillage.length > 0;
          })
          .map((row, index) => {
            const rawName = String(row.Name || row.name || '').trim();
            const rawVillage = String(row.Village || row.village || '').trim();
            const regNo = String(row.Reg_no ?? row.reg_no ?? '').trim();
            const contact = row.Contact_No != null && row.Contact_No !== '' ? String(row.Contact_No).trim() : '';
            const totalM = row.Total_Members != null && row.Total_Members !== '' ? String(row.Total_Members).trim() : '';
            const totalMaj = row.Total_Major != null && row.Total_Major !== '' ? String(row.Total_Major).trim() : '';
            const totalMin = row.Total_Minor != null && row.Total_Minor !== '' ? String(row.Total_Minor).trim() : '';

            return {
              id: row.id || index + 1,
              regNo: regNo,
              regDate: formatDateForDisplay(row.Reg_Date || row.reg_date || ''),
              name: rawName,
              nameGu: row.Name_gu || row.name_gu || row.Gujarati_Name || toGujarati(rawName),
              contactNo: contact,
              totalMembers: totalM,
              totalMajor: totalMaj,
              totalMinor: totalMin,
              village: rawVillage,
              villageGu: row.Village_gu || row.village_gu || toGujarati(rawVillage),
            };
          });

        if (mapped.length > 0) {
          setMembers(mapped);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(mapped));
          } catch (_) {}
        }
      }

      if (isManual) {
        setToastMessage('ડેટા સફળતાપૂર્વક અપડેટ થઈ ગયો!');
        setTimeout(() => setToastMessage(''), 3000);
      }
    } catch (err) {
      console.warn('Connection error:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // 1. Initial fetch
    fetchMembers(false);

    // 2. Periodic Auto-Refresh (Every 30 seconds in background)
    const interval = setInterval(() => {
      fetchMembers(false);
    }, 30000);

    // 3. Auto-Refresh when user switches back to this tab
    const handleFocus = () => {
      fetchMembers(false);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchMembers(false);
      }
    };
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Supabase Realtime Channel (Instant live update when database changes)
    const channel = supabase
      .channel('members_realtime_sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Members' },
        () => {
          fetchMembers(false);
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      supabase.removeChannel(channel);
    };
  }, [fetchMembers]);

  // Unique villages for filter dropdown
  const uniqueVillages = useMemo(() => {
    const set = new Set();
    members.forEach((m) => {
      if (m.village && m.village.trim()) {
        set.add(m.village.trim());
      }
    });
    return Array.from(set).sort();
  }, [members]);

  // Village member counts for filter chips
  const villageCounts = useMemo(() => {
    const counts = {};
    members.forEach((m) => {
      const v = m.village ? m.village.trim() : '';
      if (v) {
        counts[v] = (counts[v] || 0) + 1;
      }
    });
    return counts;
  }, [members]);

  // Filtered members by search & village
  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return members.filter((m) => {
      const matchesVillage =
        selectedVillage === 'ALL' ||
        (m.village && m.village.toLowerCase() === selectedVillage.toLowerCase());

      const matchesSearch =
        !q ||
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.nameGu && m.nameGu.toLowerCase().includes(q)) ||
        (m.regNo && m.regNo.toLowerCase().includes(q)) ||
        (m.village && m.village.toLowerCase().includes(q)) ||
        (m.villageGu && m.villageGu.toLowerCase().includes(q)) ||
        (m.contactNo && m.contactNo.includes(q));

      return matchesVillage && matchesSearch;
    });
  }, [members, searchQuery, selectedVillage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedVillage]);

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage, itemsPerPage]);

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.village.trim()) {
      alert('કૃપા કરીને સભ્યનું નામ અને ગામનું નામ દાખલ કરો.');
      return;
    }

    setIsSubmitting(true);

    const regNo = formData.regNo.trim() || `N${members.length + 1}`;
    const payload = {
      Reg_no: regNo,
      Reg_Date: parseDateForDb(formData.regDate),
      Name: formData.name.trim(),
      Contact_No: parseContact(formData.contactNo),
      Village: formData.village.trim(),
      Total_Members: parseNumber(formData.totalMembers),
      Total_Major: parseNumber(formData.totalMajor),
      Total_Minor: parseNumber(formData.totalMinor),
    };

    try {
      const { error } = await supabase.from('Members').insert([payload]);

      if (error) {
        alert(`સેવ કરવામાં મુશ્કેલી: ${error.message}`);
      } else {
        setToastMessage('નવા સભ્યની નોંધણી સફળતાપૂર્વક થઈ ગઈ છે!');
        setTimeout(() => setToastMessage(''), 4000);
        setIsModalOpen(false);

        // Reset Form
        setFormData({
          regNo: '',
          regDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
          name: '',
          contactNo: '',
          village: '',
          totalMembers: '4',
          totalMajor: '2',
          totalMinor: '2',
        });

        // Refetch latest members from Supabase
        fetchMembers();
      }
    } catch (err) {
      alert(`નેટવર્ક એરર: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-8 space-y-3.5 sm:space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-teal-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 animate-fade-in">
          <FaCheckCircle className="text-xl text-teal-200" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Sleek Compact Header Bar (Mobile-Optimized) */}
      {/* <div className="glass-card rounded-2xl p-3.5 sm:p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
      
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-100/50 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
         <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
              <FaUsers className="text-cyan-600 text-[11px]" />
              <span>શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત</span>
            </div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              સમાજ સભ્ય ડિરેક્ટરી
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[10px] sm:text-xs border border-slate-200">
                <FaUsers className="text-cyan-600 text-[10px]" />
                કુલ સભ્યો: <strong className="text-slate-900">{members.length}</strong>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[10px] sm:text-xs border border-slate-200">
                <FaMapMarkerAlt className="text-rose-500 text-[10px]" />
                ગામો: <strong className="text-slate-900">{uniqueVillages.length}</strong>
              </span>
            </div>
          </div> 

         
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center space-x-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer w-full sm:w-auto mt-0.5 sm:mt-0"
          >
            <FaUserPlus className="text-xs sm:text-sm" />
            <span>+ નવો સભ્ય ઉમેરો (Add Member)</span>
          </button>
        </div>
      </div> */}

      {/* Search and Filters Bar with Mobile Quick-Select Chips */}
      <section className="glass-card rounded-2xl p-3 sm:p-5 border border-slate-200/80 shadow-xs space-y-2.5 sm:space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <FaSearch className="text-xs" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="નામ, રજી. નં, ગામ કે મોબાઈલ શોધો..."
              className="w-full pl-8 sm:pl-9 pr-8 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                title="શોધ સાફ કરો"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>

          {/* Village Filter Dropdown & Refresh */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 sm:flex-initial flex items-center space-x-1.5">
              <span className="text-[11px] sm:text-xs text-slate-500 font-semibold whitespace-nowrap hidden sm:inline">ગામ:</span>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full sm:w-auto px-2.5 sm:px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 max-w-full sm:max-w-[200px] cursor-pointer"
              >
                <option value="ALL">બધા ગામો ({members.length})</option>
                {uniqueVillages.map((v) => (
                  <option key={v} value={v}>
                    {v} ({villageCounts[v] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={() => fetchMembers(true)}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 text-xs transition-all cursor-pointer flex-shrink-0"
              title="રીફ્રેશ કરો (તાજો ડેટા મેળવો)"
            >
              <FaSyncAlt className={isRefreshing ? 'animate-spin text-cyan-600' : ''} />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Quick-Filter Chips */}
        {uniqueVillages.length > 0 && (
          <div className="pt-0.5">
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 text-[11px]">
              <button
                type="button"
                onClick={() => setSelectedVillage('ALL')}
                className={`px-2.5 py-1 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${selectedVillage === 'ALL'
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                બધા ({members.length})
              </button>
              {uniqueVillages.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVillage(selectedVillage === v ? 'ALL' : v)}
                  className={`px-2.5 py-1 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${selectedVillage === v
                      ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {v} ({villageCounts[v] || 0})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[11px] sm:text-xs text-slate-500">
          <span>
            મળેલ સભ્યો: <strong className="text-slate-800">{filteredMembers.length}</strong>
            {selectedVillage !== 'ALL' && (
              <span> | ગામ: <strong className="text-cyan-700">{selectedVillage}</strong></span>
            )}
          </span>
          <span>પેજ {currentPage} of {totalPages}</span>
        </div>
      </section>

      {/* Directory Content - Mobile-Optimized Responsive Table View */}
      {isLoading ? (
        <div className="glass-card rounded-2xl py-16 text-center border border-slate-200/80 space-y-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">સભ્યોની વિગતો લોડ થઈ રહી છે...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-slate-200/80 space-y-3">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xl sm:text-2xl">
            <FaUsers />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            {members.length === 0 ? 'હજુ સુધી કોઈ સભ્ય નોંધાયેલા નથી' : 'આ શોધ માટે કોઈ સભ્ય મળ્યા નહીં'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {members.length === 0
              ? 'નવા સભ્યની નોંધણી કરવા માટે ઉપર આપેલા બટન પર ક્લિક કરો.'
              : 'કૃપા કરીને અન્ય નામ અથવા ગામ સર્ચ કરો.'}
          </p>
          {members.length === 0 ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition-all shadow cursor-pointer"
            >
              + પ્રથમ સભ્ય ઉમેરો
            </button>
          ) : (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedVillage('ALL');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              તમામ ફિલ્ટર દૂર કરો
            </button>
          )}
        </div>
      ) : (
        /* Pure Table View with Isolated Inner Scroll and Mobile-Adaptive Columns */
        <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm">
          {/* Mobile Top Helper Strip */}
          <div className="px-3 py-2 bg-gradient-to-r from-slate-50 to-cyan-50/30 border-b border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <FaUsers className="text-cyan-600 text-xs" />
              સભ્ય સૂચિ ({filteredMembers.length})
            </span>
            <span className="text-[10px] text-cyan-700 bg-cyan-50 border border-cyan-200/60 px-2 py-0.5 rounded-full font-medium sm:hidden flex items-center gap-1">
              <FaExchangeAlt className="text-[8px]" />
              ડાબે-જમણે સ્ક્રોલ કરો
            </span>
          </div>

          {/* Isolated Inner Scroll Container */}
          <div className="overflow-x-auto max-h-[62vh] sm:max-h-[600px] overflow-y-auto custom-table-scroll">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="sticky top-0 z-20 bg-slate-100/95 backdrop-blur-md border-b border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] shadow-2xs">
                <tr>
                  <th className="py-2.5 sm:py-3 px-2 sm:px-3.5 whitespace-nowrap min-w-[70px]"># રજી.</th>
                  <th className="py-2.5 sm:py-3 px-3 hidden sm:table-cell whitespace-nowrap">તારીખ</th>
                  <th className="py-2.5 sm:py-3 px-2.5 sm:px-4 min-w-[140px] sm:min-w-[190px]">સભ્યનું નામ</th>

                  <th className="py-2.5 sm:py-3 px-2 sm:px-3 min-w-[85px] sm:min-w-[110px]">મૂળ ગામ</th>
                  <th className="py-2.5 sm:py-3 px-2 sm:px-3 min-w-[125px] sm:min-w-[150px]">સંપર્ક (Call/WA)</th>
                  <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap min-w-[70px]">પરિવાર</th>
                  <th className="py-2.5 sm:py-3 px-3 text-center hidden md:table-cell whitespace-nowrap">પુખ્ત (18+)</th>
                  <th className="py-2.5 sm:py-3 px-3 text-center hidden md:table-cell whitespace-nowrap">બાળકો</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {paginatedMembers.map((member) => (
                  <tr key={member.id || member.regNo} className="hover:bg-cyan-50/40 transition-colors">
                    {/* Reg No + Date (Date shows under reg no on mobile) */}
                    <td className="py-2.5 sm:py-3 px-2 sm:px-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono font-bold rounded-md text-[10px] sm:text-xs">
                        #{member.regNo}
                      </span>
                      {member.regDate && (
                        <div className="flex items-center space-x-1 text-[9px] text-slate-400 mt-1 sm:hidden font-medium">
                          <FaCalendarAlt className="text-[8px] text-slate-400" />
                          <span>{member.regDate}</span>
                        </div>
                      )}
                    </td>

                    {/* Date (Desktop only column) */}
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-xs hidden sm:table-cell">
                      {member.regDate || '-'}
                    </td>

                    {/* Member Full Name (English) */}
                    <td className="py-2.5 sm:py-3 px-2.5 sm:px-4 min-w-[140px] sm:min-w-[190px]">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-cyan-600 to-teal-600 text-white flex items-center justify-center font-bold text-[10px] sm:text-xs shadow-2xs flex-shrink-0">
                          {member.name && member.name.trim() ? member.name.trim().charAt(0).toUpperCase() : 'M'}
                        </div>
                        <span className="font-bold text-slate-900 leading-snug text-xs sm:text-sm">
                          {member.name.toUpperCase()}
                        </span>
                      </div>
                    </td>


                    {/* Village Tag */}
                    <td className="py-2.5 sm:py-3 px-2 sm:px-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/90 text-[10px] sm:text-xs text-slate-700 font-semibold">
                        <FaMapMarkerAlt className="text-cyan-600 mr-1 text-[8px] sm:text-[9px]" />
                        {member.village.toUpperCase()}
                      </span>
                    </td>

                    {/* Contact (Direct tap-to-call & WhatsApp) */}
                    <td className="py-2.5 sm:py-3 px-2 sm:px-3 whitespace-nowrap">
                      {member.contactNo ? (
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <a
                            href={`tel:${member.contactNo}`}
                            className="inline-flex items-center space-x-1 px-2 py-1 bg-cyan-50 hover:bg-cyan-600 text-cyan-700 hover:text-white rounded-lg border border-cyan-200 transition-all text-[10px] sm:text-xs font-semibold shadow-2xs active:scale-95"
                            title="કૉલ કરો"
                          >
                            <FaPhoneAlt className="text-[8px] sm:text-[9px]" />
                            <span>{member.contactNo}</span>
                          </a>
                          <a
                            href={`https://wa.me/91${member.contactNo.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-200 flex items-center justify-center transition-all shadow-2xs active:scale-95 flex-shrink-0"
                            title="WhatsApp મેસેજ"
                          >
                            <FaWhatsapp className="text-xs sm:text-sm" />
                          </a>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">-</span>
                      )}
                    </td>

                    {/* Family Breakdown (Compact on mobile with major/minor subtext) */}
                    <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center justify-center font-bold text-slate-800 text-xs sm:text-sm bg-slate-100/80 px-2 py-0.5 rounded-lg border border-slate-200/80">
                        {member.totalMembers || '-'}
                      </span>
                      {/* On mobile show Major/Minor subtitle under total */}
                      {(member.totalMajor || member.totalMinor) && (
                        <div className="text-[9px] text-slate-500 md:hidden leading-tight mt-1 flex items-center justify-center gap-1">
                          <span className="text-teal-700 font-semibold bg-teal-50 px-1 rounded">પ:{member.totalMajor || 0}</span>
                          <span className="text-amber-700 font-semibold bg-amber-50 px-1 rounded">બા:{member.totalMinor || 0}</span>
                        </div>
                      )}
                    </td>

                    {/* Desktop Dedicated Columns for Major & Minor */}
                    <td className="py-3 px-3 text-center text-teal-700 font-semibold hidden md:table-cell">
                      {member.totalMajor || '-'}
                    </td>
                    <td className="py-3 px-3 text-center text-amber-700 font-semibold hidden md:table-cell">
                      {member.totalMinor || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls (Mobile-Adapted) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between sm:justify-center sm:space-x-2 pt-2 px-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center space-x-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
          >
            <FaChevronLeft className="text-[9px]" />
            <span>પાછળ</span>
          </button>

          <span className="text-xs font-bold text-slate-700 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 sm:hidden">
            {currentPage} / {totalPages}
          </span>

          <div className="hidden sm:flex items-center space-x-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
              .map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {idx > 0 && arr[idx - 1] !== page - 1 && <span className="px-1 text-slate-400 text-xs">...</span>}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${currentPage === page
                        ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex items-center space-x-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
          >
            <span>આગળ</span>
            <FaChevronRight className="text-[9px]" />
          </button>
        </div>
      )}


      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="mb-5 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg sm:text-xl mx-auto mb-2 border border-cyan-100">
                <FaUserPlus />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">નવા સભ્યની નોંધણી ફોર્મ</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                સમાજ પરિવારની વિગતો ભરીને સેવ કરો.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">રજીસ્ટ્રેશન નં.</label>
                  <input
                    type="text"
                    value={formData.regNo}
                    onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                    placeholder={`દા.ત. N${members.length + 1}`}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">નોંધણી તારીખ</label>
                  <input
                    type="text"
                    value={formData.regDate}
                    onChange={(e) => setFormData({ ...formData, regDate: e.target.value })}
                    placeholder="DD-MM-YYYY"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  સભ્યનું પૂરું નામ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="દા.ત. પ્રજાપતિ સુરેશભાઈ અમરતભાઈ"
                  className="w-full px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">મોબાઈલ નંબર</label>
                  <input
                    type="tel"
                    value={formData.contactNo}
                    onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                    placeholder="દા.ત. 9825000000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    મૂળ ગામ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="દા.ત. કોરેટી, ભાટવર, બેણપ..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Family count inputs */}
              <div className="bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  પારિવારિક વિગત
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">કુલ સભ્યો</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.totalMembers}
                      onChange={(e) => setFormData({ ...formData, totalMembers: e.target.value })}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">પુખ્ત (18+)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.totalMajor}
                      onChange={(e) => setFormData({ ...formData, totalMajor: e.target.value })}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-teal-700 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">બાળકો (Minor)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.totalMinor}
                      onChange={(e) => setFormData({ ...formData, totalMinor: e.target.value })}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-amber-700 text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center space-x-2.5 sm:space-x-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  રદ કરો
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'સેવ થઈ રહ્યું છે...' : 'સેવ કરો (Save)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
