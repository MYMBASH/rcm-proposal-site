import React from 'react';

// ── Medical Coding ICD-10 ──────────────────────────────────────────────
function MedicalCodingIllustration() {
  return (
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="mcBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#0d2040" />
        </linearGradient>
        <linearGradient id="mcBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B3FAB" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="mcGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="16" fill="url(#mcBg)" />
      {/* Grid lines */}
      {[60,120,180,240,300].map(y => <line key={y} x1="20" y1={y} x2="500" y2={y} stroke="#ffffff08" strokeWidth="1"/>)}
      {/* Header card */}
      <rect x="20" y="16" width="480" height="52" rx="10" fill="#ffffff08" />
      <circle cx="46" cy="42" r="14" fill="url(#mcBlue)" />
      <text x="46" y="47" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ICD</text>
      <rect x="70" y="32" width="140" height="9" rx="4" fill="#ffffff30" />
      <rect x="70" y="46" width="90" height="7" rx="3" fill="#ffffff15" />
      <rect x="400" y="30" width="80" height="24" rx="6" fill="url(#mcGreen)" />
      <text x="440" y="46" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">معتمد ✓</text>
      {/* Code cards */}
      {[
        { x:20, y:82, code:'ICD-10-CM', sub:'S52.001A', color:'#1B3FAB', badge:'كسر', w:150 },
        { x:185, y:82, code:'ICD-10-PCS', sub:'0BH17EZ', color:'#0EA5E9', badge:'إجراء', w:155 },
        { x:355, y:82, code:'DRG Group', sub:'470 - Joint', color:'#7c3aed', badge:'DRG', w:145 },
      ].map(({x,y,code,sub,color,badge,w}) => (
        <g key={code}>
          <rect x={x} y={y} width={w} height={70} rx="10" fill="#ffffff08" stroke={color} strokeWidth="1.5" />
          <rect x={x+10} y={y+10} width={50} height={18} rx="5" fill={color} opacity="0.9" />
          <text x={x+35} y={y+23} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{badge}</text>
          <text x={x+10} y={y+46} fill="white" fontSize="11" fontWeight="bold">{code}</text>
          <text x={x+10} y={y+60} fill="#94a3b8" fontSize="10">{sub}</text>
        </g>
      ))}
      {/* Accuracy meter */}
      <rect x="20" y="168" width="230" height="80" rx="10" fill="#ffffff08" />
      <text x="35" y="190" fill="#94a3b8" fontSize="11">دقة الترميز</text>
      <text x="35" y="218" fill="white" fontSize="36" fontWeight="900">98%</text>
      <rect x="35" y="230" width="180" height="8" rx="4" fill="#ffffff15" />
      <rect x="35" y="230" width="176" height="8" rx="4" fill="url(#mcGreen)" />
      {/* Stats */}
      <rect x="265" y="168" width="110" height="80" rx="10" fill="#1B3FAB20" stroke="#1B3FAB40" strokeWidth="1" />
      <text x="320" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">مطالبات</text>
      <text x="320" y="222" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">12K+</text>
      <text x="320" y="238" textAnchor="middle" fill="#34D399" fontSize="10">شهرياً ↑</text>
      <rect x="390" y="168" width="110" height="80" rx="10" fill="#05966920" stroke="#05966940" strokeWidth="1" />
      <text x="445" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">رفض</text>
      <text x="445" y="222" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">2%</text>
      <text x="445" y="238" textAnchor="middle" fill="#34D399" fontSize="10">فقط ↓</text>
      {/* Workflow */}
      <rect x="20" y="262" width="480" height="80" rx="10" fill="#ffffff06" />
      {['استقبال البيانات','مراجعة السجل','تطبيق الكود','مراجعة الجودة','إرسال المطالبة'].map((step, i) => (
        <g key={step}>
          <circle cx={56 + i * 98} cy="296" r="18" fill={i < 3 ? "url(#mcBlue)" : "#ffffff10"} />
          <text x={56 + i * 98} y="300" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{i+1}</text>
          <text x={56 + i * 98} y="328" textAnchor="middle" fill="#94a3b8" fontSize="8">{step}</text>
          {i < 4 && <line x1={74 + i * 98} y1="296" x2={38 + (i+1)*98} y2="296" stroke="#ffffff20" strokeWidth="1.5" strokeDasharray="4,3" />}
        </g>
      ))}
    </svg>
  );
}

// ── Revenue Cycle Management ───────────────────────────────────────────
function RCMIllustration() {
  return (
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="rcmBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        <linearGradient id="rcmPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="rcmGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="16" fill="url(#rcmBg)" />
      {/* Title */}
      <rect x="20" y="16" width="480" height="48" rx="10" fill="#ffffff08" />
      <text x="36" y="38" fill="white" fontSize="14" fontWeight="bold">لوحة إدارة دورة الإيرادات</text>
      <text x="36" y="54" fill="#94a3b8" fontSize="10">Revenue Cycle Management Dashboard</text>
      {/* Revenue bars */}
      <rect x="20" y="78" width="300" height="170" rx="12" fill="#ffffff08" />
      <text x="36" y="100" fill="#94a3b8" fontSize="11">الإيرادات الشهرية (ر.س)</text>
      {[
        { h:60, v:'1.8M', c:'#7c3aed40' }, { h:80, v:'2.1M', c:'#7c3aed60' },
        { h:55, v:'1.7M', c:'#7c3aed40' }, { h:100, v:'2.4M', c:'url(#rcmPurple)' },
        { h:85, v:'2.2M', c:'#7c3aed60' }, { h:110, v:'2.7M', c:'url(#rcmPurple)' },
      ].map(({h,v,c}, i) => (
        <g key={i}>
          <rect x={40 + i*44} y={218-h} width="32" height={h} rx="6" fill={c} />
          <text x={56 + i*44} y={236} textAnchor="middle" fill="#64748b" fontSize="8">{['يناير','فبراير','مارس','أبريل','مايو','يونيو'][i]}</text>
        </g>
      ))}
      {/* KPI cards on right */}
      {[
        { label:'إجمالي الإيرادات', value:'2.7M', sub:'ر.س', color:'#7c3aed', trend:'+18%' },
        { label:'معدل التحصيل', value:'94.5%', sub:'', color:'#059669', trend:'+3%' },
        { label:'أيام الدورة', value:'28', sub:'يوم', color:'#d97706', trend:'-5 أيام' },
      ].map(({label,value,sub,color,trend}, i) => (
        <g key={label}>
          <rect x="334" y={78 + i*57} width="166" height="50" rx="10" fill="#ffffff08" stroke={color + '30'} strokeWidth="1" />
          <text x="346" y={103 + i*57} fill="#94a3b8" fontSize="9">{label}</text>
          <text x="346" y={120 + i*57} fill="white" fontSize="18" fontWeight="900">{value}<tspan fontSize="10" fill="#64748b"> {sub}</tspan></text>
          <rect x="430" y={85 + i*57} width="58" height="20" rx="6" fill={color + '20'} />
          <text x="459" y={99 + i*57} textAnchor="middle" fill={color} fontSize="10" fontWeight="bold">{trend} ↑</text>
        </g>
      ))}
      {/* Cycle diagram */}
      <rect x="20" y="260" width="480" height="82" rx="12" fill="#ffffff06" />
      <text x="36" y="280" fill="#94a3b8" fontSize="10">دورة الإيرادات</text>
      {['تسجيل المريض','التحقق','الترميز','الفوترة','التحصيل','التسوية'].map((s,i) => (
        <g key={s}>
          <rect x={28 + i*82} y="288" width="68" height="44" rx="8" fill={i % 2 === 0 ? '#7c3aed20' : '#0EA5E920'} stroke={i % 2 === 0 ? '#7c3aed40' : '#0EA5E940'} strokeWidth="1" />
          <text x={62 + i*82} y="308" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{i+1}</text>
          <text x={62 + i*82} y="322" textAnchor="middle" fill="#94a3b8" fontSize="8">{s}</text>
          {i < 5 && <text x={96+i*82} y="314" fill="#64748b" fontSize="12">›</text>}
        </g>
      ))}
    </svg>
  );
}

// ── PLICS (Patient Level Costing) ──────────────────────────────────────
function PLICSIllustration() {
  return (
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="plBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0c1a2e" />
          <stop offset="100%" stopColor="#0f2744" />
        </linearGradient>
        <linearGradient id="plTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="16" fill="url(#plBg)" />
      {/* Header */}
      <rect x="20" y="16" width="480" height="50" rx="10" fill="#0EA5E920" stroke="#0EA5E930" strokeWidth="1" />
      <text x="36" y="36" fill="white" fontSize="13" fontWeight="bold">PLICS — نظام التكاليف على مستوى المريض</text>
      <text x="36" y="52" fill="#94a3b8" fontSize="10">Patient Level Information Costing System</text>
      {/* Patient cost breakdown */}
      <rect x="20" y="80" width="220" height="190" rx="12" fill="#ffffff08" />
      <text x="36" y="104" fill="#94a3b8" fontSize="11">تكلفة المريض - تفصيل</text>
      {[
        { label:'التمريض', pct:35, color:'#0EA5E9' },
        { label:'الأدوية', pct:28, color:'#34D399' },
        { label:'الفحوصات', pct:20, color:'#f59e0b' },
        { label:'الإجراءات', pct:12, color:'#a855f7' },
        { label:'أخرى', pct:5, color:'#64748b' },
      ].map(({label,pct,color}, i) => (
        <g key={label}>
          <text x="36" y={130 + i*32} fill="#e2e8f0" fontSize="11">{label}</text>
          <rect x="36" y={136 + i*32} width="170" height="10" rx="5" fill="#ffffff10" />
          <rect x="36" y={136 + i*32} width={pct * 1.7} height="10" rx="5" fill={color} />
          <text x="215" y={146 + i*32} fill={color} fontSize="10" fontWeight="bold">{pct}%</text>
        </g>
      ))}
      {/* Patient profile cards */}
      {[
        { id:'MR-4521', diag:'قصور القلب', cost:'12,450', drg:'280', days:6 },
        { id:'MR-4522', diag:'كسر الفخذ', cost:'28,900', drg:'470', days:4 },
        { id:'MR-4523', diag:'التهاب رئوي', cost:'8,200', drg:'193', days:5 },
      ].map(({id,diag,cost,drg,days}, i) => (
        <g key={id}>
          <rect x="254" y={80 + i*62} width="246" height="54" rx="10" fill="#ffffff08" stroke="#0EA5E920" strokeWidth="1" />
          <circle cx="278" cy={107 + i*62} r="16" fill="#0EA5E920" stroke="#0EA5E940" strokeWidth="1.5" />
          <text x="278" y={112 + i*62} textAnchor="middle" fill="#0EA5E9" fontSize="10">👤</text>
          <text x="302" y={100 + i*62} fill="white" fontSize="11" fontWeight="bold">{id}</text>
          <text x="302" y={114 + i*62} fill="#94a3b8" fontSize="9">{diag}</text>
          <rect x="390" y={88 + i*62} width="96" height="36" rx="8" fill="#34D39920" />
          <text x="438" y={104 + i*62} textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold">{cost} ر.س</text>
          <text x="438" y={118 + i*62} textAnchor="middle" fill="#64748b" fontSize="8">DRG {drg} • {days} أيام</text>
        </g>
      ))}
      {/* Summary bar */}
      <rect x="20" y="282" width="480" height="62" rx="12" fill="#0EA5E910" stroke="#0EA5E930" strokeWidth="1" />
      {[
        { label:'إجمالي المرضى', value:'1,284' },
        { label:'متوسط التكلفة', value:'18,500 ر.س' },
        { label:'اكتمال البيانات', value:'97.3%' },
        { label:'DRG مُطبَّق', value:'486 كود' },
      ].map(({label,value}, i) => (
        <g key={label}>
          <text x={56 + i*124} y={307} textAnchor="middle" fill="#94a3b8" fontSize="9">{label}</text>
          <text x={56 + i*124} y={330} textAnchor="middle" fill="white" fontSize="14" fontWeight="900">{value}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Health Informatics ─────────────────────────────────────────────────
function HealthInformaticsIllustration() {
  return (
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="hiBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#0d1a30" />
        </linearGradient>
        <linearGradient id="hiGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="16" fill="url(#hiBg)" />
      {/* ECG line decoration */}
      <polyline points="0,60 40,60 55,20 70,100 85,60 150,60 165,30 180,90 195,60 520,60"
        fill="none" stroke="#34D39930" strokeWidth="2" />
      {/* Title */}
      <text x="36" y="98" fill="white" fontSize="14" fontWeight="bold">المعلوماتية الصحية</text>
      <text x="36" y="114" fill="#94a3b8" fontSize="10">Health Informatics & Analytics Platform</text>
      {/* Analytics cards */}
      <rect x="20" y="128" width="150" height="100" rx="12" fill="#05966920" stroke="#05966940" strokeWidth="1" />
      <text x="36" y="152" fill="#34D399" fontSize="11" fontWeight="bold">معدل القبول</text>
      <text x="36" y="188" fill="white" fontSize="40" fontWeight="900">96<tspan fontSize="20">%</tspan></text>
      <text x="36" y="218" fill="#94a3b8" fontSize="9">↑ 4% عن الربع السابق</text>

      <rect x="184" y="128" width="150" height="100" rx="12" fill="#1B3FAB20" stroke="#1B3FAB40" strokeWidth="1" />
      <text x="200" y="152" fill="#60a5fa" fontSize="11" fontWeight="bold">البيانات المعالجة</text>
      <text x="200" y="188" fill="white" fontSize="40" fontWeight="900">2.4<tspan fontSize="20">M</tspan></text>
      <text x="200" y="218" fill="#94a3b8" fontSize="9">سجل طبي / شهر</text>

      <rect x="348" y="128" width="152" height="100" rx="12" fill="#d9770620" stroke="#d9770640" strokeWidth="1" />
      <text x="364" y="152" fill="#fbbf24" fontSize="11" fontWeight="bold">وقت الاستجابة</text>
      <text x="364" y="188" fill="white" fontSize="40" fontWeight="900">1.2<tspan fontSize="20">ث</tspan></text>
      <text x="364" y="218" fill="#94a3b8" fontSize="9">متوسط زمن الاستعلام</text>

      {/* System integration map */}
      <rect x="20" y="244" width="480" height="100" rx="12" fill="#ffffff06" />
      <text x="36" y="268" fill="#94a3b8" fontSize="10">تكامل الأنظمة</text>
      {[
        { x:60, label:'HIS', color:'#0EA5E9' },
        { x:160, label:'EMR', color:'#34D399' },
        { x:260, label:'PACS', color:'#a855f7' },
        { x:360, label:'LIS', color:'#f59e0b' },
        { x:460, label:'RIS', color:'#ec4899' },
      ].map(({x,label,color}) => (
        <g key={label}>
          <circle cx={x} cy={305} r={22} fill={color + '20'} stroke={color + '60'} strokeWidth="2" />
          <text x={x} y={309} textAnchor="middle" fill={color} fontSize="11" fontWeight="bold">{label}</text>
          {x < 460 && <line x1={x+22} y1={305} x2={x+78} y2={305} stroke="#ffffff15" strokeWidth="1.5" strokeDasharray="5,3" />}
        </g>
      ))}
      <text x="260" y="335" textAnchor="middle" fill="#64748b" fontSize="9">منصة التكامل الموحدة — DigiMind HI</text>
    </svg>
  );
}

// ── Digital Transformation ─────────────────────────────────────────────
function DigitalTransformationIllustration() {
  return (
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dtBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#050d1a" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="dtOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="dtBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B3FAB" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="16" fill="url(#dtBg)" />
      {/* Transformation arrow */}
      <text x="260" y="32" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">رحلة التحول الرقمي</text>
      {/* Before/After */}
      <rect x="20" y="48" width="200" height="130" rx="12" fill="#ffffff06" stroke="#ffffff10" strokeWidth="1" />
      <text x="36" y="72" fill="#94a3b8" fontSize="11" fontWeight="bold">قبل التحول</text>
      {['عمليات يدوية بطيئة','بيانات متفرقة','أخطاء ترميز عالية','تقارير متأخرة','تكاليف مرتفعة'].map((t,i) => (
        <g key={t}>
          <circle cx="36" cy={94 + i*20} r="4" fill="#ef4444" />
          <text x="46" y={98 + i*20} fill="#94a3b8" fontSize="9">{t}</text>
        </g>
      ))}
      {/* Arrow */}
      <text x="260" y="122" textAnchor="middle" fill="#f97316" fontSize="28">⟶</text>
      <rect x="20" y="24" width="8" height="154" rx="4" fill="url(#dtOrange)" opacity="0.4" />

      <rect x="300" y="48" width="200" height="130" rx="12" fill="#1B3FAB10" stroke="#0EA5E930" strokeWidth="1" />
      <text x="316" y="72" fill="#60a5fa" fontSize="11" fontWeight="bold">بعد التحول</text>
      {['ترميز آلي فوري','بيانات موحدة ودقيقة','دقة 98% مضمونة','تقارير لحظية','توفير 40% تكاليف'].map((t,i) => (
        <g key={t}>
          <circle cx="316" cy={94 + i*20} r="4" fill="#34D399" />
          <text x="326" y={98 + i*20} fill="#e2e8f0" fontSize="9">{t}</text>
        </g>
      ))}
      <rect x="492" y="24" width="8" height="154" rx="4" fill="url(#dtBlue)" opacity="0.4" />

      {/* Roadmap */}
      <rect x="20" y="192" width="480" height="150" rx="12" fill="#ffffff06" />
      <text x="36" y="216" fill="#94a3b8" fontSize="11">خارطة طريق التحول</text>
      {[
        { phase:'المرحلة 1', title:'التقييم', months:'1-2 شهر', color:'#f97316', done:true },
        { phase:'المرحلة 2', title:'التخطيط', months:'2-3 شهر', color:'#0EA5E9', done:true },
        { phase:'المرحلة 3', title:'التطبيق', months:'3-6 أشهر', color:'#a855f7', done:false },
        { phase:'المرحلة 4', title:'التحسين', months:'مستمر', color:'#34D399', done:false },
      ].map(({phase,title,months,color,done}, i) => (
        <g key={phase}>
          <rect x={30 + i*118} y="226" width="106" height="100" rx="10" fill={color + '15'} stroke={color + '30'} strokeWidth="1" />
          <rect x={30 + i*118} y="226" width="106" height="26" rx="10" fill={color + '30'} />
          <text x={83 + i*118} y="243" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{phase}</text>
          <text x={83 + i*118} y="270" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">{title}</text>
          <text x={83 + i*118} y="290" textAnchor="middle" fill="#94a3b8" fontSize="9">{months}</text>
          <text x={83 + i*118} y="316" textAnchor="middle" fill={done ? '#34D399' : '#64748b'} fontSize="18">
            {done ? '✓' : '○'}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Training ───────────────────────────────────────────────────────────
function TrainingIllustration() {
  return (
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="trBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="16" fill="url(#trBg)" />
      {/* Screen/whiteboard */}
      <rect x="60" y="24" width="400" height="160" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="60" y="24" width="400" height="34" rx="12" fill="#1B3FAB" />
      <text x="260" y="46" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">برنامج تدريب الترميز الطبي المعتمد</text>
      {/* Course modules on screen */}
      {[
        { x:80, y:72, label:'ICD-10-CM/PCS', color:'#0EA5E9', pct:85 },
        { x:80, y:110, label:'AR-DRG Grouping', color:'#34D399', pct:70 },
        { x:80, y:148, label:'PLICS Costing', color:'#a855f7', pct:55 },
      ].map(({x,y,label,color,pct}) => (
        <g key={label}>
          <text x={x} y={y} fill="#e2e8f0" fontSize="10" fontWeight="bold">{label}</text>
          <rect x={x} y={y+6} width="200" height="8" rx="4" fill="#ffffff10" />
          <rect x={x} y={y+6} width={pct * 2} height="8" rx="4" fill={color} />
          <text x={x + 210} y={y+14} fill={color} fontSize="10" fontWeight="bold">{pct}%</text>
        </g>
      ))}
      {/* Podium/stand */}
      <rect x="220" y="184" width="80" height="8" rx="4" fill="#334155" />
      <rect x="240" y="192" width="40" height="30" rx="4" fill="#334155" />
      {/* Participants */}
      {[-170,-90,0,90,170].map((dx, i) => (
        <g key={i}>
          <circle cx={260+dx} cy={255} r={18} fill={['#1B3FAB30','#0EA5E930','#05966930','#7c3aed30','#d9770630'][i]} stroke={['#1B3FAB','#0EA5E9','#059669','#7c3aed','#d97706'][i]} strokeWidth="1.5" />
          <text x={260+dx} y={260} textAnchor="middle" fontSize="14">👤</text>
          <rect x={250+dx} y={275} width="20" height="6" rx="3" fill={['#1B3FAB','#0EA5E9','#059669','#7c3aed','#d97706'][i]} opacity="0.6" />
        </g>
      ))}
      {/* Certificates */}
      <rect x="20" y="294" width="480" height="52" rx="10" fill="#ffffff06" />
      {[
        { label:'AHIMA معتمد', color:'#0EA5E9' },
        { label:'AAPC معتمد', color:'#34D399' },
        { label:'MOH معتمد', color:'#f59e0b' },
        { label:'CBAHI معتمد', color:'#a855f7' },
      ].map(({label,color}, i) => (
        <g key={label}>
          <rect x={30 + i*118} y="304" width="104" height="32" rx="8" fill={color + '20'} stroke={color + '40'} strokeWidth="1" />
          <text x={82 + i*118} y="324" textAnchor="middle" fill={color} fontSize="10" fontWeight="bold">🏅 {label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Digicodex Solution ─────────────────────────────────────────────────
function DigicodexIllustration() {
  return (
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dcBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#050d1a" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="dcPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B3FAB" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="16" fill="url(#dcBg)" />
      {/* Logo area */}
      <rect x="20" y="16" width="480" height="60" rx="12" fill="url(#dcPrimary)" opacity="0.9" />
      <text x="260" y="40" textAnchor="middle" fill="white" fontSize="18" fontWeight="900">DigiCodex</text>
      <text x="260" y="60" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11">منصة الترميز الطبي الذكية</text>
      {/* Search bar mock */}
      <rect x="20" y="92" width="480" height="44" rx="10" fill="#ffffff10" stroke="#ffffff20" strokeWidth="1" />
      <text x="44" y="119" fill="#94a3b8" fontSize="12">ابحث عن كود ICD-10... مثال: S52.001A</text>
      <rect x="448" y="100" width="40" height="28" rx="8" fill="url(#dcPrimary)" />
      <text x="468" y="118" textAnchor="middle" fill="white" fontSize="11">🔍</text>
      {/* Results */}
      {[
        { code:'S52.001A', desc:'كسر في الطرف العلوي من نصف الكعبرة', severity:'متوسط', color:'#0EA5E9' },
        { code:'I50.9', desc:'فشل القلب غير محدد', severity:'عالي', color:'#ef4444' },
        { code:'J18.9', desc:'التهاب رئوي غير محدد', severity:'متوسط', color:'#f59e0b' },
      ].map(({code,desc,severity,color}, i) => (
        <g key={code}>
          <rect x="20" y={150 + i*58} width="480" height="50" rx="10" fill="#ffffff06" stroke="#ffffff10" strokeWidth="1" />
          <rect x="32" y={160 + i*58} width="80" height="26" rx="6" fill={color + '20'} stroke={color + '40'} strokeWidth="1" />
          <text x="72" y={177 + i*58} textAnchor="middle" fill={color} fontSize="11" fontWeight="bold">{code}</text>
          <text x="126" y={170 + i*58} fill="white" fontSize="11" fontWeight="bold">↳ {desc}</text>
          <rect x="402" y={162 + i*58} width="82" height="22" rx="6" fill={color + '15'} />
          <text x="443" y={177 + i*58} textAnchor="middle" fill={color} fontSize="10">⚠ {severity}</text>
        </g>
      ))}
      {/* Footer stats */}
      <rect x="20" y="332" width="480" height="20" rx="6" fill="#ffffff06" />
      <text x="36" y="346" fill="#64748b" fontSize="10">قاعدة بيانات: 95,000+ كود ICD-10 | تحديث: 2024 | دعم عربي وإنجليزي</text>
    </svg>
  );
}

// ── Generic / Default ──────────────────────────────────────────────────
function DefaultIllustration({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="defBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#050d1a" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="defAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B3FAB" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="16" fill="url(#defBg)" />
      <circle cx="260" cy="160" r="80" fill="#1B3FAB15" stroke="#1B3FAB30" strokeWidth="2" />
      <circle cx="260" cy="160" r="50" fill="#0EA5E920" stroke="#0EA5E940" strokeWidth="2" />
      <text x="260" y="155" textAnchor="middle" fill="#0EA5E9" fontSize="36">⚕</text>
      <text x="260" y="180" textAnchor="middle" fill="#94a3b8" fontSize="12">{title}</text>
      <text x="260" y="280" textAnchor="middle" fill="#64748b" fontSize="11">DigiMind — حلول الرعاية الصحية الرقمية</text>
    </svg>
  );
}

// ── Main export ────────────────────────────────────────────────────────
const MAP: Record<string, React.FC> = {
  'medical-coding': MedicalCodingIllustration,
  'clinical-coding': MedicalCodingIllustration,
  'rcm': RCMIllustration,
  'revenue-cycle': RCMIllustration,
  'plics': PLICSIllustration,
  'health-informatics': HealthInformaticsIllustration,
  'digital-transformation': DigitalTransformationIllustration,
  'training': TrainingIllustration,
  'digicodex': DigicodexIllustration,
};

export default function ServiceIllustration({ slug, title }: { slug: string; title?: string }) {
  const Illustration = MAP[slug] || (() => <DefaultIllustration title={title || slug} />);
  return (
    <div className="w-full aspect-[520/360] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
      <Illustration />
    </div>
  );
}
