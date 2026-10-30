import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserGraduate,
  FaSearch,
  FaFileExcel,
  FaPrint,
  FaFilter,
  FaEye,
  FaPhoneAlt,
  FaWhatsapp,
  FaTimes,
  FaCheckCircle,
  FaDownload,
  FaSyncAlt,
  FaSchool,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFilePdf,
  FaTrashAlt,
  FaSortAmountDown,
  FaExclamationTriangle,
  FaAward,
  FaSignOutAlt,
  FaUserShield,
  FaLock
} from 'react-icons/fa';
import { supabase } from '../../lib/supabase';

// ચોક્કસ ધોરણોની યાદી
const STANDARD_OPTIONS = [
  { id: 'std_1', name: 'ધોરણ ૧', slabId: 'slab_1_4', minPct: 90 },
  { id: 'std_2', name: 'ધોરણ ૨', slabId: 'slab_1_4', minPct: 90 },
  { id: 'std_3', name: 'ધોરણ ૩', slabId: 'slab_1_4', minPct: 90 },
  { id: 'std_4', name: 'ધોરણ ૪', slabId: 'slab_1_4', minPct: 90 },
  { id: 'std_5', name: 'ધોરણ ૫', slabId: 'slab_5_7', minPct: 85 },
  { id: 'std_6', name: 'ધોરણ ૬', slabId: 'slab_5_7', minPct: 85 },
  { id: 'std_7', name: 'ધોરણ ૭', slabId: 'slab_5_7', minPct: 85 },
  { id: 'std_8', name: 'ધોરણ ૮', slabId: 'slab_8_9_11_gen', minPct: 75 },
  { id: 'std_9', name: 'ધોરણ ૯', slabId: 'slab_8_9_11_gen', minPct: 75 },
  { id: 'std_10', name: 'ધોરણ ૧૦ (S.S.C.)', slabId: 'slab_10', minPct: 70 },
  { id: 'std_11_gen', name: 'ધોરણ ૧૧ (સામાન્ય પ્રવાહ / જનરલ)', slabId: 'slab_8_9_11_gen', minPct: 75 },
  { id: 'std_11_sci', name: 'ધોરણ ૧૧ (વિજ્ઞાન પ્રવાહ / સાયન્સ)', slabId: 'slab_11_sci', minPct: 65 },
  { id: 'std_12_gen', name: 'ધોરણ ૧૨ (સામાન્ય પ્રવાહ / કોમર્સ / આર્ટસ)', slabId: 'slab_12_gen', minPct: 70 },
  { id: 'std_12_sci', name: 'ધોરણ ૧૨ (વિજ્ઞાન પ્રવાહ / સાયન્સ)', slabId: 'slab_12_sci', minPct: 65 },
  { id: 'college', name: 'કોલેજ (ડિગ્રી / ડિપ્લોમા / માસ્ટર્સ - છેલ્લું વર્ષ)', slabId: 'slab_college', minPct: 60 }
];





