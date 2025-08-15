// Mock Data Service for Frontend-Only Deployment
// This file contains all the hardcoded data needed to run the frontend without a backend

// Mock Users Data
export const mockUsers = [
  {
    _id: "user1",
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed.mohammed@example.com",
    isDoctor: false,
    isAdmin: false,
    seenNotifications: [],
    unseenNotifications: [
      {
        _id: "notif1",
        message: "تم تأكيد موعدك مع د. فاطمة",
        type: "appointment",
        createdAt: "2024-01-15T10:00:00Z"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "user2",
    firstName: "فاطمة",
    lastName: "علي",
    email: "fatima.ali@example.com",
    isDoctor: false,
    isAdmin: false,
    seenNotifications: [],
    unseenNotifications: [],
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z"
  },
  {
    _id: "admin1",
    firstName: "مدير",
    lastName: "النظام",
    email: "admin@balsam.com",
    isDoctor: false,
    isAdmin: true,
    seenNotifications: [],
    unseenNotifications: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

// Mock Doctors Data
export const mockDoctors = [
  {
    _id: "doctor1",
    userId: "doctor_user1",
    firstName: "د. فاطمة",
    lastName: "أحمد",
    email: "fatima.ahmed@balsam.com",
    country: "العراق",
    city: "النجف",
    address: "شارع الإمام علي، مجمع الطب الحديث، النجف",
    department: "أمراض القلب",
    specialization: "جراحة القلب التداخلية",
    experience: "15 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-790-123-4567",
    feePerConsultation: "150000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor2",
    userId: "doctor_user2",
    firstName: "د. محمد",
    lastName: "علي",
    email: "mohammed.ali@balsam.com",
    country: "العراق",
    city: "البصرة",
    address: "شارع الكورنيش، مستشفى البصرة التعليمي، البصرة",
    department: "طب الأعصاب",
    specialization: "جراحة الأعصاب",
    experience: "12 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-780-987-6543",
    feePerConsultation: "200000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor3",
    userId: "doctor_user3",
    firstName: "د. زينب",
    lastName: "حسن",
    email: "zainab.hassan@balsam.com",
    country: "العراق",
    city: "الموصل",
    address: "شارع النجفي، مركز طب الأطفال، الموصل",
    department: "طب الأطفال",
    specialization: "طب الأطفال العام",
    experience: "8 سنوات",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-750-456-7890",
    feePerConsultation: "120000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor4",
    userId: "doctor_user4",
    firstName: "د. أحمد",
    lastName: "محمود",
    email: "ahmed.mahmoud@balsam.com",
    country: "العراق",
    city: "أربيل",
    address: "شارع 100 متر، عيادة الجلدية الحديثة، أربيل",
    department: "طب الجلدية",
    specialization: "طب الجلد التجميلي",
    experience: "20 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-750-789-1234",
    feePerConsultation: "180000",
    status: "pending",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z"
  },
  {
    _id: "doctor5",
    userId: "doctor_user5",
    firstName: "د. علي",
    lastName: "حسين",
    email: "ali.hussein@balsam.com",
    country: "العراق",
    city: "كركوك",
    address: "شارع بغداد، مستشفى كركوك العام، كركوك",
    department: "طب العظام",
    specialization: "جراحة العظام والمفاصل",
    experience: "18 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-750-111-2222",
    feePerConsultation: "250000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor6",
    userId: "doctor_user6",
    firstName: "د. نور",
    lastName: "محمود",
    email: "noor.mahmoud@balsam.com",
    country: "العراق",
    city: "الديوانية",
    address: "شارع الكفيل، عيادة النساء والتوليد، الديوانية",
    department: "طب النساء والتوليد",
    specialization: "جراحة النساء التجميلية",
    experience: "14 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-780-333-4444",
    feePerConsultation: "220000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor7",
    userId: "doctor_user7",
    firstName: "د. حسن",
    lastName: "عبدالله",
    email: "hassan.abdullah@balsam.com",
    country: "العراق",
    city: "الحلة",
    address: "شارع الكوفة، مركز طب العيون، الحلة",
    department: "طب العيون",
    specialization: "جراحة العيون بالليزر",
    experience: "16 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-790-555-6666",
    feePerConsultation: "300000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor8",
    userId: "doctor_user8",
    firstName: "د. سارة",
    lastName: "علي",
    email: "sara.ali@balsam.com",
    country: "العراق",
    city: "كربلاء",
    address: "شارع الإمام الحسين، عيادة طب الأسنان، كربلاء",
    department: "طب الأسنان",
    specialization: "تقويم الأسنان",
    experience: "10 سنوات",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-780-777-8888",
    feePerConsultation: "180000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor9",
    userId: "doctor_user9",
    firstName: "د. عمر",
    lastName: "محمد",
    email: "omar.mohammed@balsam.com",
    country: "العراق",
    city: "الزبير",
    address: "شارع البصرة، مستشفى الزبير العام، الزبير",
    department: "طب الباطنية",
    specialization: "أمراض الجهاز الهضمي",
    experience: "13 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-750-999-0000",
    feePerConsultation: "160000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor10",
    userId: "doctor_user10",
    firstName: "د. ليلى",
    lastName: "أحمد",
    email: "layla.ahmed@balsam.com",
    country: "العراق",
    city: "الزقازيق",
    address: "شارع النيل، عيادة طب النفس، الزقازيق",
    department: "طب النفس",
    specialization: "العلاج النفسي المعرفي",
    experience: "11 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-780-111-3333",
    feePerConsultation: "200000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor11",
    userId: "doctor_user11",
    firstName: "د. كريم",
    lastName: "علي",
    email: "kareem.ali@balsam.com",
    country: "العراق",
    city: "أربيل",
    address: "شارع 100 متر، عيادة طب المسالك البولية، أربيل",
    department: "طب المسالك البولية",
    specialization: "جراحة المسالك البولية",
    experience: "19 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-750-444-5555",
    feePerConsultation: "280000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "doctor12",
    userId: "doctor_user12",
    firstName: "د. رنا",
    lastName: "محمد",
    email: "rana.mohammed@balsam.com",
    country: "العراق",
    city: "النجف",
    address: "شارع الإمام علي، عيادة طب التجميل، النجف",
    department: "طب التجميل",
    specialization: "جراحة التجميل الترميمية",
    experience: "17 سنة",
    timings: "من الأحد إلى الخميس\nمن الساعة 8 إلى 12",
    phoneNumber: "+964-790-666-7777",
    feePerConsultation: "350000",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  }
];

// Mock Appointments Data
export const mockAppointments = [
  {
    _id: "appointment1",
    doctorId: "doctor1",
    doctorInfo: {
      _id: "doctor1",
      firstName: "د. فاطمة",
      lastName: "أحمد",
      department: "أمراض القلب",
      specialization: "جراحة القلب التداخلية"
    },
    userInfo: {
      _id: "user1",
      firstName: "أحمد",
      lastName: "محمد",
      email: "ahmed.mohammed@example.com"
    },
    date: "2024-01-20",
    time: "10:00",
    status: "confirmed",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "appointment2",
    doctorId: "doctor2",
    doctorInfo: {
      _id: "doctor2",
      firstName: "د. محمد",
      lastName: "علي",
      department: "طب الأعصاب",
      specialization: "جراحة الأعصاب"
    },
    userInfo: {
      _id: "user2",
      firstName: "فاطمة",
      lastName: "علي",
      email: "fatima.ali@example.com"
    },
    date: "2024-01-22",
    time: "14:00",
    status: "pending",
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z"
  },
  {
    _id: "appointment3",
    doctorId: "doctor3",
    doctorInfo: {
      _id: "doctor3",
      firstName: "د. زينب",
      lastName: "حسن",
      department: "طب الأطفال",
      specialization: "طب الأطفال العام"
    },
    userInfo: {
      _id: "user1",
      firstName: "أحمد",
      lastName: "محمد",
      email: "ahmed.mohammed@example.com"
    },
    date: "2024-01-18",
    time: "11:00",
    status: "completed",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-18T12:00:00Z"
  },
  {
    _id: "appointment4",
    doctorId: "doctor5",
    doctorInfo: {
      _id: "doctor5",
      firstName: "د. علي",
      lastName: "حسين",
      department: "طب العظام",
      specialization: "جراحة العظام والمفاصل"
    },
    userInfo: {
      _id: "user1",
      firstName: "أحمد",
      lastName: "محمد",
      email: "ahmed.mohammed@example.com"
    },
    date: "2024-01-25",
    time: "09:00",
    status: "confirmed",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z"
  },
  {
    _id: "appointment5",
    doctorId: "doctor6",
    doctorInfo: {
      _id: "doctor6",
      firstName: "د. نور",
      lastName: "محمود",
      department: "طب النساء والتوليد",
      specialization: "جراحة النساء التجميلية"
    },
    userInfo: {
      _id: "user2",
      firstName: "فاطمة",
      lastName: "علي",
      email: "fatima.ali@example.com"
    },
    date: "2024-01-26",
    time: "10:00",
    status: "pending",
    createdAt: "2024-01-21T10:00:00Z",
    updatedAt: "2024-01-21T10:00:00Z"
  },
  {
    _id: "appointment6",
    doctorId: "doctor7",
    doctorInfo: {
      _id: "doctor7",
      firstName: "د. حسن",
      lastName: "عبدالله",
      department: "طب العيون",
      specialization: "جراحة العيون بالليزر"
    },
    userInfo: {
      _id: "user1",
      firstName: "أحمد",
      lastName: "محمد",
      email: "ahmed.mohammed@example.com"
    },
    date: "2024-01-27",
    time: "11:00",
    status: "confirmed",
    createdAt: "2024-01-22T10:00:00Z",
    updatedAt: "2024-01-22T10:00:00Z"
  }
];

// Mock Ratings Data
export const mockRatings = [
  {
    _id: "rating1",
    doctorId: "doctor1",
    userId: "user1",
    rating: 5,
    comment: "طبيب ممتاز، ذو خبرة عالية ومهني. أنصح به بشدة!",
    createdAt: "2024-01-18T12:00:00Z"
  },
  {
    _id: "rating2",
    doctorId: "doctor1",
    userId: "user2",
    rating: 4,
    comment: "تجربة رائعة، الطبيب محترف ومفيد جداً",
    createdAt: "2024-01-17T12:00:00Z"
  },
  {
    _id: "rating3",
    doctorId: "doctor2",
    userId: "user1",
    rating: 5,
    comment: "طبيب أعصاب متميز، حل مشكلتي بالكامل",
    createdAt: "2024-01-16T12:00:00Z"
  },
  {
    _id: "rating4",
    doctorId: "doctor3",
    userId: "user2",
    rating: 5,
    comment: "طبيبة أطفال رائعة، أطفالي يحبونها!",
    createdAt: "2024-01-15T12:00:00Z"
  },
  {
    _id: "rating5",
    doctorId: "doctor5",
    userId: "user1",
    rating: 4,
    comment: "طبيب عظام ممتاز، خبرة عالية في علاج الإصابات",
    createdAt: "2024-01-14T12:00:00Z"
  },
  {
    _id: "rating6",
    doctorId: "doctor6",
    userId: "user2",
    rating: 5,
    comment: "طبيبة نساء رائعة، مهنية جداً ومهتمة بالمرضى",
    createdAt: "2024-01-13T12:00:00Z"
  },
  {
    _id: "rating7",
    doctorId: "doctor7",
    userId: "user1",
    rating: 5,
    comment: "طبيب عيون متميز، أجريت عملية ليزر ناجحة",
    createdAt: "2024-01-12T12:00:00Z"
  },
  {
    _id: "rating8",
    doctorId: "doctor8",
    userId: "user2",
    rating: 4,
    comment: "طبيبة أسنان محترفة، تقويم الأسنان ممتاز",
    createdAt: "2024-01-11T12:00:00Z"
  },
  {
    _id: "rating9",
    doctorId: "doctor9",
    userId: "user1",
    rating: 5,
    comment: "طبيب باطنية ذو خبرة، حل مشكلة الجهاز الهضمي",
    createdAt: "2024-01-10T12:00:00Z"
  },
  {
    _id: "rating10",
    doctorId: "doctor10",
    userId: "user2",
    rating: 4,
    comment: "طبيبة نفس رائعة، العلاج المعرفي مفيد جداً",
    createdAt: "2024-01-09T12:00:00Z"
  }
];

// Mock Notifications Data
export const mockNotifications = [
  {
    _id: "notif1",
    userId: "user1",
    message: "تم تأكيد موعدك مع د. فاطمة أحمد في 20 يناير الساعة 10:00 صباحاً",
    type: "appointment",
    isRead: false,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "notif2",
    userId: "user1",
    message: "تم إكمال موعدك مع د. زينب حسن",
    type: "appointment",
    isRead: true,
    createdAt: "2024-01-18T12:00:00Z"
  },
  {
    _id: "notif3",
    userId: "user2",
    message: "طلب موعدك مع د. محمد علي قيد الانتظار للموافقة",
    type: "appointment",
    isRead: false,
    createdAt: "2024-01-16T10:00:00Z"
  }
];

// Mock Departments and Specializations
export const mockDepartments = [
  "أمراض القلب",
  "طب الأعصاب",
  "طب الأطفال",
  "طب الجلدية",
  "طب العظام",
  "طب النساء والتوليد",
  "طب العيون",
  "طب الأسنان",
  "طب الباطنية",
  "طب النفس",
  "طب المسالك البولية",
  "طب التجميل",
  "طب الأورام",
  "طب الطوارئ",
  "الأشعة"
];

export const mockSpecializations = {
  "أمراض القلب": ["جراحة القلب التداخلية", "فيزيولوجيا القلب الكهربائية", "فشل القلب", "طب القلب الوقائي"],
  "طب الأعصاب": ["جراحة الأعصاب", "طب الأعصاب للسكتة الدماغية", "الصرع", "اضطرابات الحركة"],
  "طب الأطفال": ["طب الأطفال العام", "طب قلب الأطفال", "طب أعصاب الأطفال", "طب أورام الأطفال"],
  "طب الجلدية": ["طب الجلد التجميلي", "طب الجلد الطبي", "طب الجلد الجراحي", "طب جلد الأطفال"],
  "طب العظام": ["جراحة العظام والمفاصل", "استبدال المفاصل", "طب الرياضة", "جراحة العمود الفقري", "جراحة الإصابات"],
  "طب النساء والتوليد": ["جراحة النساء التجميلية", "طب النساء العام", "طب التوليد", "جراحة النساء", "طب العقم"],
  "طب العيون": ["جراحة العيون بالليزر", "طب العيون العام", "جراحة الشبكية", "طب عيون الأطفال", "جراحة المياه البيضاء"],
  "طب الأسنان": ["تقويم الأسنان", "جراحة الفم", "طب الأسنان التجميلي", "طب أسنان الأطفال", "طب اللثة"],
  "طب الباطنية": ["أمراض الجهاز الهضمي", "طب الباطنية العام", "طب العائلة", "طب الطوارئ", "طب المسنين"],
  "طب النفس": ["العلاج النفسي المعرفي", "طب النفس العام", "طب نفس الأطفال", "طب الإدمان", "طب النفس الجنائي"],
  "طب المسالك البولية": ["جراحة المسالك البولية", "طب المسالك البولية العام", "جراحة الكلى", "طب العقم الذكري", "جراحة البروستات"],
  "طب التجميل": ["جراحة التجميل الترميمية", "جراحة التجميل التجميلية", "جراحة الوجه والفكين", "جراحة الثدي", "جراحة اليد"],
  "طب الأورام": ["طب الأورام الطبي", "طب الأورام الإشعاعي", "طب الأورام الجراحي", "أمراض الدم"],
  "طب الطوارئ": ["الإصابات", "العناية المركزة", "علم السموم", "طب البرية"],
  "الأشعة": ["الأشعة التشخيصية", "الأشعة التداخلية", "الطب النووي", "طب الأورام الإشعاعي"]
};

// Mock Countries and Cities
export const mockCountries = [
  "العراق",
  "مصر",
  "الأردن",
  "لبنان",
  "الإمارات",
  "السعودية",
  "الكويت",
  "قطر",
  "البحرين",
  "عمان"
];

export const mockCities = {
  "العراق": ["النجف", "البصرة", "الموصل", "أربيل", "كركوك", "الديوانية", "الحلة", "كربلاء", "الزبير", "الزقازيق"],
  "مصر": ["القاهرة", "الإسكندرية", "الجيزة", "أسيوط", "الأقصر", "أسوان", "بورسعيد", "دمياط", "المنصورة", "طنطا"],
  "الأردن": ["عمان", "إربد", "الزرقاء", "السلط", "العقبة", "الكرك", "الطفيلة", "معان", "الرصيفة", "الرمثا"],
  "لبنان": ["بيروت", "طرابلس", "صيدا", "بعلبك", "زحلة", "جبيل", "جبيل", "النبطية", "عكار", "بنت جبيل"],
  "الإمارات": ["دبي", "أبو ظبي", "الشارقة", "العين", "أم القيوين", "رأس الخيمة", "الفجيرة", "عجمان"]
};

// Helper function to get average rating for a doctor
export const getAverageRating = (doctorId) => {
  const doctorRatings = mockRatings.filter(rating => rating.doctorId === doctorId);
  if (doctorRatings.length === 0) return 0;
  
  const totalRating = doctorRatings.reduce((sum, rating) => sum + rating.rating, 0);
  return (totalRating / doctorRatings.length).toFixed(1);
};

// Helper function to get total ratings count for a doctor
export const getTotalRatings = (doctorId) => {
  return mockRatings.filter(rating => rating.doctorId === doctorId).length;
};

// Helper function to get doctor ratings
export const getDoctorRatings = (doctorId) => {
  return mockRatings.filter(rating => rating.doctorId === doctorId);
};

// Helper function to search doctors
export const searchDoctors = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return mockDoctors.filter(doctor => 
    doctor.firstName.toLowerCase().includes(term) ||
    doctor.lastName.toLowerCase().includes(term) ||
    doctor.department.toLowerCase().includes(term) ||
    doctor.specialization.toLowerCase().includes(term) ||
    doctor.city.toLowerCase().includes(term)
  );
};

// Helper function to get approved doctors
export const getApprovedDoctors = () => {
  return mockDoctors.filter(doctor => doctor.status === "approved");
};

// Helper function to get pending doctors
export const getPendingDoctors = () => {
  return mockDoctors.filter(doctor => doctor.status === "pending");
};

// Helper function to get user appointments
export const getUserAppointments = (userId) => {
  return mockAppointments.filter(appointment => appointment.userInfo._id === userId);
};

// Helper function to get doctor appointments
export const getDoctorAppointments = (doctorId) => {
  return mockAppointments.filter(appointment => appointment.doctorId === doctorId);
};

// Helper function to get user notifications
export const getUserNotifications = (userId) => {
  return mockNotifications.filter(notification => notification.userId === userId);
};

// Helper function to get unseen notifications count
export const getUnseenNotificationsCount = (userId) => {
  return mockNotifications.filter(notification => 
    notification.userId === userId && !notification.isRead
  ).length;
}; 