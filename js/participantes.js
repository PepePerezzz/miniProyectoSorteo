/**
    Lógica para la gestión de participantes
 */

// 1. Selección de elementos del DOM
const contenedor = document.getElementById('contenedor-participantes');
const btnAgregar = document.getElementById('btn-agregar');
const btnSortear = document.getElementById('btn-sortear');

// 2. Función para agregar un nuevo campo de texto (Input)
btnAgregar.addEventListener('click', () => {
    // Crear el div contenedor para el nuevo input
    const nuevoDiv = document.createElement('div');
    nuevoDiv.className = 'input-group animate-in';
    
    // Crear el input
    const nuevoInput = document.createElement('input');
    nuevoInput.type = 'text';
    nuevoInput.placeholder = 'Nombre del participante';
    nuevoInput.className = 'input-nombre';

    // Insertar el input en el div y el div en el contenedor principal
    nuevoDiv.appendChild(nuevoInput);
    contenedor.appendChild(nuevoDiv);
    
    // Poner el foco (cursor) automáticamente en el nuevo campo
    nuevoInput.focus();
});

// 3. Lógica para guardar nombres y saltar a la pantalla de exclusiones
btnSortear.addEventListener('click', () => {
    // Buscamos todos los inputs que tengan la clase 'input-nombre'
    const inputs = document.querySelectorAll('.input-nombre');
    const nombres = [];

    // Limpiamos los nombres (quitamos espacios extra) y validamos que no estén vacíos
    inputs.forEach(input => {
        const nombreLimpio = input.value.trim();
        if (nombreLimpio !== "") {
            nombres.push(nombreLimpio);
        }
    });

    // Validación mínima: al menos 2 personas para un intercambio
    if (nombres.length < 2) {
        alert("¡Oye! Necesitas al menos 2 participantes para hacer un sorteo.");
        return;
    }

    // --- PERSISTENCIA DE DATOS ---
    // Guardamos la lista en el localStorage del navegador para que 
    // la página de exclusiones pueda leerla.
    localStorage.setItem('listaParticipantes', JSON.stringify(nombres));
    
    // Redirección a la siguiente pantalla
    window.location.href = 'exclusiones.html';
});