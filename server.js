const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* ================= FORM ================= */

app.get("/",(req,res)=>{

res.send(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

body{

background:#0b0f14;
font-family:Arial;
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;
padding:20px 0;
margin:0;
color:white;

}

.card{

background:#0e1319;
padding:35px;
border-radius:20px;
width:420px;
border:1px solid #1c232c;

}

.logo{

text-align:center;
margin-bottom:20px;
margin-top:10px;

}

.title{

font-size:22px;
margin-bottom:5px;

}

.desc{

font-size:13px;
color:#9aa7b5;
margin-bottom:20px;
line-height:1.5;

}

.form{

display:flex;
flex-direction:column;
gap:15px;

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

textarea{

height:110px;
resize:none;

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

display:flex;
align-items:center;
gap:8px;
padding:13px;
background:#0f151c;
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

input:focus,
textarea:focus{

outline:none;
border:1px solid #3cff88;

}

@media(max-width:500px){

.card{

width:90%;

}

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

<img src="https://cmsbetconstruct.com/storage/medias/novabets-18761023/media_18761023_71df681c6b11e1a879eed3f18ae48c39.png" width="170">

</div>

<div class="title">

Aranma Talebi

</div>

<div class="desc">

Tüm soru, görüş, öneri ve iletişim taleplerinizi özel müşteri temsilcimiz yanıtlamaya hazır.  
Call Center departmanımız sizlere en kısa sürede dönüş sağlayacaktır.

</div>

<form class="form" method="POST" action="/add">

<div class="group">

<label>Kullanıcı Adı</label>

<input required name="username">

</div>

<div class="group">

<label>Ad Soyad</label>

<input required name="name">

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

<textarea required name="reason"></textarea>

</div>

<button>Gönder</button>

</form>

</div>

</body>

</html>

`);

});

/* ================= ADD ================= */

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
padding:30px;
border-radius:20px;
width:420px;
border:1px solid #1c232c;
max-width:95%;

}

.ok{

font-size:45px;
color:#3cff88;

}

button{

margin-top:20px;
padding:14px 25px;
background:#2cff7a;
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

document.getElementById("btn").click();

}

},1000);

</script>

<div class="card">

<img src="https://cmsbetconstruct.com/storage/medias/novabets-18761023/media_18761023_71df681c6b11e1a879eed3f18ae48c39.png" width="150">

<h2>Talebiniz Alındı</h2>

<p>En kısa sürede aranacaksınız</p>

<span id="time">5</span> saniye kaldı

<br><br>

<a href="http://luizbet.casino" target="_blank" id="btn">

<button>Siteye dön</button>

</a>

</div>

`);

});

/* ================= ADMIN ================= */

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
color:white;

}

.card{

background:#0e1319;
padding:35px;
border-radius:18px;
width:350px;
border:1px solid #1c232c;
text-align:center;

}

input{

width:100%;
padding:14px;
background:#0b1117;
border:1px solid #1c232c;
border-radius:10px;
color:white;
margin-top:10px;

}

button{

margin-top:15px;
width:100%;
padding:15px;
background:#2cff7a;
border:none;
border-radius:10px;
font-weight:bold;
cursor:pointer;

}

</style>

<div class="card">

<img src="https://cmsbetconstruct.com/storage/medias/novabets-18761023/media_18761023_71df681c6b11e1a879eed3f18ae48c39.png" width="150">

<form method="POST" action="/login">

<input name="user" placeholder="Username">

<input name="pass" type="password" placeholder="Password">

<button>Login</button>

</form>

</div>

`);

});

/* ================= LOGIN ================= */

app.post("/login",(req,res)=>{

if(req.body.user=="luizcall" && req.body.pass=="luiz1234"){

res.redirect("/panel");

}else{

res.send("Hatalı giriş");

}

});

/* ================= PANEL ================= */

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
margin:0;

}

.panel{

max-width:1500px;
margin:auto;
margin-top:40px;

}

.box{

background:#0e1319;
border-radius:15px;
padding:20px;
border:1px solid #1c232c;

}

table{

width:100%;
border-collapse:collapse;
table-layout:fixed;

}

th{

background:#0f141a;
color:#3cff88;
padding:14px;
text-align:left;

}

td{

padding:13px;
border-bottom:1px solid #1c232c;
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;

}

tr:hover{

background:#151c25;

}

.badge{

padding:6px 12px;
border-radius:6px;
font-size:12px;
font-weight:bold;

}

.wait{

background:#2a2100;
color:#ffd43b;

}

.success{

background:#0f2a1b;
color:#3cff88;

}

.fail{

background:#2a0f0f;
color:#ff5252;

}

.btn{

border:none;
padding:8px 12px;
border-radius:6px;
cursor:pointer;
font-weight:bold;
margin-right:5px;
min-width:80px;

}

.green{

background:#1fd65f;
color:white;

}

.red{

background:#ff3b3b;
color:white;

}

.colUser{width:120px;}
.colName{width:150px;}
.colPhone{width:170px;}
.colReason{width:250px;}
.colDate{width:200px;}
.colStatus{width:140px;}
.colAction{width:180px;}

</style>

<script>

setTimeout(()=>{

location.reload();

},10000);

</script>

<div class="panel">

<div class="box">

<h2>LuizBet Call Center Panel</h2>

<table>

<tr>

<th class="colUser">Kullanıcı</th>
<th class="colName">İsim</th>
<th class="colPhone">Telefon</th>
<th class="colReason">Sebep</th>
<th class="colDate">Tarih</th>
<th class="colStatus">Durum</th>
<th class="colAction">İşlem</th>

</tr>
`;

data.reverse().forEach((c,i)=>{

let badge="";
let text="";

if(c.status=="pending"){

badge="badge wait";
text="Beklemede";

}

if(c.status=="success"){

badge="badge success";
text="Başarılı";

}

if(c.status=="fail"){

badge="badge fail";
text="Başarısız";

}

html+=`

<tr>

<td class="colUser">${c.username}</td>

<td class="colName">${c.name}</td>

<td class="colPhone">${c.phone}</td>

<td class="colReason">${c.reason}</td>

<td class="colDate">${new Date(c.date).toLocaleString()}</td>

<td class="colStatus">

<span class="${badge}">
${text}
</span>

</td>

<td class="colAction">

<a href="/success/${data.length-1-i}">
<button class="btn green">
Arandı
</button>
</a>

<a href="/fail/${data.length-1-i}">
<button class="btn red">
Aranamadı
</button>
</a>

</td>

</tr>

`;

});

html+=`

</table>

</div>

</div>

`;

res.send(html);

});

/* ================= STATUS ================= */

app.get("/success/:id",(req,res)=>{

let data=JSON.parse(fs.readFileSync("calls.json"));

let id=req.params.id;

data[id].status="success";

fs.writeFileSync("calls.json",JSON.stringify(data,null,2));

res.redirect("/panel");

});

app.get("/fail/:id",(req,res)=>{

let data=JSON.parse(fs.readFileSync("calls.json"));

let id=req.params.id;

data[id].status="fail";

fs.writeFileSync("calls.json",JSON.stringify(data,null,2));

res.redirect("/panel");

});

/* ================= SERVER ================= */

app.listen(process.env.PORT || 3000,()=>{ 

console.log("Server çalışıyor"); 

});