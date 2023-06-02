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

function imprimirTabla(array_carros = []){
    let bodyTable = document.getElementById("autosTableBody");
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

function limpiar(){
    document.getElementById("disabledTextInput0").value = "";
    document.getElementById("disabledTextInput1").value = "";
    document.getElementById("disabledSelect0").value = "";
    document.getElementById("disabledSelect1").value = "";
    document.getElementById("disabledSelect2").value = "";
    document.getElementById("disabledSelect3").value = "";
}

function eliminarAuto(auto) {
    Swal.fire({
        title: 'Desea eliminar este vehiculo?',
        text: "Una vez eliminado, no podra volver a registrarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Verificacion borrada exitosamente',
            'Muchas gracias!!',
            'success'
            )

            let arregloAutosJSON = JSON.parse(localStorage.getItem("array_carros")); //console.log(arregloAutosJSON);
            let nuevoArray = arregloAutosJSON.filter(item => item.marca != auto.marca);
            if (nuevoArray){
                localStorage.setItem("array_carros", JSON.stringify(nuevoArray));
                imprimirTabla(nuevoArray);
            }else{
                limpiarTodo()
                imprimirTabla();
            }
            
        }
    })
}

function showMessage(){
    Toastify({
        text: "Producto agregado correctamente!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

function limpiarTodo(){
    Swal.fire({
        title: 'Esta seguro de limpiar la lista?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Deleted!','Your file has been deleted.','success')
            array_carros = [];
            localStorage.clear();
            imprimirTabla();
        }
    })
}


/* function crearAuto() {

    // Buscamos el tipo de documento seleccionado y evaluamos si existe o no
    let unVehiculo = buscarVerificacion(nombreVehiculo.value, modeloVehiculo.value, anoVehiculo.value, precioVehiculo.value, motorVehiculo.value, transmisionVehiculo.value)
    if(!unVehiculo){
        let modeloRepetigo = existeModelo(modeloVehiculo.value)
        if (modeloRepetigo) {
            Swal.fire({
                icon: 'error',
                title: 'Modelo ya registrado',
                text: 'Por favor pruebe con otro modelo',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }
        unVehiculo = new Carro(nombreVehiculo.value, modeloVehiculo.value, anoVehiculo.value, precioVehiculo.value, motorVehiculo.value, transmisionVehiculo.value);
        array_carros.push(unVehiculo);

        localStorage.setItem("array_carros", JSON.stringify(array_carros));// Almacenar en el local storage todas las carreras
        imprimirTabla(array_carros);
        limpiar();
        //return true;
    
    /* else{
        Swal.fire({
            title: 'Error al registrar',
            text: 'Favor de escribir los datos faltantes',
            icon: 'error',
            confirmButtonText: 'Continuar'
        });
        return false;
    } 


    imprimirTabla(array_carros);
    return true;
}*/

/* function crearAuto() {

    const nombreVehiculo = document.getElementById("disabledTextInput0").value;
    const modeloVehiculo = document.getElementById("disabledTextInput1").value;
    const anoVehiculo = document.getElementById("disabledSelect0").value;
    const precioVehiculo = document.getElementById("disabledSelect1").value;
    const motorVehiculo = document.getElementById("disabledSelect2").value;
    const transmisionVehiculo = document.getElementById("disabledSelect3").value;    
    
    // Buscamos el tipo de documento seleccionado y evaluamos si existe o no
    let unVehiculo = buscarVerificacion(nombreVehiculo, modeloVehiculo, anoVehiculo, precioVehiculo, motorVehiculo, transmisionVehiculo)
    if (!unVehiculo) {
        unVehiculo = new Carro(nombreVehiculo, modeloVehiculo, anoVehiculo, precioVehiculo, motorVehiculo, transmisionVehiculo);
        array_carros.push(unVehiculo);

        localStorage.setItem("array_carros", JSON.stringify(array_carros));// Almacenar en el local storage todas las carreras
        imprimirTabla(array_carros);
        limpiar();
    } else{
        Swal.fire({title: 'Error al registrar',text: 'Favor de escribir los datos faltantes',icon: 'error',confirmButtonText: 'Continuar'});
        return false;
    }

    
    let modeloRepetigo = existeModelo(modeloVehiculo.value)
    if (!modeloRepetigo) {
        Swal.fire({icon: 'error',title: 'Modelo ya registrado',text: 'Por favor pruebe con otro modelo',footer: '<a href="">Why do I have this issue?</a>'})
        return false;
    }

    imprimirTabla(array_carros);
    return true;
} */

/* function crearAuto() {

    const nombreVehiculo = document.getElementById("disabledTextInput0");
    const modeloVehiculo = document.getElementById("disabledTextInput1");
    const anoVehiculo = document.getElementById("disabledSelect0");
    const precioVehiculo = document.getElementById("disabledSelect1");
    const motorVehiculo = document.getElementById("disabledSelect2");
    const transmisionVehiculo = document.getElementById("disabledSelect3");    
    
    // Buscamos el tipo de documento seleccionado y evaluamos si existe o no
    
    // let unVehiculo = buscarVerificacion(modeloVehiculo.value)
    // if (!unVehiculo) {
    //     Swal.fire({title: 'Error al registrar',text: 'Favor de escribir los datos faltantes',icon: 'error',confirmButtonText: 'Continuar'});
    //     return false;
    // }

    let modeloRepetigo = existeModelo(unVehiculo)
    if (!modeloRepetigo){
        unVehiculo = new Carro(nombreVehiculo.value, modeloVehiculo.value, anoVehiculo.value, precioVehiculo.value, motorVehiculo.value, transmisionVehiculo.value);
        array_carros.push(unVehiculo);
        localStorage.setItem("array_carros", JSON.stringify(array_carros));// Almacenar en el local storage todas las carreras
        imprimirTabla(array_carros);
        limpiar();
        //return true;
    }else{
        Swal.fire({icon: 'error',title: 'Modelo ya registrado',text: 'Por favor pruebe con otro modelo',footer: '<a href="">Why do I have this issue?</a>'})
        return false;
    }

    imprimirTabla(array_carros);
    return true;
} */

function buscarVerificacion(b){
    let res = array_carros.find((unCarro) => unCarro.modelo === b);
    return res;
}

function existeModelo(dato) {
    let res = array_carros.some((evento) => evento.modelo === dato);
    return res;
}




let listaAnios = document.getElementById("disabledSelect0");
let listaPrecios = document.getElementById("disabledSelect1");
let listaMotores = document.getElementById("disabledSelect2");
let listaTransmision = document.getElementById("disabledSelect3");
let formulario = document.getElementById("formulario");
let registro = document.getElementById("registro")
let limpieza = document.getElementById("limpieza");

pedirAnios();
pedirPrecio();
pedirMotor();
pedirTransmision();


let array_carros = [];

if (localStorage.getItem("array_carros")) {
    const carrosJSON = JSON.parse(localStorage.getItem("array_carros"));
    array_carros = carrosJSON.map((element) => new Carro(element.marca, element.modelo, element.anio, element.precio, element.motor, element.transmision));
    imprimirTabla(array_carros);
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    //event.target.setAttribute("class", "needs-validation");

    let resultado = crearAuto();
    if (resultado) {
        showMessage();
    }

    return resultado;
});

limpieza.addEventListener("click", limpiarTodo);