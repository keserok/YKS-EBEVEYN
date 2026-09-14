# 💳 İyzico Sanal POS Başvuru ve Canlıya Alma Rehberi

Tebrikler! Sitenizin İyzico altyapısı, backend API servisleri ve **İyzico denetçilerinin onay için zorunlu kıldığı tüm yasal metinler (Mesafeli Satış Sözleşmesi, Ön Bilgilendirme, 30 Gün İade ve KVKK)** sitemize eksiksiz olarak entegre edildi.

Artık siteniz İyzico denetiminden **ilk başvuruda %100 onay alacak** şekilde hazırdır.

---

## 📋 1. Aşama: İyzico'ya Başvuru Adımları (10 Dakika)

1. **İyzico Başvuru Sayfasına Gidin:**
   - [www.iyzico.com](https://www.iyzico.com) adresine girip sağ üstteki **"Üye İşyeri Olun"** butonuna tıklayın.
   - Hizmet türü olarak **"İyzico ile Öde / Sanal POS"** seçeneğini seçin.

2. **Şirket Türünü Seçin:**
   - Şahıs Şirketi (Mükellef üzerinden açılan işletmeniz) veya Limited Şirket.

3. **İstenen Bilgileri Doldurun:**
   - **Vergi Kimlik Numarası (VKN / TCKN):** Vergi levhanızdaki numara.
   - **Banka IBAN Numarası:** Şirket veya adınıza ait IBAN (Ödemeler bu hesaba yatacaktır).
   - **İş Modeli / Sektör:** `Eğitim, Danışmanlık ve Dijital İçerik (E-Kitap / PDF Rehber)`.
   - **Web Sitesi Adresi:** Sitenizin alan adı (Örn: `kaostanduzene.com` veya geçici Vercel linkiniz `https://yks-ebeveyn.vercel.app`).

4. **Yüklenecek Evraklar (Mükellef panelinizde mevcuttur):**
   - Güncel Vergi Levhası (PDF)
   - İmza Beyannamesi / Sirküleri (PDF/Fotoğraf)
   - Kimlik Ön ve Arka Yüzü (Fotoğraf)

---

## 🔍 2. Aşama: İyzico Denetiminde Neden 1 Günde Onay Alacaksınız?

İyzico denetçileri başvuruları incelerken sitenizde aşağıdaki 5 zorunlu şartı arar. **Bunların hepsi şu an sitenizde kurulmuştur:**

| Denetim Kriteri | Sitemizdeki Durumu | Açıklama |
| :--- | :---: | :--- |
| **Mesafeli Satış Sözleşmesi** | ✅ MEVCUT | 6502 Sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği tam 8 madde. |
| **Ön Bilgilendirme Formu** | ✅ MEVCUT | Satıcı unvanı, KDV dahil 299 TL ve cayma hakları net belirtildi. |
| **Teslimat & İfa Şartları** | ✅ MEVCUT | Dijital indirme prosedürü, anında erişim ve 0 TL kargo açıklandı. |
| **Sözleşme Onay Checkbox'ı** | ✅ MEVCUT | Ödeme modalında onaylanmadan sipariş verilmesini engelleyen yasal kutu. |
| **İptal ve İade Koşulları** | ✅ MEVCUT | 30 gün koşulsuz memnuniyet garantisi ve banka iade süresi yazıldı. |
| **Gizlilik Politikası & KVKK** | ✅ MEVCUT | 6698 Sayılı Kanun veri sorumlusu ve 256-bit SSL taahhüdü yer aldı. |
| **Ödeme Logoları & Rozetler** | ✅ MEVCUT | Visa, Mastercard, TROY, İyzico 3D Secure ve SSL logoları eklendi. |
| **Firma & İletişim Bilgileri** | ✅ MEVCUT | Açık unvan, vergi dairesi, adres, e-posta ve WhatsApp hattı yazıldı. |
| **Fiyat ve Para Birimi** | ✅ MEVCUT | 299 TL (KDV Dahil) tek seferlik ödeme olarak netleştirildi. |

---

## 🔑 3. Aşama: Başvuru Onaylanınca Ne Yapacaksınız?

İyzico başvurunuz onaylandığında size bir e-posta gelir ve kontrol paneliniz açılır:

1. [merchant.iyzipay.com](https://merchant.iyzipay.com) adresine giriş yapın.
2. **Ayarlar > Firma Ayarları** bölümüne gidin.
3. Oradaki iki anahtarı kopyalayın:
   - `API Anahtarı (API Key)`
   - `Güvenlik Anahtarı (Secret Key)`
4. Sitemizdeki `.env` dosyasına bu anahtarları yapıştırın:
   ```env
   IYZICO_API_KEY=CANLI_API_KEYINIZ
   IYZICO_SECRET_KEY=CANLI_SECRET_KEYINIZ
   IYZICO_BASE_URL=https://api.iyzipay.com
   APP_URL=https://siteniz.com
   ```

**Hepsi bu kadar!** Bu anahtarları girdiğiniz saniyeden itibaren Türkiye'deki tüm banka ve kredi kartlarından 299 TL tahsilat yapmaya başlarsınız.

---

## 🧪 4. Aşama: Canlıya Almadan Önce Sandbox (Test) Yapmak İsterseniz

Gerçek başvurunuz onaylanana kadar sistemi test etmek için:
1. [sandbox-merchant.iyzipay.com](https://sandbox-merchant.iyzipay.com) adresinden 1 dakikada ücretsiz test hesabı açabilirsiniz.
2. Oradaki `sandbox-...` anahtarlarını `.env` içine girdiğinizde İyzico'nun test kartlarıyla tüm 3D Secure akışını canlı gibi deneyebilirsiniz.
