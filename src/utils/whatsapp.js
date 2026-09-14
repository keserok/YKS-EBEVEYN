/**
 * WhatsApp message link generator for MediArt proposal
 * Supports single and multiple selection answers
 */
export function generateWhatsAppLink(leadData, packageResult, activePackage) {
  const { agencyName, phone, answers, customSlogan } = leadData;
  const targetPackageName = activePackage?.name || packageResult.packageName;
  const targetDeliveryDays = activePackage?.deliveryDays || packageResult.deliveryDays;

  const getSingleText = (stepId, value) => {
    switch (stepId) {
      case 1:
        return value === 'single_boutique' ? 'Bağımsız Danışman & Butik Şehir İçi' :
               value === 'multi_agency' ? 'Çok Danışmanlı Ofis & Karma Portföy' :
               value === 'luxury_estates' ? 'Lüks Segment & Seçkin Gayrimenkuller' : 'Arsa & Yatırım Projeleri';
      case 2:
        if (value === 'custom_slogan' && customSlogan) return `Özel: "${customSlogan}"`;
        return value === 'calm_trust' ? 'Sakin & Güven Verici' :
               value === 'friendly_needs' ? 'İhtiyaç Odaklı & Samimi' :
               value === 'result_oriented' ? 'Net & Sonuç Odaklı' : 'Özel Slogan';
      case 3:
        return value === 'advisor_portrait' ? 'Samimi Danışman Portresi (⭐ MediArt Tavsiyesi)' : 'İkonik Portföy / Manzara';
      case 4:
        return value === 'warm_editorial' ? 'Warm Editorial' :
               value === 'pure_architectural' ? 'Pure Architectural' : 'High-End Dark';
      case 5:
        return value === 'direct_whatsapp' ? 'Hızlı WhatsApp' :
               value === 'calendar_booking' ? '15 Dk. Randevu Takvimi' :
               value === 'property_submission' ? 'Evimi Sat Formu' : 'Doğrudan Arama';
      case 6:
        return value === 'light_showcase' ? 'Temel Vitrin Paneli' :
               value === 'dynamic_portfolio' ? 'Dinamik Portföy Paneli' : 'Çoklu Danışman Altyapısı';
      case 7:
        return value === 'tr_reviews' ? 'Türkçe & Google Puanı' :
               value === 'multilingual' ? 'Çoklu Dil Altyapısı' : value;
      default:
        return value;
    }
  };

  const getStepText = (stepId, value) => {
    if (!value) return 'Belirtilmedi';
    if (Array.isArray(value)) {
      return value.map(v => getSingleText(stepId, v)).join(', ');
    }
    return getSingleText(stepId, value);
  };

  const isDifferentFromRecommended = activePackage && activePackage.name !== packageResult.packageName;

  const messageLines = [
    `🏛️ *MEDİART REAL ESTATE EXPERIENCE — DİJİTAL MİMARİ ANALİZ RAPORU*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🏢 *Emlak Ofisi:* ${agencyName}`,
    `📞 *Telefon:* ${phone}`,
    `🎯 *Seçilen Paket:* ${targetPackageName}`,
    ...(isDifferentFromRecommended ? [`⭐ *Algoritma Tavsiyesi:* ${packageResult.packageName}`] : []),
    `⏱️ *Tahmini Teslim Süresi:* ${targetDeliveryDays}`,
    ``,
    `📋 *Seçilen Mimari Tercihler:*`,
    `• *Operasyon:* ${getStepText(1, answers[1])}`,
    `• *Karşılama Sloganı:* ${getStepText(2, answers[2])}`,
    `• *Hero Görseli:* ${getStepText(3, answers[3])}`,
    `• *Tasarım Dili:* ${getStepText(4, answers[4])}`,
    `• *Dönüşüm Köprüsü:* ${getStepText(5, answers[5])}`,
    `• *Yönetim Paneli:* ${getStepText(6, answers[6])}`,
    `• *Küresel Modüller:* ${getStepText(7, answers[7])}`,
    ``,
    `💬 *Not:* Merhaba MediArt ekibi, analiz testimizi tamamladık. Sitemizin mimari prodüksiyon ve teklif detayları için görüşmek istiyoruz.`
  ];

  const fullText = messageLines.join('\n');
  return `https://wa.me/?text=${encodeURIComponent(fullText)}`;
}
