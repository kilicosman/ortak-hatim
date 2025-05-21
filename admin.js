import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://YOUR-SUPABASE-URL.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Giriş ve panel elementleri
const loginSection = document.getElementById('login-section');
const panelSection = document.getElementById('panel-section');
const loginBtn = document.getElementById('login-button');
const loginError = document.getElementById('login-error');
const pendingGroupsDiv = document.getElementById('pending-groups');

// Giriş alanları
const adminEmail = document.getElementById('admin-email');
const adminPass = document.getElementById('admin-password');
const newAdminEmail = document.getElementById('new-admin-email');
const newAdminPass = document.getElementById('new-admin-password');
const addAdminBtn = document.getElementById('add-admin-button');
const adminAddMsg = document.getElementById('admin-add-msg');

let currentAdmin = null;

loginBtn.addEventListener('click', async () => {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', adminEmail.value.trim())
    .eq('password', adminPass.value.trim());

  if (error || !data || data.length === 0) {
    loginError.textContent = localStorage.getItem('lang') === 'en'
      ? 'Invalid login credentials'
      : 'Geçersiz giriş bilgileri';
    return;
  }

  currentAdmin = data[0];
  loginSection.classList.add('hidden');
  panelSection.classList.remove('hidden');
  loadPendingGroups();
});

async function loadPendingGroups() {
  const { data } = await supabase
    .from('hatim_groups')
    .select('*')
    .eq('is_approved', false)
    .order('created_at', { ascending: true });

  pendingGroupsDiv.innerHTML = '';

  data.forEach(group => {
    const div = document.createElement('div');
    div.classList.add('group-box');

    div.innerHTML = `
      <p><strong>Başlık:</strong> ${group.title}</p>
      <p><strong>Şifre:</strong> ${group.password}</p>
    `;

    const approveBtn = document.createElement('button');
    approveBtn.textContent = localStorage.getItem('lang') === 'en' ? 'Approve' : 'Onayla';
    approveBtn.onclick = async () => {
      await supabase.from('hatim_groups')
        .update({ is_approved: true })
        .eq('id', group.id);
      loadPendingGroups();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = localStorage.getItem('lang') === 'en' ? 'Delete' : 'Sil';
    deleteBtn.classList.add('delete');
    deleteBtn.onclick = async () => {
      if (confirm('Silmek istediğinizden emin misiniz?')) {
        await supabase.from('hatim_groups').delete().eq('id', group.id);
        loadPendingGroups();
      }
    };

    div.appendChild(approveBtn);
    div.appendChild(deleteBtn);
    pendingGroupsDiv.appendChild(div);
  });
}

addAdminBtn.addEventListener('click', async () => {
  const email = newAdminEmail.value.trim();
  const password = newAdminPass.value.trim();

  if (!email || !password) {
    adminAddMsg.textContent = localStorage.getItem('lang') === 'en'
      ? 'Please fill in all fields'
      : 'Boş alan bırakmayın';
    return;
  }

  const { error } = await supabase.from('admins').insert({ email, password });

  if (error) {
    adminAddMsg.textContent = 'Hata oluştu';
  } else {
    adminAddMsg.textContent = localStorage.getItem('lang') === 'en'
      ? 'New admin added ✅'
      : 'Yeni admin eklendi ✅';
    newAdminEmail.value = '';
    newAdminPass.value = '';
  }
});
