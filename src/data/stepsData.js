export const STEPS_DATA = [
  {
    id: 1,
    tag: "01. KRİZ YÖNETİMİ & DENEME ŞOKU",
    title: "Deneme netleri çok kötü geldiğinde ilk 4 saat ne yaparsınız?",
    subtitle: "Kriz anındaki ilk tepkiniz evdeki bütün psikolojik iklimi belirler.",
    options: [
      {
        id: "A",
        value: "silent_safe_harbor",
        title: "4 Saat Tam Sessizlik & Sıcak Bir Yemek",
        desc: "Ders konuşmam; sinir sistemi yatışmadan hiçbir mantık işlemez.",
        badge: "Dirayetli Liman",
        icon: "ShieldCheck",
        score: 20,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "overprotective_comfort",
        title: "Aşırı Şefkat & “Boşver Canın Sağ Olsun”",
        desc: "Kıyamam, odasına tatlı taşır ve konuyu hemen kapatmaya çalışırım.",
        badge: "Yutan Ebeveyn",
        icon: "HeartHandshake",
        score: 8,
        archetype: "yutan"
      },
      {
        id: "C",
        value: "catastrophic_anger",
        title: "Öfke & “Bu Netlerle Hiçbir Yere Giremezsin!”",
        desc: "Kendi gelecek korkumu çocuğa hesap sorarak ve bağırarak yansıtırım.",
        badge: "Tiran Baskı",
        icon: "Target",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "D",
        value: "passive_aggressive_cold",
        title: "Soğuk Bakışlar & Kapıları Sert Kapatma",
        desc: "Açıkça bağırmam ama hayal kırıklığımı bütün eve hissettiririm.",
        badge: "Mikro-Gardiyan",
        icon: "Layers",
        score: 5,
        archetype: "gardiyan"
      }
    ]
  },
  {
    id: 2,
    tag: "02. İLETİŞİM DİLİ & SORULAN SORULAR",
    title: "Masadan kalktığında çocuğunuza ilk ne sorarsınız?",
    subtitle: "Sorduğunuz tek bir soru evi zehirleyebilir veya ferahlatabilir.",
    options: [
      {
        id: "A",
        value: "mind_struggle_question",
        title: "“Bugün seni zihnen en çok ne zorladı?”",
        desc: "Soru sayısına değil, gerçek zihinsel mücadeleye odaklanırım.",
        badge: "Hakikat Dili",
        icon: "Sparkles",
        score: 20,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "quantity_interrogation",
        title: "“Bugün kaç soru çözdün, program bitti mi?”",
        desc: "Gardiyan tavrıyla sadece niceliği ve sayıları teftiş ederim.",
        badge: "Gardiyan Teftişi",
        icon: "SlidersHorizontal",
        score: 5,
        archetype: "gardiyan"
      },
      {
        id: "C",
        value: "guilt_debt_statement",
        title: "“Biz senin için saçımızı süpürge ettik!”",
        desc: "Dökülen paraları hatırlatarak sahte bir vicdan azabı yüklerim.",
        badge: "Duygusal Şantaj",
        icon: "AlertCircle",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "D",
        value: "infantilizing_pity",
        title: "“Çok yoruldun yavrum, artık bıraksan mı?”",
        desc: "Karakter omurgası geliştirmesini engelleyip pes etmesine zemin hazırlarım.",
        badge: "Aşırı Koruma",
        icon: "HeartHandshake",
        score: 8,
        archetype: "yutan"
      }
    ]
  },
  {
    id: 3,
    tag: "03. ODANIN MAHREMİYETİ & KONTROL",
    title: "Çocuğunuz odasındayken içeri nasıl girersiniz?",
    subtitle: "Habersiz kapı açmalar ebeveynlik değil, aciz bir gardiyanlıktır.",
    options: [
      {
        id: "A",
        value: "sovereignty_contract",
        title: "Kapıyı Mutlaka Çalar, İzin İsterim",
        desc: "Odası onun kutsal egemenlik alanıdır; kendi vicdanına emanettir.",
        badge: "Egemenlik Sözleşmesi",
        icon: "ShieldCheck",
        score: 20,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "tea_service_inspection",
        title: "Meyve Bahanesiyle Gizli Teftiş Yaparım",
        desc: "Bir şey ikram ediyormuş gibi yapıp masaya ve telefona göz atarım.",
        badge: "Gizli Gözetleme",
        icon: "Eye",
        score: 6,
        archetype: "gardiyan"
      },
      {
        id: "C",
        value: "surprise_raid_police",
        title: "Kapıyı Aniden Açar, Baskın Yaparım",
        desc: "“Hâlâ telefona mı bakıyorsun sen?” diyerek aniden içeri dalarım.",
        badge: "Baskın Refleksi",
        icon: "Target",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "D",
        value: "over_servicing_room",
        title: "Odasını ve Masasını Her Gün Ben Toplarım",
        desc: "Ders dışında hiçbir sorumluluk almasına izin vermem, her şeyi ben yaparım.",
        badge: "Edilgenleştirme",
        icon: "Layers",
        score: 8,
        archetype: "yutan"
      }
    ]
  },
  {
    id: 4,
    tag: "04. KIYASLAMA & ÇEVRE BASKISI",
    title: "Başka çocukların başarıları konuşulduğunda tavrınız ne olur?",
    subtitle: "Çocuğu başkasıyla kıyaslamak, özgün varlığına yapılan ağır bir saldırıdır.",
    options: [
      {
        id: "A",
        value: "compare_to_yesterday",
        title: "Asla Kıyaslamam, Tek Ölçü Dünkü Kendisidir",
        desc: "Komşunun çocuğuyla değil, dünkü çabasıyla yarışmasını öğretirim.",
        badge: "Onurlu Birey",
        icon: "Award",
        score: 20,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "covert_social_comparison",
        title: "“Komşunun Kızı Hiç Uyumuyormuş” Derim",
        desc: "Güyâ hırslandırmak için gizlice başkalarının netlerini örnek veririm.",
        badge: "Zehirli Kıyas",
        icon: "Users",
        score: 4,
        archetype: "gardiyan"
      },
      {
        id: "C",
        value: "status_panic_projection",
        title: "“Elalem Ne Der, Bizi Rezil Etme!”",
        desc: "Kendi sosyal statü kaygımı çocuğun sırtına yüklerim.",
        badge: "Statü Projeksiyonu",
        icon: "Flame",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "D",
        value: "frantic_course_buying",
        title: "Korkup Hemen Yeni Özel Dersler Yığarım",
        desc: "Başkalarını duyunca paniğe kapılıp sürekli yeni kurslar alırım.",
        badge: "Panik Müdahalesi",
        icon: "Box",
        score: 6,
        archetype: "yutan"
      }
    ]
  },
  {
    id: 5,
    tag: "05. ERTELEME & TELEFON BAĞIMLILIĞI",
    title: "Çocuğunuz masaya oturamayıp telefona kaçtığında ne yaparsınız?",
    subtitle: "Bu tembellik değildir; varoluşsal bir korkudan kaçış mekanizmasıdır.",
    options: [
      {
        id: "A",
        value: "divide_the_monster",
        title: "“Canavarı Böl: Sadece 1 Kural ve 5 Soru”",
        desc: "Tüm müfredat felç eder; hedefi küçülterek küçük zaferler kazandırırım.",
        badge: "Usta Rehber",
        icon: "Target",
        score: 20,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "label_as_lazy",
        title: "“Tembelsin, Senden Hiçbir Şey Olmaz!”",
        desc: "Öfkeyle etiketler, onu daha da içine kapanmaya ve ekrana iterim.",
        badge: "Yıkıcı Damgalama",
        icon: "AlertCircle",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "C",
        value: "endless_concession",
        title: "“Canı İstemiyor” Diyip Tamamen Bırakırım",
        desc: "Her taviz bir tiran yaratır; sınır koymayarak genci zayıflatırım.",
        badge: "Sınırsız Taviz",
        icon: "Compass",
        score: 5,
        archetype: "yutan"
      },
      {
        id: "D",
        value: "policing_screen_time",
        title: "Telefonunu Zorla Alıp Başında Nöbet Tutarım",
        desc: "Masanın yanına oturup zorla denetlerim; sadece gizli direnç üretirim.",
        badge: "Zoraki Nöbetçi",
        icon: "SlidersHorizontal",
        score: 6,
        archetype: "gardiyan"
      }
    ]
  },
  {
    id: 6,
    tag: "06. BİYOLOJİK DÜZEN & UYKU",
    title: "Evinizde uyku ve telefon bırakma düzeni nasıldır?",
    subtitle: "Biyolojisi çökmüş bir gençten yüksek odaklanma bekleyemezsiniz.",
    options: [
      {
        id: "A",
        value: "circadian_discipline",
        title: "Sabit Uyanış & Uykudan 1 Saat Önce Dijital Karartma",
        desc: "Hafta sonu dahil saat şaşmaz; telefonlar salonda şarja bırakılır.",
        badge: "Biyolojik İntizam",
        icon: "MoonStar",
        score: 20,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "chaotic_sleeping_habits",
        title: "Gece 3’e Kadar Ekran, Sabah Uyanamama",
        desc: "Gece telefona karışmayız, sabah yataktan kazıyarak kaldırırız.",
        badge: "Biyolojik Kaos",
        icon: "AlertCircle",
        score: 4,
        archetype: "yutan"
      },
      {
        id: "C",
        value: "bedtime_screaming_fights",
        title: "Her Gece Telefon Yüzünden Yaşanan Kavgalar",
        desc: "“Kapat artık şu telefonu!” bağırışlarıyla yatağa gireriz.",
        badge: "Gece Gerilimi",
        icon: "Flame",
        score: 2,
        archetype: "tiran"
      },
      {
        id: "D",
        value: "results_only_ignore_health",
        title: "“Yeter ki Çalışsın, Kaçta Yattığı Önemsiz”",
        desc: "Enerji içeceğiyle sabahlatsa da ses etmem; sinir sistemi iflas eder.",
        badge: "Tükenmişlik",
        icon: "Zap",
        score: 6,
        archetype: "gardiyan"
      }
    ]
  },
  {
    id: 7,
    tag: "07. ATEŞKES & SINAVSIZ MABET",
    title: "Haftada 2 saat evde sınav ve ders kelimesini yasaklıyor musunuz?",
    subtitle: "YKS biter. Ancak bu süreçte kırılan bir kalbin tamiri onlarca yıl sürer.",
    options: [
      {
        id: "A",
        value: "sacred_sanctuary_applied",
        title: "Evet: Haftalık 2 Saatlik Sınavsız Aile Mabedi",
        desc: "Çocuk şunu hisseder: “Beni netlerim için değil, evladı olduğum için seviyorlar.”",
        badge: "Güvenli Liman",
        icon: "HeartHandshake",
        score: 20,
        archetype: "bilge"
      },
      {
        id: "B",
        value: "all_talks_lead_to_exam",
        title: "Hayır; Her Konu Mutlaka Netlere ve Derslere Gelir",
        desc: "Yemekte, arabada, yürüyüşte konu hep dönüp dolaşıp sınava bağlanır.",
        badge: "Sınav Zehirlenmesi",
        icon: "Layers",
        score: 5,
        archetype: "gardiyan"
      },
      {
        id: "C",
        value: "complete_alienation_silence",
        title: "Kavga Çıkmasın Diye Birbirimizle Hiç Konuşmuyoruz",
        desc: "Konuştuğumuz anda kavga çıktığı için yabancılar gibi yaşıyoruz.",
        badge: "Kopuk İletişim",
        icon: "AlertCircle",
        score: 0,
        archetype: "tiran"
      },
      {
        id: "D",
        value: "anxious_parent_dependency",
        title: "Ben Konuşmasam Bile Çocuğum Panikle Geliyor",
        desc: "Kendi kaygısını yönetemediği için sürekli bana gelip onay arıyor.",
        badge: "Kaygı Sarmalı",
        icon: "Compass",
        score: 7,
        archetype: "yutan"
      }
    ]
  }
];
