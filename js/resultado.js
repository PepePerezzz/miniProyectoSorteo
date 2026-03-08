// DATOS DEL EVENTO

const organizador = localStorage.getItem("organizador");
const celebracion = localStorage.getItem("nombreCelebracion");
const fecha = localStorage.getItem("fechaEvento");
const gasto = localStorage.getItem("rangoGasto");


// LISTAS GUARDADAS

const participantes = JSON.parse(localStorage.getItem("listaParticipantes")) || [];
const exclusiones = JSON.parse(localStorage.getItem("restriccionesSorteo")) || [];
const resultados = JSON.parse(localStorage.getItem("resultadoSorteo")) || [];



// MOSTRAR DATOS DEL EVENTO

document.getElementById("organizador").textContent = organizador || "No definido";
document.getElementById("celebracion").textContent = celebracion || "No definida";
document.getElementById("fecha").textContent = fecha || "No definida";
document.getElementById("gasto").textContent = gasto || "No definido";



// MOSTRAR PARTICIPANTES

const listaParticipantes = document.getElementById("listaParticipantes");

participantes.forEach(nombre => {

    const li = document.createElement("li");
    li.className = "list-group-item";

    li.textContent = nombre;

    listaParticipantes.appendChild(li);

});



// MOSTRAR EXCLUSIONES

const listaExclusiones = document.getElementById("listaExclusiones");

exclusiones.forEach(ex => {

    const li = document.createElement("li");
    li.className = "list-group-item";

    // muestra: Daniel no regala a Carlos
    li.textContent = ex.de + " no regala a " + ex.para;

    listaExclusiones.appendChild(li);

});



// MOSTRAR RESULTADOS DEL SORTEO

const tablaResultados = document.getElementById("tablaResultados");

resultados.forEach((res, index) => {

    const tr = document.createElement("tr");

    const tdNum = document.createElement("td");
    const tdPersona = document.createElement("td");
    const tdRegalo = document.createElement("td");

    tdNum.innerHTML = `<span class="gold-badge">${index + 1}</span>`;
    tdPersona.textContent = res.de;
    tdRegalo.textContent = res.para;

    tr.appendChild(tdNum);
    tr.appendChild(tdPersona);
    tr.appendChild(tdRegalo);

    tablaResultados.appendChild(tr);

});

document.getElementById("btnLimpiar").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../index.html";
});