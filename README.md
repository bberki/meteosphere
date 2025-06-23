# Meteosphere

Meteosphere, React ve Vite kullanılarak gelistirilmis bir hava durumu uygulamasidir. Arka planda Express ve MongoDB kullanan bir API bulunur. Kullanıcılar kayıt olabilir, giriş yapabilir, favori şehirlerini yönetebilir ve şehirlere yorum bırakabilir.

## Özellikler
- Şehirlerin güncel hava durumu bilgileri
- Kullanıcı kayıt ve giriş işlemleri
- Şehirlere yorum ekleme
- Favori şehir listesi oluşturma

## Kurulum
1. Depoyu klonladıktan sonra kök dizinde frontend bağımlılıklarını kurun:
   ```bash
   npm install
   ```
2. Backend klasörüne geçip bağımlılıkları kurun:
   ```bash
   cd backend
   npm install
   ```
3. Proje kökünde `.env` dosyası oluşturup aşağıdaki değişkeni tanımlayın:
   ```
   VITE_WEATHER_API_KEY=<API_ANAHTARINIZ>
   ```

## Çalıştırma
Frontend'i başlatmak için kök dizinde:
```bash
npm run dev
```
Backend'i başlatmak için `backend` klasöründe:
```bash
node server.js
```

## Katkı
Hata bildirmek veya geliştirme önerileri için pull request gönderebilir ya da issue açabilirsiniz.
