# Kaostan Düzene: YKS Ebeveyn Yetkinlik & Satış Platformu

Jordan B. Peterson düşünce ekolünden mülhem, YKS sürecindeki aileler için geliştirilmiş klinik yetkinlik testi, psikolojik arketip analizi ve yüksek dönüşümlü e-kitap/protokol satış platformu.

---

## 🎯 Özellikler

- **7 Adımlı Ebeveyn Değerlendirmesi:** Aile içi dinamikleri, deneme sonrası kriz yönetimini, oda sınırlarını ve biyolojik intizamı ölçen interaktif anket hunisi.
- **Arketip & Skorlama Motoru:** Ebeveynleri 4 temel arketipe (*Bilge Liman, Yutan Ebeveyn, Tiran Ebeveyn, Mikro-Gardiyan*) sınıflandırır ve %0-100 Dirayet Skoru hesaplar.
- **Yüksek Dönüşümlü Satış Sayfası:**
  - Kişiye özel teşhis ve acil reçeteler
  - 15 dakikalık geri sayım sayacı
  - İndirimli fiyat teklifi (499 ₺ yerine 299 ₺)
  - Sosyal kanıtlar, veli yorumları ve 30 gün iade garantisi
- **İyzico 3D Secure Entegrasyonu:** Gerçek kartlı ödeme altyapısı (Serverless / Dev Middleware destekli).
- **Yasal Uyumluluk (İyzico Onayı İçin Zorunlu):**
  - Mesafeli Satış Sözleşmesi
  - Ön Bilgilendirme Formu
  - 30 Gün İade ve İptal Şartları
  - KVKK ve Gizlilik Politikası
  - Firma ve İletişim Bilgileri
- **UI/UX Pro Max Standartları:** Lüks editoryal obsidian/altın estetiği, mobil haptics (dokunsal titreşim), iOS safe-area uyumluluğu ve 60 FPS mikro-etkileşimler.
- **Yönetici Paneli (Gizli Kasa):** Testi çözen veli lead'lerini yönetmek için yerleşik CRM paneli.

---

## 🛠️ Teknolojiler

- **Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti
- **Backend / API:** Node.js, Iyzipay SDK, Vercel Serverless Functions
- **Linter & Kalite:** Oxlint (0 uyarı, 0 hata)

---

## 🚀 Kurulum & Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim derlemesi
npm run build
```

### Ortam Değişkenleri (`.env`)

```env
IYZICO_API_KEY=sandbox-xxx
IYZICO_SECRET_KEY=sandbox-xxx
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
APP_URL=http://localhost:5176
```
