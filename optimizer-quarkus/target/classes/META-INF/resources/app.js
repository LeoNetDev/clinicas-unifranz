const services = [
 {name:"Cirugía general",short:"Cirugía",icon:"✚",interns:12,occupied:9,capacity:12,color:"#3f76d3",status:"Moderado"},
 {name:"Emergencias",short:"Emergencias",icon:"✚",interns:10,occupied:10,capacity:10,color:"#d99a08",status:"Alta demanda"},
 {name:"Pediatría",short:"Pediatría",icon:"♧",interns:8,occupied:5,capacity:9,color:"#16834a",status:"Normal"},
 {name:"Medicina interna",short:"Medicina interna",icon:"♡",interns:12,occupied:8,capacity:12,color:"#3f76d3",status:"Moderado"},
 {name:"Ginecología y obstetricia",short:"Gineco-obstetricia",icon:"✿",interns:8,occupied:5,capacity:10,color:"#16834a",status:"Normal"},
 {name:"Terapia intensiva",short:"Terapia intensiva",icon:"♥",interns:4,occupied:4,capacity:4,color:"#c83232",status:"Crítico"},
 {name:"Anestesiología",short:"Anestesiología",icon:"◉",interns:5,occupied:3,capacity:5,color:"#3f76d3",status:"Moderado"},
 {name:"Hospitalización",short:"Hospitalización",icon:"▤",interns:5,occupied:3,capacity:7,color:"#16834a",status:"Normal"}
];
let interns = [
 {name:"Valeria Rojas",code:"U-2026-001",service:"Cirugía general",shift:"Mañana",until:"2026-11-30",status:"Asignado"},
 {name:"Diego Fernández",code:"U-2026-002",service:"Emergencias",shift:"Tarde",until:"2026-11-30",status:"Asignado"},
 {name:"Camila Vargas",code:"U-2026-003",service:"Pediatría",shift:"Mañana",until:"2026-12-15",status:"Asignado"},
 {name:"Mateo Flores",code:"U-2026-004",service:"Medicina interna",shift:"Noche",until:"2026-11-15",status:"Asignado"},
 {name:"Lucía Mendoza",code:"U-2026-005",service:"Ginecología y obstetricia",shift:"Tarde",until:"2026-12-15",status:"Asignado"},
 {name:"Andrés Salvatierra",code:"U-2026-006",service:"Terapia intensiva",shift:"Mañana",until:"2026-11-30",status:"Asignado"},
 {name:"Sofía Paredes",code:"U-2026-007",service:"Anestesiología",shift:"Tarde",until:"2026-12-01",status:"Pendiente"},
 {name:"Nicolás Herrera",code:"U-2026-008",service:"Hospitalización",shift:"Mañana",until:"2026-11-30",status:"Asignado"}
];
let rotations = [
 {name:"Valeria Rojas",service:"Cirugía general",role:"Apoyo quirúrgico",shift:"Mañana",date:"2026-10-27",status:"Asignado"},
 {name:"Diego Fernández",service:"Emergencias",role:"Triaje / apoyo",shift:"Tarde",date:"2026-10-27",status:"Asignado"},
 {name:"Camila Vargas",service:"Pediatría",role:"Sala pediátrica",shift:"Mañana",date:"2026-10-27",status:"Asignado"},
 {name:"Mateo Flores",service:"Medicina interna",role:"Hospitalización",shift:"Noche",date:"2026-10-27",status:"Asignado"},
 {name:"Lucía Mendoza",service:"Ginecología y obstetricia",role:"Consulta / sala",shift:"Tarde",date:"2026-10-27",status:"Asignado"},
 {name:"Andrés Salvatierra",service:"Terapia intensiva",role:"Apoyo de unidad",shift:"Mañana",date:"2026-10-27",status:"Asignado"},
 {name:"Sofía Paredes",service:"Anestesiología",role:"Apoyo anestésico",shift:"Tarde",date:"2026-10-27",status:"Pendiente"}
];
const $ = id => document.getElementById(id);
const initials = name => name.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase();
const safe = text => String(text).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const statusTag = status => `<span class="tag ${status==="Asignado"?"green":status==="Pendiente"?"yellow":"blue"}">${safe(status)}</span>`;
function updateDate(){
 const now=new Date();
 $("today").textContent=new Intl.DateTimeFormat("es-BO",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(now).replace(/^\p{L}/u,m=>m.toUpperCase());
 $("clock").textContent=new Intl.DateTimeFormat("es-BO",{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(now);
}
function fillServiceBars(){
 $("serviceBars").innerHTML=services.slice(0,5).map(s=>{let p=Math.round(s.occupied/s.capacity*100);return `<div><div class="service-bar-head"><span>${safe(s.short)}</span><strong>${p}%</strong></div><div class="service-track"><span style="width:${p}%;background:${s.color}"></span></div></div>`}).join("");
}
function fillServiceCards(){
 $("serviceGrid").innerHTML=services.map(s=>{let p=Math.round(s.occupied/s.capacity*100);return `<article class="service-card"><div class="service-card-top"><div class="service-icon">${s.icon}</div><div><h3>${safe(s.name)}</h3><p>Catálogo provisional</p></div></div><div class="service-numbers"><div><strong>${s.interns}</strong><small>Internos demo</small></div><div><strong>${s.occupied}/${s.capacity}</strong><small>Cargos demo</small></div></div><div class="service-bar-head"><span>Ocupación ilustrativa</span><strong>${p}%</strong></div><div class="service-track"><span style="width:${p}%;background:${s.color}"></span></div><button class="outline-button" data-service="${safe(s.name)}">Ver asignaciones →</button></article>`}).join("");
}
function personCell(name,sub="Interno de Medicina"){return `<div class="person-cell"><div class="person-initial">${initials(name)}</div><div><div class="person-name">${safe(name)}</div><div class="person-sub">${safe(sub)}</div></div></div>`}
function fillRotationPreview(){
 $("rotationPreview").innerHTML=rotations.slice(0,4).map(r=>`<tr><td>${personCell(r.name)}</td><td>${safe(r.service)}</td><td>${safe(r.shift)}</td><td>${statusTag(r.status)}</td></tr>`).join("");
}
function fillInternTable(){
 const q=($("internSearch")?.value||"").toLowerCase(), service=$("serviceFilter")?.value||"";
 const rows=interns.filter(i=>(`${i.name} ${i.code} ${i.service}`.toLowerCase().includes(q))&&(!service||i.service===service));
 $("internTable").innerHTML=rows.length?rows.map(i=>`<tr><td>${personCell(i.name)}</td><td>${safe(i.code)}</td><td>${safe(i.service)}</td><td>${safe(i.shift)}</td><td>${safe(i.until)}</td><td>${statusTag(i.status)}</td></tr>`).join(""):`<tr><td class="empty-state" colspan="6">No se encontraron internos con esos filtros.</td></tr>`;
}
function fillRotationTable(){
 const service=$("rotationServiceFilter")?.value||"",shift=$("shiftFilter")?.value||"";
 const rows=rotations.filter(r=>(!service||r.service===service)&&(!shift||r.shift===shift));
 $("rotationTable").innerHTML=rows.length?rows.map(r=>`<tr><td>${personCell(r.name)}</td><td>${safe(r.service)}</td><td>${safe(r.role)}</td><td>${safe(r.shift)}</td><td>${safe(r.date)}</td><td>${statusTag(r.status)}</td></tr>`).join(""):`<tr><td class="empty-state" colspan="6">No hay asignaciones para esos filtros.</td></tr>`;
}
function fillFilters(){
 ["serviceFilter","rotationServiceFilter"].forEach(id=>{const el=$(id);services.forEach(s=>{const o=document.createElement("option");o.value=s.name;o.textContent=s.name;el.appendChild(o)})});
}
function fillWeek(){
 const now=new Date(),days=[];
 const labels=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
 const sample=["yellow","yellow","green","yellow","red","yellow","green"];
 for(let i=0;i<7;i++){let d=new Date(now);d.setDate(now.getDate()+i);days.push(`<div class="day-card"><small>${i===0?"Hoy":labels[d.getDay()]}</small><div class="day-color ${sample[i]}">${sample[i]==="red"?"!":sample[i]==="yellow"?"•":"✓"}</div><strong>${d.getDate()} ${new Intl.DateTimeFormat("es-BO",{month:"short"}).format(d)}</strong><span>${sample[i]==="red"?"Crítico (demo)":sample[i]==="yellow"?"Moderado (demo)":"Normal (demo)"}</span></div>`)}
 $("weekForecast").innerHTML=days.join("");
}
function showPage(page){
 document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===`page-${page}`));
 document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 const active=document.querySelector(`.nav-link[data-page="${page}"]`);
 $("crumb").textContent=active?active.textContent.trim():"Panel general";
 $("sidebar").classList.remove("open");$("scrim").classList.remove("show");
 window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.goto)));
