# Ünsiyet Derneği

Evlilik hazırlığında destek arayan bireyleri resmi kurumlar, vakıflar, eğitimler
ve danışmanlık kaynaklarıyla buluşturan modern dernek web sitesi.

## Özellikler

- Kurum ve destek rehberi
- Kategori filtreleri ve arama
- Resmi başvuru/kaynak bağlantıları
- Destek başvuru formu
- Bağışçı niyet formu
- D1 veritabanı şeması ve form API rotaları
- Mobil ve masaüstü uyumlu kurumsal arayüz

## Geliştirme

```bash
npm install
npm run dev
```

Yerel adres:

```text
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

## D1 Migrasyonu

Veritabanı şeması `db/schema.ts` içinde, üretilen migrasyon ise
`drizzle/0000_bent_mother_askani.sql` dosyasındadır.

## Not

Bağış formu şu an bağışçı niyeti ve iletişim kaydı toplar. Gerçek ödeme tahsilatı
için banka/ödeme kuruluşu, KVKK metni ve dernek makbuz süreçleri ayrıca
bağlanmalıdır.
