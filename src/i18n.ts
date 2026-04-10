import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      nav: {
        solutions: "Solutions",
        insights: "Insights",
        industries: "Industries",
        pricing: "Pricing",
        contact: "Contact",
        contactCta: "Contact Sales",
      },
      hero: {
        badge: "Built for Construction Commerce",
        title: "The Largest Hub for the Construction & Building Industries",
        subtitle:
          "More than 150,000 projects are waiting for your products and services. Create your digital store in minutes and move from scattered operations to one command center.",
        ctaPrimary: "Launch Your Store",
        ctaSecondary: "Explore Dashboard",
        statsProjects: "Verified project opportunities",
        statsBranches: "Active business branches",
      },
      horizontal: {
        heading: "A living pipeline from quote to delivery",
        subtitle:
          "Scroll to move through Amtar's smart workflow, from catalog setup to invoicing and ZATCA compliance.",
        cards: [
          {
            title: "Digital Catalog",
            body: "Publish products and services with technical specs, terms, and delivery zones.",
          },
          {
            title: "Smart Offers",
            body: "Turn supply requests into profitable quotations with fast follow-up.",
          },
          {
            title: "Financial Core",
            body: "Track invoices, tax, and revenue with live analytics and branch filters.",
          },
          {
            title: "ZATCA Connect",
            body: "Automate e-invoicing compliance with direct authority integration.",
          },
        ],
      },
      insights: {
        title: "Performance Radar",
        subtitle:
          "Monitor momentum across sales, quote conversion, and invoicing speed with a live command dashboard.",
        metrics: [
          { label: "Quote Win Rate", value: 86, suffix: "%" },
          { label: "Avg Invoice Cycle", value: 4, suffix: "d" },
          { label: "Monthly Revenue Growth", value: 31, suffix: "%" },
        ],
        bars: [
          { label: "Q1", value: 42 },
          { label: "Q2", value: 58 },
          { label: "Q3", value: 74 },
          { label: "Q4", value: 91 },
        ],
      },
      operations: {
        title: "Operations Command Layer",
        subtitle: "A unique operational frame to align teams, branches, suppliers, and delivery timelines.",
        pillars: [
          {
            title: "Branch Synchronization",
            body: "Route inventory and offers between branches with one central workflow.",
          },
          {
            title: "Procurement Intelligence",
            body: "Anticipate demand patterns and prepare sourcing decisions using trend snapshots.",
          },
          {
            title: "Execution Visibility",
            body: "Track the full lifecycle from client inquiry to final invoice handoff.",
          },
        ],
      },
      success: {
        kicker: "Execution Path",
        title: "From Inquiry to Delivery in One Controlled Flow",
        subtitle:
          "A structured operational path that aligns commercial teams, stock movement, and invoicing without disconnected tools.",
        steps: [
          {
            title: "Capture Demand",
            body: "Collect project requests with product specs and branch routing from one intake point.",
            kpi: "Average intake setup: 7 min",
          },
          {
            title: "Price and Approve",
            body: "Build controlled quotations, track revisions, and lock approvals with clear accountability.",
            kpi: "Quote turnaround faster by 38%",
          },
          {
            title: "Deliver and Invoice",
            body: "Move from approved quote to shipment and compliant invoicing with minimal manual handoff.",
            kpi: "Invoice cycle reduced to 4 days",
          },
        ],
      },
      industries: {
        title: "All Construction Industries",
        subtitle: "Amtar is your partner across every building and construction segment.",
        items: [
          "Engineering Offices",
          "Building Materials",
          "Ready Mix Concrete",
          "Crushers & Quarries",
          "Soil Testing Labs",
          "Contracting Companies",
          "Tradesmen and More",
          "Designers",
          "Equipment Rentals",
        ],
      },
      proof: {
        kicker: "Trust Layer",
        title: "Built for Real Teams in Real Project Cycles",
        subtitle:
          "Trusted by procurement, finance, and operations teams that need measurable delivery speed and cleaner commercial control.",
        badges: [
          "Enterprise-ready workflows",
          "Arabic + English operations",
          "Branch-level controls",
          "ZATCA aligned billing",
          "Fast onboarding support",
          "Role-based team access",
        ],
        testimonials: [
          {
            quote: "We moved from spreadsheet chaos to a predictable quote-to-cash flow in one quarter.",
            author: "Procurement Manager",
            role: "National Contracting Group",
          },
          {
            quote: "Branch coordination improved immediately because everyone now sees the same live status.",
            author: "Operations Lead",
            role: "Building Materials Network",
          },
          {
            quote: "Finance got cleaner approvals and faster invoicing with fewer reconciliation issues.",
            author: "Finance Controller",
            role: "Industrial Supply Company",
          },
        ],
      },
      pricing: {
        title: "Choose Your Plan",
        subtitle: "One integrated platform for projects, payments, and customer growth.",
        choose: "Choose Plan",
        plans: [
          {
            name: "Amtar Basic",
            price: "Free",
            period: "Forever",
            points: ["Catalog + listings", "Supply requests", "Basic invoicing", "One city"],
          },
          {
            name: "Amtar Growth",
            price: "1609 SAR",
            period: "Annual",
            points: [
              "All Saudi cities",
              "2 team accounts",
              "Custom domain",
              "Professional design",
            ],
          },
          {
            name: "Amtar PRO",
            price: "3769 SAR",
            period: "Annual",
            points: [
              "Instant VAT",
              "5 team accounts",
              "Branch management",
              "Marketplace listing",
            ],
          },
        ],
      },
      finalCta: {
        kicker: "Deployment",
        title: "Launch Amtar as Your Operating Frontline",
        body: "Start with one branch or scale across regions. Keep your current momentum and upgrade your execution quality.",
        primary: "Start Deployment",
        secondary: "Book Strategy Call",
      },
      footer: {
        line: "Amtar... From the first meter to project success",
      },
      footerPremium: {
        tagline: "The operating layer for construction commerce—catalogs, quotes, branches, and compliant billing in one place.",
        robotAlt: "Amtar assistant — construction robot mascot",
        robotCaption: "Your on-site guide to faster quotes and cleaner operations.",
        colProduct: "Product",
        colCompany: "Company",
        colLegal: "Legal",
        linkWorkflow: "Solutions & workflow",
        linkInsights: "Performance & insights",
        linkIndustries: "Industries",
        linkPricing: "Pricing",
        office: "Saudi Arabia",
        privacy: "Privacy",
        terms: "Terms",
        rights: "© 2026 Amtar. All rights reserved.",
        madeIn: "Built for construction teams in Saudi Arabia and the Gulf.",
      },
      footerCinematic: {
        ready: "Ready to begin?",
        ios: "Download iOS",
        android: "Download Android",
        support: "Support",
        crafted: "Crafted with",
        by: "by",
        brand: "Amtar",
      },
      langSwitch: "?",
      home: {
        intro: {
          kicker: "Construction commerce",
          headline: "Amtar",
          subhead:
            "Your command center for catalogs, smart quotes, branch sync, and compliant billing—scroll to enter the full experience.",
          scrollHint: "Scroll to explore",
        },
        cinematicMarquee: [
          "Catalog to invoice in one flow",
          "Transparent branch operations",
          "Quotes with clear accountability",
          "ZATCA-ready workflows",
          "Built for Saudi construction teams",
        ],
        robotAlt: "Construction robot assistant welcoming you to Amtar",
        liveTracking: "Live tracking",
        popular: "Popular",
        testimonialsKicker: "Testimonials",
        testimonialsTitle: "Trusted by leading teams",
        testimonialsSubtitle:
          "Real companies using Amtar to upgrade delivery speed and commercial control.",
        themeKicker: "Theme Showcase",
        themeTitle: "Four storefront themes to launch faster",
        themeSubtitle: "Pick a direction, publish instantly, then customize as you scale.",
        themeCardBody: "Designed for product-heavy construction catalogs.",
        mobileKicker: "Mobile Command",
        mobileTitle: "Manage offers, approvals, and delivery from your phone",
        mobileSubtitle:
          "A full mobile experience for field teams and branch managers with real-time updates.",
        mobilePoints: [
          "Live notifications for quote progress and approvals",
          "Mobile invoice tracking with compliance checkpoints",
          "Branch inventory snapshots with instant status sync",
          "Arabic and English optimized interfaces",
        ],
        dashboardKicker: "Dashboard Proof",
        dashboardTitle: "Operational dashboards that prove execution",
        dashboardSubtitle:
          "From quote velocity to invoice health, every metric is visible, filterable, and actionable.",
        radarBody:
          "Monitor momentum across sales, quote conversion, and invoice velocity with a live radar that surfaces drift early.",
        storyBody:
          "Scroll to reveal the command flow: from catalog to compliant invoicing, with a single operating timeline.",
        step1Title: "Capture Demand",
        step1Body:
          "Collect project requests with specs and routing from one intake point.",
        step1Kpi: "Average intake setup: 7 min",
        step2Title: "Price and Approve",
        step2Body:
          "Build controlled quotations, track revisions, and lock approvals.",
        step2Kpi: "Quote turnaround faster by 38%",
        step3Title: "Deliver and Invoice",
        step3Body:
          "Move from approved quote to delivery and compliant invoicing.",
        step3Kpi: "Invoice cycle reduced to 4 days",
      },
      v2Gallery: {
        kicker: "Featured visuals",
        title: "Projects in motion",
        subtitle:
          "Scroll—each frame enters from its own angle, scales into focus, then settles. Tap any image to open a sample project sheet.",
        openHint: "Click to open",
        caseLabel: "Case {{n}}",
        items: {
          item0: {
            title: "National materials command",
            body: "Branch-aware catalog, live stock signals, and quote velocity in one operating layer.",
          },
          item1: {
            title: "Field-to-finance pipeline",
            body: "Approvals, delivery checkpoints, and invoicing stitched into a single timeline.",
          },
          item2: {
            title: "Multi-site procurement mesh",
            body: "Coordinated sourcing across regions with shared governance and audit-ready trails.",
          },
          item3: {
            title: "Executive performance lens",
            body: "Leadership dashboards that compress noise into decisive weekly momentum signals.",
          },
          item4: {
            title: "Partner ecosystem storefront",
            body: "A premium digital front that scales from pilot branch to nationwide rollout.",
          },
        },
        dialog: {
          close: "Close",
          hint: "Demo link—replace with your real case study URL.",
          cta: "Open dummy project",
        },
      },
      contact: {
        badge: "Contact",
        title: "Talk to the team",
        subtitle:
          "Tell us about your business. We’ll map the fastest path to a controlled quote-to-cash flow.",
        emailLabel: "Email",
        phoneLabel: "Phone",
        locationLabel: "Location",
        locationValue: "Saudi Arabia",
        form: {
          name: "Full name",
          namePlaceholder: "Your name",
          email: "Work email",
          emailPlaceholder: "name@company.com",
          message: "Message",
          messagePlaceholder: "What are you trying to launch or improve?",
          submit: "Send message",
          emailUs: "Email us",
          sent: "Thanks—your message is ready. If you want, email us directly and we’ll respond quickly.",
        },
      },
    },
  },
  ar: {
    translation: {
      nav: {
        solutions: "الحلول",
        insights: "المؤشرات",
        industries: "القطاعات",
        pricing: "الأسعار",
        contact: "تواصل معنا",
        contactCta: "تواصل مع المبيعات",
      },
      hero: {
        badge: "منصة متكاملة لقطاع البناء",
        title: "أكبر تجمع لقطاعات البناء والتشييد",
        subtitle:
          "أكثر من 150,000 مشروع في انتظار منتجاتك وخدماتك. أنشئ متجرك الرقمي في دقائق وانتقل من إدارة مشتتة إلى لوحة تحكم واحدة.",
        ctaPrimary: "ابدأ متجرك",
        ctaSecondary: "استعرض لوحة التحكم",
        statsProjects: "فرص مشاريع موثوقة",
        statsBranches: "فروع أعمال نشطة",
      },
      horizontal: {
        heading: "مسار حي من عرض السعر حتى التسليم",
        subtitle:
          "مرر الصفحة لاكتشاف دورة عمل أمتار الذكية من إعداد الكتالوج حتى الفوترة والامتثال لزاتكا.",
        cards: [
          {
            title: "كتالوج رقمي",
            body: "اعرض منتجاتك وخدماتك بالمواصفات الفنية والشروط ومناطق التغطية.",
          },
          {
            title: "عروض أسعار ذكية",
            body: "حوّل طلبات التوريد إلى عروض مربحة مع متابعة سريعة.",
          },
          {
            title: "إدارة مالية",
            body: "تابع الفواتير والضريبة والإيرادات بتحليلات لحظية لكل فرع.",
          },
          {
            title: "ربط زاتكا",
            body: "امتثال تلقائي للفوترة الإلكترونية عبر ربط مباشر مع الهيئة.",
          },
        ],
      },
      insights: {
        title: "رادار الأداء",
        subtitle: "راقب زخم المبيعات وتحويل العروض وسرعة الفوترة من لوحة قيادة حية.",
        metrics: [
          { label: "معدل فوز العروض", value: 86, suffix: "%" },
          { label: "متوسط دورة الفاتورة", value: 4, suffix: "ي" },
          { label: "نمو الإيرادات الشهري", value: 31, suffix: "%" },
        ],
        bars: [
          { label: "الربع 1", value: 42 },
          { label: "الربع 2", value: 58 },
          { label: "الربع 3", value: 74 },
          { label: "الربع 4", value: 91 },
        ],
      },
      operations: {
        title: "طبقة قيادة العمليات",
        subtitle: "إطار تشغيلي فريد لمزامنة الفرق والفروع والموردين وجداول التسليم.",
        pillars: [
          {
            title: "مزامنة الفروع",
            body: "وجّه المخزون والعروض بين الفروع عبر مسار مركزي واحد.",
          },
          {
            title: "ذكاء المشتريات",
            body: "توقع أنماط الطلب واستعد لقرارات التوريد عبر لقطات الاتجاهات.",
          },
          {
            title: "وضوح التنفيذ",
            body: "تابع الدورة الكاملة من طلب العميل حتى تسليم الفاتورة النهائية.",
          },
        ],
      },
      success: {
        kicker: "مسار التنفيذ",
        title: "من الاستفسار إلى التسليم ضمن تدفق واحد محكوم",
        subtitle:
          "مسار تشغيلي منظم يوحّد فرق المبيعات والمخزون والفوترة بدون أدوات متفرقة.",
        steps: [
          {
            title: "التقاط الطلب",
            body: "جمع طلبات المشاريع مع المواصفات ومسارات الفروع من نقطة إدخال واحدة.",
            kpi: "متوسط تجهيز الطلب: 7 دقائق",
          },
          {
            title: "التسعير والاعتماد",
            body: "إعداد عروض أسعار منضبطة مع تتبع التعديلات وتثبيت الاعتمادات بوضوح.",
            kpi: "تسريع دورة العرض بنسبة 38%",
          },
          {
            title: "التنفيذ والفوترة",
            body: "الانتقال من عرض معتمد إلى شحن وفوترة متوافقة بأقل تدخل يدوي.",
            kpi: "خفض دورة الفاتورة إلى 4 أيام",
          },
        ],
      },
      industries: {
        title: "جميع قطاعات البناء",
        subtitle: "أمتار شريكك في كل نشاطات البناء والتشييد.",
        items: [
          "مكاتب هندسية",
          "مواد البناء",
          "الخرسانة الجاهزة",
          "الكسارات والمحاجر",
          "مختبرات التربة",
          "شركات المقاولات",
          "الحرفيون والمزيد",
          "المصممون",
          "تأجير المعدات",
        ],
      },
      proof: {
        kicker: "طبقة الثقة",
        title: "مصمم لفرق حقيقية ضمن دورات مشاريع فعلية",
        subtitle:
          "موثوق لدى فرق المشتريات والمالية والعمليات التي تبحث عن سرعة تنفيذ أعلى وتحكم تجاري أوضح.",
        badges: [
          "سير عمل جاهز للمؤسسات",
          "تشغيل عربي + إنجليزي",
          "تحكم على مستوى الفروع",
          "فوترة متوافقة مع زاتكا",
          "دعم انطلاق سريع",
          "صلاحيات حسب الأدوار",
        ],
        testimonials: [
          {
            quote: "انتقلنا من فوضى الجداول إلى تدفق واضح من العرض حتى التحصيل خلال ربع واحد.",
            author: "مدير المشتريات",
            role: "مجموعة مقاولات وطنية",
          },
          {
            quote: "تحسن تنسيق الفروع مباشرة لأن الجميع يرى نفس الحالة اللحظية.",
            author: "قائد العمليات",
            role: "شبكة مواد بناء",
          },
          {
            quote: "حصل الفريق المالي على اعتمادات أوضح وفوترة أسرع مع أخطاء تسوية أقل.",
            author: "مدير مالي",
            role: "شركة توريد صناعي",
          },
        ],
      },
      pricing: {
        title: "اختر خطتك",
        subtitle: "منصة واحدة لإدارة المشاريع والمدفوعات ونمو العملاء.",
        choose: "اختر الخطة",
        plans: [
          {
            name: "أمتار الأساسية",
            price: "مجانية",
            period: "دائم",
            points: [
              "كتالوج وعرض المنتجات",
              "طلبات توريد",
              "فواتير مبسطة",
              "مدينة واحدة",
            ],
          },
          {
            name: "أمتار النمو",
            price: "1609 ر.س",
            period: "سنوي",
            points: [
              "جميع مدن المملكة",
              "2 حساب موظفين",
              "دومين خاص",
              "تصميم احترافي",
            ],
          },
          {
            name: "أمتار الاحترافية",
            price: "3769 ر.س",
            period: "سنوي",
            points: [
              "تفعيل ضريبة القيمة",
              "5 حسابات موظفين",
              "إدارة الفروع",
              "الظهور في السوق",
            ],
          },
        ],
      },
      finalCta: {
        kicker: "الإطلاق",
        title: "اجعل أمتار واجهتك التشغيلية الأساسية",
        body: "ابدأ بفرع واحد أو توسع على مستوى المناطق مع رفع جودة التنفيذ دون تعطيل أعمالك الحالية.",
        primary: "ابدأ الإطلاق",
        secondary: "احجز جلسة استراتيجية",
      },
      footer: {
        line: "أمتار... من أول متر حتى اكتمال مشروعك",
      },
      footerPremium: {
        tagline: "طبقة التشغيل لتجارة البناء—كتالوجات وعروض وفروع وفوترة متوافقة في مكان واحد.",
        robotAlt: "مساعد أمتار — روبوت بثيمة البناء",
        robotCaption: "دليلك الميداني لعروض أسرع وتشغيل أوضح.",
        colProduct: "المنتج",
        colCompany: "الشركة",
        colLegal: "قانوني",
        linkWorkflow: "الحلول وسير العمل",
        linkInsights: "الأداء والمؤشرات",
        linkIndustries: "القطاعات",
        linkPricing: "الأسعار",
        office: "المملكة العربية السعودية",
        privacy: "الخصوصية",
        terms: "الشروط",
        rights: "© 2026 أمتار. جميع الحقوق محفوظة.",
        madeIn: "مبني لفرق البناء في السعودية والخليج.",
      },
      footerCinematic: {
        ready: "هل أنت مستعد للبدء؟",
        ios: "تنزيل iOS",
        android: "تنزيل أندرويد",
        support: "الدعم",
        crafted: "صُنع بـ",
        by: "من",
        brand: "أمتار",
      },
      langSwitch: "EN",
      home: {
        intro: {
          kicker: "تجارة البناء",
          headline: "أمتار",
          subhead:
            "مركز قيادتك للكتالوجات والعروض الذكية ومزامنة الفروع والفوترة المتوافقة—مرّر لدخول التجربة الكاملة.",
          scrollHint: "مرّر للاستكشاف",
        },
        cinematicMarquee: [
          "من الكتالوج إلى الفاتورة في مسار واحد",
          "تشغيل شفاف للفروع",
          "عروض بمساءلة واضحة",
          "جاهزية متوافقة مع الزكاة والضريبة",
          "مبني لفرق البناء في السعودية",
        ],
        robotAlt: "روبوت مساعد بثيمة البناء يرحب بك في أمتار",
        liveTracking: "متابعة لحظية",
        popular: "الأكثر طلبًا",
        testimonialsKicker: "آراء العملاء",
        testimonialsTitle: "موثوق لدى فرق رائدة",
        testimonialsSubtitle: "شركات تستخدم أمتار لرفع سرعة التنفيذ وتحسين التحكم التجاري.",
        themeKicker: "نماذج الواجهات",
        themeTitle: "أربع واجهات جاهزة للانطلاق أسرع",
        themeSubtitle: "اختر الاتجاه، انطلق فورًا، ثم خصص مع نمو أعمالك.",
        themeCardBody: "مصمم لكتالوجات منتجات البناء الكثيفة.",
        mobileKicker: "إدارة عبر الجوال",
        mobileTitle: "تابع العروض والاعتمادات والتسليم من هاتفك",
        mobileSubtitle: "تجربة كاملة لفرق الميدان ومديري الفروع مع تحديثات لحظية.",
        mobilePoints: [
          "إشعارات لحظية لتقدم عروض الأسعار والاعتمادات",
          "متابعة الفواتير عبر الجوال مع نقاط امتثال",
          "ملخصات مخزون الفروع مع مزامنة فورية",
          "واجهات محسنة بالعربية والإنجليزية",
        ],
        dashboardKicker: "إثبات لوحة التحكم",
        dashboardTitle: "لوحات تشغيل تُثبت جودة التنفيذ",
        dashboardSubtitle: "من سرعة العروض إلى صحة الفواتير، كل المؤشرات واضحة وقابلة للتصفية والتنفيذ.",
        radarBody:
          "راقب الزخم عبر المبيعات وتحويل عروض الأسعار وسرعة الفوترة مع رادار حي يكشف الانحراف مبكرًا.",
        storyBody:
          "مرر لاكتشاف تدفق التشغيل: من الكتالوج حتى الفوترة المتوافقة ضمن مسار واحد.",
        step1Title: "التقاط الطلب",
        step1Body: "جمع طلبات المشاريع بالمواصفات ومسارات الفروع من نقطة واحدة.",
        step1Kpi: "متوسط تجهيز الطلب: 7 دقائق",
        step2Title: "التسعير والاعتماد",
        step2Body: "إعداد عروض منضبطة مع تتبع التعديلات وتثبيت الاعتمادات.",
        step2Kpi: "تسريع دورة العرض بنسبة 38%",
        step3Title: "التسليم والفوترة",
        step3Body: "الانتقال من عرض معتمد إلى تسليم وفوترة متوافقة.",
        step3Kpi: "خفض دورة الفاتورة إلى 4 أيام",
      },
      v2Gallery: {
        kicker: "لقطات مميزة",
        title: "مشاريع في حركة",
        subtitle:
          "مرّر الصفحة—كل إطار يدخل من زاوية مختلفة ويتكبّر ثم يستقر. اضغط على أي صورة لفتح بطاقة مشروع تجريبية.",
        openHint: "اضغط للفتح",
        caseLabel: "دراسة {{n}}",
        items: {
          item0: {
            title: "قيادة مواد على مستوى الوطن",
            body: "كتالوج يعرف الفروع، ومؤشرات مخزون لحظية، وسرعة عروض في طبقة تشغيل واحدة.",
          },
          item1: {
            title: "مسار من الميدان إلى المالية",
            body: "اعتمادات، نقاط تسليم، وفوترة مدمجة في خط زمني واحد.",
          },
          item2: {
            title: "شبكة توريد متعددة المواقع",
            body: "تنسيق التوريد بين المناطق مع حوكمة موحدة ومسارات جاهزة للمراجعة.",
          },
          item3: {
            title: "عدسة أداء تنفيذية",
            body: "لوحات قيادة تختصر الضجيج إلى إشارات أسبوعية حاسمة.",
          },
          item4: {
            title: "واجهة شراكات راقية",
            body: "واجهة رقمية تتوسع من فرع تجريبي إلى إطلاق وطني.",
          },
        },
        dialog: {
          close: "إغلاق",
          hint: "رابط تجريبي—استبدله برابط دراسة الحالة الحقيقية.",
          cta: "فتح مشروع تجريبي",
        },
      },
      contact: {
        badge: "تواصل",
        title: "تحدث مع الفريق",
        subtitle: "شاركنا تفاصيل عملك وسنحدد أسرع مسار لرفع التحكم من العرض حتى التحصيل.",
        emailLabel: "البريد",
        phoneLabel: "الهاتف",
        locationLabel: "الموقع",
        locationValue: "المملكة العربية السعودية",
        form: {
          name: "الاسم الكامل",
          namePlaceholder: "اسمك",
          email: "البريد الوظيفي",
          emailPlaceholder: "name@company.com",
          message: "الرسالة",
          messagePlaceholder: "ما الذي تريد إطلاقه أو تحسينه؟",
          submit: "إرسال",
          emailUs: "راسلنا",
          sent: "شكرًا—تم تجهيز رسالتك. يمكنك مراسلتنا مباشرة وسنرد بسرعة.",
        },
      },
    },
  },
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })

export default i18n
