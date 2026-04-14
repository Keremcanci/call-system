const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

/* ================= INDEX ================= */

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Aranma Talebi</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #080c10;
    font-family: 'Segoe UI', Arial, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
  }

  .page {
    width: 100%;
    max-width: 460px;
  }

  .card {
    background: #0d1117;
    border: 1px solid #1e2730;
    border-radius: 20px;
    overflow: hidden;
  }

  .card-header {
    background: linear-gradient(135deg, #0d1f15 0%, #091510 100%);
    border-bottom: 1px solid #1e2730;
    padding: 32px 36px 28px;
    text-align: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(44, 255, 122, 0.1);
    border: 1px solid rgba(44, 255, 122, 0.25);
    color: #2cff7a;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 20px;
    margin-bottom: 14px;
  }

  .badge::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #2cff7a;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .card-header h1 {
    font-size: 22px;
    font-weight: 700;
    color: #f0f4f8;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }

  .card-header p {
    font-size: 13px;
    color: #6b7f8f;
    line-height: 1.6;
  }

  .card-body {
    padding: 28px 36px 36px;
  }

  .form-group {
    margin-bottom: 18px;
  }

  label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #8a9bb0;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  input, textarea {
    width: 100%;
    padding: 13px 16px;
    background: #080c10;
    border: 1px solid #1e2730;
    border-radius: 10px;
    color: #e8edf2;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }

  input:focus, textarea:focus {
    border-color: #2cff7a;
    box-shadow: 0 0 0 3px rgba(44, 255, 122, 0.08);
  }

  input::placeholder, textarea::placeholder {
    color: #3a4a5a;
  }

  textarea {
    height: 100px;
    resize: none;
    line-height: 1.5;
  }

  .phone-row {
    display: flex;
    gap: 0;
    background: #080c10;
    border: 1px solid #1e2730;
    border-radius: 10px;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .phone-row:focus-within {
    border-color: #2cff7a;
    box-shadow: 0 0 0 3px rgba(44, 255, 122, 0.08);
  }

  .phone-prefix {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 13px 14px;
    background: #0d1117;
    border-right: 1px solid #1e2730;
    color: #8a9bb0;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .phone-prefix img {
    width: 20px;
    border-radius: 2px;
  }

  .phone-row input {
    border: none;
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    flex: 1;
    min-width: 0;
  }

  .phone-row input:focus {
    box-shadow: none;
  }

  .submit-btn {
    width: 100%;
    padding: 15px;
    background: #2cff7a;
    border: none;
    border-radius: 10px;
    color: #031a0a;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-top: 6px;
    letter-spacing: 0.02em;
  }

  .submit-btn:hover {
    background: #3dffaa;
  }

  .submit-btn:active {
    transform: scale(0.98);
  }

  .info-row {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
  }

  .info-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #080c10;
    border: 1px solid #1e2730;
    border-radius: 10px;
    padding: 12px;
  }

  .info-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(44, 255, 122, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 14px;
  }

  .info-text {
    font-size: 11px;
    color: #6b7f8f;
    line-height: 1.4;
  }

  .info-text strong {
    display: block;
    color: #a0b0c0;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 1px;
  }

  @media (max-width: 500px) {
    .card-header, .card-body { padding-left: 22px; padding-right: 22px; }
    .info-row { flex-direction: column; }
  }
</style>
<script>
  function formatPhone(input) {
    let v = input.value.replace(/\D/g, '');
    if (v.startsWith('0')) v = v.substring(1);
    if (v.startsWith('90')) v = v.substring(2);
    input.value = v;
  }
</script>
</head>
<body>
<div class="page">
  <div class="card">
    <div class="card-header">
      <div style="display:flex;justify-content:center;margin-bottom:20px;">
        <img src="/logo.png" alt="Logo" style="width:160px;">
      </div>
      <h1>Sizi Arayalım</h1>
      <p>Uzman müşteri temsilcimiz en kısa sürede<br>sizi arayarak yardımcı olacaktır.</p>
      <div class="badge" style="margin-top:14px;margin-bottom:0;">10:00 - 20:00 Hizmet Saatleri</div>
    </div>
    <div class="card-body">
      <div class="info-row">
        <div class="info-item">
          <div class="info-icon">⚡</div>
          <div class="info-text"><strong>Hızlı Yanıt</strong>Ort. 5 dk içinde</div>
        </div>
        <div class="info-item">
          <div class="info-icon">🔒</div>
          <div class="info-text"><strong>Güvenli</strong>Bilgileriniz korumalı</div>
        </div>
      </div>
      <form method="POST" action="/add">
        <div class="form-group">
          <label>Kullanıcı Adı</label>
          <input required name="username" placeholder="Kullanıcı adınızı girin">
        </div>
        <div class="form-group">
          <label>Ad Soyad</label>
          <input required name="name" placeholder="Adınız ve soyadınız">
        </div>
        <div class="form-group">
          <label>Telefon Numarası</label>
          <div class="phone-row">
            <div class="phone-prefix">
              <img src="https://flagcdn.com/w40/tr.png" alt="TR">
              +90
            </div>
            <input type="tel" required name="phone" placeholder="5XX XXX XX XX" onkeyup="formatPhone(this)">
          </div>
        </div>
        <div class="form-group">
          <label>Mesajınız</label>
          <textarea required name="reason" placeholder="Konu veya talebinizi kısaca belirtin..."></textarea>
        </div>
        <button type="submit" class="submit-btn">Gönder — Sizi Arayalım</button>
      </form>
    </div>
  </div>
</div>
</body>
</html>`);
});

/* ================= ADD ================= */

app.post("/add", (req, res) => {
  let data = [];
  if (fs.existsSync("calls.json")) {
    data = JSON.parse(fs.readFileSync("calls.json"));
  }
  data.push({
    name: req.body.name,
    username: req.body.username,
    phone: "90" + req.body.phone,
    reason: req.body.reason,
    date: new Date(),
    status: "pending"
  });
  fs.writeFileSync("calls.json", JSON.stringify(data, null, 2));

  res.send(`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Talep Alındı</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #080c10;
    font-family: 'Segoe UI', Arial, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .card {
    background: #0d1117;
    border: 1px solid #1e2730;
    border-radius: 20px;
    padding: 48px 40px;
    text-align: center;
    width: 100%;
    max-width: 400px;
  }
  .check-circle {
    width: 72px;
    height: 72px;
    background: rgba(44, 255, 122, 0.1);
    border: 2px solid rgba(44, 255, 122, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 30px;
  }
  h2 { color: #f0f4f8; font-size: 22px; margin-bottom: 10px; }
  p { color: #6b7f8f; font-size: 14px; line-height: 1.6; margin-bottom: 28px; }
  .timer-bar-bg {
    background: #1e2730;
    border-radius: 6px;
    height: 4px;
    margin-bottom: 12px;
    overflow: hidden;
  }
  .timer-bar {
    height: 4px;
    background: #2cff7a;
    border-radius: 6px;
    width: 100%;
    transition: width 1s linear;
  }
  .timer-text { color: #4a6070; font-size: 13px; margin-bottom: 24px; }
  .timer-text span { color: #2cff7a; font-weight: 700; }
  a button {
    width: 100%;
    padding: 14px;
    background: #2cff7a;
    border: none;
    border-radius: 10px;
    color: #031a0a;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }
  a button:hover { background: #3dffaa; }
</style>
<script>
  let time = 5;
  let total = 5;
  let timer = setInterval(() => {
    time--;
    document.getElementById('time').innerText = time;
    document.getElementById('bar').style.width = (time / total * 100) + '%';
    if (time <= 0) {
      clearInterval(timer);
      document.getElementById('btn').click();
    }
  }, 1000);
</script>
</head>
<body>
<div class="card">
  <img src="/logo.png" width="140" style="margin-bottom:28px;">
  <div class="check-circle">✓</div>
  <h2>Talebiniz Alındı!</h2>
  <p>Uzman müşteri temsilcimiz en kısa sürede<br>sizi arayacaktır.</p>
  <div class="timer-bar-bg">
    <div class="timer-bar" id="bar"></div>
  </div>
  <div class="timer-text"><span id="time">5</span> saniye içinde yönlendiriliyorsunuz</div>
  <a href="http://luizbet.casino" target="_blank" id="btn">
    <button>Siteye Dön</button>
  </a>
</div>
</body>
</html>`);
});

/* ================= ADMIN LOGIN ================= */

app.get("/admin", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Girişi</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #080c10;
    font-family: 'Segoe UI', Arial, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .card {
    background: #0d1117;
    border: 1px solid #1e2730;
    border-radius: 20px;
    padding: 40px;
    width: 100%;
    max-width: 360px;
    text-align: center;
  }
  .lock-icon {
    width: 56px;
    height: 56px;
    background: rgba(44, 255, 122, 0.08);
    border: 1px solid rgba(44, 255, 122, 0.2);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 22px;
  }
  h2 { color: #f0f4f8; font-size: 20px; margin-bottom: 6px; }
  .sub { color: #6b7f8f; font-size: 13px; margin-bottom: 28px; }
  .form-group { margin-bottom: 14px; text-align: left; }
  label { display: block; font-size: 12px; font-weight: 600; color: #8a9bb0; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 7px; }
  input {
    width: 100%;
    padding: 13px 16px;
    background: #080c10;
    border: 1px solid #1e2730;
    border-radius: 10px;
    color: #e8edf2;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  input:focus {
    border-color: #2cff7a;
    box-shadow: 0 0 0 3px rgba(44, 255, 122, 0.08);
  }
  input::placeholder { color: #3a4a5a; }
  button {
    width: 100%;
    padding: 14px;
    background: #2cff7a;
    border: none;
    border-radius: 10px;
    color: #031a0a;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 8px;
    transition: background 0.2s;
  }
  button:hover { background: #3dffaa; }
  .error { background: rgba(255, 60, 60, 0.1); border: 1px solid rgba(255, 60, 60, 0.25); color: #ff6b6b; font-size: 13px; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; }
</style>
</head>
<body>
<div class="card">
  <img src="/logo.png" width="130" style="margin-bottom:24px;">
  <div class="lock-icon">🔐</div>
  <h2>Admin Girişi</h2>
  <div class="sub">Call Center yönetim paneline erişin</div>
  <form method="POST" action="/login">
    <div class="form-group">
      <label>Kullanıcı Adı</label>
      <input name="user" placeholder="admin">
    </div>
    <div class="form-group">
      <label>Şifre</label>
      <input name="pass" type="password" placeholder="••••••••">
    </div>
    <button type="submit">Giriş Yap</button>
  </form>
</div>
</body>
</html>`);
});

/* ================= LOGIN ================= */

app.post("/login", (req, res) => {
  if (req.body.user == "luizcall" && req.body.pass == "luiz1234") {
    res.redirect("/panel");
  } else {
    res.send(`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hatalı Giriş</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080c10; font-family: 'Segoe UI', Arial, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .card { background: #0d1117; border: 1px solid #1e2730; border-radius: 20px; padding: 40px; width: 100%; max-width: 360px; text-align: center; }
  .error-icon { width: 56px; height: 56px; background: rgba(255, 60, 60, 0.1); border: 1px solid rgba(255, 60, 60, 0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 22px; }
  h2 { color: #f0f4f8; font-size: 20px; margin-bottom: 8px; }
  p { color: #6b7f8f; font-size: 14px; margin-bottom: 24px; }
  a button { width: 100%; padding: 14px; background: #2cff7a; border: none; border-radius: 10px; color: #031a0a; font-size: 15px; font-weight: 700; cursor: pointer; }
</style>
</head>
<body>
<div class="card">
  <div class="error-icon">✗</div>
  <h2>Hatalı Giriş</h2>
  <p>Kullanıcı adı veya şifre yanlış.</p>
  <a href="/admin"><button>Tekrar Dene</button></a>
</div>
</body>
</html>`);
  }
});

/* ================= PANEL ================= */

app.get("/panel", (req, res) => {
  let data = [];
  if (fs.existsSync("calls.json")) {
    data = JSON.parse(fs.readFileSync("calls.json"));
  }

  const total = data.length;
  const pending = data.filter(c => c.status === "pending").length;
  const success = data.filter(c => c.status === "success").length;
  const fail = data.filter(c => c.status === "fail").length;

  let rows = "";
  [...data].reverse().forEach((c, i) => {
    const realIndex = data.length - 1 - i;
    let badgeClass = "", badgeText = "";
    if (c.status === "pending") { badgeClass = "wait"; badgeText = "Beklemede"; }
    else if (c.status === "success") { badgeClass = "success"; badgeText = "Arandı"; }
    else if (c.status === "fail") { badgeClass = "fail"; badgeText = "Aranamadı"; }
    else { badgeClass = "wait"; badgeText = c.status; }

    const dateStr = new Date(c.date).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

    rows += `<tr>
      <td><span class="user-chip">${(c.username || "-").substring(0, 16)}</span></td>
      <td style="color:#e8edf2;font-weight:500;">${c.name || "-"}</td>
      <td><a href="tel:+${c.phone}" style="color:#2cff7a;text-decoration:none;">+${c.phone}</a></td>
      <td class="reason-cell" title="${c.reason}">${c.reason || "-"}</td>
      <td style="color:#6b7f8f;font-size:13px;">${dateStr}</td>
      <td><span class="badge ${badgeClass}">${badgeText}</span></td>
      <td>
        <div class="action-btns">
          <a href="/success/${realIndex}"><button class="btn-action btn-green" title="Arandı">✓ Arandı</button></a>
          <a href="/fail/${realIndex}"><button class="btn-action btn-red" title="Aranamadı">✗ Aranamadı</button></a>
        </div>
      </td>
    </tr>`;
  });

  res.send(`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Call Center Panel</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080c10; font-family: 'Segoe UI', Arial, sans-serif; color: #e8edf2; min-height: 100vh; }

  .topbar {
    background: #0d1117;
    border-bottom: 1px solid #1e2730;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .topbar-left { display: flex; align-items: center; gap: 16px; }
  .topbar-left img { height: 36px; }
  .topbar-title { font-size: 16px; font-weight: 700; color: #e8edf2; }
  .topbar-sub { font-size: 12px; color: #6b7f8f; }

  .topbar-right { display: flex; align-items: center; gap: 12px; }

  .live-badge {
    display: flex; align-items: center; gap: 6px;
    background: rgba(44, 255, 122, 0.1);
    border: 1px solid rgba(44, 255, 122, 0.2);
    color: #2cff7a;
    font-size: 11px; font-weight: 600;
    padding: 5px 10px; border-radius: 20px;
  }
  .live-dot { width: 6px; height: 6px; background: #2cff7a; border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .content { padding: 28px 32px; max-width: 1600px; margin: 0 auto; }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 24px;
  }

  .stat-card {
    background: #0d1117;
    border: 1px solid #1e2730;
    border-radius: 14px;
    padding: 20px 22px;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }

  .stat-card.total::before { background: #4a9eff; }
  .stat-card.pending::before { background: #ffd43b; }
  .stat-card.success::before { background: #2cff7a; }
  .stat-card.fail::before { background: #ff5252; }

  .stat-label { font-size: 12px; color: #6b7f8f; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
  .stat-value { font-size: 32px; font-weight: 700; line-height: 1; }
  .stat-card.total .stat-value { color: #4a9eff; }
  .stat-card.pending .stat-value { color: #ffd43b; }
  .stat-card.success .stat-value { color: #2cff7a; }
  .stat-card.fail .stat-value { color: #ff5252; }

  .table-card {
    background: #0d1117;
    border: 1px solid #1e2730;
    border-radius: 16px;
    overflow: hidden;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-bottom: 1px solid #1e2730;
  }

  .table-title { font-size: 15px; font-weight: 700; color: #e8edf2; }
  .table-count { font-size: 12px; color: #6b7f8f; background: #1a2230; padding: 4px 10px; border-radius: 20px; }

  .table-wrap { overflow-x: auto; }

  table { width: 100%; border-collapse: collapse; }

  thead th {
    background: #0a0e13;
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: #6b7f8f;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    white-space: nowrap;
    border-bottom: 1px solid #1e2730;
  }

  tbody td {
    padding: 13px 16px;
    border-bottom: 1px solid #12181f;
    font-size: 14px;
    white-space: nowrap;
  }

  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover td { background: #111720; }

  .user-chip {
    display: inline-block;
    background: #131c28;
    border: 1px solid #1e2d3d;
    color: #7ab3e0;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 6px;
  }

  .reason-cell {
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #8a9bb0;
    font-size: 13px;
  }

  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 700;
    padding: 4px 10px; border-radius: 6px;
    letter-spacing: 0.03em;
  }
  .badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; }
  .wait { background: rgba(255, 212, 59, 0.1); color: #ffd43b; border: 1px solid rgba(255, 212, 59, 0.2); }
  .wait::before { background: #ffd43b; }
  .success { background: rgba(44, 255, 122, 0.08); color: #2cff7a; border: 1px solid rgba(44, 255, 122, 0.2); }
  .success::before { background: #2cff7a; }
  .fail { background: rgba(255, 82, 82, 0.08); color: #ff5252; border: 1px solid rgba(255, 82, 82, 0.2); }
  .fail::before { background: #ff5252; }

  .action-btns { display: flex; gap: 6px; }

  .btn-action {
    border: none;
    padding: 6px 12px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;
    transition: opacity 0.15s, transform 0.1s;
    white-space: nowrap;
  }
  .btn-action:hover { opacity: 0.85; transform: scale(0.97); }
  .btn-green { background: rgba(44, 255, 122, 0.15); color: #2cff7a; border: 1px solid rgba(44, 255, 122, 0.25); }
  .btn-red { background: rgba(255, 82, 82, 0.12); color: #ff5252; border: 1px solid rgba(255, 82, 82, 0.2); }

  .empty-state { text-align: center; padding: 60px 20px; color: #4a5a6a; }
  .empty-state .big { font-size: 40px; margin-bottom: 12px; }
  .empty-state p { font-size: 15px; }

  @media (max-width: 900px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .content { padding: 16px; }
    .topbar { padding: 0 16px; }
  }
</style>
<script>
  setTimeout(() => location.reload(), 15000);
</script>
</head>
<body>

<div class="topbar">
  <div class="topbar-left">
    <img src="/logo.png" alt="Logo">
    <div>
      <div class="topbar-title">Call Center</div>
      <div class="topbar-sub">Yönetim Paneli</div>
    </div>
  </div>
  <div class="topbar-right">
    <div class="live-badge"><div class="live-dot"></div> Canlı</div>
  </div>
</div>

<div class="content">
  <div class="stats-grid">
    <div class="stat-card total">
      <div class="stat-label">Toplam Talep</div>
      <div class="stat-value">${total}</div>
    </div>
    <div class="stat-card pending">
      <div class="stat-label">Beklemede</div>
      <div class="stat-value">${pending}</div>
    </div>
    <div class="stat-card success">
      <div class="stat-label">Arandı</div>
      <div class="stat-value">${success}</div>
    </div>
    <div class="stat-card fail">
      <div class="stat-label">Aranamadı</div>
      <div class="stat-value">${fail}</div>
    </div>
  </div>

  <div class="table-card">
    <div class="table-header">
      <span class="table-title">Aranma Talepleri</span>
      <span class="table-count">${total} kayıt</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Kullanıcı</th>
            <th>İsim</th>
            <th>Telefon</th>
            <th>Mesaj</th>
            <th>Tarih</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          ${rows || `<tr><td colspan="7"><div class="empty-state"><div class="big">📋</div><p>Henüz kayıt yok</p></div></td></tr>`}
        </tbody>
      </table>
    </div>
  </div>
</div>

</body>
</html>`);
});

/* ================= STATUS ================= */

app.get("/success/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("calls.json"));
  data[req.params.id].status = "success";
  fs.writeFileSync("calls.json", JSON.stringify(data, null, 2));
  res.redirect("/panel");
});

app.get("/fail/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("calls.json"));
  data[req.params.id].status = "fail";
  fs.writeFileSync("calls.json", JSON.stringify(data, null, 2));
  res.redirect("/panel");
});

/* ================= SERVER ================= */

app.listen(process.env.PORT || 3000, () => {
  console.log("Server çalışıyor");
});