$("openMenu").addEventListener("click",()=>{$("sidebar").classList.add("open");$("scrim").classList.add("show")});
$("closeMenu").addEventListener("click",()=>{$("sidebar").classList.remove("open");$("scrim").classList.remove("show")});
$("scrim").addEventListener("click",()=>{$("sidebar").classList.remove("open");$("scrim").classList.remove("show")});
$("internSearch").addEventListener("input",fillInternTable);
$("serviceFilter").addEventListener("change",fillInternTable);
$("rotationServiceFilter").addEventListener("change",fillRotationTable);
$("shiftFilter").addEventListener("change",fillRotationTable);
document.addEventListener("click",e=>{
 const serviceButton=e.target.closest("[data-service]");
 if(serviceButton){$("rotationServiceFilter").value=serviceButton.dataset.service;fillRotationTable();showPage("rotaciones")}
});
const dialog=$("recordDialog");
function openForm(type){
 const config={
 intern:{title:"Registrar interno",fields:[["Nombre completo","name","text"],["Código universitario","code","text"],["Servicio asignado","service","select"],["Turno","shift","shift"],["Fecha fin de rotación","until","date"]]},
 service:{title:"Nuevo servicio",fields:[["Nombre del servicio","name","text"],["Cantidad de cargos","capacity","number"]]},
 rotation:{title:"Nueva asignación",fields:[["Interno","name","intern"],["Servicio","service","select"],["Cargo o puesto","role","text"],["Turno","shift","shift"],["Fecha","date","date"]]}
 }[type];
 $("dialogTitle").textContent=config.title;
 $("dialogFields").innerHTML=config.fields.map(([label,name,kind])=>{let input="";
 if(kind==="select")input=`<select class="field-input" name="${name}" required>${services.map(s=>`<option>${safe(s.name)}</option>`).join("")}</select>`;
 else if(kind==="shift")input=`<select class="field-input" name="${name}" required><option>Mañana</option><option>Tarde</option><option>Noche</option></select>`;
 else if(kind==="intern")input=`<select class="field-input" name="${name}" required>${interns.map(i=>`<option>${safe(i.name)}</option>`).join("")}</select>`;
 else input=`<input class="field-input" name="${name}" type="${kind}" ${kind==="number"?'min="1"':''} required>`;
 return `<div class="dialog-field"><label>${label}</label>${input}</div>`}).join("");
 $("recordForm").dataset.type=type;
 dialog.showModal();
}
$("addIntern").addEventListener("click",()=>openForm("intern"));
$("addService").addEventListener("click",()=>openForm("service"));
$("newRotation").addEventListener("click",()=>openForm("rotation"));
$("recordForm").addEventListener("submit",e=>{
 if(e.submitter?.value==="cancel")return;
 e.preventDefault();
 const form=new FormData(e.currentTarget),type=e.currentTarget.dataset.type,now=new Date().toISOString().slice(0,10);
 if(type==="intern"){
  interns.push({name:form.get("name"),code:form.get("code"),service:form.get("service"),shift:form.get("shift"),until:form.get("until"),status:"Pendiente"});
  fillInternTable();
 }else if(type==="service"){
  services.push({name:form.get("name"),short:form.get("name"),icon:"✚",interns:0,occupied:0,capacity:Number(form.get("capacity")),color:"#3f76d3",status:"Normal"});
  fillServiceBars();fillServiceCards();fillFiltersRefresh();
 }else{
  rotations.push({name:form.get("name"),service:form.get("service"),role:form.get("role"),shift:form.get("shift"),date:form.get("date")||now,status:"Pendiente"});
  fillRotationTable();fillRotationPreview();
 }
 dialog.close();
});
function fillFiltersRefresh(){
 const values1=$("serviceFilter").value,values2=$("rotationServiceFilter").value;
 $("serviceFilter").innerHTML='<option value="">Todos los servicios</option>';
 $("rotationServiceFilter").innerHTML='<option value="">Todos los servicios</option>';
 services.forEach(s=>{for(const id of ["serviceFilter","rotationServiceFilter"]){const o=document.createElement("option");o.value=s.name;o.textContent=s.name;$(id).appendChild(o)}});
 $("serviceFilter").value=values1;$("rotationServiceFilter").value=values2;
}
updateDate();setInterval(updateDate,1000);fillFilters();fillServiceBars();fillServiceCards();fillRotationPreview();fillInternTable();fillRotationTable();fillWeek();
