export const STEPS_DATA = [
  {
    id: 1,
    tag: "01. KRİZ YÖNETİMİ & DENEME ŞOKU",
    title: "Deneme netleri çok kötü geldiğinde ilk tepkiniz ne olur?",
    subtitle: "Kriz anındaki ilk tepkiniz evdeki bütün psikolojik iklimi ve güveni belirler.",
    options: [
      {
        id: "A",
        value: "silent_safe_harbor",
        title: "4 Saat Tam Sessizlik & Sakin Bir Ortam",
        desc: "Ders konusunu açmam; sinir sistemi yatışmadan hiçbir mantıklı konuşma yapılamaz.",
        icon: "ShieldCheck",
        score: 25,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "overprotective_comfort",
        title: "Aşırı Şefkat & “Boşver Canın Sağ Olsun”",
        desc: "Üzülmesine dayanamam; hemen yanına gidip konuyu kapatmaya ve tatlıyla teselli etmeye çalışırım.",
        icon: "HeartHandshake",
        score: 10,
        archetype: "yutan"
      },
      {
        id: "C",
        value: "catastrophic_anger",
        title: "Öfke & “Bu Netlerle Hiçbir Yere Giremezsin!”",
        desc: "Kendi gelecek korkumu çocuğa hesap sorarak ve sertleşerek yansıtırım.",
        icon: "Target",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "D",
        value: "passive_aggressive_cold",
        title: "Soğuk Bakışlar & Sessiz Hayal Kırıklığı",
        desc: "Açıkça bağırmam ama surat asarak ve kapıları sert kapatıp hayal kırıklığımı bütün eve hissettiririm.",
        icon: "Layers",
        score: 6,
        archetype: "gardiyan"
      }
    ]
  },
  {
    id: 2,
    tag: "02. İLETİŞİM DİLİ & MASADAN KALKIŞ",
    title: "Çocuğunuz çalışma masasından kalktığında ona ilk ne sorarsınız?",
    subtitle: "Sorduğunuz tek bir soru evi zehirleyebilir veya gencin omurgasını güçlendirebilir.",
    options: [
      {
        id: "A",
        value: "mind_struggle_question",
        title: "“Bugün seni zihnen en çok ne zorladı?”",
        desc: "Soru sayısına değil, gerçek zihinsel mücadeleye ve emeğine odaklanırım.",
        icon: "Sparkles",
        score: 25,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "quantity_interrogation",
        title: "“Bugün kaç soru çözdün, program bitti mi?”",
        desc: "Sadece sayılara, biten testlere ve günlük performansa odaklanıp teftiş ederim.",
        icon: "SlidersHorizontal",
        score: 6,
        archetype: "gardiyan"
      },
      {
        id: "C",
        value: "guilt_debt_statement",
        title: "“Biz senin için saçımızı süpürge ettik!”",
        desc: "Dökülen paraları ve fedakarlıkları hatırlatarak vicdan azabıyla çalıştırmaya gayret ederim.",
        icon: "AlertCircle",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "D",
        value: "infantilizing_pity",
        title: "“Çok yoruldun yavrum, artık bıraksan mı?”",
        desc: "Zorlanmasına kıyamayıp hemen pes etmesine ve çalışmayı bırakmasına zemin hazırlarım.",
        icon: "HeartHandshake",
        score: 10,
        archetype: "yutan"
      }
    ]
  },
  {
    id: 3,
    tag: "03. ODANIN MAHREMİYETİ & KONTROL",
    title: "Çocuğunuz odasında çalışırken içeri nasıl girersiniz?",
    subtitle: "Habersiz kapı açmalar ebeveynlik değil, aciz bir gardiyanlık üretir.",
    options: [
      {
        id: "A",
        value: "sovereignty_contract",
        title: "Kapısını Mutlaka Çalar, İzin Alırım",
        desc: "Odası onun kutsal egemenlik alanıdır; kendi vicdanına ve sorumluluğuna emanettir.",
        icon: "ShieldCheck",
        score: 25,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "tea_service_inspection",
        title: "Meyve Bahanesiyle Gizli Teftiş Yaparım",
        desc: "İkram bahanesiyle odaya girip masaya, açık sekmelere ve telefona göz atarım.",
        icon: "Eye",
        score: 8,
        archetype: "gardiyan"
      },
      {
        id: "C",
        value: "surprise_raid_police",
        title: "Kapıyı Aniden Açar, Baskın Yaparım",
        desc: "“Hâlâ telefona mı bakıyorsun sen?” diyerek aniden içeri dalar ve yakalamaya çalışırım.",
        icon: "Target",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "D",
        value: "over_servicing_room",
        title: "Odasını ve Masasını Her Gün Ben Toplarım",
        desc: "Ders dışında hiçbir sorumluluk almasına izin vermem, arkasını sürekli ben toparlarım.",
        icon: "Layers",
        score: 10,
        archetype: "yutan"
      }
    ]
  },
  {
    id: 4,
    tag: "04. ERTELEME & TELEFON KAÇIŞI",
    title: "Çocuğunuz masaya oturmayıp telefona kaçtığında ne yaparsınız?",
    subtitle: "Bu tembellik değildir; sınav korkusundan ve yetersizlik hissinden bir kaçış refleksidir.",
    options: [
      {
        id: "A",
        value: "divide_the_monster",
        title: "“Canavarı Böl: Sadece 5 Soru ve 15 Dakika”",
        desc: "Tüm müfredat beyni felç eder; hedefi küçülterek küçük zaferlerle direncini kırarım.",
        icon: "Target",
        score: 25,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "label_as_lazy",
        title: "“Tembelsin, Senden Hiçbir Şey Olmaz!”",
        desc: "Öfkeyle etiketler ve suçlarım; bu da onu daha çok içine kapanmaya ve ekrana iter.",
        icon: "AlertCircle",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "C",
        value: "endless_concession",
        title: "“Canı İstemiyor” Diyip Tamamen Kendi Haline Bırakırım",
        desc: "Sınır koymaktan çekinirim; her taviz gencin disiplin omurgasını biraz daha zayıflatır.",
        icon: "Compass",
        score: 6,
        archetype: "yutan"
      },
      {
        id: "D",
        value: "policing_screen_time",
        title: "Telefonu Zorla Alıp Başında Nöbet Tutarım",
        desc: "Zorla telefonu elinden alır ve yanında beklerim; bu sadece gizli direnç ve öfke üretir.",
        icon: "SlidersHorizontal",
        score: 8,
        archetype: "gardiyan"
      }
    ]
  }
];
