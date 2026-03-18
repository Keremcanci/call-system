const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{

res.send(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<style>

body{

background:#0b0f14;

font-family:Arial;

display:flex;

justify-content:center;

align-items:center;

height:100vh;

margin:0;

color:white;

}

.card{

background:#0e1319;

padding:40px;

border-radius:20px;

width:420px;

box-shadow:0 0 40px rgba(0,255,120,0.07);

border:1px solid #1c232c;

}

.logo{

text-align:center;

margin-bottom:25px;

}

.logo img{

filter:drop-shadow(0 0 10px rgba(60,255,136,0.2));

}

.form{

display:flex;

flex-direction:column;

gap:18px;

}

.group{

display:flex;

flex-direction:column;

gap:6px;

}

label{

font-size:13px;

color:#9aa7b5;

}

input,textarea{

width:100%;

padding:14px;

background:#0b1117;

border:1px solid #1c232c;

border-radius:10px;

color:white;

font-size:14px;

box-sizing:border-box;

}

input:focus,textarea:focus{

outline:none;

border:1px solid #3cff88;

}

textarea{

height:110px;

resize:none;

}

button{

margin-top:10px;

padding:15px;

background:linear-gradient(90deg,#2cff7a,#1fd65f);

border:none;

border-radius:10px;

font-weight:bold;

cursor:pointer;

font-size:15px;

}

button:hover{

background:linear-gradient(90deg,#34ff8a,#27e56b);

}

.title{

margin-bottom:10px;

font-size:20px;

font-weight:bold;

}

.subtitle{

color:#8b98a7;

font-size:13px;

margin-bottom:15px;

}

.phoneBox{

display:flex;

align-items:center;

background:#0b1117;

border:1px solid #1c232c;

border-radius:10px;

overflow:hidden;

}

.prefix{

padding:14px;

background:#0f151c;

display:flex;

align-items:center;

gap:8px;

border-right:1px solid #1c232c;

}

.prefix img{

width:22px;

}

.phoneBox input{

border:none;

background:transparent;

flex:1;

padding:14px;

color:white;

}

.phoneBox input:focus{

outline:none;

}

.inputBox{

position:relative;

}

.inputBox input,
.inputBox textarea{

padding-left:40px;

}

.icon{

position:absolute;

left:12px;

top:50%;

transform:translateY(-50%);

color:#3cff88;

font-size:14px;

}

.texticon{

top:22px;

}

.inputBox:focus-within .icon{

color:#3cff88;

text-shadow:0 0 8px rgba(60,255,136,0.6);

}

.inputBox:focus-within input,
.inputBox:focus-within textarea{

border:1px solid #3cff88;

box-shadow:0 0 10px rgba(60,255,136,0.15);

}

</style>

<script>

function formatPhone(input){

let value=input.value.replace(/\\D/g,'');

if(value.startsWith("0")){

value=value.substring(1);

}

if(value.startsWith("90")){

value=value.substring(2);

}

input.value=value;

}

</script>

</head>

<body>

<div class="card">

<div class="logo">

<a href="luizbet.casino" target="_top">

<img src="https://cmsbetconstruct.com/storage/medias/novabets-18761023/media_18761023_71df681c6b11e1a879eed3f18ae48c39.png" width="160">

</a>

</div>

<h3>Aranma Talebi</h3>

<form class="form" method="POST" action="/add">

<div class="group">

<label>Kullanıcı Adı</label>

<div class="inputBox">

<span class="icon">👤</span>

<input required name="username">

</div>

</div>

<div class="group">

<label>Ad Soyad</label>

<div class="inputBox">

<span class="icon">🧍</span>

<input required name="name">

</div>

</div>

<div class="group">

<label>Telefon Numarası</label>

<div class="phoneBox">

<div class="prefix">

<img src="https://flagcdn.com/w40/tr.png">

+90

</div>

<input type="tel" required name="phone" placeholder="5XXXXXXXXX" onkeyup="formatPhone(this)">

</div>

</div>

<div class="group">

<label>Mesaj</label>

<div class="inputBox">

<span class="icon texticon">✉</span>

<textarea required name="reason"></textarea>

</div>

</div>

<button>Gönder</button>

</form>

</div>

</body>

</html>

`);

});

app.post("/add",(req,res)=>{

let data=[];

if(fs.existsSync("calls.json")){

data=JSON.parse(fs.readFileSync("calls.json"));

}

data.push({

name:req.body.name,
username:req.body.username,
phone:"90"+req.body.phone,
reason:req.body.reason,
date:new Date(),
status:"pending"

});

fs.writeFileSync("calls.json",JSON.stringify(data,null,2));

res.send(`

<style>

body{

background:#0b0f14;

font-family:Arial;

display:flex;

justify-content:center;

align-items:center;

height:100vh;

color:white;

}

.card{

background:#0e1319;

padding:40px;

border-radius:15px;

width:420px;

text-align:center;

box-shadow:0 0 30px rgba(0,255,120,0.1);

border:1px solid #1c232c;

}

.ok{

font-size:50px;

color:#3cff88;

margin-bottom:15px;

}

button{

margin-top:20px;

padding:14px 25px;

background:linear-gradient(90deg,#2cff7a,#1fd65f);

border:none;

border-radius:8px;

font-weight:bold;

cursor:pointer;

}

</style>

<script>

let time=5;

let timer=setInterval(()=>{

time--;

document.getElementById("time").innerText=time;

if(time<=0){

clearInterval(timer);

document.getElementById("timeText").innerText="Siteye dönmek için butona tıklayın";

}

},1000);

</script>

<div class="card">

<div class="logo">

<img src="https://cmsbetconstruct.com/storage/medias/novabets-18761023/media_18761023_71df681c6b11e1a879eed3f18ae48c39.png" width="150">

</div>

<h2>Talebiniz Alındı</h2>

<p>En kısa sürede sizinle iletişime geçeceğiz.</p>

<span id="time">5</span> saniye kaldı
<br><br>
<span id="timeText">Siteye dönmek için aşağıdaki butonu kullanın</span>

<a href="luizbet.casino" target="_blank">

<button>Siteye dönmek için tıklayınız</button>

</a>

</div>

`);

});

app.get("/admin",(req,res)=>{

res.send(`

<style>

body{

background:#0b0f14;

font-family:Arial;

display:flex;

justify-content:center;

align-items:center;

height:100vh;

margin:0;

color:white;

}

.card{

background:#0e1319;

padding:40px;

border-radius:20px;

width:360px;

box-shadow:0 0 40px rgba(0,255,120,0.07);

border:1px solid #1c232c;

text-align:center;

}

.logo{

font-size:28px;

color:#3cff88;

font-weight:bold;

margin-bottom:15px;

}

.sub{

color:#8b98a7;

font-size:13px;

margin-bottom:15px;

}

input{

width:100%;

padding:14px;

background:#0b1117;

border:1px solid #1c232c;

border-radius:10px;

color:white;

margin-top:10px;

font-size:14px;

transition:.2s;

}

input:focus{

outline:none;

border:1px solid #3cff88;

box-shadow:0 0 10px rgba(60,255,136,0.2);

}

button{

margin-top:18px;

width:100%;

padding:15px;

background:linear-gradient(90deg,#2cff7a,#1fd65f);

border:none;

border-radius:10px;

font-weight:bold;

cursor:pointer;

font-size:15px;

transition:.2s;

}

button:hover{

background:linear-gradient(90deg,#34ff8a,#27e56b);

transform:translateY(-1px);

}



</style>

<div class="card">

<div class="logo">

<a href="luizbet.casino" target="_blank">

<img src="https://cmsbetconstruct.com/storage/medias/novabets-18761023/media_18761023_71df681c6b11e1a879eed3f18ae48c39.png" width="160">

</a>

</div>

<div class="sub">

Call Center Admin Panel

</div>

<form method="POST" action="/login">

<input name="user" placeholder="Username">

<input type="password" name="pass" placeholder="Password">

<button>Giriş Yap</button>

</form>

</div>

`);

});

app.post("/login",(req,res)=>{

if(req.body.user=="luizcall" && req.body.pass=="luiz1234"){

res.redirect("/panel");

}else{

res.send("Hatalı giriş");

}

});

app.get("/panel",(req,res)=>{

let data=[];

if(fs.existsSync("calls.json")){

data=JSON.parse(fs.readFileSync("calls.json"));

}

let html=`

<style>

body{
background:#0b0f14;
color:white;
font-family:Arial;
}

table{
width:100%;
border-collapse:collapse;
background:#11161d;
}

th{
background:#0f141a;
color:#3cff88;
padding:12px;
}

td{
padding:10px;
border-bottom:1px solid #1c232c;
}

.pending{
background:#2a1f00;
}

.called{
background:#0f2a1b;
}

.copy{
cursor:pointer;
color:#3cff88;
}

</style>

<script>

function copy(text){

navigator.clipboard.writeText(text);

alert("Telefon kopyalandı");

}

setTimeout(()=>{

location.reload();

},10000);

</script>

<h2>LuizBet Call Center Panel</h2>

<table>

<tr>

<th>Kullanıcı</th>
<th>İsim</th>
<th>Telefon</th>
<th>Sebep</th>
<th>Tarih</th>
<th>Status</th>
<th>İşlem</th>

</tr>

`;

data.reverse().forEach((c,i)=>{

let color="";

if(c.status=="pending"){
color="class='pending'";
}

if(c.status=="called"){
color="class='called'";
}

html+=`

<tr ${color}>

<td>${c.username}</td>

<td>${c.name}</td>

<td class="copy" onclick="copy('${c.phone}')">

${c.phone}

</td>

<td>${c.reason}</td>

<td>${new Date(c.date).toLocaleString()}</td>

<td>${c.status}</td>

<td>

<a href="/status/${data.length-1-i}">

<button>Arandı</button>

</a>

</td>

</tr>

`;

});

html+=`

</table>

`;

res.send(html);

});

app.get("/status/:id",(req,res)=>{

let data=JSON.parse(fs.readFileSync("calls.json"));

let id=req.params.id;

data[id].status="called";

fs.writeFileSync("calls.json",JSON.stringify(data,null,2));

res.redirect("/panel");

});

app.listen(process.env.PORT || 3000,()=>{

console.log("Server çalışıyor");

});