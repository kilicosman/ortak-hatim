// api/send-email.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Yalnızca POST isteklerine izin verilir' });
  }

  const { title, password } = req.body;

  const mailResponse = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MS_API_KEY}`
    },
    body: JSON.stringify({
      from: {
        email: 'no-reply@ortakhatim.vercel.app',
        name: 'Ortak Hatim Sistemi'
      },
      to: [
        { email: 'kilic.osmn@gmail.com', name: 'Admin' }
      ],
      subject: 'Yeni Hatim Grubu Onayı Gerekiyor',
      text: `Yeni bir hatim grubu oluşturuldu:\n\nBaşlık: ${title}\nŞifre: ${password}\n\nLütfen admin paneline girerek onaylayınız.`,
      html: `<h3>Yeni Hatim Grubu Oluşturuldu</h3>
             <p><strong>Başlık:</strong> ${title}</p>
             <p><strong>Şifre:</strong> ${password}</p>
             <p><a href=\"https://ortakhatim.vercel.app/admin.html\">Admin Paneline Git</a></p>`
    })
  });

  const data = await mailResponse.json();
  if (mailResponse.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: data });
  }
}
