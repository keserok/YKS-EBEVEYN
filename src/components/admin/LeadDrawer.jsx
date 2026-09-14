import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Phone,
  Send,
  Layers,
} from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function LeadDrawer({ lead, onClose, onStatusChange }) {
  if (!lead) return null;

  const getChoiceLabel = (stepNum, val) => {
    const map = {
      1: {
        single_boutique: 'Bağımsız Danışman & Butik Şehir İçi',
        multi_agency: 'Çok Danışmanlı Ofis & Karma Portföy',
        luxury_estates: 'Lüks Segment & Seçkin Gayrimenkuller',
        land_investment: 'Arsa & Büyük Yatırım Projeleri'
      },
      2: {
        calm_trust: 'Sakin & Güven Verici',
        friendly_needs: 'İhtiyaç Odaklı & Samimi',
        result_oriented: 'Net & Sonuç Odaklı',
        custom_slogan: lead.customSlogan ? `Özel: "${lead.customSlogan}"` : 'Özel Slogan'
      },
      3: {
        advisor_portrait: 'Samimi Danışman / Ekip Fotoğrafı (⭐ Tavsiye Edilen)',
        iconic_landscape: 'İkonik Portföy / Mimari Bölge Manzarası'
      },
      4: {
        warm_editorial: 'Warm Editorial (Sıcak Bej & Toprak Tonları)',
        pure_architectural: 'Pure Architectural (Modern & Minimalist Grid)',
        high_end_dark: 'High-End Dark (Monokrom Obsidyen & Altın)'
      },
      5: {
        direct_whatsapp: 'Hızlı WhatsApp Butonu',
        calendar_booking: '15 Dk. Randevu Takvimi',
        property_submission: 'Evimi Satmak İstiyorum Portföy Formu',
        direct_call: 'Doğrudan Arama Teşviki'
      },
      6: {
        light_showcase: 'Temel Vitrin Paneli (Yalın)',
        dynamic_portfolio: 'Dinamik Portföy Paneli (Sınırsız İlan)',
        multi_agent_system: 'Çoklu Danışman Altyapısı (Bağımsız Sayfalar)'
      },
      7: {
        tr_reviews: 'Sadece Türkçe & Google Değerlendirmeleri',
        multilingual: 'Çoklu Dil Altyapısı (İngilizce/Rusça/Arapça)',
        matterport_3d: '3D Matterport & Video Tur Entegrasyonu',
        full_spectrum: 'Full Spectrum (Çoklu Dil + 3D Sanal Tur)'
      }
    };

    const getSingle = (item) => {
      if (item === 'custom_slogan' && lead.customSlogan) {
        return `Özel: "${lead.customSlogan}"`;
      }
      return map[stepNum]?.[item] || item || 'Belirtilmedi';
    };

    if (Array.isArray(val)) {
      return val.map(getSingle).join(' • ');
    }
    return getSingle(val);
  };

  // Direct WhatsApp contact link
  const rawPhone = lead.phone.replace(/[^0-9]/g, '');
  const waContactUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    `Merhaba ${lead.agencyName} yetkilisi, MediArt Real Estate Experience Architect analiz başvurunuzu inceledik. ${lead.assignedPackage} ve mimari planlama detaylarını aktarmak üzere görüşmek isteriz.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Container */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xl bg-charcoal border-l border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10"
      >
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold block">
                MÜŞTERİ BRİFİNG KARTI
              </span>
              <h3 className="font-serif text-2xl text-architectural-white font-medium">
                {lead.agencyName}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-architectural-muted hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status & Package Bar */}
          <div className="my-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-architectural-muted block mb-1">
                Atanan Paket
              </span>
              <span className="font-serif text-lg font-medium text-gold-light">
                {lead.assignedPackage}
              </span>
              <span className="text-xs text-architectural-subtle block">
                Tahmini Teslim: {lead.deliveryDays}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-architectural-muted block mb-1">
                Süreç Durumu
              </span>
              <StatusBadge
                status={lead.status}
                onStatusChange={(newStatus) => onStatusChange(lead.id, newStatus)}
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 mb-8">
            <h4 className="text-xs uppercase tracking-luxury text-architectural-muted font-semibold flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>İletişim & Başvuru Bilgisi</span>
            </h4>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-architectural-muted">Telefon (WhatsApp):</span>
                <span className="font-mono text-architectural-white">{lead.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-architectural-muted">Talep Zamanı:</span>
                <span className="font-mono text-architectural-subtle">{lead.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Detailed Editorial Choices Breakdown */}
          <div className="space-y-4 mb-8">
            <h4 className="text-xs uppercase tracking-luxury text-architectural-muted font-semibold flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-gold" />
              <span>Mimari Tercih Analizi</span>
            </h4>

            <div className="space-y-2.5">
              {[
                { label: '01. Operasyon & Portföy', val: getChoiceLabel(1, lead.answers?.[1]) },
                { label: '02. Karşılama Sloganı', val: getChoiceLabel(2, lead.answers?.[2]) },
                { label: '03. Hero Karşılama Görseli', val: getChoiceLabel(3, lead.answers?.[3]) },
                { label: '04. Mimari Tasarım Dili', val: getChoiceLabel(4, lead.answers?.[4]) },
                { label: '05. İletişim & Dönüşüm Köprüsü', val: getChoiceLabel(5, lead.answers?.[5]) },
                { label: '06. Panel Altyapısı', val: getChoiceLabel(6, lead.answers?.[6]) },
                { label: '07. Uluslararası & Multimedya', val: getChoiceLabel(7, lead.answers?.[7]) }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1"
                >
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gold/80">
                    {item.label}
                  </span>
                  <span className="text-xs text-architectural-white font-medium">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Agency Internal Notes if any */}
          {lead.notes && (
            <div className="mb-8 p-4 rounded-2xl bg-gold/5 border border-gold/20">
              <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block mb-1">
                Ajans İçi Not
              </span>
              <p className="text-xs text-architectural-white/80 font-light leading-relaxed">
                {lead.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action Button: Direct WhatsApp Chat */}
        <div className="pt-6 border-t border-white/10">
          <a
            href={waContactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-obsidian font-bold text-xs uppercase tracking-luxury shadow-lg transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Müşteriyle WhatsApp'tan İletişime Geç</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
