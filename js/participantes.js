const contenedor = document.getElementById('contenedor-participantes');
const btnAgregar = document.getElementById('btn-agregar');
const btnSortear = document.getElementById('btn-sortear');
const trashCan = document.getElementById('trash-can');

//habilitar Drag and Drop en un elemento
function configurarDragAndDrop(elemento) {
    elemento.setAttribute('draggable', true);

    elemento.addEventListener('dragstart', (e) => {
        elemento.classList.add('dragging');
        e.dataTransfer.setData('text/plain', ''); 
    });

    elemento.addEventListener('dragend', () => {
        elemento.classList.remove('dragging');
        trashCan.classList.remove('drag-over');
    });
}

// 3. Configuración del área de soltado (Bote de basura)
if (trashCan) {
    trashCan.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permite que se pueda soltar el elemento
        trashCan.classList.add('drag-over');
    });

    trashCan.addEventListener('dragleave', () => {
        trashCan.classList.remove('drag-over');
    });

    trashCan.addEventListener('drop', (e) => {
        e.preventDefault();
        const itemAEliminar = document.querySelector('.dragging');
        if (itemAEliminar) {
            itemAEliminar.classList.add('animate-out');
            setTimeout(() => itemAEliminar.remove(), 300);

        }
        trashCan.classList.remove('drag-over');
    });
}

//crear y agregar un nuevo input
function agregarNuevoInput() {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.className = 'input-group animate-in';
    
    const nuevoInput = document.createElement('input');
    nuevoInput.type = 'text';
    nuevoInput.placeholder = 'Nombre del participante';
    nuevoInput.className = 'input-nombre';

    nuevoDiv.appendChild(nuevoInput);
    
    //habilitamos el arrastre para nuevo elemento
    configurarDragAndDrop(nuevoDiv);
    
    contenedor.appendChild(nuevoDiv);
    nuevoInput.focus();
}

btnAgregar.addEventListener('click', agregarNuevoInput);

btnSortear.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.input-nombre');
    const nombres = [];

    inputs.forEach(input => {
        const valor = input.value.trim();
        if (valor !== "") {
            nombres.push(valor);
        }
    });

    if (nombres.length < 2) {
        alert("tiene que haber al menos dos participantes para que jale");
        return;
    }

    //LocalStorage!!!!!!!!!!!!!!!!!!!!!!
    localStorage.setItem('listaParticipantes', JSON.stringify(nombres));
    
    window.location.href = 'exclusiones.html';
});


// Inicializar con un campo vacío al cargar
if (contenedor.children.length === 0) {
    agregarNuevoInput();
}