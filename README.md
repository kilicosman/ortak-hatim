# 📘 Ortak Hatim Sistemi

Bu sistem, kullanıcıların ortak bir şifreyle hatim grubu oluşturmasına, cüz paylaşmasına ve takibini yapmasına olanak sağlar. Admin paneli ile gruplar onaylanabilir ve yeni adminler eklenebilir.

## 🚀 Özellikler

- 🔐 Şifre ile giriş (grup şifresi)
- ✅ Cüz paylaşımı ve işaretleme (okundu mu?)
- 📅 Son bitirme tarihi ve hatim duası kontrolü
- 🌐 Türkçe / İngilizce destek (dil seçilebilir)
- 📬 MailerSend ile admin’e e-posta bildirimi
- 🧑‍💼 Admin paneli (giriş, grup onayı, admin ekleme)
- 💾 Otomatik JSON veri yedekleme (`/api/backup`)

## 🧱 Supabase Ayarları

Yeni bir proje oluşturduktan sonra şu tabloları ekle:

### 🔸 `hatim_groups`
| Kolon       | Tür       | Varsayılan           |
|-------------|-----------|-----------------------|
| id          | uuid      | gen_random_uuid()    |
| title       | text      |                       |
| password    | text      |                       |
| is_approved | boolean   | false                |
| created_at  | timestamp | now()                |

### 🔸 `hatimler`
| Kolon        | Tür       | Varsayılan        |
|--------------|-----------|--------------------|
| id           | uuid      | gen_random_uuid() |
| group_id     | uuid (FK) | → hatim_groups.id |
| title        | text      |                    |
| deadline     | date      |                    |
| prayer_read  | boolean   | false              |
| created_at   | timestamp | now()              |

### 🔸 `cuzler`
| Kolon     | Tür       | Varsayılan        |
|-----------|-----------|--------------------|
| id        | uuid      | gen_random_uuid() |
| hatim_id  | uuid (FK) | → hatimler.id     |
| number    | int       |                    |
| name      | text      |                    |
| is_read   | boolean   | false              |

### 🔸 `admins`
| Kolon      | Tür       | Varsayılan        |
|------------|-----------|--------------------|
| id         | uuid      | gen_random_uuid() |
| email      | text      |                    |
| password   | text      |                    |
| created_at | timestamp | now()              |

## 🧑‍💻 Ortam Değişkenleri (Vercel)

| Anahtar             | Açıklama                         |
|---------------------|----------------------------------|
| SUPABASE_URL        | Supabase proje URL’si            |
| SUPABASE_ANON_KEY   | Supabase public API key          |
| MS_API_KEY          | MailerSend API anahtarı          |

## 📂 API Yolları

| Route             | Açıklama                          |
|------------------|------------------------------------|
| `/api/send-email`| Yeni grup e-posta bildirimi        |
| `/api/backup`    | JSON veri yedekleme (GET ile)     |

## ✅ Yayına Alma

1. Tüm dosyaları GitHub’a yükle  
2. Vercel’e bağla  
3. Ortam değişkenlerini gir  
4. Deploy et 🎉

## 🔐 Admin Paneli

- Giriş: `admin.html`  
- Admin ekleme ve grup onayı buradan yapılır
