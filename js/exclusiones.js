const nombresGuardados = JSON.parse(localStorage.getItem('listaParticipantes'));
const selectA = document.getElementById('persona-a');
const selectB = document.getElementById('persona-b');
const btnAgregar = document.getElementById('btn-agregar-exclusion');
const btnContinuar = document.getElementById('btn-continuar');
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

let restricciones = [];

// Función mágica para alertas de Bootstrap
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert" style="font-size: 0.8rem; text-align: left;">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);
  
  // Auto-cerrar después de 3 segundos
  setTimeout(() => {
    const alert = bootstrap.Alert.getOrCreateInstance(wrapper.firstElementChild);
    alert.close();
  }, 3000);
}

function cargarNombres() {
    if (nombresGuardados.length === 0) {
        appendAlert("No hay participantes. Regresa.", "danger");
        return;
    }
    nombresGuardados.forEach(nombre => {
        const opcionA = new Option(nombre, nombre);
        const opcionB = new Option(nombre, nombre);
        selectA.add(opcionA);
        selectB.add(opcionB);
    });
}

btnAgregar.addEventListener('click', () => {
    const p1 = selectA.value;
    const p2 = selectB.value;

    if (!p1 || !p2) {
        appendAlert("Selecciona a dos personas primero.", "warning");
        return;
    }

    if (p1 === p2) {
        appendAlert("¡No puede ser la misma persona!", "danger");
        return;
    }

    restricciones.push({ de: p1, para: p2 });
    appendAlert(`Restricción guardada: ${p1} ➔ ${p2}`, "success");
    
    selectA.selectedIndex = 0;
    selectB.selectedIndex = 0;
});

btnContinuar.addEventListener('click', () => {
    localStorage.setItem('restriccionesSorteo', JSON.stringify(restricciones));
    window.location.href = 'resultado.html'; 
});

cargarNombres();


function realizarSorteo() {
    let intentos = 0;
    const MAX_INTENTOS = 500; // Para evitar bucles infinitos si es imposible

    while (intentos < MAX_INTENTOS) {
        let disponibles = [...nombresGuardados];
        let copiaParticipantes = [...nombresGuardados];
        let resultado = [];
        let error = false;

        // Mezclamos la lista de quienes van a recibir (disponibles)
        disponibles.sort(() => Math.random() - 0.5);

        for (let i = 0; i < copiaParticipantes.length; i++) {
            const dador = copiaParticipantes[i];
            const receptor = disponibles[i];

            // REGLAS: 
            // 1. No regalarse a sí mismo
            // 2. No romper las restricciones guardadas
            const esMismaPersona = dador === receptor;
            const esRestringido = restricciones.some(r => r.de === dador && r.para === receptor);

            if (esMismaPersona || esRestringido) {
                error = true;
                break; // Si falla una pareja, reiniciamos todo el sorteo
            }

            resultado.push({ de: dador, para: receptor });
        }

        if (!error) {
            localStorage.setItem('resultadoSorteo', JSON.stringify(resultado));
            return resultado; // ¡Sorteo exitoso!
        }
        intentos++;
    }
    alert("No se pudo generar un sorteo válido después de varios intentos. Revisa las restricciones.");
    return null; // Si llega aquí, es que las restricciones son imposibles de cumplir
}


