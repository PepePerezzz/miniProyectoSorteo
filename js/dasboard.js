const nombreOrganizador = document.getElementById('organizador');



function guardarDatos() {

    const organizador = nombreOrganizador.value.trim();
    const participa = document.getElementById('participa').checked;

    localStorage.setItem('organizador', organizador);
    localStorage.setItem('participa', participa);

}