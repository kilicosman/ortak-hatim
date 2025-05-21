// lang.js

const translations = {
  tr: {
    login_title: "Ortak Hatim Giriş",
    password_label: "Hatim Şifresi:",
    login_button: "Hatimine Git",
    create_group: "Yeni Hatim Grubu Oluştur",
    group_title: "Grup Adı",
    group_password: "Grup Şifresi",
    create_button: "Grup Oluştur",
    error_invalid: "Geçersiz giriş bilgileri",
    new_hatim: "Yeni Hatim Ekle",
    delete_all: "Verileri Sil",
    pending_groups: "Bekleyen Hatim Grupları",
    new_admin: "Yeni Admin Ekle",
    admin_email: "Yeni admin e-posta",
    admin_pass: "Şifre",
    admin_add: "Admin Ekle",
    login: "Giriş Yap",
    group_approve: "Onayla",
    group_delete: "Sil",
    lang_label: "Dil Seç",
    success_added: "Yeni admin eklendi ✅",
    fill_fields: "Boş alan bırakmayın"
  },
  en: {
    login_title: "Ortak Hatim Login",
    password_label: "Group Password:",
    login_button: "Go to Group",
    create_group: "Create New Hatim Group",
    group_title: "Group Title",
    group_password: "Group Password",
    create_button: "Create Group",
    error_invalid: "Invalid login credentials",
    new_hatim: "Add New Hatim",
    delete_all: "Delete All Data",
    pending_groups: "Pending Hatim Groups",
    new_admin: "Add New Admin",
    admin_email: "New admin email",
    admin_pass: "Password",
    admin_add: "Add Admin",
    login: "Login",
    group_approve: "Approve",
    group_delete: "Delete",
    lang_label: "Language",
    success_added: "New admin added ✅",
    fill_fields: "Please fill in all fields"
  }
};

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'tr';
  setLanguage(savedLang);

  const langSelector = document.createElement('select');
  langSelector.id = 'language-select';
  langSelector.innerHTML = `
    <option value="tr" ${savedLang === 'tr' ? 'selected' : ''}>Türkçe</option>
    <option value="en" ${savedLang === 'en' ? 'selected' : ''}>English</option>
  `;
  langSelector.onchange = () => {
    setLanguage(langSelector.value);
  };

  document.body.prepend(langSelector);
});
