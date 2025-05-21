// script.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://YOUR-SUPABASE-URL.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// HTML elementleri
const loginButton = document.getElementById('login-button');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

let currentGroup = null;

loginButton?.addEventListener('click', async () => {
  const password = passwordInput.value.trim();

  const { data, error } = await supabase
    .from('hatim_groups')
    .select('*')
    .eq('password', password)
    .eq('is_approved', true);

  if (error || data.length === 0) {
    loginError.textContent = localStorage.getItem('lang') === 'en'
      ? "Invalid group password or not approved yet"
      : "Geçersiz şifre veya grup onaylanmamış";
    return;
  }

  currentGroup = data[0];
  localStorage.setItem('current_group_id', currentGroup.id);
  localStorage.setItem('current_group_title', currentGroup.title);
  window.location.href = 'hatim.html'; // Yönlendirme yapılacak (istenirse değiştirilir)
});
