# Ünsiyet Derneği

Evlilik hazırlığında destek arayan bireyleri resmi kurumlar, vakıflar, eğitimler
ve danışmanlık kaynaklarıyla buluşturan modern dernek web sitesi.

## Özellikler

- Kurum ve destek rehberi
- Kategori filtreleri ve arama
- Resmi başvuru/kaynak bağlantıları
- Destek başvuru formu
- Bağışçı niyet formu
- Vercel uyumlu Next.js API rotaları
- Mobil ve masaüstü uyumlu kurumsal arayüz

## Geliştirme

```bash
npm install
npm run dev
```

Yerel adres:

```text
http://127.0.0.1:3000/
```

## Build

```bash
npm run build
```

## Vercel

Vercel GitHub entegrasyonunda varsayılan ayarlar yeterlidir:

- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm ci`

Form kayıtlarını Google Apps Script, Make, Zapier veya benzeri bir webhook'a
göndermek için Vercel ortam değişkenlerine `UNSIYET_FORM_WEBHOOK_URL` eklenir.
Bu değişken yoksa formlar referans kodu üretir ve başvuruyu Vercel function
loglarına yazar.

## Not

Bağış formu şu an bağışçı niyeti ve iletişim kaydı toplar. Gerçek ödeme tahsilatı
için banka/ödeme kuruluşu, KVKK metni ve dernek makbuz süreçleri ayrıca
bağlanmalıdır.
