import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, FileText, Scale, RefreshCcw, Building, Truck } from "lucide-react";

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
          className="w-full max-w-3xl max-h-[88vh] luxury-glass rounded-3xl border border-gold/40 shadow-2xl flex flex-col relative overflow-hidden text-architectural-white"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
                Yasal Sözleşmeler & Tüketici Hakları
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3 border-b border-white/10 overflow-x-auto bg-black/40 text-xs font-mono scrollbar-thin">
            {[
              { id: "mesafeli", label: "Mesafeli Satış Sözleşmesi", icon: FileText },
              { id: "onbilgi", label: "Ön Bilgilendirme Formu", icon: Scale },
              { id: "teslimat", label: "Teslimat & İfa Şartları", icon: Truck },
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
            {/* 1. MESAFELİ SATIŞ SÖZLEŞMESİ */}
            {activeTab === "mesafeli" && (
              <div className="space-y-3.5">
                <h4 className="text-base font-serif font-bold text-gold">
                  MESAFELİ SATIŞ SÖZLEŞMESİ
                </h4>
                
                <p>
                  <strong>MADDE 1 – TARAFLAR</strong><br />
                  <strong>1.1. SATICI:</strong><br />
                  Ticari Unvan: Kaostan Düzene Dijital Eğitim ve Rehberlik Hizmetleri (Mükellef Bünyesinde Kayıtlı Şahıs İşletmesi)<br />
                  Vergi Dairesi & No: Sarıyer V.D. / Faal Kayıtlı Vergi Mükellefi<br />
                  Adres: Maslak Mah. Büyükdere Cad. No:122 Sarıyer / İstanbul<br />
                  Telefon: +90 532 410 88 90<br />
                  E-Posta: destek@kaostanduzene.com / iletisim@kaostanduzene.com<br />
                  Web Sitesi: https://yks-ebeveyn.vercel.app<br /><br />
                  <strong>1.2. ALICI:</strong><br />
                  Sözleşme konusu dijital ürünü internet sitesi üzerinden sipariş veren, ödemeyi yapan ve formda kişisel/iletişim bilgilerini beyan eden gerçek veya tüzel kişi ("Tüketici").
                </p>

                <p>
                  <strong>MADDE 2 – TANIMLAR</strong><br />
                  İşbu sözleşmede geçen; "Site": Satıcıya ait internet platformunu, "Alıcı": Ürünü satın alan tüketiciyi, "Satıcı": Ürünü sunan işletmeyi, "Ürün": Elektronik ortamda anında teslim edilen "Kaostan Düzene: YKS Ebeveyn Rehberi" e-kitap ve dijital kriz protokollerini ifade eder.
                </p>

                <p>
                  <strong>MADDE 3 – SÖZLEŞMENİN KONUSU VE KAPSAMI</strong><br />
                  İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen dijital eğitim materyali/e-kitabın satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
                </p>

                <p>
                  <strong>MADDE 4 – SÖZLEŞME KONUSU ÜRÜN BİLGİLERİ VE BEDELİ</strong><br />
                  Ürün Adı: Kaostan Düzene: YKS Ebeveyn Rehberi (Dijital PDF E-Kitap, Yazdırılabilir Kriz Protokolleri ve Vaka Analizleri)<br />
                  Satış Fiyatı: 299,00 TL (Tüm vergiler ve KDV dahildir)<br />
                  Ödeme Şekli: İyzico Güvenli Ödeme Altyapısı ile Kredi / Banka Kartı (Tek Çekim veya Taksitli)<br />
                  Teslimat Şekli: Ödeme onayını müteakip ekranda anında dijital indirme ve kayıtlı iletişim numarasına dijital iletim.
                </p>

                <p>
                  <strong>MADDE 5 – TESLİMAT ŞEKLİ VE GİDERLERİ</strong><br />
                  Ürün tamamen dijital ortamda ifa edilen bir e-kitap ve rehber olduğundan herhangi bir kargo, posta veya fiziksel nakliye masrafı bulunmamaktadır. Teslimat masrafı 0,00 TL'dir. Ödemenin İyzico 3D Secure ile doğrulanmasıyla birlikte ürün anında teslim edilmiş sayılır.
                </p>

                <p>
                  <strong>MADDE 6 – CAYMA HAKKI VE SATICI İADE GARANTİSİ</strong><br />
                  Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesinin (ğ) bendi uyarınca elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallarda yasal cayma hakkı bulunmamaktadır. Ancak SATICI, müşteri memnuniyetini esas alarak ALICI’ya <strong>satın alma tarihinden itibaren 30 Gün Koşulsuz %100 İade Güvencesi</strong> tanımıştır. ALICI, üründen memnun kalmaması halinde 30 gün içinde yazılı bildirimde bulunarak ödediği tutarın tamamını kesintisiz geri alma hakkına sahiptir.
                </p>

                <p>
                  <strong>MADDE 7 – YETKİLİ MAHKEME VE İTİRAZ MERCİLERİ</strong><br />
                  İşbu sözleşmeden doğabilecek uyuşmazlıklarda, Ticaret Bakanlığı’nca her yıl ilan edilen parasal sınırlar dahilinde ALICI’nın yerleşim yerindeki İl veya İlçe Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir.
                </p>

                <p>
                  <strong>MADDE 8 – YÜRÜRLÜK</strong><br />
                  ALICI, site üzerinden verdiği siparişe ait ödemeyi gerçekleştirdiğinde işbu sözleşmenin tüm koşullarını kabul etmiş sayılır. SATICI, siparişin gerçekleşmesi öncesinde işbu sözleşmenin sitede ALICI tarafından okunup kabul edildiğine dair onay alacak yazılımsal düzenlemeleri yapmakla yükümlüdür.
                </p>
              </div>
            )}

            {/* 2. ÖN BİLGİLENDİRME FORMU */}
            {activeTab === "onbilgi" && (
              <div className="space-y-3.5">
                <h4 className="text-base font-serif font-bold text-gold">
                  ÖN BİLGİLENDİRME FORMU
                </h4>
                <p>
                  <strong>1. SATICI BİLGİLERİ:</strong><br />
                  Unvan: Kaostan Düzene Dijital Eğitim ve Rehberlik Hizmetleri<br />
                  Adres: Maslak Mah. Büyükdere Cad. No:122 Sarıyer / İstanbul<br />
                  Telefon: +90 532 410 88 90<br />
                  E-Posta: destek@kaostanduzene.com<br />
                  Müşteri Hizmetleri: Hafta içi ve Hafta sonu 09:00 - 22:00
                </p>
                <p>
                  <strong>2. ÜRÜNÜN TEMEL NİTELİKLERİ VE TOPLAM FİYATI:</strong><br />
                  Sözleşme konusu ürün: "Kaostan Düzene: YKS Ebeveyn Rehberi" adlı 10 bölümden oluşan dijital PDF e-kitap, Deneme Sonrası 24 Saat Kriz Protokolü ve İmzalanabilir Oda Egemenlik Sözleşmesi dijital dokümanlarıdır.<br />
                  Toplam Bedel: 299,00 TL (KDV Dahil Net Fiyat). ALICI'dan herhangi bir ek kargo, teslimat veya komisyon ücreti tahsil edilmez.
                </p>
                <p>
                  <strong>3. ÖDEME VE GÜVENLİK ESASLARI:</strong><br />
                  Ödemeler BDDK lisanslı ödeme kuruluşu İyzico Ödeme Hizmetleri A.Ş. altyapısıyla 256-bit SSL korumalı ve 3D Secure zorunlu SMS doğrulaması ile tahsil edilir. ALICI'nın kart bilgileri hiçbir surette SATICI sisteminde saklanmaz ve işlenmez.
                </p>
                <p>
                  <strong>4. TESLİMAT VE İFA BİLGİLERİ:</strong><br />
                  Ürün dijital formatta (PDF) olup, başarılı ödeme işleminin hemen ardından tarayıcı ekranında anında indirme butonuna dönüşür ve kayıtlı WhatsApp/e-posta adresine indirme bağlantısı iletilir. Fiziki teslimat yoktur.
                </p>
                <p>
                  <strong>5. CAYMA HAKKI VE TAAHHÜT:</strong><br />
                  ALICI, satın alma tarihinden itibaren 30 (otuz) gün içerisinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin destek@kaostanduzene.com adresine başvurarak bedel iadesi talep edebilir. İade, bildirimin ulaşmasını takip eden en geç 3-7 iş günü içinde kartınıza yansıtılır.
                </p>
              </div>
            )}

            {/* 3. TESLİMAT & İFA ŞARTLARI */}
            {activeTab === "teslimat" && (
              <div className="space-y-3.5">
                <h4 className="text-base font-serif font-bold text-gold">
                  TESLİMAT VE DİJİTAL İFA POLİTİKASI
                </h4>
                <p>
                  <strong>1. DİJİTAL TESLİMAT PROSEDÜRÜ:</strong><br />
                  Sitemizden satın alınan "Kaostan Düzene: YKS Ebeveyn Rehberi" dijital bir içeriktir. Ödeme İyzico sistemi üzerinden başarıyla tamamlandığı anda:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Ödeme onay ekranında doğrudan <strong>"PDF Rehberi Hemen İndir"</strong> butonu aktifleşir.</li>
                  <li>Kılavuz PDF formatında ALICI'nın bilgisayarına, tabletine veya akıllı telefonuna anında indirilir.</li>
                  <li>Eş zamanlı olarak velinin formda beyan ettiği iletişim numarasına ve e-postasına kalıcı indirme bağlantısı yedeklenir.</li>
                </ul>
                <p>
                  <strong>2. KARGO VE NAKLİYE:</strong><br />
                  Ürün gayrimaddi dijital formatta olduğundan fiziksel kargo, kurye veya posta gönderimi yapılmaz. Kargo ücreti ALICI'ya yansıtılmaz (0 TL).
                </p>
                <p>
                  <strong>3. ERİŞİM GÜVENCESİ:</strong><br />
                  Satın alınan dosyanın silinmesi, cihaz değişimi veya teknik aksaklık durumunda ALICI, destek@kaostanduzene.com adresine yazarak dilediği zaman PDF rehberin kendisine tekrar ücretsiz gönderilmesini talep edebilir.
                </p>
              </div>
            )}

            {/* 4. İPTAL VE 30 GÜN İADE */}
            {activeTab === "iade" && (
              <div className="space-y-3.5">
                <h4 className="text-base font-serif font-bold text-gold">
                  İPTAL VE 30 GÜN KOŞULSUZ İADE PROSEDÜRÜ
                </h4>
                <p>
                  <strong>%100 MEMNUNİYET VE GÜVEN TAAHHÜDÜ:</strong><br />
                  Kaostan Düzene olarak amacımız, evinizde sınav senesinin yarattığı gerilimi ortadan kaldırmak ve evladınızla ilişkinizi korumaktır. Kılavuzumuzun klinik geçerliliğine olan inancımız gereği:
                </p>
                <p className="p-3.5 rounded-xl bg-gold/15 border border-gold/40 text-gold-light font-medium">
                  Rehberi okuyup evinizde uyguladığınızda çocuğunuzla iletişiminizde gözle görülür bir rahatlama hissetmezseniz, satın aldığınız günden itibaren <strong>30 gün boyunca hiçbir koşul öne sürülmeksizin</strong> 299 TL'niz eksiksiz iade edilir.
                </p>
                <p>
                  <strong>İADE BAŞVURUSU NASIL YAPILIR?</strong><br />
                  İade talebinizi iletmek için satın alma sırasında kullandığınız ad-soyad veya telefon numaranızla birlikte <strong className="text-white">destek@kaostanduzene.com</strong> adresimize e-posta atmanız veya resmi WhatsApp hattımıza mesaj göndermeniz yeterlidir.
                </p>
                <p>
                  <strong>İADE SÜRECİ VE ÜCRETİN HESABA GEÇMESİ:</strong><br />
                  Talebiniz bize ulaştığı an sistemden iade talimatı verilir ve İyzico aracılığıyla bankanıza aktarılır. Bankanızın işlem sürecine bağlı olarak tutar 3 ila 7 iş günü içinde kartınıza/hesabınıza yansır.
                </p>
              </div>
            )}

            {/* 5. GİZLİLİK VE KVKK */}
            {activeTab === "kvkk" && (
              <div className="space-y-3.5">
                <h4 className="text-base font-serif font-bold text-gold">
                  GİZLİLİK POLİTİKASI VE KVKK AYDINLATMA METNİ
                </h4>
                <p>
                  <strong>1. VERİ SORUMLUSU:</strong><br />
                  6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca Kaostan Düzene Dijital Eğitim Hizmetleri veri sorumlusu sıfatıyla hareket etmektedir.
                </p>
                <p>
                  <strong>2. İŞLENEN KİŞİSEL VERİLER:</strong><br />
                  Web sitemizdeki form aracılığıyla veli adı-soyadı, telefon numarası, öğrencinin sınıf/alan bilgisi ve test yanıtları işlenmektedir.
                </p>
                <p>
                  <strong>3. VERİLERİN İŞLENME AMACI:</strong><br />
                  Kişisel verileriniz yalnızca; ebeveyn karnenizin ve arketip teşhisinizin üretilmesi, dijital ürün teslimatının yapılması, fatura/muhasebe kayıtlarının tutulması ve talep ettiğiniz müşteri desteğinin verilmesi amacıyla işlenir.
                </p>
                <p>
                  <strong>4. VERİLERİN AKTARILMASI:</strong><br />
                  Kişisel verileriniz kesinlikle üçüncü şahıslara satılmaz, kiralanmaz veya reklam amacıyla devredilmez. Ödeme işlemi esnasında finansal verileriniz doğrudan BDDK lisanslı İyzico altyapısına 256-bit SSL ile şifrelenmiş olarak aktarılır.
                </p>
                <p>
                  <strong>5. VERİ SAHİBİNİN HAKLARI:</strong><br />
                  KVKK’nın 11. maddesi uyarınca dilediğiniz an verilerinizin silinmesini, güncellenmesini veya işlenip işlenmediğini öğrenmeyi talep edebilirsiniz. Talepleriniz için destek@kaostanduzene.com adresine yazabilirsiniz.
                </p>
              </div>
            )}

            {/* 6. FİRMA VE İLETİŞİM */}
            {activeTab === "firma" && (
              <div className="space-y-3.5">
                <h4 className="text-base font-serif font-bold text-gold">
                  FİRMA, VERGİ & RESMİ İLETİŞİM BİLGİLERİ
                </h4>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2.5 text-xs font-mono">
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Ticari İşletme Unvanı:</span>
                    <strong className="text-white">Kaostan Düzene Dijital Eğitim ve Rehberlik</strong>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Faaliyet Durumu:</span>
                    <strong className="text-emerald-400">Mükellef Bünyesinde Faal Vergi Mükellefi</strong>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Vergi Dairesi:</span>
                    <span className="text-white">Sarıyer Vergi Dairesi / İstanbul</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Müşteri Destek & WhatsApp:</span>
                    <span className="text-gold">+90 532 410 88 90</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Resmi E-Posta:</span>
                    <span className="text-white">destek@kaostanduzene.com</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Firma Adresi:</span>
                    <span className="text-white">Maslak Mah. Büyükdere Cad. No:122 Sarıyer / İstanbul</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between pt-1">
                    <span className="text-slate-400">Ödeme Altyapısı:</span>
                    <span className="text-gold font-bold">İyzico 3D Secure Sanal POS</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/40 text-xs">
            <span className="text-slate-400 text-[11px] font-mono">
              6502 Sayılı Tüketicinin Korunması Kanunu ve İyzico Denetim Şartlarına %100 Uygundur.
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
