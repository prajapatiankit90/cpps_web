import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  FaUserGraduate, 
  FaCloudUploadAlt, 
  FaFilePdf, 
  FaTimes, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaSchool, 
  FaPhoneAlt, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaPercentage,
  FaAward,
  FaInfoCircle,
  FaBookOpen,
  FaMedal,
  FaCalculator,
  FaEnvelope,
  FaPrint,
  FaRedo,
  FaCopy,
  FaMagic,
  FaSpinner,
  FaKey,
  FaCamera,
  FaBolt
} from 'react-icons/fa';
import { 
  parseMarksheetWithAI, 
  getGeminiApiKey, 
  setGeminiApiKey 
} from '../../services/marksheetParser';

// ચોક્કસ ધોરણોની યાદી અને તેનો સ્લેબ મેપિંગ
const STANDARD_OPTIONS = [
  // ૧ થી ૪ (૯૦%+)
  { id: 'std_1', name: 'ધોરણ ૧', slabId: 'slab_1_4', minPct: 90, group: 'પ્રાથમિક શાળા (ધોરણ ૧ થી ૪ - ૯૦% ઉપર)' },
  { id: 'std_2', name: 'ધોરણ ૨', slabId: 'slab_1_4', minPct: 90, group: 'પ્રાથમિક શાળા (ધોરણ ૧ થી ૪ - ૯૦% ઉપર)' },
  { id: 'std_3', name: 'ધોરણ ૩', slabId: 'slab_1_4', minPct: 90, group: 'પ્રાથમિક શાળા (ધોરણ ૧ થી ૪ - ૯૦% ઉપર)' },
  { id: 'std_4', name: 'ધોરણ ૪', slabId: 'slab_1_4', minPct: 90, group: 'પ્રાથમિક શાળા (ધોરણ ૧ થી ૪ - ૯૦% ઉપર)' },

  // ૫ થી ૭ (૮૫%+)
  { id: 'std_5', name: 'ધોરણ ૫', slabId: 'slab_5_7', minPct: 85, group: 'ઉચ્ચ પ્રાથમિક (ધોરણ ૫ થી ૭ - ૮૫% ઉપર)' },
  { id: 'std_6', name: 'ધોરણ ૬', slabId: 'slab_5_7', minPct: 85, group: 'ઉચ્ચ પ્રાથમિક (ધોરણ ૫ થી ૭ - ૮૫% ઉપર)' },
  { id: 'std_7', name: 'ધોરણ ૭', slabId: 'slab_5_7', minPct: 85, group: 'ઉચ્ચ પ્રાથમિક (ધોરણ ૫ થી ૭ - ૮૫% ઉપર)' },

  // ૮, ૯ (૭૫%+)
  { id: 'std_8', name: 'ધોરણ ૮', slabId: 'slab_8_9_11_gen', minPct: 75, group: 'માધ્યમિક / ઉચ્ચત્તર (૭૫% ઉપર)' },
  { id: 'std_9', name: 'ધોરણ ૯', slabId: 'slab_8_9_11_gen', minPct: 75, group: 'માધ્યમિક / ઉચ્ચત્તર (૭૫% ઉપર)' },

  // ૧૦ (૭૦%+)
  { id: 'std_10', name: 'ધોરણ ૧૦ (S.S.C.)', slabId: 'slab_10', minPct: 70, group: 'બોર્ડ પરીક્ષા (ધોરણ ૧૦ - ૭૦% ઉપર)' },

  // ૧૧ જનરલ (૭૫%+) અને સાયન્સ (૬૫%+)
  { id: 'std_11_gen', name: 'ધોરણ ૧૧ (સામાન્ય પ્રવાહ / જનરલ)', slabId: 'slab_8_9_11_gen', minPct: 75, group: 'ધોરણ ૧૧' },
  { id: 'std_11_sci', name: 'ધોરણ ૧૧ (વિજ્ઞાન પ્રવાહ / સાયન્સ)', slabId: 'slab_11_sci', minPct: 65, group: 'ધોરણ ૧૧' },

  // ૧૨ જનરલ (૭૦%+) અને સાયન્સ (૬૫%+)
  { id: 'std_12_gen', name: 'ધોરણ ૧૨ (સામાન્ય પ્રવાહ / કોમર્સ / આર્ટસ)', slabId: 'slab_12_gen', minPct: 70, group: 'ધોરણ ૧૨ બોર્ડ' },
  { id: 'std_12_sci', name: 'ધોરણ ૧૨ (વિજ્ઞાન પ્રવાહ / સાયન્સ)', slabId: 'slab_12_sci', minPct: 65, group: 'ધોરણ ૧૨ બોર્ડ' },

  // કોલેજ (૬૦%+)
  { id: 'college', name: 'કોલેજ (ડિગ્રી / ડિપ્લોમા / માસ્ટર્સ - છેલ્લું વર્ષ)', slabId: 'slab_college', minPct: 60, group: 'કોલેજ (૬૦% ઉપર)' }
];

// સ્લેબ વિગત કાર્ડ્સ
const CRITERIA_SLABS = [
  { id: 'slab_1_4', title: 'ધોરણ ૧ થી ૪', badge: '૯૦% કે A1 ગ્રેડ' },
  { id: 'slab_5_7', title: 'ધોરણ ૫ થી ૭', badge: '૮૫% કે તેથી વધુ' },
  { id: 'slab_8_9_11_gen', title: 'ધોરણ ૮, ૯, ૧૧ (જનરલ)', badge: '૭૫% કે તેથી વધુ' },
  { id: 'slab_10', title: 'ધોરણ ૧૦ (S.S.C.)', badge: '૭૦% કે તેથી વધુ' },
  { id: 'slab_11_sci', title: 'ધોરણ ૧૧ (સાયન્સ)', badge: '૬૫% કે તેથી વધુ' },
  { id: 'slab_12_gen', title: 'ધોરણ ૧૨ (જનરલ)', badge: '૭૦% કે તેથી વધુ' },
  { id: 'slab_12_sci', title: 'ધોરણ ૧૨ (સાયન્સ)', badge: '૬૫% કે તેથી વધુ' },
  { id: 'slab_college', title: 'કોલેજ (છેલ્લું વર્ષ)', badge: '૬૦% / B+ કે CGPA ૬.૦+' }
];

// સામાન્ય ગ્રેડ્સ અને તેનું અંદાજિત ટકાવારી મેપિંગ
const GRADE_PERCENTAGE_MAP = {
  // સ્કૂલ / બોર્ડ ગ્રેડ
  'A1': { name: 'A1 ગ્રેડ (૯૧% થી ૧૦૦%)', approxPct: 95 },
  'A2': { name: 'A2 ગ્રેડ (૮૧% થી ૯૦%)', approxPct: 85 },
  'B1': { name: 'B1 ગ્રેડ (૭૧% થી ૮૦%)', approxPct: 75 },
  'B2': { name: 'B2 ગ્રેડ (૬૧% થી ૭૦%)', approxPct: 65 },
  'C1': { name: 'C1 ગ્રેડ (૫૧% થી ૬૦%)', approxPct: 55 },
  'C2': { name: 'C2 ગ્રેડ (૪૧% થી ૫૦%)', approxPct: 45 },
  'D':  { name: 'D ગ્રેડ (૩૩% થી ૪૦%)',  approxPct: 35 },

  // કોલેજ / યુનિવર્સિટી ગ્રેડ
  'O':  { name: 'O (Outstanding - ૯૦% થી ૧૦૦%)', approxPct: 95 },
  'A+': { name: 'A+ (Excellent - ૮૦% થી ૮૯%)',   approxPct: 85 },
  'A':  { name: 'A (Very Good - ૭૦% થી ૭૯%)',    approxPct: 75 },
  'B+': { name: 'B+ (Good - ૬૦% થી ૬૯%)',         approxPct: 65 },
  'B':  { name: 'B (Above Average - ૫૫% થી ૫૯%)', approxPct: 57 },
  'C':  { name: 'C (Average - ૫૦% થી ૫૪%)',       approxPct: 52 }
};

