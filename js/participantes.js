
const contenedor = document.getElementById('contenedor-participantes');
const btnAgregar = document.getElementById('btn-agregar');

btnAgregar.addEventListener('click', () => {
    // Creamos un nuevo div para el input
    const nuevoDiv = document.createElement('div');
    nuevoDiv.className = 'input-group animate-in';
    
    // Creamos el input
    const nuevoInput = document.createElement('input');
    nuevoInput.type = 'text';
    nuevoInput.placeholder = 'Nombre del participante';
    nuevoInput.className = 'input-nombre';

    // Lo metemos al contenedor
    nuevoDiv.appendChild(nuevoInput);
    contenedor.appendChild(nuevoDiv);
    
    // Ponemos el foco automáticamente en el nuevo campo
    nuevoInput.focus();
});
