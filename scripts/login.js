const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

let Usuario="Admin@gmail.com";
let Contra="coderhouse"

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    username === Usuario && password === Contra ? location.href = '../pages/registro.html' : Swal.fire({
        title: 'Usuario o contraseña incorrectos',
        text: 'Introducir parametros correctos',
        icon: 'error',
        confirmButtonText: 'Continuar'
    });
})