// Google Sheet / Drive Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzz-dcAHRuEU2rMlDCEPB0ZxwWJktwCmHK9GoA1DCNeOyX4hLNwwP4r17rj9tzX_2Gu/exec';

// ફાઇલને Base64 માં કન્વર્ટ કરવાનું હેલ્પર
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });

const StudentMarksheet = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    village: '',
    contactNo: '',
    email: '', // ઈમેઈલ આઈડી
    schoolCollege: '',
    passedStandard: '',
    academicYear: '2025-2026',
    obtainedMarks: '', // મેળવેલ ગુણ (Obtained Marks)
    totalMarks: '',    // કુલ ગુણ (Total Marks)
    percentage: '',    // ટકાવારી (%)
    grade: '',         // ગ્રેડ (A1, A2, B1...)
    cgpa: '',          // કોલેજ CGPA
    collegeCourseDetails: '',
    currentStandard: '',
    notes: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [receiptData, setReceiptData] = useState(null); // ડિજિટલ રસીદ ડેટા
  const [copiedAppNo, setCopiedAppNo] = useState(false);

  // AI Marksheet Extraction States
  const [isScanning, setIsScanning] = useState(false);
  const [scanNotice, setScanNotice] = useState(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => getGeminiApiKey());

  // Villages List from Supabase Table
  const [villagesList, setVillagesList] = useState([]);
  const [isLoadingVillages, setIsLoadingVillages] = useState(true);
  const [isSlabsModalOpen, setIsSlabsModalOpen] = useState(false); // લાયકાત સ્લેબ મોડલ સ્ટેટ

  // Fetch villages from Supabase 'villages' table
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const { data, error } = await supabase
          .from('villages')
          .select('id, name_en, name_gu')
          .order('name_en', { ascending: true });

        if (error) {
          console.warn('Error fetching villages from DB:', error.message);
        } else if (data && data.length > 0) {
          setVillagesList(data);
        }
      } catch (err) {
        console.warn('Network error loading villages:', err);
      } finally {
        setIsLoadingVillages(false);
      }
    };

    fetchVillages();
  }, []);

  // પસંદ કરેલા ચોક્કસ ધોરણની વિગતો અને સ્લેબ
  const selectedStdConfig = useMemo(() => {
    return STANDARD_OPTIONS.find((s) => s.id === formData.passedStandard);
  }, [formData.passedStandard]);

  // મેળવેલ ગુણ / કુલ ગુણ વેલિડેશન ચેક
  const marksError = useMemo(() => {
    if (!formData.obtainedMarks || !formData.totalMarks) return '';
    const obtained = parseFloat(formData.obtainedMarks);
    const total = parseFloat(formData.totalMarks);
    if (!isNaN(obtained) && !isNaN(total)) {
      if (obtained > total) {
        return 'મેળવેલ ગુણ કુલ ગુણ કરતાં વધુ ન હોઈ શકે.';
      }
      if (obtained < 0 || total <= 0) {
        return 'ગુણ શૂન્ય કરતાં વધુ હોવા જોઈએ.';
      }
    }
    return '';
  }, [formData.obtainedMarks, formData.totalMarks]);

  // ટકાવારી અને ગ્રેડ બંને આધારિત લાયકાત ચકાસણી (Live Eligibility Check)
  const eligibility = useMemo(() => {
    if (!selectedStdConfig) {
      return { checked: false, isEligible: false, message: '' };
    }

    if (marksError) {
      return { checked: true, isEligible: false, message: marksError };
    }

    const hasPercentage = formData.percentage && formData.percentage.trim() !== '';
    const hasGrade = formData.grade && formData.grade.trim() !== '';
    const hasCgpa = formData.cgpa && formData.cgpa.trim() !== '';

    if (!hasPercentage && !hasGrade && !hasCgpa) {
      return { 
        checked: false, 
        isEligible: false, 
        message: 'કૃપા કરીને માર્ક્સ (મેળવેલ/કુલ ગુણ), ટકાવારી (%) અથવા ગ્રેડ દાખલ કરો.' 
      };
    }

    let calculatedPct = null;
    let evalMethod = '';

    if (hasPercentage) {
      const p = parseFloat(formData.percentage);
      if (isNaN(p) || p < 0 || p > 100) {
        return {
          checked: true,
          isEligible: false,
          message: 'કૃપા કરીને માન્ય ટકાવારી (0 થી 100) દાખલ કરો.'
        };
      }
      calculatedPct = p;
      evalMethod = `ટકાવારી (${p}%)`;
    } else if (hasCgpa) {
      const c = parseFloat(formData.cgpa);
      if (isNaN(c) || c < 0 || c > 10) {
        return {
          checked: true,
          isEligible: false,
          message: 'કૃપા કરીને માન્ય CGPA (0.0 થી 10.0) દાખલ કરો.'
        };
      }
      calculatedPct = c * 9.5;
      evalMethod = `CGPA ${c} (અંદાજિત ${calculatedPct.toFixed(1)}%)`;
    } else if (hasGrade && GRADE_PERCENTAGE_MAP[formData.grade]) {
      const gradeInfo = GRADE_PERCENTAGE_MAP[formData.grade];
      calculatedPct = gradeInfo.approxPct;
      evalMethod = `ગ્રેડ '${formData.grade}'`;

      if (selectedStdConfig.slabId === 'slab_1_4' && formData.grade === 'A2') {
        return {
          checked: true,
          isEligible: false,
          requiredPct: selectedStdConfig.minPct,
          message: `ધોરણ ૧ થી ૪ માટે ૯૦% ઉપર હોવા જરૂરી છે. A2 ગ્રેડ ૮૧% થી ૯૦% દર્શાવે છે, તેથી કૃપા કરીને ગુણ અથવા ચોક્કસ ટકા (%) પણ દાખલ કરો.`
        };
      }
    }

    if (calculatedPct === null) {
      return { checked: false, isEligible: false, message: '' };
    }

    if (calculatedPct < selectedStdConfig.minPct) {
      return {
        checked: true,
        isEligible: false,
        requiredPct: selectedStdConfig.minPct,
        message: `${selectedStdConfig.name} માટે લઘુત્તમ ${selectedStdConfig.minPct}% જરૂરી છે. ${evalMethod} નિયત સ્લેબ કરતાં ઓછા હોવાથી આપ આ યોજના માટે પાત્ર નથી.`
      };
    }

    return {
      checked: true,
      isEligible: true,
      requiredPct: selectedStdConfig.minPct,
      message: `અભિનંદન! ${selectedStdConfig.name} માં આપના ${evalMethod} નિયત લઘુત્તમ સ્લેબ (${selectedStdConfig.minPct}%) કરતાં વધુ હોવાથી આપ પાત્ર છો.`
    };
  }, [formData.percentage, formData.grade, formData.cgpa, marksError, selectedStdConfig]);

  // સામાન્ય ઇનપુટ હેન્ડલર
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // માર્ક્સ ઇનપુટ હેન્ડલર + ઓટો ટકાવારી ગણતરી
  const handleMarksChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      const obtained = parseFloat(name === 'obtainedMarks' ? value : updated.obtainedMarks);
      const total = parseFloat(name === 'totalMarks' ? value : updated.totalMarks);

      if (!isNaN(obtained) && !isNaN(total) && total > 0) {
        if (obtained <= total) {
          const autoPct = ((obtained / total) * 100).toFixed(2);
          updated.percentage = autoPct;
        }
      }

      return updated;
    });
  };

  // AI Marksheet Extraction Handler
  const triggerAiScan = async (fileToScan) => {
    const file = fileToScan || selectedFile;
    if (!file) {
      setFileError('સ્કેન કરવા માટે કૃપા કરીને પહેલા માર્કશીટ ફાઇલ પસંદ કરો.');
      return;
    }

    const key = getGeminiApiKey();
    if (!key) {
      setScanNotice({
        type: 'info',
        message: 'AI ઓટો-ફિલ માટે Gemini API Key જરૂરી છે. સેટ કરવા માટે API Key બટન પર ક્લિક કરો.'
      });
      setIsApiKeyModalOpen(true);
      return;
    }

    setIsScanning(true);
    setScanNotice({
      type: 'info',
      message: 'AI દ્વારા માર્કશીટનું સ્કેનિંગ અને વિશ્લેષણ ચાલુ છે... કૃપા કરીને થોડી સેકન્ડ રાહ જુઓ.'
    });

    try {
      const data = await parseMarksheetWithAI(file);

      // 1. Validation check: If uploaded photo is NOT a marksheet
      if (data.isMarksheet === false) {
        // Automatically reject invalid file and clear selection
        setSelectedFile(null);
        setFilePreview(null);
        setFileError(data.rejectionReason || 'અપલોડ કરેલ ફોટો માન્ય માર્કશીટનો નથી.');
        setScanNotice({
          type: 'error',
          message: `🚫 ફોટો અમાન્ય: ${data.rejectionReason || 'આ ફોટો માર્કશીટનો નથી. કૃપા કરીને ફક્ત તમારી સ્કૂલ/કોલેજની અસલ માર્કશીટ જ અપલોડ કરો.'}`
        });
        return;
      }

      // 2. Auto-fill form data intelligently if valid marksheet
      setFormData((prev) => {
        const updated = { ...prev };
        if (data.studentName) updated.studentName = data.studentName;
        if (data.fatherName) updated.fatherName = data.fatherName;
        // Auto village matching with villagesList (Dropdown)
        if (data.village && villagesList.length > 0) {
          const rawV = data.village.toLowerCase().trim();
          const matchedVillage = villagesList.find(
            (v) =>
              (v.name_en && rawV.includes(v.name_en.toLowerCase())) ||
              (v.name_gu && rawV.includes(v.name_gu)) ||
              (v.name_en && v.name_en.toLowerCase().includes(rawV))
          );
          if (matchedVillage) {
            updated.village = matchedVillage.name_en;
          }
        }
        if (data.schoolCollege) updated.schoolCollege = data.schoolCollege;
        if (data.academicYear) updated.academicYear = data.academicYear;
        if (data.obtainedMarks) updated.obtainedMarks = data.obtainedMarks;
        if (data.totalMarks) updated.totalMarks = data.totalMarks;
        if (data.percentage) updated.percentage = data.percentage;
        if (data.grade) updated.grade = data.grade;
        if (data.cgpa) updated.cgpa = data.cgpa;

        // Auto standard matching
        if (data.passedStandard) {
          const matched = STANDARD_OPTIONS.find((s) => s.id === data.passedStandard);
          if (matched) {
            updated.passedStandard = matched.id;
          }
        }

        // Recalculate percentage if obtained & total exist and percentage is empty
        const obt = parseFloat(updated.obtainedMarks);
        const tot = parseFloat(updated.totalMarks);
        if (!isNaN(obt) && !isNaN(tot) && tot > 0 && (!updated.percentage || isNaN(parseFloat(updated.percentage)))) {
          updated.percentage = ((obt / tot) * 100).toFixed(2);
        }

        return updated;
      });

      setScanNotice({
        type: 'success',
        message: 'માર્કશીટમાંથી વિગતો સફળતાપૂર્વક મેળવી લીધી છે!',
        details: 'કૃપા કરીને નીચે ભરાયેલી તમામ વિગતો (જેમ કે વિદ્યાર્થીનું પૂરું નામ, પિતાનું નામ, ગામ, શાળા અને ગુણ/ટકા) એકવાર ધ્યાનપૂર્વક ચકાસી લો. જો કોઈ વિગતમાં ભૂલ જણાય તો તેને સુધારી લો અને ત્યારબાદ જ ફોર્મ સબમિટ કરો.'
      });
    } catch (err) {
      console.warn('AI Scan Error:', err);
      setScanNotice({
        type: 'error',
        message: err.message || 'માર્કશીટ સ્કેન કરવામાં મુશ્કેલી આવી. આપ વિગતો જાતે પણ ભરી શકો છો.'
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileSelection = (file, autoScan = false) => {
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError('ફાઇલની સાઇઝ 5MB કરતા વધારે ન હોવી જોઈએ.');
      setSelectedFile(null);
      setFilePreview(null);
      return;
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFileError('માત્ર PDF, JPG અથવા PNG ફાઇલ જ અપલોડ કરી શકાશે.');
      setSelectedFile(null);
      setFilePreview(null);
      return;
    }

    setFileError('');
    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
    } else {
      setFilePreview(null);
    }

    if (autoScan) {
      triggerAiScan(file);
    }
  };

  // AI સ્કેન બટન માટેનો હેન્ડલર (આપોઆપ AI સ્કેન શરૂ કરશે)
  const handleAiScanFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0], true);
    }
  };

  // મેન્યુઅલ ફાઇલ અપલોડ માટેનો હેન્ડલર (AI વગર સીધી ફાઇલ એટેચ થશે)
  const handleManualFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0], false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // સેક્શન ૩ માં ડ્રેગ-ડ્રોપ કરે ત્યારે AI વગર સીધી ફાઇલ એટેચ થશે
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0], false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setFileError('');
    setScanNotice(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (marksError) {
      setSubmitStatus({
        type: 'error',
        message: marksError
      });
      return;
    }

    if (!formData.percentage && !formData.grade && !formData.cgpa) {
      setSubmitStatus({
        type: 'error',
        message: 'કૃપા કરીને માર્ક્સ (મેળવેલ/કુલ ગુણ), ટકાવારી (%) અથવા ગ્રેડ દાખલ કરો.'
      });
      return;
    }

    if (eligibility.checked && !eligibility.isEligible) {
      setSubmitStatus({
        type: 'error',
        message: eligibility.message
      });
      return;
    }

    if (!selectedFile) {
      setFileError('કૃપા કરીને માર્કશીટની PDF અથવા ફોટો પસંદ કરો.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const newApplicationNo = `CPPS-2025-${Math.floor(1000 + Math.random() * 9000)}`;
      const submissionTimestamp = new Date().toLocaleString('gu-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      // ૧. ફાઇલને Base64 માં કન્વર્ટ કરવી
      let fileBase64 = '';
      if (selectedFile) {
        try {
          fileBase64 = await fileToBase64(selectedFile);
        } catch (fErr) {
          console.warn('Base64 conversion error:', fErr);
        }
      }

      // ૨. ફાઇલનું નામ "StudentName_Standard.ext" બનાવવું
      const fileExt = selectedFile?.name ? selectedFile.name.split('.').pop() : 'pdf';
      const cleanStudent = (formData.studentName || 'Student').trim().replace(/[/\\?%*:|"<>]/g, '').replace(/\s+/g, '_');
      const stdName = selectedStdConfig ? selectedStdConfig.name : (formData.passedStandard || 'Std');
      const cleanStd = stdName.trim().replace(/[/\\?%*:|"<>]/g, '').replace(/\s+/g, '_');
      const formattedFileName = `${cleanStudent}_${cleanStd}.${fileExt}`;

      // ૩. Google Sheet & Google Drive માં સેવ કરવું
      let driveFileUrl = '';
      try {
        const payload = {
          applicationNo: newApplicationNo,
          submittedAt: submissionTimestamp,
          studentName: formData.studentName,
          fatherName: formData.fatherName,
          village: formData.village,
          contactNo: formData.contactNo,
          email: formData.email,
          schoolCollege: formData.schoolCollege,
          standardTitle: selectedStdConfig ? selectedStdConfig.name : formData.passedStandard,
          passedStandard: formData.passedStandard,
          academicYear: formData.academicYear,
          obtainedMarks: formData.obtainedMarks,
          totalMarks: formData.totalMarks,
          percentage: formData.percentage,
          grade: formData.grade,
          cgpa: formData.cgpa,
          collegeCourseDetails: formData.collegeCourseDetails,
          currentStandard: formData.currentStandard,
          fileName: formattedFileName,
          fileType: selectedFile?.type || '',
          fileBase64: fileBase64
        };

        const gRes = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        const gResult = await gRes.json();
        if (gResult && gResult.fileUrl) {
          driveFileUrl = gResult.fileUrl;
        }
      } catch (gErr) {
        console.warn('Google Script submit error:', gErr);
      }

      // ડિજિટલ રસીદ ઓબ્જેક્ટ
      const finalReceipt = {
        applicationNo: newApplicationNo,
        submittedAt: submissionTimestamp,
        ...formData,
        standardTitle: selectedStdConfig ? selectedStdConfig.name : formData.passedStandard,
        fileName: formattedFileName,
        fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : '',
        fileUrl: driveFileUrl
      };

      // ૧. LocalStorage માં સંગ્રહ કરવો (તરત જ લિસ્ટમાં દેખાય તે માટે)
      try {
        const stored = JSON.parse(localStorage.getItem('cpps_marksheets_submissions') || '[]');
        localStorage.setItem('cpps_marksheets_submissions', JSON.stringify([finalReceipt, ...stored]));
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }

      // ૨. Supabase Table માં સેવ કરવાનો પ્રયાસ કરવો
      try {
        await supabase.from('student_marksheets').insert([
          {
            application_no: finalReceipt.applicationNo,
            student_name: finalReceipt.studentName,
            father_name: finalReceipt.fatherName,
            village: finalReceipt.village,
            contact_no: finalReceipt.contactNo,
            email: finalReceipt.email,
            school_college: finalReceipt.schoolCollege,
            passed_standard: finalReceipt.standardTitle || finalReceipt.passedStandard,
            obtained_marks: finalReceipt.obtainedMarks,
            total_marks: finalReceipt.totalMarks,
            percentage: finalReceipt.percentage,
            grade: finalReceipt.grade,
            current_standard: finalReceipt.currentStandard,
            academic_year: finalReceipt.academicYear,
            file_name: finalReceipt.fileName,
            file_url: finalReceipt.fileUrl
          }
        ]);
      } catch (dbErr) {
        console.warn('Supabase DB save attempt:', dbErr);
      }

      setReceiptData(finalReceipt);

      setSubmitStatus({
        type: 'success',
        message: 'માર્કશીટ ફોર્મ સફળતાપૂર્વક સબમિટ થઈ ગયું છે!'
      });

      handleRemoveFile();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'સબમિટ કરવામાં કોઈ સમસ્યા આવી. કૃપા કરીને ફરી પ્રયત્ન કરો.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // પ્રિન્ટ / PDF ડાઉનલોડ હેન્ડલર
  const handlePrintReceipt = () => {
    window.print();
  };

  // રસીદ નંબર કોપી
  const handleCopyAppNo = (appNo) => {
    if (!appNo) return;
    navigator.clipboard.writeText(appNo).then(() => {
      setCopiedAppNo(true);
      setTimeout(() => setCopiedAppNo(false), 2000);
    });
  };

  // નવું ફોર્મ ભરવા માટે રીસેટ
  const handleResetForNew = () => {
    setReceiptData(null);
    setSubmitStatus(null);
    setFormData({
      studentName: '',
      fatherName: '',
      village: '',
      contactNo: '',
      email: '',
      schoolCollege: '',
      passedStandard: '',
      academicYear: '2025-2026',
      obtainedMarks: '',
      totalMarks: '',
      percentage: '',
      grade: '',
      cgpa: '',
      collegeCourseDetails: '',
      currentStandard: '',
      notes: ''
    });
  };

  const isCollege = formData.passedStandard === 'college';

  return (
    <>
      {/* Print Specific CSS to make output clean on A4 paper/PDF */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-receipt-card, #printable-receipt-card * {
            visibility: visible;
          }
          #printable-receipt-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 24px;
            box-shadow: none !important;
            border: 2px solid #0891b2 !important;
            border-radius: 16px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5">
        {/* Compact Header Banner with Quick Slabs Trigger */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-4 sm:p-5 shadow-sm border border-cyan-200 bg-gradient-to-r from-white via-cyan-50/50 to-teal-50/40 backdrop-blur-md no-print">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-500 to-cyan-400"></div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Title & Badge */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center space-x-1 bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <FaUserGraduate className="text-[10px]" />
                  <span>શિક્ષણ પ્રોત્સાહન</span>
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                <span className="text-xs text-slate-500 hidden sm:inline font-medium">સત્ર ૨૦૨૫ - ૨૦૨૬</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                વિદ્યાર્થી માર્કશીટ સબમિશન
              </h1>
            </div>

            {/* Quick Slabs Modal Button & Steps */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setIsSlabsModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                title="ઈનામ વિતરણ લાયકાત માપદંડ જુઓ"
              >
                <FaAward className="text-amber-600 text-sm" />
                <span>લાયકાત સ્લેબ જુઓ</span>
              </button>

              <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-white/80 border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
                <span className="text-teal-700 font-bold">① સ્કેન</span>
                <span className="text-slate-300">→</span>
                <span className="text-slate-700 font-bold">② ભરો</span>
                <span className="text-slate-300">→</span>
                <span className="text-cyan-700 font-bold">③ સબમિટ</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SUCCESS STATE: DIGITAL RECEIPT (PDF DOWNLOAD + EMAIL NOTIFICATION) */}
        {/* ============================================================== */}
        {receiptData ? (
          <div className="space-y-6">
            {/* Top Success Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start sm:items-center justify-between flex-wrap gap-4 no-print">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-900">
                    અરજી સફળતાપૂર્વક સ્વીકારવામાં આવી છે!
                  </h3>
                  <p className="text-xs text-emerald-700">
                    નીચે દર્શાવેલ સત્તાવાર ડિજિટલ રસીદ તમે PDF સ્વરૂપે સાચવી શકો છો.
                  </p>
                </div>
              </div>

              {receiptData.email && (
                <div className="inline-flex items-center space-x-1.5 bg-white border border-emerald-300 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 shadow-sm">
                  <FaEnvelope className="text-emerald-600" />
                  <span>કન્ફર્મેશન ઈમેઈલ મોકલાયો: {receiptData.email}</span>
                </div>
              )}
            </div>

            {/* Official Printable Receipt Slip Card */}
            <div
              id="printable-receipt-card"
              className="bg-white rounded-3xl border-2 border-cyan-500/80 shadow-2xl p-6 sm:p-10 relative overflow-hidden"
            >
              {/* Receipt Header */}
              <div className="text-center border-b-2 border-slate-100 pb-6 mb-6">
                <div className="inline-block px-3 py-1 bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                  સત્તાવાર ઓનલાઇન અરજી રસીદ
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  શ્રી ચાર પરગણા પ્રજાપતિ સમાજ, સુરત
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  શિક્ષણ પ્રોત્સાહન ઇનામ વિતરણ સમારંભ • સત્ર ૨૦૨૫ - ૨૦૨૬
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                    તારીખ: {receiptData.submittedAt}
                  </span>
                  <div className="inline-flex items-center space-x-1.5 bg-cyan-100/70 border border-cyan-300 px-3.5 py-1 rounded-lg text-cyan-900 text-xs font-bold">
                    <span>અરજી ક્રમાંક: {receiptData.applicationNo}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyAppNo(receiptData.applicationNo)}
                      className="ml-1 text-cyan-700 hover:text-cyan-900 no-print"
                      title="અરજી નંબર કોપી કરો"
                    >
                      <FaCopy className="text-xs" />
                    </button>
                    {copiedAppNo && <span className="text-[10px] text-teal-700">કોપી!</span>}
                  </div>
                </div>
              </div>

              {/* Receipt Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 text-xs block mb-0.5">વિદ્યાર્થીનું પૂરું નામ</span>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">{receiptData.studentName}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 text-xs block mb-0.5">પિતા / વાલીનું નામ</span>
                  <span className="font-bold text-slate-900">{receiptData.fatherName}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 text-xs block mb-0.5">ગામ / વતન</span>
                  <span className="font-bold text-slate-900">{receiptData.village}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 text-xs block mb-0.5">સંપર્ક નંબર (WhatsApp)</span>
                  <span className="font-bold text-slate-900">{receiptData.contactNo}</span>
                </div>

                {receiptData.email && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-500 text-xs block mb-0.5">ઈમેઈલ આઈડી</span>
                    <span className="font-bold text-cyan-800">{receiptData.email}</span>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 text-xs block mb-0.5">શાળા / કોલેજનું નામ</span>
                  <span className="font-bold text-slate-900">{receiptData.schoolCollege || 'લાગુ નથી'}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-200">
                  <span className="text-cyan-800 text-xs block mb-0.5 font-semibold">પાસ કરેલ ધોરણ</span>
                  <span className="font-extrabold text-cyan-900 text-sm">{receiptData.standardTitle}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-200">
                  <span className="text-cyan-800 text-xs block mb-0.5 font-semibold">મેળવેલ ગુણ / ટકાવારી / ગ્રેડ</span>
                  <span className="font-extrabold text-cyan-900 text-sm">
                    {receiptData.obtainedMarks && receiptData.totalMarks && (
                      <span className="mr-2">
                        {receiptData.obtainedMarks} / {receiptData.totalMarks} •
                      </span>
                    )}
                    {receiptData.percentage && <span>{receiptData.percentage}%</span>}
                    {receiptData.grade && <span className="ml-2 font-bold">({receiptData.grade})</span>}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 text-xs block mb-0.5">હાલનો અભ્યાસ</span>
                  <span className="font-bold text-slate-900">{receiptData.currentStandard}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 text-xs block mb-0.5">અપલોડ કરેલ ફાઇલ</span>
                  <span className="font-semibold text-slate-800 text-xs truncate block">{receiptData.fileName}</span>
                </div>
              </div>

              {/* Status Notice */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs leading-relaxed flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">નોંધ અને સૂચના:</p>
                  <p className="mt-0.5">
                    આ આપની અરજીની ડિજિટલ સ્વીકૃતિ રસીદ છે. સમાજની શિક્ષણ સમિતિ દ્વારા માર્કશીટની ચકાસણી કરવામાં આવશે.
                  </p>
                </div>
                <div className="text-right pl-4">
                  <span className="inline-block px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-xs">
                    ✓ સ્વીકૃત
                  </span>
                </div>
              </div>

              {/* Action Buttons (Print / PDF / New Form) */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4 no-print">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-sm flex items-center space-x-2 shadow-md hover:shadow-lg transition-all"
                >
                  <FaPrint className="text-base" />
                  <span>રસીદ પ્રિન્ટ / PDF તરીકે સેવ કરો</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetForNew}
                  className="px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center space-x-2 transition-colors"
                >
                  <FaRedo className="text-xs" />
                  <span>બીજી નવી અરજી કરો</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* FORM VIEW: MAIN INPUT FORM */
          /* ============================================================== */
          <>
            {/* Main Form Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 via-cyan-500 to-amber-400 rounded-t-3xl"></div>
              {submitStatus && submitStatus.type === 'error' && (
                <div className="p-4 rounded-2xl mb-6 flex items-start space-x-3 text-sm bg-rose-50 text-rose-900 border border-rose-200">
                  <FaExclamationCircle className="text-rose-600 text-lg flex-shrink-0 mt-0.5" />
                  <p className="font-semibold">{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* AI Smart Marksheet Auto-Fill Hero Card */}
                <div className="bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-emerald-500/10 border-2 border-teal-400 rounded-3xl p-5 sm:p-7 mb-7 shadow-md relative overflow-hidden ring-4 ring-teal-500/10">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500"></div>

                  {/* Top Highlight Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs animate-pulse">
                      <FaBolt className="text-yellow-200 text-xs" />
                      <span>સૌથી સરળ & ઝડપી રીત (Auto-Fill)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setApiKeyInput(getGeminiApiKey());
                        setIsApiKeyModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-white/90 border border-slate-200 hover:border-teal-300 text-slate-500 hover:text-teal-700 text-[11px] font-semibold flex items-center space-x-1 shadow-2xs transition-colors cursor-pointer"
                      title="Gemini API Key સેટિંગ્સ"
                    >
                      <FaKey className="text-[10px] text-amber-500" />
                      <span>API Key</span>
                    </button>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    {/* Left: Headline & 3-Step Guide */}
                    <div className="space-y-2 max-w-xl">
                      <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span>✨ માર્કશીટનો ફોટો પાડો ➔ ફોર્મ આપોઆપ ભરાઈ જશે!</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        વિદ્યાર્થીનું નામ, પિતાનું નામ, શાળા, ગુણ કે ટકા હાથેથી ટાઈપ કરવાની જરૂર નથી. ફક્ત માર્કશીટનો ફોટો અપલોડ કરો, <strong className="text-teal-800">AI ૧૦ સેકન્ડમાં બધું શોધીને ભરી દેશે.</strong>
                      </p>

                      {/* 3 Step Visual Pills */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-bold text-slate-700">
                        <span className="inline-flex items-center gap-1.5 bg-white border border-teal-200 text-teal-900 px-3 py-1 rounded-xl shadow-2xs">
                          <FaCamera className="text-teal-600 text-xs" />
                          <span>૧. ફોટો પાડો / અપલોડ</span>
                        </span>
                        <span className="text-teal-400 font-black">➔</span>
                        <span className="inline-flex items-center gap-1.5 bg-white border border-teal-200 text-teal-900 px-3 py-1 rounded-xl shadow-2xs">
                          <FaMagic className="text-cyan-600 text-xs" />
                          <span>૨. AI સ્કેન કરશે</span>
                        </span>
                        <span className="text-teal-400 font-black">➔</span>
                        <span className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-950 px-3 py-1 rounded-xl shadow-2xs">
                          <FaCheckCircle className="text-emerald-600 text-xs" />
                          <span>૩. ફોર્મ ઓટોમેટિક ભરાશે!</span>
                        </span>
                      </div>
                    </div>

                    {/* Right: Big Impact Action Button */}
                    <div className="flex flex-col sm:items-end justify-center flex-shrink-0">
                      <label
                        htmlFor="quickAiScanInput"
                        className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-base flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                          isScanning
                            ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-700 hover:via-emerald-700 hover:to-cyan-700 text-white ring-4 ring-teal-400/40'
                        }`}
                      >
                        {isScanning ? (
                          <div className="flex items-center space-x-2 py-1">
                            <FaSpinner className="text-base animate-spin" />
                            <span>AI સ્કેનિંગ અને વિશ્લેષણ ચાલુ છે...</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center space-x-2">
                              <FaCamera className="text-lg text-yellow-300" />
                              <span className="tracking-wide">અહીં માર્કશીટ અપલોડ & સ્કેન કરો</span>
                            </div>
                            <span className="text-[11px] font-normal text-teal-100 mt-0.5">
                              (JPG, PNG ફોટો અથવા PDF ફાઇલ)
                            </span>
                          </>
                        )}
                      </label>
                      <input
                        type="file"
                        id="quickAiScanInput"
                        accept=".pdf,image/png,image/jpeg,image/webp"
                        onChange={handleAiScanFileInputChange}
                        disabled={isScanning}
                        className="hidden"
                      />
                      <p className="text-[11px] text-teal-700 font-semibold text-center sm:text-right mt-1.5">
                        ⚡ ૧ ક્લિકમાં ઓટો-ફિલ શરૂ થશે
                      </p>
                    </div>
                  </div>

                  {/* Scan Notice / Status Alert */}
                  {scanNotice && (
                    <div
                      className={`mt-4 p-4 rounded-2xl flex flex-col gap-2.5 text-xs sm:text-sm font-semibold transition-all ${
                        scanNotice.type === 'success'
                          ? 'bg-emerald-50 text-emerald-950 border-2 border-emerald-400 shadow-xs'
                          : scanNotice.type === 'error'
                          ? 'bg-rose-100 text-rose-900 border border-rose-300'
                          : 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-2.5">
                          {scanNotice.type === 'success' ? (
                            <FaCheckCircle className="text-emerald-600 text-lg flex-shrink-0 mt-0.5" />
                          ) : scanNotice.type === 'error' ? (
                            <FaExclamationCircle className="text-rose-600 text-lg flex-shrink-0 mt-0.5" />
                          ) : (
                            <FaSpinner className="text-cyan-600 text-lg animate-spin flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-extrabold text-sm sm:text-base block">
                              {scanNotice.message}
                            </span>
                            {scanNotice.details && (
                              <p className="mt-1.5 text-xs text-emerald-900 font-medium leading-relaxed bg-white/90 p-3 rounded-xl border border-emerald-200">
                                <strong className="text-emerald-950 font-bold block mb-0.5">⚠️ ચકાસણી ખાસ નોંધ:</strong>
                                {scanNotice.details}
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setScanNotice(null)}
                          className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer flex-shrink-0"
                          title="બંધ કરો"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>

                      {scanNotice.type === 'success' && (
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold text-emerald-800 border-t border-emerald-200/60">
                          <span className="bg-emerald-100/90 px-2 py-0.5 rounded-md">✓ નામ ચકાસો</span>
                          <span className="bg-emerald-100/90 px-2 py-0.5 rounded-md">✓ ગામ પસંદ કરો</span>
                          <span className="bg-emerald-100/90 px-2 py-0.5 rounded-md">✓ માર્ક્સ & ટકા ચકાસો</span>
                          <span className="bg-emerald-100/90 px-2 py-0.5 rounded-md">✓ પછી જ સબમિટ કરો</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Section 1: Student Details */}
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-800 border-b-2 border-slate-100 pb-3 mb-5 flex items-center space-x-2.5">
                    <span className="w-7 h-7 rounded-xl bg-teal-500 text-white flex items-center justify-center text-xs font-black shadow-sm">૧</span>
                    <span>વિદ્યાર્થી અને વાલીની વિગતો</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Student Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        વિદ્યાર્થીનું પૂરું નામ <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="દા.ત. પ્રજાપતિ અંકિતકુમાર"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-slate-800 text-sm transition-all"
                      />
                    </div>

                    {/* Father/Guardian Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        પિતા / વાલીનું નામ <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        required
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        placeholder="દા.ત. રમેશભાઈ પ્રજાપતિ"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-slate-800 text-sm transition-all"
                      />
                    </div>

                    {/* Village Dropdown */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                        <FaMapMarkerAlt className="text-teal-600 text-xs" />
                        <span>ગામ / વતન <span className="text-rose-500">*</span></span>
                      </label>
                      <select
                        name="village"
                        required
                        value={formData.village}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-slate-800 text-sm transition-all bg-white"
                      >
                        <option value="">
                          {isLoadingVillages ? 'ગામો લોડ થઈ રહ્યા છે...' : '-- તમારું ગામ પસંદ કરો --'}
                        </option>
                        {villagesList.map((v) => (
                          <option key={v.id || v.name_en} value={v.name_en}>
                            {v.name_gu ? `${v.name_gu} (${v.name_en})` : v.name_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                        <FaPhoneAlt className="text-teal-600 text-xs" />
                        <span>સંપર્ક નંબર (WhatsApp / Mobile) <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="tel"
                        name="contactNo"
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={formData.contactNo}
                        onChange={handleInputChange}
                        placeholder="દા.ત. 9876543210"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-slate-800 text-sm transition-all"
                      />
                    </div>

                    {/* Email Address (New - for Confirmation Email) */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                        <FaEnvelope className="text-cyan-600 text-xs" />
                        <span>વિદ્યાર્થી / વાલીનું ઈમેઈલ આઈડી (Email) <span className="text-cyan-700 font-bold">*</span></span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="દા.ત. yourname@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 text-sm transition-all"
                      />
                      <span className="text-[11px] text-cyan-700 mt-1 block">
                        (આ ઈમેઈલ પર આપને સત્તાવાર કન્ફર્મેશન રસીદ મોકલવામાં આવશે)
                      </span>
                    </div>

                    {/* School / College */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                        <FaSchool className="text-teal-600 text-xs" />
                        <span>શાળા / કોલેજનું પૂરું નામ</span>
                      </label>
                      <input
                        type="text"
                        name="schoolCollege"
                        value={formData.schoolCollege}
                        onChange={handleInputChange}
                        placeholder="દા.ત. શ્રી વસિષ્ઠ વિદ્યાલય, સુરત"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-slate-800 text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Standard, Marks, Percentage & Grade */}
                <div className="">
                  <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-5">
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-xs font-black shadow-sm">૨</span>
                      <span>ધોરણ અને ગુણ / ટકાવારી / ગ્રેડ</span>
                    </h2>
                    <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200 flex items-center space-x-1">
                      <FaCalculator className="text-xs" />
                      <span>ઓટોમેટિક ટકા ગણતરી</span>
                    </span>
                  </div>

                  {/* Row 1: Passed Standard & Academic Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex items-center space-x-1">
                        <FaBookOpen className="text-cyan-600 text-xs" />
                        <span>પાસ કરેલ ધોરણ (માર્કશીટનું ધોરણ) <span className="text-rose-500">*</span></span>
                      </label>
                      <select
                        name="passedStandard"
                        required
                        value={formData.passedStandard}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-800 text-sm transition-all bg-white font-medium"
                      >
                        <option value="">-- આપનું ધોરણ પસંદ કરો --</option>
                        {STANDARD_OPTIONS.map((std) => (
                          <option key={std.id} value={std.id}>
                            {std.name} (લઘુત્તમ: {std.minPct}%)
                          </option>
                        ))}
                      </select>
                      {/* Live Dynamic Slab Card right under standard dropdown */}
                      {selectedStdConfig ? (
                        <div className="mt-2 p-2.5 rounded-xl bg-amber-50/90 border border-amber-300 text-xs text-amber-900 flex items-center justify-between gap-2 shadow-2xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0 text-xs shadow-2xs">
                              <FaAward />
                            </div>
                            <div>
                              <span className="font-extrabold text-amber-950 block text-[11px] sm:text-xs">
                                {selectedStdConfig.name} નો નિયમ:
                              </span>
                              <span className="text-amber-800 text-[11px]">
                                લઘુત્તમ <strong className="text-amber-950 font-black">{selectedStdConfig.minPct}%</strong> કે તેથી વધુ જરૂરી છે.
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsSlabsModalOpen(true)}
                            className="text-[10px] text-amber-800 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-2 py-1 rounded-md font-bold flex-shrink-0 transition-colors"
                          >
                            બધા સ્લેબ
                          </button>
                        </div>
                      ) : (
                        <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                          <span>ધોરણ પસંદ કરવાથી તેનો સ્લેબ અહીં દેખાશે</span>
                          <button
                            type="button"
                            onClick={() => setIsSlabsModalOpen(true)}
                            className="text-amber-700 hover:underline font-semibold flex items-center space-x-1"
                          >
                            <FaAward className="text-xs text-amber-500" />
                            <span>બધા સ્લેબ</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                        <FaCalendarAlt className="text-cyan-600 text-xs" />
                        <span>માર્કશીટનું શૈક્ષણિક વર્ષ <span className="text-rose-500">*</span></span>
                      </label>
                      <select
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 text-sm bg-white"
                      >
                        <option value="2025-2026">2025 - 2026 (તાજેતરનું વર્ષ)</option>
                        <option value="2024-2025">2024 - 2025</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Marks and Percentage Inputs */}
                  <div className="bg-gradient-to-br from-slate-50 to-cyan-50/30 p-4 rounded-2xl border border-slate-200 shadow-xs mb-4">
                    <div className="text-xs font-bold text-slate-700 mb-3 flex items-center space-x-1.5 text-cyan-800">
                      <FaCalculator className="text-cyan-600 text-xs" />
                      <span>માર્ક્સ અને ટકાવારી ગણતરી (માર્ક્સ લખવાથી ટકા ઓટોમેટિક ગણાશે):</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      {/* Obtained Marks */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          મેળવેલ ગુણ (Obtained)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          name="obtainedMarks"
                          value={formData.obtainedMarks}
                          onChange={handleMarksChange}
                          placeholder="દા.ત. 540"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 text-sm font-semibold"
                        />
                        <span className="text-[10px] text-slate-400 mt-0.5 block">આવેલા કુલ માર્ક્સ</span>
                      </div>

                      {/* Total Marks */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          કુલ ગુણ (Total Marks)
                        </label>
                        <input
                          type="number"
                          step="1"
                          min="1"
                          name="totalMarks"
                          value={formData.totalMarks}
                          onChange={handleMarksChange}
                          placeholder="દા.ત. 600"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 text-sm font-semibold"
                        />
                        <span className="text-[10px] text-slate-400 mt-0.5 block">પરીક્ષાના કુલ માર્ક્સ</span>
                      </div>

                      {/* Percentage Input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                          <span>ટકાવારી (%)</span>
                          {formData.obtainedMarks && formData.totalMarks && !marksError && (
                            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 rounded">
                              ✓ ઓટો ગણતરી
                            </span>
                          )}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            name="percentage"
                            value={formData.percentage}
                            onChange={handleInputChange}
                            placeholder="દા.ત. 90.00"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 text-sm font-bold bg-cyan-50/30 text-cyan-900"
                          />
                          <FaPercentage className="absolute right-3 top-3 text-slate-400 text-xs" />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">સીધા ટકા પણ લખી શકાય</span>
                      </div>

                      {/* Grade Selector */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
                          <FaMedal className="text-amber-500 text-xs" />
                          <span>ગ્રેડ (Grade)</span>
                        </label>
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 text-sm bg-white font-medium"
                        >
                          <option value="">-- ગ્રેડ (વૈકલ્પિક) --</option>
                          {!isCollege ? (
                            <>
                              <option value="A1">A1 ગ્રેડ (૯૧-૧૦૦%)</option>
                              <option value="A2">A2 ગ્રેડ (૮૧-૯૦%)</option>
                              <option value="B1">B1 ગ્રેડ (૭૧-૮૦%)</option>
                              <option value="B2">B2 ગ્રેડ (૬૧-૭૦%)</option>
                              <option value="C1">C1 ગ્રેડ (૫૧-૬૦%)</option>
                              <option value="C2">C2 ગ્રેડ (૪૧-૫૦%)</option>
                              <option value="D">D ગ્રેડ (૩૩-૪૦%)</option>
                            </>
                          ) : (
                            <>
                              <option value="O">O (Outstanding - ૯૦%+)</option>
                              <option value="A+">A+ (Excellent - ૮૦-૮૯%)</option>
                              <option value="A">A (Very Good - ૭૦-૭૯%)</option>
                              <option value="B+">B+ (Good - ૬૦-૬૯%)</option>
                              <option value="B">B (Above Avg - ૫૫-૫૯%)</option>
                              <option value="C">C (Average - ૫૦-૫૪%)</option>
                            </>
                          )}
                        </select>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">જો માર્કશીટમાં હોય તો</span>
                      </div>
                    </div>

                    {marksError && (
                      <p className="text-xs font-semibold text-rose-600 mt-2 flex items-center space-x-1">
                        <FaExclamationCircle className="text-xs" />
                        <span>{marksError}</span>
                      </p>
                    )}
                  </div>

                  {/* If College: extra CGPA and course details */}
                  {isCollege && (
                    <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          કોલેજ ડિગ્રી / કોર્સનું નામ અને વર્ષ <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="collegeCourseDetails"
                          required
                          value={formData.collegeCourseDetails}
                          onChange={handleInputChange}
                          placeholder="દા.ત. B.Com Last Year / BCA Final Sem / BE Mechanical"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          CGPA / SGPA (જો માર્કશીટમાં હોય તો)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          name="cgpa"
                          value={formData.cgpa}
                          onChange={handleInputChange}
                          placeholder="દા.ત. 7.80 અથવા 8.50"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 text-sm bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Current Studying Standard */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      હાલમાં કયા ધોરણ / કોલેજમાં અભ્યાસ કરો છો ? 
                    </label>
                    <input
                      type="text"
                      name="currentStandard"
                      
                      value={formData.currentStandard}
                      onChange={handleInputChange}
                      placeholder="દા.ત. ધોરણ ૫ માં / FY B.Com માં / આગળ અભ્યાસ પૂર્ણ"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 text-sm bg-white"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      (જેથી સમિતિને ખબર પડે કે વિદ્યાર્થી હાલ કયા વર્ગમાં ભણે છે)
                    </p>
                  </div>

                  {/* Live Eligibility Feedback */}
                  {eligibility.checked && (
                    <div
                      className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm flex items-start space-x-2.5 font-medium transition-all ${
                        eligibility.isEligible
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border border-rose-300 text-rose-800'
                      }`}
                    >
                      {eligibility.isEligible ? (
                        <FaCheckCircle className="text-emerald-600 text-base flex-shrink-0 mt-0.5" />
                      ) : (
                        <FaExclamationCircle className="text-rose-600 text-base flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p>{eligibility.message}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 3: File Upload Area */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-100 pb-3 mb-4 gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xs font-black shadow-sm">૩</span>
                      <span>માર્કશીટ ફાઇલ અપલોડ (મેન્યુઅલ / ડાયરેક્ટ)</span>
                    </h2>
                    <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-lg">
                      📁 AI સ્કેન વગર સીધી ફાઇલ એટેચ થશે
                    </span>
                  </div>

                  {isCollege && (
                    <div className="mb-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded-xl font-medium">
                      * કોલેજના વિદ્યાર્થીઓ માટે ખાસ નોંધ: કૃપા કરીને ફક્ત <strong>છેલ્લા વર્ષ / છેલ્લા સેમેસ્ટરની</strong> માર્કશીટ જ અપલોડ કરવી.
                    </div>
                  )}

                  {!selectedFile ? (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="border-2 border-dashed border-cyan-300 hover:border-teal-500 rounded-3xl p-7 sm:p-10 text-center bg-gradient-to-br from-cyan-50/40 to-teal-50/30 hover:from-cyan-50/70 hover:to-teal-50/60 transition-all cursor-pointer group"
                    >
                      <input
                        type="file"
                        id="marksheetFileInput"
                        accept=".pdf,image/png,image/jpeg,image/webp"
                        onChange={handleManualFileInputChange}
                        className="hidden"
                      />
                      <label htmlFor="marksheetFileInput" className="cursor-pointer block">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3.5 rounded-2xl bg-white shadow-md flex items-center justify-center text-cyan-500 group-hover:text-teal-600 group-hover:scale-110 transition-all border border-cyan-100 group-hover:border-teal-200">
                          <FaCloudUploadAlt className="text-3xl sm:text-4xl" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mb-1">
                          માર્કશીટ ફાઇલ પસંદ કરો અથવા અહીં ખેંચો
                        </h3>
                        <p className="text-xs text-slate-500 max-w-md mx-auto mb-3">
                          જો તમે ફોર્મ જાતે ભર્યું હોય તો અહીંથી માર્કશીટ સીધી અપલોડ કરી શકો છો (AI નો ઉપયોગ નહીં થાય).
                        </p>
                        <span className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-colors">
                          <FaCloudUploadAlt className="text-xs" />
                          <span>ફાઇલ પસંદ કરો (સીધી અપલોડ)</span>
                        </span>
                        <p className="text-[11px] text-slate-400 mt-2">
                          સપોર્ટેડ ફોર્મેટ: PDF, JPG, PNG (મહત્તમ 5 MB)
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div className="p-4 sm:p-5 rounded-2xl border border-cyan-200 bg-cyan-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-4">
                        {filePreview ? (
                          <img
                            src={filePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-sm">
                            <FaFilePdf className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{selectedFile.name}</h4>
                          <p className="text-xs text-slate-500">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'ફાઇલ'}
                          </p>
                          <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            ✓ ફાઇલ સફળતાપૂર્વક એટેચ થઈ ગઈ છે
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => triggerAiScan(selectedFile)}
                          disabled={isScanning}
                          className="px-3 py-2 rounded-xl bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-colors disabled:opacity-50 cursor-pointer"
                          title="જો AI દ્વારા ફોર્મ ઓટો-ફિલ કરવું હોય તો જ"
                        >
                          {isScanning ? (
                            <>
                              <FaSpinner className="text-xs animate-spin" />
                              <span>સ્કેનિંગ...</span>
                            </>
                          ) : (
                            <>
                              <FaMagic className="text-xs text-teal-600" />
                              <span>AI થી ઓટો-ફિલ કરવું છે?</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-2.5 rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
                          title="ફાઇલ દૂર કરો"
                        >
                          <FaTimes className="text-sm" />
                        </button>
                      </div>
                    </div>
                  )}

                  {fileError && (
                    <p className="text-xs font-semibold text-rose-600 mt-2 flex items-center space-x-1">
                      <FaExclamationCircle className="text-xs" />
                      <span>{fileError}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t-2 border-slate-100 flex flex-col items-center gap-3">
                  {eligibility.checked && !eligibility.isEligible && (
                    <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl w-full justify-center">
                      <FaExclamationCircle className="text-rose-500 flex-shrink-0" />
                      <p>⚠️ આપના માર્ક્સ / ટકા / ગ્રેડ નિયત સ્લેબ કરતાં ઓછા હોવાથી ફોર્મ સબમિટ થઈ શકશે નહીં.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || (eligibility.checked && !eligibility.isEligible) || !!marksError}
                    className="w-full sm:max-w-sm py-4 px-8 rounded-2xl bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 hover:from-teal-700 hover:to-cyan-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center space-x-2.5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>ડેટા સેવ થઈ રહ્યો છે & માર્કશીટ અપલોડ થઈ રહી છે...</span>
                      </>
                    ) : (
                      <>
                        <FaCloudUploadAlt className="text-lg" />
                        <span>માર્કશીટ ફોર્મ સબમિટ કરો</span>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 text-center font-medium max-w-md">
                    ⚠️ સબમિટ કરતાં પહેલાં ઉપર ભરાયેલ નામ, ગામ અને ગુણ/ટકા એકવાર ધ્યાનથી ચકાસી લેવા વિનંતી • સબમિટ કર્યા પછી સત્તાવાર ડિજિટલ રસીદ મળશે
                  </p>
                </div>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Gemini API Key Configuration Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2.5 text-slate-800 font-bold">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <FaKey className="text-sm" />
                </div>
                <span>Gemini AI API Key સેટિંગ્સ</span>
              </div>
              <button
                type="button"
                onClick={() => setIsApiKeyModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              માર્કશીટમાંથી આપમેળે નામ, માર્ક્સ અને ટકાવારી મેળવવા માટે <strong>Google Gemini API Key</strong> નો ઉપયોગ થાય છે. આ કી તમારા બ્રાઉઝરમાં સુરક્ષિત સંગ્રહાય છે.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                તમારી Gemini API Key:
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                જો તમારી પાસે કી ન હોય તો તમે{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline font-semibold"
                >
                  Google AI Studio
                </a>{' '}
                પરથી તદ્દન મફત (Free) માં મેળવી શકો છો.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsApiKeyModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                રદ કરો
              </button>
              <button
                type="button"
                onClick={() => {
                  setGeminiApiKey(apiKeyInput);
                  setIsApiKeyModalOpen(false);
                  setScanNotice({
                    type: 'success',
                    message: 'Gemini API Key સફળતાપૂર્વક સાચવવામાં આવી છે!'
                  });
                  setTimeout(() => setScanNotice(null), 3000);
                  if (selectedFile) {
                    triggerAiScan(selectedFile);
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs"
              >
                કી સાચવો
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Criteria Slabs Info Modal (Popup) */}
      {isSlabsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in no-print">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-4">
              <div className="flex items-center space-x-2.5 text-slate-800 font-bold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <FaAward className="text-lg" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-extrabold text-base sm:text-lg leading-tight">
                    ઈનામ વિતરણ લાયકાત માપદંડ
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    ટકાવારી અને ગ્રેડ સ્લેબની સત્તાવાર યાદી
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSlabsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <FaTimes className="text-base" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {CRITERIA_SLABS.map((slab) => {
                const isMatched = selectedStdConfig && selectedStdConfig.slabId === slab.id;
                return (
                  <div
                    key={slab.id}
                    className={`p-3.5 rounded-2xl border transition-all text-xs flex items-center justify-between ${
                      isMatched
                        ? 'bg-amber-100/90 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                        : 'bg-amber-50/40 border-amber-200/80 hover:bg-amber-50/80'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{slab.title}</div>
                      {isMatched && (
                        <span className="text-[10px] text-amber-800 font-bold bg-amber-200/80 px-1.5 py-0.5 rounded-md mt-1 inline-block">
                          ✓ તમે પસંદ કરેલ ધોરણ
                        </span>
                      )}
                    </div>
                    <div className="font-extrabold text-amber-800 text-right text-xs bg-white px-2.5 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
                      {slab.badge}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed mb-4">
              <span className="font-bold text-slate-800 block mb-1">મહત્વની નોંધ:</span>
              વિદ્યાર્થીએ મેળવેલ ગુણ / ટકાવારી ઉપર દર્શાવેલ લઘુત્તમ સ્લેબ મુજબ કે તેથી વધુ હોવા અનિવાર્ય છે. ફોર્મ ભરતી વખતે ગુણ લખવાથી ટકાવારી ઓટોમેટિક ગણાઈ જશે.
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsSlabsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-sm transition-all cursor-pointer"
              >
                સમજાઈ ગયું (બંધ કરો)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentMarksheet;
