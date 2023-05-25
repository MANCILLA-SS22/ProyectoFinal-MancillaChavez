let listaAnios = document.getElementById("disabledSelect0");
let listaPrecios = document.getElementById("disabledSelect1");
let listaMotores = document.getElementById("disabledSelect2");
let listaTransmision = document.getElementById("disabledSelect3");
let bodyTable = document.getElementById("autosTableBody");
let limpieza = document.getElementById("limpieza");
const formulario = document.getElementById("formulario");

pedirAnios();
pedirPrecio();
pedirMotor();
pedirTransmision();

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

let array_carros = [];

if (localStorage.getItem("array_carros")) {
    let carrosJSON = [];
    carrosJSON = JSON.parse(localStorage.getItem("array_carros"));
    array_carros = carrosJSON.map((element) => new Carro(element.marca, element.modelo, element.anio, element.precio, element.motor, element.transmision));
    imprimirTabla(array_carros);
}

limpieza.addEventListener("click", limpiarTodo);

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.setAttribute("class", "needs-validation"); 
    let resultado = crearAuto();
    return resultado;
});

function crearAuto() {
    const nombreVehiculo = document.getElementById("disabledTextInput0").value;
    const modeloVehiculo = document.getElementById("disabledTextInput1").value;
    const anoVehiculo = document.getElementById("disabledSelect0").value;
    const precioVehiculo = document.getElementById("disabledSelect1").value;
    const motorVehiculo = document.getElementById("disabledSelect2").value;
    const transmisionVehiculo = document.getElementById("disabledSelect3").value;

    // Buscamos o creamos a una Carrera
    let unVehiculo = new Carro(nombreVehiculo, modeloVehiculo, anoVehiculo, precioVehiculo, motorVehiculo, transmisionVehiculo);
    array_carros.push(unVehiculo);
    localStorage.setItem("array_carros", JSON.stringify(array_carros));// Almacewnar en el local storage todas las carreras
    imprimirTabla(array_carros);

    limpiar();
    return true;
} 

function imprimirTabla(array_carros = []){
    bodyTable.innerHTML = "";
    array_carros.forEach((evento) => {
    let tabla = document.createElement("tr");
    tabla.innerHTML = `
        <th scope="row">
            <td class="text-light">${evento.marca}</td>
            <td class="text-light">${evento.modelo}</td>
            <td class="text-light">${evento.anio}</td>
            <td class="text-light">${evento.precio}</td>
            <td class="text-light">${evento.motor}</td>
            <td class="text-light">${evento.transmision}</td>
        </th>`;

        const botonBorrar = document.createElement("button");
        botonBorrar.innerText = "Borrar";
        botonBorrar.addEventListener("click", () => {eliminarAuto(evento)})
        tabla.appendChild(botonBorrar);
        bodyTable.appendChild(tabla);
    });
}

function eliminarAuto(auto) {
    let arregloAutosJSON = JSON.parse(localStorage.getItem("array_carros")); //console.log(arregloAutosJSON);
    let nuevoArray = arregloAutosJSON.filter(item => item.marca != auto.marca); console.log(nuevoArray);
    localStorage.setItem("array_carros", JSON.stringify(nuevoArray));
    imprimirTabla(nuevoArray);
}

function limpiar(){
    document.getElementById("disabledTextInput0").value = "";
    document.getElementById("disabledTextInput1").value = "";
    document.getElementById("disabledSelect0").value = "";
    document.getElementById("disabledSelect1").value = "";
    document.getElementById("disabledSelect2").value = "";
    document.getElementById("disabledSelect3").value = "";
}

function limpiarTodo(){
    array_carros = []
    imprimirTabla();
}

async function pedirAnios(){
    const respuesta = await fetch("../data/year.json"); //console.log(respuesta);
    const data = await respuesta.json();  //console.log(data);

    //Creacion de listas para el tag select, dirigido al anio del vehiculo
    data.forEach((e) => {
    let item = document.createElement("option");
    item.innerText = e.year;
    listaAnios.append(item);
    });
};

async function pedirPrecio(){
    const respuesta = await fetch("../data/price.json"); //console.log(respuesta);
    const data = await respuesta.json();  //console.log(data);

    //Creacion de listas para el tag select, dirigido al anio del vehiculo
    data.forEach((e) => {
    let item = document.createElement("option");
    item.innerText = e.prices;
    listaPrecios.append(item);
    });
};

async function pedirMotor(){
    const respuesta = await fetch("../data/motor.json"); //console.log(respuesta);
    const data = await respuesta.json();  //console.log(data);

    //Creacion de listas para el tag select, dirigido al tipo de motor del vehiculo
    data.forEach((e) => {
    let item = document.createElement("option");
    item.innerText = e.motor;
    listaMotores.append(item);
    });
};

async function pedirTransmision(){
    const respuesta = await fetch("../data/transmision.json"); //console.log(respuesta);
    const data = await respuesta.json();  //console.log(data);

    //Creacion de listas para el tag select, dirigido al tipo de transmision del vehiculo
    data.forEach((e) => {
    let item = document.createElement("option");
    item.innerText = e.transmision;
    listaTransmision.append(item);
    });
};