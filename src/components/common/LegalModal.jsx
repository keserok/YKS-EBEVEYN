import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, FileText, Scale, RefreshCcw, Building } from "lucide-react";

export default function LegalModal({ isOpen, onClose, initialTab = "mesafeli" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="w-full max-w-3xl max-h-[85vh] luxury-glass rounded-3xl border border-gold/40 shadow-2xl flex flex-col relative overflow-hidden text-architectural-white"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
                Yasal Metinler & Tüketici Hakları
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3 border-b border-white/10 overflow-x-auto bg-black/40 text-xs font-mono">
            {[
              { id: "mesafeli", label: "Mesafeli Satış Sözleşmesi", icon: FileText },
              { id: "onbilgi", label: "Ön Bilgilendirme Formu", icon: Scale },
              { id: "iade", label: "İptal & 30 Gün İade", icon: RefreshCcw },
              { id: "kvkk", label: "Gizlilik & KVKK", icon: ShieldCheck },
              { id: "firma", label: "Firma Bilgileri", icon: Building }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-gold text-obsidian font-bold shadow-md"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scrollable Content */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
            {activeTab === "mesafeli" && (
              <div className="space-y-3">
                <h4 className="text-base font-serif font-bold text-gold">
                  MESAFELİ SATIŞ SÖZLEŞMESİ
                </h4>
                <p>
                  <strong>MADDE 1 - TARAFLAR:</strong><br />
                  <strong>SATICI:</strong> Kaostan Düzene YKS Ebeveyn Hizmetleri (Mükellef Bünyesinde Kayıtlı Şahıs İşletmesi)<br />
                  <strong>ALICI:</strong> Web sitesi üzerinden sipariş formunu doldurarak ödeme yapan tüketici.
                </p>
                <p>
                  <strong>MADDE 2 - SÖZLEŞMENİN KONUSU:</strong><br />
                  İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesinden elektronik ortamda siparişini yaptığı "Kaostan Düzene: YKS Ebeveyn Rehberi (Dijital PDF E-Kitap ve Protokol Şablonları)" ürününün satışı ve anında dijital teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
                </p>
                <p>
                  <strong>MADDE 3 - ÜRÜN BİLGİLERİ VE BEDELİ:</strong><br />
                  Ürün Adı: Kaostan Düzene: YKS Ebeveyn Rehberi (Dijital Başucu Kılavuzu + Yazdırılabilir Protokoller)<br />
                  Satış Fiyatı: 299,00 TL (KDV Dahil)<br />
                  Teslimat Biçimi: Ödeme onayının hemen ardından internet tarayıcısı üzerinden anında otomatik indirme ve kayıtlı iletişim numarasına dijital bağlantı gönderimi.
                </p>
                <p>
                  <strong>MADDE 4 - GENEL HÜKÜMLER:</strong><br />
                  ALICI, sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin tüm ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.
                </p>
              </div>
            )}

            {activeTab === "onbilgi" && (
              <div className="space-y-3">
                <h4 className="text-base font-serif font-bold text-gold">
                  ÖN BİLGİLENDİRME FORMU
                </h4>
                <p>
                  <strong>1. SATICI BİLGİLERİ:</strong><br />
                  Unvan: Kaostan Düzene YKS Ebeveyn Platformu<br />
                  E-Posta: destek@kaostanduzene.com / iletisim@kaostanduzene.com<br />
                  Telefon: +90 532 410 88 90<br />
                  Adres: İstanbul / Türkiye
                </p>
                <p>
                  <strong>2. SÖZLEŞME KONUSU ÜRÜNÜN TEMEL NİTELİKLERİ:</strong><br />
                  "Kaostan Düzene: YKS Ebeveyn Rehberi" 10 bölümden oluşan, Jordan B. Peterson düşünce ekolünden mülhem psikolojik ve felsefi dijital bir kılavuzdur. Satın alım sonrasında PDF biçiminde doğrudan ALICI'nın cihazına indirilir. Fiziki kargo veya kurye teslimatı gerektirmez.
                </p>
                <p>
                  <strong>3. ÖDEME VE GÜVENLİK:</strong><br />
                  Ödemeler İyzico 256-bit SSL şifrelemeli 3D Secure güvenli sanal POS altyapısı üzerinden kredi veya banka kartı ile tahsil edilir. Kart bilgileri SATICI sunucularında asla saklanmaz.
                </p>
              </div>
            )}

            {activeTab === "iade" && (
              <div className="space-y-3">
                <h4 className="text-base font-serif font-bold text-gold">
                  İPTAL VE 30 GÜN KOŞULSUZ İADE POLİTİKASI
                </h4>
                <p>
                  <strong>KOŞULSUZ MEMNUNİYET TAAHHÜDÜMÜZ:</strong><br />
                  Mevzuat gereği elektronik ortamda anında ifa edilen dijital ürünlerde cayma hakkı kısıtlanabilmesine rağmen, Kaostan Düzene olarak kılavuzumuzun içeriğine ve dönüştürücü gücüne tam güven duyuyoruz.
                </p>
                <p>
                  Bu sebeple tüm ebeveynlerimize <strong>30 Gün Koşulsuz %100 Para İade Garantisi</strong> sunuyoruz.
                </p>
                <p>
                  Rehberi okuyup protokolleri evinizde uyguladığınızda çocuğunuzla iletişiminizde ve deneme krizlerinizde belirgin bir rahatlama görmezseniz; satın alma tarihinden itibaren 30 gün içinde <strong className="text-white">destek@kaostanduzene.com</strong> adresimize veya resmi WhatsApp destek hattımıza sipariş numaranızla birlikte yazmanız yeterlidir. Ücretiniz tek bir soru dahi sorulmaksızın kartınıza eksiksiz iade edilir.
                </p>
              </div>
            )}

            {activeTab === "kvkk" && (
              <div className="space-y-3">
                <h4 className="text-base font-serif font-bold text-gold">
                  GİZLİLİK POLİTİKASI VE KVKK AYDINLATMA METNİ
                </h4>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, web sitemiz üzerinden paylaştığınız ad, soyad, telefon ve çocuk sınıf/alan bilgileri sadece ebeveyn analizi raporunun oluşturulması ve dijital ürün teslimatının sağlanması amacıyla işlenir.
                </p>
                <p>
                  Kişisel verileriniz hiçbir surette ticari amaçlarla üçüncü şahıslara veya kurumlara satılamaz, devredilemez. Ödeme işlemleriniz doğrudan Bankacılık Düzenleme ve Denetleme Kurumu (BDDK) lisanslı İyzico altyapısı üzerinden 256-bit SSL şifrelemesiyle gerçekleşir.
                </p>
              </div>
            )}

            {activeTab === "firma" && (
              <div className="space-y-3">
                <h4 className="text-base font-serif font-bold text-gold">
                  FİRMA & İLETİŞİM BİLGİLERİ
                </h4>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 text-xs font-mono">
                  <div><strong>Ticari Unvan:</strong> Kaostan Düzene Dijital Eğitim ve Rehberlik Hizmetleri</div>
                  <div><strong>Vergi Dairesi:</strong> Sarıyer V.D. / İstanbul</div>
                  <div><strong>Mersis / Vergi No:</strong> Mükellef Kayıtlı Faal İşletme</div>
                  <div><strong>Müşteri Hizmetleri & WhatsApp:</strong> +90 532 410 88 90</div>
                  <div><strong>Resmi E-Posta:</strong> iletisim@kaostanduzene.com</div>
                  <div><strong>Adres:</strong> Maslak Mah. Büyükdere Cad. Sarıyer / İstanbul</div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/40 text-xs">
            <span className="text-slate-400">
              6502 Sayılı Tüketicinin Korunması Kanunu'na Uygundur.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gold text-obsidian font-bold hover:bg-gold-light transition-colors cursor-pointer"
            >
              Kapat
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
