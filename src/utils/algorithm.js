import { STEPS_DATA } from "../data/stepsData";

export function calculatePackage(answers) {
  let totalScore = 0;
  const archetypeCounts = {
    bilge: 0,
    yutan: 0,
    tiran: 0,
    gardiyan: 0
  };

  // Iterate over each step to calculate score and accumulate archetypes
  STEPS_DATA.forEach((step) => {
    const rawVal = answers[step.id];
    if (!rawVal) return;
    
    // Normalize to array
    const selectedVals = Array.isArray(rawVal) ? rawVal : [rawVal];
    
    selectedVals.forEach((val) => {
      const option = step.options.find((opt) => opt.value === val);
      if (option) {
        totalScore += option.score || 0;
        if (option.archetype && archetypeCounts[option.archetype] !== undefined) {
          archetypeCounts[option.archetype] += 1;
        }
      }
    });
  });

  // Cap score to 100 max
  const scorePercent = Math.min(100, Math.max(15, Math.round(totalScore)));

  // Determine dominant archetype
  let dominantArchetype = "bilge";
  let maxCount = -1;

  // Priority order if tied: tiran > gardiyan > yutan > bilge to highlight crucial risk areas
  const priorityOrder = ["tiran", "gardiyan", "yutan", "bilge"];
  priorityOrder.forEach((arch) => {
    if (archetypeCounts[arch] > maxCount) {
      maxCount = archetypeCounts[arch];
      dominantArchetype = arch;
    }
  });

  // Archetype details based on Peterson & Jung clinical frameworks in kaostan_duzene.pdf
  const ARCHETYPE_CONFIGS = {
    bilge: {
      title: "Bilge & Dirayetli Liman",
      badge: "İDEAL DİRAYET EBEVEYNİ",
      accentColor: "#D4AF37",
      quote: "“Çocuğunuzu dünyadan ve sınavın dehşetinden koruyamazsınız. Yapabileceğiniz yegâne şey; onu bu ejderhayla yüzleşebilecek kadar yetkin, dürüst ve cesur kılmaktır.”",
      diagnosis: "Evinizde yüksek bir olgunluk ve sınır bilinci hakim. Çocuğunuzun yerine ders çalışmak yerine, ona kendi kaderinin ağırlığını onurla taşıtmayı başaran nadir ebeveynlerdensiniz.",
      invisibleTrap: "Bazen yüksek beklenti çıtanız, çocuğunuzun başarısız olduğu anlarda duygularını gizlemesine yol açabilir. Sınavsız mabet saatlerini ihmal etmemelisiniz.",
      teenImpact: "Genç, ebeveynine saygı duyar ve güvenli liman hisseder. Ancak tökezlediğinde hayal kırıklığı yaratma korkusu taşıyabilir.",
      prescriptions: [
        "Deneme sonrası 24 saat kuralını ve ilk 4 saatlik akademik sessizliği tavizsiz sürdürün.",
        "Oda egemenlik sözleşmesi ile gencin özerkliğini koruyun; kapısını çalmadan girmeyin.",
        "Haftada 2 saatlik Sınavsız Ateşkes vaktinde sadece evlat ve aile olmanın huzurunu yaşatın.",
        "Kendi dünkü haliyle kıyaslama ilkesini tüm aile üyelerine standart hale getirin."
      ]
    },
    yutan: {
      title: "Yutan Ebeveyn (Aşırı Bakım & Helikopter)",
      badge: "AŞIRI KORUMACI RİSK GRUBU",
      accentColor: "#38BDF8",
      quote: "“Carl Gustav Jung ve Jordan Peterson’ın uyardığı en tehlikeli arketiplerden biri, aşırı korumacı tavrıyla evladını yutan ve edilgenleştiren ebeveyndir.”",
      diagnosis: "Çocuğunuza kıyamadığınız ve onun adına her şeyi kolaylaştırdığınız için, farkında olmadan onun karar alma ve dayanıklılık kaslarını felç ediyorsunuz.",
      invisibleTrap: "“Her taviz bir tiran yaratır.” Çocuğa disiplinsizliğinde acımak merhamet değildir. Ona sınır koymayan ebeveyn, onu sınav salonunda tek başına paniklemeye terk eder.",
      teenImpact: "Sınav anında tek başına kaldığında ne yapacağını bilemez, karar alma yetisi felç olur ve zor bir soruyla karşılaştığında hemen panikleyerek pes eder.",
      prescriptions: [
        "Odasının temizliği, masasının düzeni ve uyanma sorumluluğunu derhal gencin kendisine devredin.",
        "Zorluk çektiğinde hemen boşver diyerek konuyu kapatmayın; canavarı küçük parçalara bölerek yüzleşmesini sağlayın.",
        "Haftalık deneme analizlerinde cerrah gibi soğukkanlı bir gözlemci olun, aşırı teselli yerine strateji konuşun.",
        "Kendi kaygı ve suçluluk duygunuzu yatıştırmak için çocuğu sürekli konfor alanında tutmaktan vazgeçin."
      ]
    },
    tiran: {
      title: "Tiran Ebeveyn (Koşullu Kabul & Yüksek Baskı)",
      badge: "KRİTİK BASKI & ÇATIŞMA ALANI",
      accentColor: "#F43F5E",
      quote: "“Çocuğunuz masanın başına oturmadığında duyduğunuz o kontrolsüz öfke gerçekten onun geleceği için midir, yoksa kendi ebeveynlik egonuzun zedelenmesi korkusu mudur?”",
      diagnosis: "Evinizde sevgi ve onay, doğrudan yüksek netlere endekslenmiş durumda. Bu durum çocukta derin bir gizli depresyon, başarısızlık korkusu ve sahte sonuçlar bildirme eğilimi yaratır.",
      invisibleTrap: "“Biz senin için saçımızı süpürge ettik, dershanelere dünyanın parasını döktük.” Bu cümle çocuğun sırtına ömür boyu ödeyemeyeceği sahte bir vicdan borcu yükler. Suçluluk altındaki zihin yaratıcı düşünemez; kaçmak ister.",
      teenImpact: "Genç, hata yapmaktan dehşete düşer. Gerçek netlerini gizler, sahte deneme sonuçları söyler ve sınav anında kaygı krizine girer.",
      prescriptions: [
        "Acil ateşkes ilan edin: Netlerin ne olursa olsun bu evde değerin eksilmeyecek güvencesini somut eylemlerle kanıtlayın.",
        "Deneme açıklandığında ilk 4 saat tek bir kelime dahi sınav konuşulmasını kesinlikle yasaklayın.",
        "Kıyaslama dilini kökünden söküp atın: Başka gençlerin dereceleriyle çocuğunuzun varlığına saldırmayın.",
        "Öfkenizi suçlu aramaya değil, çalışma sistemindeki zaafı tamir etmeye kanalize edin."
      ]
    },
    gardiyan: {
      title: "Mikro-Gardiyan Ebeveyn (Gözetim & Teftiş)",
      badge: "MİKRO-DENETİM & GERGİNLİK RİSKİ",
      accentColor: "#FB923C",
      quote: "“Gardiyanın bulunduğu yerde mahkûm yalnızca kaçmanın ve aldatmanın yollarını arar. Kapıyı her dinlediğinizde: Sana güvenmiyorum mesajı verirsiniz.”",
      diagnosis: "“Bugün kaç soru çözdün?”, kapıyı çalmadan girmeler, meyve bahanesiyle masa teftişleri... Eviniz bir yuva olmaktan çıkıp açık hava hapishanesine dönüşmüş durumda.",
      invisibleTrap: "Sürekli niceliğe ve soru sayılarına odaklanmak genci nicelik hilesine iter. Çocuk masada 8 saat oturur ama verimi ve öğrenme derinliği sıfırdır.",
      teenImpact: "Genç sürekli yakalanma korkusuyla yaşar. Çalışıyormuş gibi görünme (sahte çalışma) konusunda uzmanlaşır ve erteleme hastalığına kapılır.",
      prescriptions: [
        "Egemenlik Sözleşmesi konuşması yapın: Bundan sonra odan senin kutsal egemenlik alanındır, kapını çalmadan asla girmeyeceğim.",
        "Kaç soru çözdün sorusunu yasaklayın; yerine Bugün zihnini en çok ne zorladı sorusunu ikame edin.",
        "Uykudan 60 dakika önce dijital karartma uygulayarak gece telefon nöbetçiliğini sistemli intizama dönüştürün.",
        "Haftalık 2 saatlik sınavsız mabet vaktini evin değişmez anayasası haline getirin."
      ]
    }
  };

  const config = ARCHETYPE_CONFIGS[dominantArchetype] || ARCHETYPE_CONFIGS.bilge;

  return {
    scorePercent,
    dominantArchetype,
    title: config.title,
    badge: config.badge,
    accentColor: config.accentColor,
    quote: config.quote,
    diagnosis: config.diagnosis,
    invisibleTrap: config.invisibleTrap,
    teenImpact: config.teenImpact,
    prescriptions: config.prescriptions,
    bookOffer: {
      title: "KAOSTAN DÜZENE: YKS Ebeveyn Rehberi",
      subtitle: "Sınav Çağında Bir Genç Yetiştirmek: Ebeveynliğin Trajedisi, Sorumluluğu ve Kurtuluşu",
      author: "Jordan B. Peterson Düşünce Ekolünden Mülhem",
      originalPrice: 499,
      discountedPrice: 299,
      discountPercent: 40,
      deliveryText: "PDF Formatında Anında İndirilebilir Dijital Başucu Kılavuzu + Yazdırılabilir Protokol Şablonları",
      pageCount: "10 Kapsamlı Bölüm & Klinik Ebeveyn Sözleşmesi",
      guaranteeDays: 30
    }
  };
}
