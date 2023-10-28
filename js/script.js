import { PersonajesData } from "./datos.js";
import Persona from "./persona.js";
import Heroe from "./heroe.js";
import Villano from "./villano.js";

const tablaDatos = document.getElementById('tabla-datos');
const datoFiltrado = document.getElementById('filtro');
const btnCalcularPromedioVEdad = document.getElementById('btn-calcular-promedio-edad');
const textBoxPromedioEdad = document.getElementById('promedio-edad-input');


//formularios
const formDatos = document.getElementById('form-datos');
const formAbm = document.getElementById('form-abm');


//text box del form abm
const txtId = document.getElementById('id');
const txtNombre = document.getElementById('nombre');
const txtApellido = document.getElementById('apellido');
const txtEdad = document.getElementById('edad');
const txtAlterEgo = document.getElementById('alterEgo');
const txtCiudad = document.getElementById('ciudad');
const txtPublicado = document.getElementById('publicado');
const txtEnemigo = document.getElementById('enemigo');
const txtRobos = document.getElementById('robos');
const txtAsesinos = document.getElementById('asesinos');

///botones abm 

const btnAceptar = document.getElementById('aceptar');
const btnCancelar = document.getElementById('cancelar');
const btnEliminar = document.getElementById('eliminar');
const btnAgregar = document.getElementById('boton-agregar');
const btnInsertar = document.getElementById('insertar');


//check

const chkId = document.getElementById('col-id');
const chkNombre = document.getElementById('col-nombre');
const chkApellido = document.getElementById('col-apellido');
const chkEdad = document.getElementById('col-edad');
const chkAlterEgo = document.getElementById('col-AlterEgo');
const chkCiudad = document.getElementById('col-ciudad');
const chkPublicado = document.getElementById('col-publicado');
const chkEnemigo = document.getElementById('col-enemigo');
const chkRobos = document.getElementById('col-robos');
const chkAsesinos = document.getElementById('col-asesinos');



//cabeceras

const cabeceraId = document.getElementById('id-header');
const cabeceraNombre = document.getElementById('nombre-header');
const cabeceraApellido = document.getElementById('apellido-header');
const cabeceraEdad = document.getElementById('edad-header');
const cabeceraAlterEgo = document.getElementById('alterEgo-header');
const cabeceraCiudad = document.getElementById('ciudad-header');
const cabeceraPublicado = document.getElementById('publicado-header');
const cabeceraEnemigo = document.getElementById('enemigo-header');
const cabeceraRobos = document.getElementById('robos-header');
const cabeceraAsesinos = document.getElementById('asesinos-header');


//llenar tabla y mostrar los datos punto a)
document.addEventListener("DOMContentLoaded", () => {
    llenarTabla(PersonajesData);
});

function llenarTabla(data) {
    limpiarTabla();
    data.forEach((dato) => {
        crearFila(dato);
    });
}