const StudentMarksheetList = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStandard, setFilterStandard] = useState('');
  const [filterVillage, setFilterVillage] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'percentage_desc', 'percentage_asc', 'name_asc'
  const [villagesList, setVillagesList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Detail modal
  const [deleteTarget, setDeleteTarget] = useState(null); // Delete modal confirmation
  const [isDeleting, setIsDeleting] = useState(false);

  // સુરક્ષા તપાસ (Auth Guard): માત્ર લૉગિન થયેલ એડમિન યુઝરને જ આ ફોર્મ/લિસ્ટ દેખાશે
  useEffect(() => {
    const sessionData =
      localStorage.getItem('cpps_admin_session') ||
      sessionStorage.getItem('cpps_admin_session');

    if (!sessionData) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      const parsed = JSON.parse(sessionData);
      setAdminUser(parsed);
      setCheckingAuth(false);
    } catch (e) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // લૉગઆઉટ હેન્ડલર
  const handleLogout = () => {
    localStorage.removeItem('cpps_admin_session');
    sessionStorage.removeItem('cpps_admin_session');
    navigate('/login', { replace: true });
  };

  // ૦. ગામોની યાદી મેળવવી
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const { data, error } = await supabase
          .from('villages')
          .select('id, name_en, name_gu')
          .order('name_en', { ascending: true });
        if (!error && data) {
          setVillagesList(data);
        }
      } catch (err) {
        console.warn('Error fetching villages for filter:', err);
      }
    };
    fetchVillages();
  }, []);

  // ૧. સુપાબેઝ અથવા લોકલ સ્ટોરેજમાંથી ડેટા લોડ કરવો (Robust Dual Load)
  const fetchStudents = async () => {
    setLoading(true);
    try {
      let localList = [];
      const localData = localStorage.getItem('cpps_marksheets_submissions');
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (Array.isArray(parsed)) {
            localList = parsed;
          }
        } catch (e) {
          console.warn('LocalStorage parse error:', e);
        }
      }

      // Supabase માંથી ડેટા મેળવવાનો પ્રયાસ (જો ટેબલ હાજર હોય તો)
      try {
        const { data, error } = await supabase
          .from('student_marksheets')
          .select('*')
          .order('id', { ascending: false });

        if (!error && data && data.length > 0) {
          // Normalize Supabase snake_case to match app format
          const normalizedSupabase = data.map((d) => ({
            id: d.id,
            applicationNo: d.application_no || d.applicationNo,
            studentName: d.student_name || d.studentName,
            fatherName: d.father_name || d.fatherName,
            village: d.village,
            contactNo: d.contact_no || d.contactNo,
            email: d.email,
            schoolCollege: d.school_college || d.schoolCollege,
            passedStandard: d.passed_standard || d.passedStandard,
            standardTitle: d.passed_standard || d.standardTitle,
            obtainedMarks: d.obtained_marks || d.obtainedMarks,
            totalMarks: d.total_marks || d.totalMarks,
            percentage: d.percentage,
            grade: d.grade,
            currentStandard: d.current_standard || d.currentStandard,
            academicYear: d.academic_year || d.academicYear,
            fileName: d.file_name || d.fileName,
            fileUrl: d.file_url || d.fileUrl,
            submittedAt: d.submitted_at || d.created_at || d.submittedAt
          }));

          // Local અને Supabase બંનેનું મર્જ (ડુપ્લિકેટ વગર)
          const appNoSet = new Set(normalizedSupabase.map((s) => s.applicationNo));
          const uniqueLocal = localList.filter((s) => !appNoSet.has(s.applicationNo));
          setStudents([...normalizedSupabase, ...uniqueLocal]);
          return;
        }
      } catch (dbErr) {
        console.warn('Supabase fetch attempt:', dbErr);
      }

      // જો Supabase માં ન હોય તો LocalStorage વાપરો
      setStudents(localList);
    } catch (err) {
      console.warn('Error loading students:', err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ૨. ફિલ્ટર, સર્ચ અને સોર્ટિંગ લોજિક
  const filteredStudents = useMemo(() => {
    let list = (students || []).filter((st) => {
      const sName = (st.studentName || st.student_name || '').toLowerCase();
      const fName = (st.fatherName || st.father_name || '').toLowerCase();
      const vName = (st.village || '').toLowerCase();
      const appNo = (st.applicationNo || st.application_no || '').toLowerCase();
      const cNo = String(st.contactNo || st.contact_no || '');
      const sSchool = (st.schoolCollege || st.school_college || '').toLowerCase();
      const sTerm = searchTerm.toLowerCase().trim();

      const matchSearch =
        sTerm === '' ||
        sName.includes(sTerm) ||
        fName.includes(sTerm) ||
        vName.includes(sTerm) ||
        appNo.includes(sTerm) ||
        cNo.includes(sTerm) ||
        sSchool.includes(sTerm);

      const std = (st.passedStandard || st.standardTitle || st.passed_standard || '').toLowerCase();
      const matchStandard =
        filterStandard === '' ||
        std === filterStandard.toLowerCase() ||
        std.includes(filterStandard.toLowerCase());

      const matchVillage =
        filterVillage === '' ||
        vName === filterVillage.toLowerCase();

      return matchSearch && matchStandard && matchVillage;
    });

    // સોર્ટિંગ (Sorting)
    list.sort((a, b) => {
      if (sortBy === 'percentage_desc') {
        const pA = parseFloat(a.percentage || 0);
        const pB = parseFloat(b.percentage || 0);
        return pB - pA;
      }
      if (sortBy === 'percentage_asc') {
        const pA = parseFloat(a.percentage || 0);
        const pB = parseFloat(b.percentage || 0);
        return pA - pB;
      }
      if (sortBy === 'name_asc') {
        const nA = (a.studentName || a.student_name || '').toLowerCase();
        const nB = (b.studentName || b.student_name || '').toLowerCase();
        return nA.localeCompare(nB);
      }
      // Default newest
      return 0;
    });

    return list;
  }, [students, searchTerm, filterStandard, filterVillage, sortBy]);

  // ૩. કુલ આંકડાકીય માહિતી (Summary Stats)
  const stats = useMemo(() => {
    const total = (students || []).length;
    let primary = 0; // ધોરણ ૧ થી ૭
    let board = 0;   // ધોરણ ૧૦ & ૧૨
    let college = 0; // કોલેજ

    (students || []).forEach((s) => {
      const std = s.passedStandard || s.standardTitle || s.passed_standard || '';
      if (std.includes('ધોરણ ૧') || std.includes('ધોરણ ૨') || std.includes('ધોરણ ૩') || std.includes('ધોરણ ૪') || std.includes('ધોરણ ૫') || std.includes('ધોરણ ૬') || std.includes('ધોરણ ૭')) {
        primary++;
      } else if (std.includes('ધોરણ ૧૦') || std.includes('ધોરણ ૧૨') || std.includes('10') || std.includes('12')) {
        board++;
      } else if (std.includes('કોલેજ') || std.includes('college')) {
        college++;
      }
    });

    return { total, primary, board, college };
  }, [students]);

  // ૪. અરજી ડિલીટ કરવાનું હેન્ડલર
  const handleDeleteStudent = async (studentToDelete) => {
    if (!studentToDelete) return;
    setIsDeleting(true);

    try {
      const appNo = studentToDelete.applicationNo || studentToDelete.application_no;

      // ૧. LocalStorage માંથી ડિલીટ
      const localData = localStorage.getItem('cpps_marksheets_submissions');
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          const updated = parsed.filter(
            (s) => (s.applicationNo || s.application_no) !== appNo
          );
          localStorage.setItem('cpps_marksheets_submissions', JSON.stringify(updated));
        } catch (e) {
          console.warn('LocalStorage delete error:', e);
        }
      }

      // ૨. Supabase માંથી ડિલીટ (જો હોય તો)
      try {
        if (studentToDelete.id) {
          await supabase.from('student_marksheets').delete().eq('id', studentToDelete.id);
        } else if (appNo) {
          await supabase.from('student_marksheets').delete().eq('application_no', appNo);
        }
      } catch (dbErr) {
        console.warn('Supabase delete error:', dbErr);
      }

      // ૩. State માંથી તુરંત દૂર કરવું
      setStudents((prev) =>
        (prev || []).filter((s) => (s.applicationNo || s.application_no) !== appNo)
      );

      setDeleteTarget(null);
      if (selectedStudent && (selectedStudent.applicationNo || selectedStudent.application_no) === appNo) {
        setSelectedStudent(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('અરજી ડિલીટ કરવામાં સમસ્યા આવી.');
    } finally {
      setIsDeleting(false);
    }
  };

  // ૪. Excel / CSV માં ડાઉનલોડ
  const handleExportCSV = () => {
    if (filteredStudents.length === 0) {
      alert('ડાઉનલોડ કરવા માટે કોઈ ડેટા નથી.');
      return;
    }

    const headers = [
      'અરજી ક્રમાંક',
      'વિદ્યાર્થીનું નામ',
      'પિતાનું નામ',
      'ગામ/વતન',
      'સંપર્ક નંબર',
      'ઈમેઈલ',
      'પાસ કરેલ ધોરણ',
      'મેળવેલ ગુણ',
      'કુલ ગુણ',
      'ટકાવારી (%)',
      'ગ્રેડ',
      'હાલનો અભ્યાસ',
      'શાળા/કોલેજ',
      'તારીખ'
    ];

    const rows = filteredStudents.map((s) => [
      `"${s.applicationNo || s.application_no || ''}"`,
      `"${s.studentName || s.student_name || ''}"`,
      `"${s.fatherName || s.father_name || ''}"`,
      `"${s.village || ''}"`,
      `"${s.contactNo || s.contact_no || ''}"`,
      `"${s.email || ''}"`,
      `"${s.passedStandard || s.standardTitle || s.passed_standard || ''}"`,
      `"${s.obtainedMarks || s.obtained_marks || ''}"`,
      `"${s.totalMarks || s.total_marks || ''}"`,
      `"${s.percentage || ''}"`,
      `"${s.grade || ''}"`,
      `"${s.currentStandard || s.current_standard || ''}"`,
      `"${s.schoolCollege || s.school_college || ''}"`,
      `"${s.submittedAt || s.submitted_at || s.created_at || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CPPS_Students_Marksheet_List_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ૫. પ્રિન્ટ લિસ્ટ
  const handlePrintList = () => {
    window.print();
  };

  // જો લૉગિન ન હોય તો ચેક થાય ત્યાં સુધી લોડિંગ
  if (checkingAuth) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs font-bold text-slate-500">
          સુરક્ષા ચકાસણી ચાલુ છે... કૃપા કરીને રાહ જુઓ.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-table-area, #printable-table-area * {
            visibility: visible;
          }
          #printable-table-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 10px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
        {/* Header Banner with Admin Profile & Logout */}
        <div className="relative rounded-3xl overflow-hidden glass-card p-6 sm:p-8 shadow-lg border border-cyan-200 bg-white/80 backdrop-blur-md no-print">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-500 to-cyan-400"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-cyan-50 border border-cyan-200 px-3.5 py-1 rounded-full text-cyan-700 text-xs font-bold uppercase tracking-wider mb-2">
                <FaUserGraduate className="text-xs" />
                <span>શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                વિદ્યાર્થી માર્કશીટ અરજી યાદી (Admin Portal)
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                ઇનામ વિતરણ સમારંભ માટે ઓનલાઇન ભરાયેલા તમામ વિદ્યાર્થીઓના ફોર્મની સંપૂર્ણ માહિતી અને માર્કશીટ
              </p>
            </div>

            {/* Admin User Badge & Logout Button */}
            <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-2.5 sm:p-3 rounded-2xl flex-shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  <FaUserShield className="text-base" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Active Admin</span>
                  </div>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm block leading-tight">
                    {adminUser?.name || adminUser?.username || 'Admin'}
                  </span>
                </div>
              </div>

              <div className="h-7 w-[1px] bg-slate-200"></div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 font-bold text-xs border border-rose-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
                title="લૉગઆઉટ કરો"
              >
                <FaSignOutAlt className="text-xs" />
                <span>લૉગઆઉટ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Top Summary Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 no-print">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-xl font-bold">
              {stats.total}
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">કુલ ભરાયેલ ફોર્મ</p>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{stats.total} વિદ્યાર્થીઓ</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
              {stats.board}
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">બોર્ડ પરીક્ષા (૧૦/૧૨)</p>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{stats.board} વિદ્યાર્થીઓ</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold">
              {stats.primary}
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">પ્રાથમિક (ધોરણ ૧ થી ૭)</p>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{stats.primary} વિદ્યાર્થીઓ</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold">
              {stats.college}
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">કોલેજ અભ્યાસક્રમ</p>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{stats.college} વિદ્યાર્થીઓ</h3>
            </div>
          </div>
        </div>

        {/* Filter and Action Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 no-print">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="વિદ્યાર્થી, ગામ, મોબાઈલ કે અરજી નં..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-xs sm:text-sm"
            />
            <FaSearch className="absolute left-3.5 top-3.5 text-slate-400 text-xs sm:text-sm" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>

          {/* Filter by Standard */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <FaFilter className="text-slate-400 text-xs hidden sm:block" />
            <select
              value={filterStandard}
              onChange={(e) => setFilterStandard(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-xs sm:text-sm bg-white font-medium w-full md:w-48"
            >
              <option value="">-- તમામ ધોરણો --</option>
              {STANDARD_OPTIONS.map((std) => (
                <option key={std.id} value={std.name}>
                  {std.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Village */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <select
              value={filterVillage}
              onChange={(e) => setFilterVillage(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-xs sm:text-sm bg-white font-medium w-full md:w-48"
            >
              <option value="">-- તમામ ગામો --</option>
              {villagesList.map((v) => (
                <option key={v.id || v.name_en} value={v.name_en}>
                  {v.name_gu ? `${v.name_gu} (${v.name_en})` : v.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <FaSortAmountDown className="text-slate-400 text-xs hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-xs sm:text-sm bg-white font-medium w-full md:w-52 text-slate-800"
              title="યાદી ગોઠવો"
            >
              <option value="newest">🕒 નવી અરજીઓ પહેલાં</option>
              <option value="percentage_desc">🏆 સૌથી વધુ ટકા (Top % First)</option>
              <option value="percentage_asc">📉 ઓછા ટકા પહેલાં</option>
              <option value="name_asc">🔤 વિદ્યાર્થી નામ (A to Z)</option>
            </select>
          </div>

          {/* Action Buttons: Excel, Print & Refresh */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow transition-all"
              title="Excel / CSV ફાઇલ ડાઉનલોડ કરો"
            >
              <FaFileExcel className="text-sm" />
              <span>Excel ડાઉનલોડ</span>
            </button>

            <button
              onClick={handlePrintList}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 transition-all"
              title="યાદી પ્રિન્ટ કરો"
            >
              <FaPrint className="text-xs" />
              <span>પ્રિન્ટ</span>
            </button>

            <button
              onClick={fetchStudents}
              className="p-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 transition-all"
              title="રીફ્રેશ કરો"
            >
              <FaSyncAlt className={`text-sm ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* STUDENT DATA TABLE */}
        {/* ============================================================== */}
        <div id="printable-table-area" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                અરજીઓની વિગતવાર યાદી
              </h2>
              <p className="text-xs text-slate-500">
                દર્શાવેલ વિદ્યાર્થીઓ: <span className="font-bold text-cyan-700">{filteredStudents.length}</span> / {students.length}
              </p>
            </div>
            {filterStandard && (
              <span className="text-xs bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full font-bold">
                ધોરણ: {filterStandard}
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[11px] tracking-wider">
                  <th className="py-3.5 px-4">અરજી નં.</th>
                  <th className="py-3.5 px-4">વિદ્યાર્થીનું નામ</th>
                  <th className="py-3.5 px-4">ગામ / વતન</th>
                  <th className="py-3.5 px-4">ધોરણ (માર્કશીટ)</th>
                  <th className="py-3.5 px-4 text-center">ગુણ (Obtained / Total)</th>
                  <th className="py-3.5 px-4 text-center">ટકા (%) / ગ્રેડ</th>
                  <th className="py-3.5 px-4">સંપર્ક નંબર</th>
                  <th className="py-3.5 px-4 text-center no-print">કાર્યવાહી</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-slate-400">
                      કોઈ વિદ્યાર્થીની અરજી મળી નથી.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((st, idx) => (
                    <tr
                      key={st.id || idx}
                      className="hover:bg-cyan-50/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedStudent(st)}
                    >
                      {/* Application No */}
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-800 whitespace-nowrap">
                        {st.applicationNo || `CPPS-${1000 + idx}`}
                      </td>

                      {/* Student Name */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {st.studentName}
                        {st.fatherName && (
                          <span className="text-slate-400 block text-[11px] font-normal">
                            પિતા: {st.fatherName}
                          </span>
                        )}
                      </td>

                      {/* Village */}
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {st.village || '-'}
                      </td>

                      {/* Standard */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs inline-block">
                          {st.passedStandard || st.standardTitle || '-'}
                        </span>
                      </td>

                      {/* Obtained / Total Marks */}
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 whitespace-nowrap">
                        {st.obtainedMarks && st.totalMarks ? (
                          <span>
                            {st.obtainedMarks} <span className="text-slate-400">/</span> {st.totalMarks}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      {/* Percentage and Grade */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {st.percentage && (
                          <span className="font-extrabold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
                            {st.percentage}%
                          </span>
                        )}
                        {st.grade && (
                          <span className="ml-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                            {st.grade}
                          </span>
                        )}
                      </td>

                      {/* Contact Number with WhatsApp link */}
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-medium text-slate-800">{st.contactNo}</span>
                          {st.contactNo && (
                            <a
                              href={`https://wa.me/91${st.contactNo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:text-emerald-700 p-1 rounded-md hover:bg-emerald-50 transition-colors"
                              title="WhatsApp મેસેજ કરો"
                            >
                              <FaWhatsapp className="text-sm" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap no-print" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center space-x-1.5">
                          {st.fileUrl ? (
                            <a
                              href={st.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                              title="Google Drive માં માર્કશીટ ખોલો"
                            >
                              <FaFilePdf className="text-xs" />
                              <span>માર્કશીટ</span>
                            </a>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => setSelectedStudent(st)}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-sm transition-all"
                          >
                            <FaEye className="text-xs" />
                            <span>વિગત જુઓ</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteTarget(st)}
                            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 font-bold text-xs border border-rose-200 transition-colors"
                            title="અરજી ડિલીટ કરો"
                          >
                            <FaTrashAlt className="text-xs" />
                            <span className="hidden sm:inline">ડિલીટ</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================== */}
        {/* STUDENT FULL DETAIL POPUP MODAL */}
        {/* ============================================================== */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Close Button */}
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>

              <div className="border-b border-slate-100 pb-4 mb-4">
                <span className="text-xs font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 px-3 py-1 rounded-full">
                  અરજી નં: {selectedStudent.applicationNo}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  {selectedStudent.studentName}
                </h3>
                <p className="text-xs text-slate-500">
                  સબમિટ કર્યા તારીખ: {selectedStudent.submittedAt}
                </p>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 text-[11px] block">પિતા / વાલીનું નામ</span>
                  <span className="font-bold text-slate-800">{selectedStudent.fatherName || '-'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 text-[11px] block">ગામ / વતન</span>
                  <span className="font-bold text-slate-800">{selectedStudent.village || '-'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 text-[11px] block">સંપર્ક નંબર</span>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="font-bold text-slate-800">{selectedStudent.contactNo}</span>
                    <a
                      href={`tel:${selectedStudent.contactNo}`}
                      className="text-cyan-600 hover:text-cyan-800"
                      title="કૉલ કરો"
                    >
                      <FaPhoneAlt className="text-xs" />
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 text-[11px] block">ઈમેઈલ</span>
                  <span className="font-bold text-slate-800 truncate block">
                    {selectedStudent.email || '-'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-200 sm:col-span-2">
                  <span className="text-cyan-800 text-[11px] block font-semibold">પાસ કરેલ ધોરણ</span>
                  <span className="font-extrabold text-cyan-950 text-sm">
                    {selectedStudent.passedStandard || selectedStudent.standardTitle}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 text-[11px] block">મેળવેલ ગુણ / કુલ ગુણ</span>
                  <span className="font-bold text-slate-800">
                    {selectedStudent.obtainedMarks && selectedStudent.totalMarks
                      ? `${selectedStudent.obtainedMarks} / ${selectedStudent.totalMarks}`
                      : '-'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 text-[11px] block">ટકાવારી / ગ્રેડ</span>
                  <span className="font-bold text-cyan-800 text-sm">
                    {selectedStudent.percentage ? `${selectedStudent.percentage}%` : '-'}
                    {selectedStudent.grade && ` (${selectedStudent.grade})`}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 sm:col-span-2">
                  <span className="text-slate-400 text-[11px] block">હાલમાં કયા ધોરણ/કોલેજમાં અભ્યાસ કરે છે</span>
                  <span className="font-bold text-slate-800">{selectedStudent.currentStandard || '-'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 sm:col-span-2">
                  <span className="text-slate-400 text-[11px] block">શાળા / કોલેજનું નામ</span>
                  <span className="font-bold text-slate-800">{selectedStudent.schoolCollege || '-'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 sm:col-span-2">
                  <span className="text-slate-400 text-[11px] block">માર્કશીટ ફાઇલ</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-xs text-slate-700 truncate">
                      {selectedStudent.fileName || 'marksheet.pdf'}
                    </span>
                    {selectedStudent.fileUrl ? (
                      <a
                        href={selectedStudent.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-cyan-700 font-bold bg-cyan-100/70 px-2.5 py-1 rounded-lg hover:bg-cyan-200 transition-colors"
                      >
                        <FaEye className="text-xs" />
                        <span>ફાઇલ ખોલો</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400">ફાઇલ સ્થાનિક રૂપે ઉપલબ્ધ છે</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const st = selectedStudent;
                    setDeleteTarget(st);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center space-x-1.5 transition-colors border border-rose-200"
                >
                  <FaTrashAlt className="text-xs" />
                  <span>અરજી ડિલીટ કરો</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
                >
                  બંધ કરો
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* DELETE CONFIRMATION MODAL */}
        {/* ============================================================== */}
        {deleteTarget && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-150 no-print">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl shadow-sm">
                <FaExclamationTriangle />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">
                અરજી ડિલીટ કરવી છે?
              </h3>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                વિદ્યાર્થી <strong>"{deleteTarget.studentName || deleteTarget.student_name}"</strong> ({deleteTarget.applicationNo || deleteTarget.application_no}) ની અરજી કાયમ માટે ડિલીટ થઈ જશે.
              </p>

              <div className="flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
                >
                  રદ કરો
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteStudent(deleteTarget)}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
                >
                  {isDeleting ? (
                    <span>ડિલીટ થઈ રહ્યું છે...</span>
                  ) : (
                    <>
                      <FaTrashAlt className="text-xs" />
                      <span>હા, ડિલીટ કરો</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentMarksheetList;
