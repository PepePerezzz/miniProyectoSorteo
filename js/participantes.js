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

    // GUARDAR DATOS DEL EVENTO AUTOMATICAMENTE
    localStorage.setItem('fechaEvento', fecha.value);
    localStorage.setItem('rangoGasto', gasto.value);
    localStorage.setItem('nombreCelebracion', nombreCelebracion.value);

    // PARTICIPANTES
    const organizador = localStorage.getItem('organizador');
    const participa = localStorage.getItem('participa') === "true";

    if (participa && organizador) {
        nombres.push(organizador);
    }

    localStorage.setItem('listaParticipantes', JSON.stringify(nombres));

    window.location.href = 'exclusiones.html';
});


// Inicializar con un campo vacío al cargar
if (contenedor.children.length === 0) {
    agregarNuevoInput();
}

// Mostrar/ocultar contenedor de opciones
  const mostrarMasBtn = document.getElementById('btn-mas');
  const masOpciones = document.getElementById('masOpciones');
  mostrarMasBtn.addEventListener('click', () => {
    masOpciones.style.display = masOpciones.style.display === 'none' ? 'block' : 'none';
  });

  // Seleccionar todos los botones de opción
  const opcionBtns = document.querySelectorAll('.btn-opcion');
  opcionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling; 
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
  });

  // Botones OK para capturar valores
  const okBtns = document.querySelectorAll('.ok-btn');
  okBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const input = parent.querySelector('input');
      alert(`Valor ingresado: ${input.value}`);
      input.value = ''; // limpiar input si quieres
      parent.style.display = 'none'; // opcional: cerrar la sección
    });
  });

  const fecha= document.getElementById('fechaEvento');
  const gasto = document.getElementById('rangoGasto');
  const nombreCelebracion = document.getElementById('nombreCelebracion');
  function guardarFecha() {
    localStorage.setItem('fechaEvento', fecha.value);
    alert(`Fecha guardada: ${fecha.value}`);
  }

  function guardarGasto() {
    localStorage.setItem('rangoGasto', gasto.value);
    alert(`Rango de gasto guardado: ${gasto.value}`);
  }
if(localStorage.getItem('participa'))
  function guardarCelebracion() {
    localStorage.setItem('nombreCelebracion', nombreCelebracion.value);
    alert(`Nombre de celebración guardado: ${nombreCelebracion.value}`);
  }

  document.getElementById('guardarFecha').addEventListener('click', guardarFecha);
  document.getElementById('guardarGasto').addEventListener('click', guardarGasto);
  document.getElementById('guardarCelebracion').addEventListener('click', guardarCelebracion);