function crearFila(dato) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${dato.id || '-'}</td> 
        <td>${dato.nombre || '-'}</td>
        <td>${dato.apellido || '-'}</td>
        <td>${dato.edad || '-'}</td>
        <td>${dato.alterEgo || '-'}</td>
        <td>${dato.ciudad || '-'}</td>
        <td>${dato.publicado || '-'}</td>
        <td>${dato.enemigo || '-'}</td>
        <td>${dato.robos || '-'}</td>
        <td>${dato.asesinos || '-'}</td>
    `;
    tablaDatos.querySelector('tbody').appendChild(fila);
}


function limpiarTabla() {
    const tbody = tablaDatos.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}


datoFiltrado.addEventListener("change", () => {
    const valorSeleccionado = datoFiltrado.value;
    switch (valorSeleccionado) {
        case "Persona":
            limpiarTabla();
            llenarTabla(PersonajesData);
            break;
        case "Heroe":
            limpiarTabla();
            llenarTabla(PersonajesData.filter(tieneAltEgoCiudad));
            break;
        case "Villano":
            limpiarTabla();
            llenarTabla(PersonajesData.filter(tieneEnemigoRobos));
            break;
    }
});


function tieneAltEgoCiudad(obj) {
    return obj.hasOwnProperty("alterego") || obj.hasOwnProperty("ciudad");
}

function tieneEnemigoRobos(obj) {
    return obj.hasOwnProperty("enemigo") || obj.hasOwnProperty("robos");
}

btnCalcularPromedioVEdad.addEventListener("click", () => {
    const valorSeleccionado = datoFiltrado.value;
    let acumuladorEDAD = 0;
    let promedioVelEDAD = 0;
    switch (valorSeleccionado) {
        case "Persona":
            let listaPersonajes = PersonajesData;
            listaPersonajes.map((Persona) => {
                acumuladorEDAD += Persona.edad;
            });
            promedioVelEDAD = acumuladorEDAD / listaPersonajes.length;
            break;
        case "Heroe":
            let listaAereos = PersonajesData.filter(tieneAltEgoCiudad);
            listaAereos.map((Heroe) => {
                acumuladorEDAD += Heroe.edad;
            });
            promedioVelEDAD = acumuladorEDAD / listaAereos.length;
            break;
        case "Villano":
            let listaVillano = PersonajesData.filter(tieneEnemigoRobos);
            listaVillano.map((Villano) => {
                acumuladorEDAD += Villano.edad;
            });
            promedioVelEDAD = acumuladorEDAD / listaVillano.length;
            break;
    }
    textBoxPromedioEdad.value = promedioVelEDAD.toFixed(3);
});


function switchForms() {
    if (formDatos.style.display === "none") {
        formDatos.style.display = "block";
        formAbm.style.display = "none";
    } else {
        formDatos.style.display = "none";
        formAbm.style.display = "block";
    }
}

tablaDatos.addEventListener("dblclick", function (event) {
    limpiarTxt();
    const targetRow = event.target.closest("tr");

    if (targetRow) {
     
        const cells = targetRow.getElementsByTagName("td");
        const rowData = [];

        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].textContent);
        }

        
        switchForms();
        let jsonData = convertToJSON(rowData);
        console.log(jsonData);
        cargarTextBox(jsonData);
        
    }
});

/*
function cargarTextBox(data) {

    if (tieneAltEgoCiudad(data) === true) {
        txtId.value = data["id"];
        txtNombre.value = data["nombre"];
        txtApellido.value = data["apellido"];
        txtEdad.value = data["edad"];
        txtAlterEgo.value = data["alterego"];
        txtCiudad.value = data["ciudad"];
        txtPublicado.value = "publicado";
        dropDownTipo.value = "Heroe";
        dropDownTipo.disabled = true;
        txtRobos.disabled = true;
        txtEnemigo.disabled = true;
        txtAsesinos.disabled = true;
    }
    if (tieneEnemigoRobos(data) === true) {
        txtid.value = data["id"];
        txtModelo.value = data["nombre"];
        txtanofab.value = data["apellido"];
        txtvelmax.value = data["edad"];
        txtcantpue.value = data["enemigo"];
        txtcantrue.value = data["robos"];
        txtAsesinos.value = data["asesinatos"];
        dropDownTipo.value = "Villano";
        dropDownTipo.disabled = true;
        txtaltmax.disabled = true;
        txtautonomia.disabled = true;
    }
}


function convertToJSON(rowData) {

    const keys = ["id", "nombre", "apellido", "edad", "alterego",
     "ciudad", "publicado", "enemigo","robos","asesinatos"];
    const json = {};

    for (let i = 0; i < keys.length; i++) {
        // Check if the value is not "-"
        if (rowData[i] !== "-") {
            json[keys[i]] = rowData[i];
        }
    }

    return json;
}
*/
function cargarTextBox(data) {
    // Asegúrate de definir y seleccionar los elementos en tu HTML
    const txtId = document.getElementById('id');
    const txtNombre = document.getElementById('nombre');
    const txtApellido = document.getElementById('apellido');
    const txtEdad = document.getElementById('edad');
    const txtAlterEgo = document.getElementById('alterEgo');
    const txtCiudad = document.getElementById('ciudad');
    const txtPublicado = document.getElementById('publicado');
    const txtEnemigo = document.getElementById('enemigo');
    const txtRobos = document.getElementById('robos');
    const txtAsesinos = document.getElementById('asesinos');
    const dropDownTipo = document.getElementById('tipo');

    if (tieneAltEgoCiudad(data) === true) {
        txtId.value = data["id"];
        txtNombre.value = data["nombre"];
        txtApellido.value = data["apellido"];
        txtEdad.value = data["edad"];
        txtAlterEgo.value = data["alterego"];
        txtCiudad.value = data["ciudad"];
        txtPublicado.value = "publicado";
        dropDownTipo.value = "Heroe";
        dropDownTipo.disabled = true;
        txtRobos.disabled = true;
        txtEnemigo.disabled = true;
        txtAsesinos.disabled = true;
    }
    if (tieneEnemigoRobos(data) === true) {
        txtId.value = data["id"];
        txtNombre.value = data["nombre"];
        txtApellido.value = data["apellido"];
        txtEdad.value = data["edad"];
        txtEnemigo.value = data["enemigo"];
        txtRobos.value = data["robos"];
        txtAsesinos.value = data["asesinatos"];
        dropDownTipo.value = "Villano";
        dropDownTipo.disabled = true;
        txtCiudad.disabled = true;
        txtPublicado.disabled = true;
    }
}

function convertToJSON(rowData) {
    const keys = ["id", "nombre", "apellido", "edad",
     "alterego", "ciudad", "publicado", "enemigo", "robos", "asesinatos"];
    const json = {};

    for (let i = 0; i < keys.length; i++) {
        // Check if the value is not "-"
        if (rowData[i] !== "-") {
            json[keys[i]] = rowData[i];
        }
    }

    return json;
}


btnCancelar.addEventListener("click", () => {
    switchForms();
});

btnAceptar.addEventListener("click", () => {
    modificar();
    limpiarTabla();
    llenarTabla(PersonajesData);
});

btnEliminar.addEventListener("click",() => {
    eliminar();
    limpiarTabla();
    llenarTabla(PersonajesData);
});


function modificar(){
    let id = txtId.value;
    let nombre = txtNombre.value;
    let apellido = txtApellido.value;
    let edad = txtEdad.value;
    let alterego = txtAlterEgo.value;
    let ciudad = txtCiudad.value;
    let Publicado = txtPublicado.value;
    let enemigo = txtEnemigo.value;
    let robos= txtRobos.value;
    let  asesinos= txtAsesinos.value;


    let objeto = buscarIdLista(id);
    if (objeto != null) {
        for (let i = 0; i < PersonajesData.length; i++) {
            if (PersonajesData[i].id == id) {
                // Modify the object's properties with new data
                if (tieneAltEgoCiudad(PersonajesData[i]) == true) {
                    const miHeroe = new Heroe(id, nombre, apellido, edad, alterego, ciudad, Publicado);
                    PersonajesData.splice(i,1,miHeroe);
                }

                if (tieneEnemigoRobos(PersonajesData[i]) == true) {
                    const miVillano = new Villano(id, nombre, apellido, edad, enemigo, robos, asesinos);
                    PersonajesData.splice(i,1,miVillano);
                }
                break;
            }
        }
    }
}
function buscarIdLista(id){
    for (let i = 0; i < PersonajesData.length; i++) {
        if (PersonajesData[i].id == id) {
            return PersonajesData[i]; // Return the object if found
        }
    }
    return null; // Return null if not found
}

function eliminar(){
    let id = txtId.value;
    for (let i = 0; i < PersonajesData.length; i++) {
        if (PersonajesData[i].id == id) {
            PersonajesData.splice(i,1);
        } 
    }
}



chkId.addEventListener("change", () => {
    const ocultar = !chkId.checked; 
    cabeceraId.hidden = ocultar;
    ocultarMostrarColumna("Id", ocultar);
});

chkNombre.addEventListener("change", () => {
    const ocultar = !chkNombre.checked; 
    cabeceraNombre.hidden = ocultar;
    ocultarMostrarColumna("Nombre", ocultar);
});

chkApellido.addEventListener("change", () => {
    const ocultar = !chkApellido.checked; 
    cabeceraApellido.hidden = ocultar;
    ocultarMostrarColumna("Apellido", ocultar);
});

chkEdad.addEventListener("change", () => {
    const ocultar = !chkEdad.checked; 
    cabeceraEdad.hidden = ocultar;
    ocultarMostrarColumna("Edad", ocultar);
});

chkAlterEgo.addEventListener("change", () => {
    const ocultar = !chkAlterEgo.checked; 
    cabeceraAlterEgo.hidden = ocultar;
    ocultarMostrarColumna("AlterEgo", ocultar);
});


chkCiudad.addEventListener("change", () => {
    const ocultar = !chkCiudad.checked; 
    cabeceraCiudad.hidden = ocultar;
    ocultarMostrarColumna("Ciudad", ocultar);
});

chkPublicado.addEventListener("change", () => {
    const ocultar = !chkPublicado.checked; 
    cabeceraPublicado.hidden = ocultar;
    ocultarMostrarColumna("Publicado", ocultar);
});

chkEnemigo.addEventListener("change", () => {
    const ocultar = !chkEnemigo.checked; 
    cabeceraEnemigo.hidden = ocultar;
    ocultarMostrarColumna("Enemigo", ocultar);
});
chkRobos.addEventListener("change", () => {
    const ocultar = !chkRobos.checked; 
    cabeceraAsesinos.hidden = ocultar;
    ocultarMostrarColumna("Asesinos", ocultar);
});

chkAsesinos.addEventListener("change", () => {
    const ocultar = !chkRobos.checked; 
    cabeceraRobos.hidden = ocultar;
    ocultarMostrarColumna("Robos", ocultar);
});

function ocultarMostrarColumna(nombreColumna, ocultar) {
    const filas = tablaDatos.querySelectorAll('tbody tr');
    filas.forEach((fila) => {
      const celda = fila.querySelector(`td:nth-child(${getColumnIndex(nombreColumna)})`);
      if (celda) {
        celda.style.display = ocultar ? 'none' : '';
      }
    });
  }


  function getColumnIndex(nombreColumna) {
    const thList = document.querySelectorAll('th');
    for (let i = 0; i < thList.length; i++) {
      if (thList[i].textContent === nombreColumna) {
        return i + 1;
      }
    }
    return -1;
  }


btnAgregar.addEventListener("click",() => {
    switchForms();
    limpiarTxt();
    agregar();
});



function agregar() {
    txtId.value = devolverIdMaximo();
    let id = txtId.value;
    let nombre = txtNombre.value;
    let apellido = txtApellido.value;
    let edad = txtEdad.value;
    let alterEgo = txtAlterEgo.value;
    let ciudad = txtCiudad.value;
    let publicado = txtPublicado.value;
    let enemigo = txtEnemigo.value;
    let robos = txtRobos.value;
    let asesinos = txtAsesinos.value;

    let tipo = dropDownTipo.value;

    if (tipo === "Heroe") {
        let nuevoHeroe = new Heroe(id, nombre, apellido, edad, alterEgo, ciudad, publicado);
        PersonajesData.push(nuevoHeroe);
    }

    if (tipo === "Villano") {
        let nuevoVillano = new Villano(id, nombre, apellido, edad, enemigo, robos, asesinos);
        PersonajesData.push(nuevoVillano);
    }
}


btnInsertar.addEventListener("click", () => {
    agregar();
});


function devolverIdMaximo() {

    let flag = true;
    let idMaximo;
    let idMinimo;

    PersonajesData.forEach(element => {
        if (flag == true) {
            idMaximo = element.id;
            idMinimo = element.id;
            flag = false
        } else {

            if (element.id > idMaximo) {
                idMaximo = element.id;
            }

            if (element.id < idMinimo) {
                idMinimo = element.id;
            }
        }
    });

    return idMaximo;
}

function limpiarTxt() {
    txtId.value = "";
    txtNombre.value = "";
    txtApellido.value = "";
    txtEdad.value = "";
    txtAlterEgo.value = "";
    txtCiudad.value = "";
    txtPublicado.value = "";
    txtEnemigo.value = "";
    txtRobos.value = "";
    txtAsesinos.value = "";
}
