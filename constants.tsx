import {
  UploadCloud,
  BookOpen,
  FileQuestion,
  BarChart3,
  Users,
  AlertTriangle,
  Award,
  Smartphone
} from 'lucide-react';
import { TopicData, TopicId } from './types';

export const APP_NAME = "صيدليات المتحدة - بوابة التعليم الإلكتروني";
export const APP_DESC = "الدليل الشامل لاستخدام نظام Moodle LMS";

export const TOPICS: TopicData[] = [
  {
    id: TopicId.UPLOAD,
    title: "رفع المحتوى",
    description: "كيفية رفع الفيديوهات، الملفات، والعروض التقديمية.",
    icon: UploadCloud,
    color: "sky",
    steps: [
      "تسجيل الدخول على LMS.",
      "اختر الكورس المطلوب.",
      "اضغط “Add Resource” أو “Upload File”.",
      "اختر نوع الملف (Video, PDF, PPT).",
      "ضع اسم واضح للملف ووصف قصير.",
      "اضبط خيارات الوصول (Visible/Hidden, Restricted Access).",
      "اضغط Save & Publish."
    ],
    faq: [
      {
        question: "ماذا أفعل إذا لم يُرفع الفيديو؟",
        answer: "تأكد من حجم الملف، نوع الملف، وسرعة الإنترنت."
      },
      {
        question: "هل يمكن إضافة ملفات كبيرة؟",
        answer: "الحد الأقصى حسب إعدادات الـ LMS، غالبًا 500MB–2GB."
      }
    ],
    tips: [
      "استخدم أسماء ملفات واضحة تحتوي على تاريخ ونوع المحتوى لتسهيل البحث لاحقاً."
    ],
    quizzes: [
      {
        question: "ما هي أول خطوة لرفع ملف جديد؟",
        options: ["حذف الكورس", "تسجيل الدخول واختيار الكورس", "إغلاق المتصفح", "إرسال بريد إلكتروني"],
        correctAnswer: "تسجيل الدخول واختيار الكورس"
      },
      {
        question: "ما هي أنواع الملفات المدعومة؟",
        options: ["PDF و Video و PPT", "صور فقط", "ملفات صوتية فقط", "لا يمكن رفع ملفات"],
        correctAnswer: "PDF و Video و PPT"
      },
      {
        question: "ماذا تفعل بعد رفع الملف؟",
        options: ["الخروج مباشرة", "الضغط على Save & Publish", "إطفاء الجهاز", "حذف الملف"],
        correctAnswer: "الضغط على Save & Publish"
      }
    ]
  },
  {
    id: TopicId.COURSE_SETUP,
    title: "إنشاء الكورسات",
    description: "خطوات بناء هيكل الكورس والوحدات التعليمية.",
    icon: BookOpen,
    color: "emerald",
    steps: [
      "اختر “Create New Course”.",
      "أدخل اسم الكورس، الوصف، والتواريخ.",
      "أضف الوحدات (Modules) بالترتيب المنطقي.",
      "أضف الموارد لكل وحدة (ملفات، فيديوهات، روابط).",
      "اضبط إعدادات الوصول للموظفين (Groups, Permissions).",
      "اختبر الكورس قبل نشره."
    ],
    faq: [
      {
        question: "كيف أغير ترتيب الوحدات؟",
        answer: "استخدم خاصية Drag & Drop من صفحة الكورس الرئيسية."
      },
      {
        question: "هل يمكن نسخ كورس موجود؟",
        answer: "نعم، استخدم خيار “Duplicate Course” لتوفير الوقت."
      }
    ],
    tips: [
      "قسم الكورس لوحدات صغيرة (Micro-learning) لتسهيل التعلم وزيادة التركيز."
    ],
    quizzes: [
      {
        question: "كيف يمكنك تغيير ترتيب الوحدات الدراسية؟",
        options: ["إعادة كتابة الكورس", "خاصية السحب والإفلات (Drag & Drop)", "الاتصال بالدعم الفني", "لا يمكن التغيير"],
        correctAnswer: "خاصية السحب والإفلات (Drag & Drop)"
      },
      {
        question: "ما الفائدة من تقسيم الكورس لوحدات صغيرة؟",
        options: ["تسهيل التعلم وزيادة التركيز", "زيادة صعوبة الكورس", "إضاعة الوقت", "لا توجد فائدة"],
        correctAnswer: "تسهيل التعلم وزيادة التركيز"
      }
    ]
  },
  {
    id: TopicId.QUIZ_SETUP,
    title: "إنشاء الكويز",
    description: "إعداد الاختبارات والتقييمات وبنك الأسئلة.",
    icon: FileQuestion,
    color: "indigo",
    steps: [
      "اختر “Add Quiz” من القائمة.",
      "أدخل عنوان الكويز، المدة الزمنية، والدرجة القصوى.",
      "اختر نوع الأسئلة: Multiple Choice، True/False، Essay، Matching.",
      "اضبط إعدادات التقييم (Automatic للتصحيح التلقائي أو Manual).",
      "اختر Randomization لخلط الأسئلة.",
      "اضغط Save & Preview للمراجعة."
    ],
    faq: [
      {
        question: "كيف أعدل كويز بعد النشر؟",
        answer: "اذهب للكويز، اضغط Edit Settings ثم Save Changes."
      },
      {
        question: "هل يمكن إعادة استخدام أسئلة؟",
        answer: "نعم، استخدم “Question Bank” لاستيراد أسئلة سابقة."
      }
    ],
    tips: [
      "ادمج أسئلة سهلة ومتوسطة وصعبة لتقييم شامل وموضوعي لمستوى الموظف."
    ],
    quizzes: [
      {
        question: "ما هي الخاصية التي تقوم بخلط الأسئلة للمتدربين؟",
        options: ["Mixer", "Randomization", "Shuffling", "Mixing"],
        correctAnswer: "Randomization"
      },
      {
        question: "كيف يمكن إعادة استخدام أسئلة سابقة؟",
        options: ["كتابتها مرة أخرى", "Question Bank", "Copy Paste", "تصوير الشاشة"],
        correctAnswer: "Question Bank"
      },
      {
        question: "ما نوع التقييم الذي يصحح الإجابات فوراً؟",
        options: ["Manual", "Automatic", "Teacher Review", "Slow"],
        correctAnswer: "Automatic"
      }
    ]
  },
  {
    id: TopicId.CERTIFICATES,
    title: "الشهادات والدرجات",
    description: "كيفية إعداد شهادات الإتمام وسجل الدرجات.",
    icon: Award,
    color: "amber",
    steps: [
      "أضف نشاط 'Certificate' أو 'Custom Certificate' في نهاية الكورس.",
      "اضبط شرط الإصدار (Restrict Access): يجب الحصول على درجة النجاح في الاختبار النهائي.",
      "قم بتصميم الشهادة (إضافة اللوجو، اسم المستخدم، التاريخ).",
      "اذهب إلى Gradebook Setup لضبط الأوزان النسبية للدرجات (Weights).",
      "تأكد من تفعيل 'Completion Tracking' للكورس بالكامل."
    ],
    faq: [
      {
        question: "لماذا لا تظهر الشهادة للمتدرب؟",
        answer: "غالباً لأنه لم يحقق شرط النجاح في الاختبار أو لم يكمل جميع الأنشطة المطلوبة."
      },
      {
        question: "كيف أحمل كشف درجات كامل؟",
        answer: "من قائمة Grades > Export > Excel Spreadsheet."
      }
    ],
    tips: [
      "اجعل الشهادة تُرسل تلقائياً للإيميل فور صدورها لزيادة شعور الموظف بالإنجاز."
    ],
    quizzes: [
      {
        question: "ما هو الشرط الأساسي لإصدار الشهادة تلقائياً؟",
        options: ["دفع الرسوم", "تحقيق شرط النجاح (Restrict Access)", "إرسال طلب للمدير", "طباعة الصفحة"],
        correctAnswer: "تحقيق شرط النجاح (Restrict Access)"
      },
      {
        question: "من أين يمكنك تعديل أوزان الدرجات؟",
        options: ["Gradebook Setup", "User Profile", "Dashboard", "Calendar"],
        correctAnswer: "Gradebook Setup"
      }
    ]
  },
  {
    id: TopicId.REPORTS,
    title: "استخراج التقارير",
    description: "متابعة أداء الموظفين ونسب إكمال الكورسات.",
    icon: BarChart3,
    color: "purple",
    steps: [
      "اذهب إلى “Reports” في الكورس أو LMS Dashboard.",
      "اختر نوع التقرير (Participation, Quiz Results, Completion).",
      "اضبط التواريخ والفلاتر المطلوبة.",
      "اضغط Export لتحميل الملف بصيغة (PDF/Excel)."
    ],
    faq: [
      {
        question: "كيف أقرأ تقرير التقييم؟",
        answer: "كل صف يمثل موظف، وكل عمود يمثل نتيجة كويز أو وحدة معينة."
      },
      {
        question: "هل يمكن تتبع تقدم كل موظف؟",
        answer: "نعم، استخدم تقرير Completion لرؤية نسب الإنجاز."
      }
    ],
    tips: [
      "استخدم Pivot Table في Excel بعد التصدير لتحليل البيانات بشكل أسرع وأدق."
    ],
    quizzes: [
      {
        question: "ما الصيغ التي يمكن تصدير التقارير إليها؟",
        options: ["MP4 و MP3", "PDF و Excel", "JPEG و PNG", "EXE"],
        correctAnswer: "PDF و Excel"
      },
      {
        question: "أي تقرير يوضح نسب إنجاز الموظفين للكورس؟",
        options: ["Participation", "Completion", "Logs", "Grades"],
        correctAnswer: "Completion"
      }
    ]
  },
  {
    id: TopicId.USERS,
    title: "إدارة المستخدمين",
    description: "إضافة الموظفين وتحديد الصلاحيات والمجموعات.",
    icon: Users,
    color: "blue",
    steps: [
      "اذهب إلى “Users” ثم “Enroll Users”.",
      "أضف الموظفين بالبحث عن الاسم أو البريد، أو أضف مجموعات كاملة.",
      "اضبط صلاحياتهم (Student, Trainer, Admin).",
      "تحقق من وصول البريد الإلكتروني للتأكيد للموظف."
    ],
    faq: [
      {
        question: "ماذا أفعل إذا لم يتمكن المستخدم من الدخول؟",
        answer: "قم بإعادة تعيين كلمة المرور وتأكد من أن حسابه 'Active'."
      }
    ],
    tips: [
      "استخدم Groups (المجموعات) لتسهيل إدارة الأقسام المختلفة في الصيدليات."
    ],
    quizzes: [
      {
        question: "ما هي الخطوة الأولى لإضافة موظف للكورس؟",
        options: ["Delete User", "Enroll Users", "Block User", "Edit Profile"],
        correctAnswer: "Enroll Users"
      },
      {
        question: "لتسهيل إدارة الأقسام المختلفة، نستخدم:",
        options: ["Groups (المجموعات)", "Tags", "Files", "Folders"],
        correctAnswer: "Groups (المجموعات)"
      }
    ]
  },
  {
    id: TopicId.MOBILE_APP,
    title: "تطبيق الهاتف",
    description: "إعداد واستخدام تطبيق Moodle للجوال.",
    icon: Smartphone,
    color: "teal",
    steps: [
      "حمل تطبيق 'Moodle' من App Store أو Google Play.",
      "افتح التطبيق وأدخل رابط المنصة الخاصة بك (يختلف الرابط حسب المنصة، راجع الإدارة المختصة).",
      "أدخل اسم المستخدم وكلمة المرور الخاصة بك.",
      "يمكنك تصفح المحتوى وتحميله للمشاهدة بدون إنترنت (Offline Mode).",
      "ستصلك إشعارات (Notifications) عند إضافة كورس جديد."
    ],
    faq: [
      {
        question: "هل يعمل التطبيق بدون إنترنت؟",
        answer: "نعم، بشرط تحميل محتوى الكورس مسبقاً أثناء الاتصال بالواي فاي."
      },
      {
        question: "هل يمكن حل الاختبارات من الموبايل؟",
        answer: "نعم، التطبيق يدعم جميع أنواع الأسئلة تقريباً."
      }
    ],
    tips: [
      "تأكد من تحديث التطبيق بانتظام للحصول على أفضل أداء وتجنب الأخطاء."
    ],
    quizzes: [
      {
        question: "ما هو أول شيء يطلبه التطبيق بعد التحميل؟",
        options: ["رقم الهوية", "رابط الموقع (Site URL)", "صورة شخصية", "الموقع الجغرافي"],
        correctAnswer: "رابط الموقع (Site URL)"
      },
      {
        question: "ما الميزة الرئيسية لاستخدام التطبيق؟",
        options: ["التعلم Offline والإشعارات", "تصميم الجرافيك", "طباعة الشهادات", "لا توجد ميزة"],
        correctAnswer: "التعلم Offline والإشعارات"
      }
    ]
  },
  {
    id: TopicId.TROUBLESHOOTING,
    title: "حل المشكلات",
    description: "دليل سريع للمشاكل التقنية الشائعة وحلولها.",
    icon: AlertTriangle,
    color: "red",
    steps: [
      "فيديو لا يعمل -> تحقق من نوع الملف (MP4 يفضل) والحجم.",
      "المستخدم لا يرى الكورس -> تحقق من إضافته للـ Group الصحيحة أو الـ Permissions.",
      "الكويز لا يظهر النتائج -> تحقق من إعدادات التقييم (Gradebook Setup)."
    ],
    faq: [],
    tips: [
      "دائماً تأكد من مسح الـ Cache للمتصفح إذا واجهت مشاكل في العرض."
    ],
    quizzes: [
      {
        question: "ما هو نوع الفيديو المفضل لضمان عمله؟",
        options: ["AVI", "MP4", "MOV", "FLV"],
        correctAnswer: "MP4"
      },
      {
        question: "إذا لم يظهر الكورس للمستخدم، ماذا يجب أن تتحقق؟",
        options: ["سرعة النت", "الصلاحيات (Permissions) والمجموعات", "نوع المتصفح", "حجم الشاشة"],
        correctAnswer: "الصلاحيات (Permissions) والمجموعات"
      }
    ]
  }
];