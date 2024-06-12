function changeScreen() {
    const banco = document.getElementById("banco");
    const inicio = document.getElementById("inicio");
    if(banco.style.display !== "none") {
        banco.style.display = "none";
        inicio.style.display = "";
    }
    else {
        banco.style.display = "";
        inicio.style.display = "none";
    }
}

function changeLogin() {
    const register = document.getElementById("register");
    const login = document.getElementById("login");
    const botonIng = document.getElementById("botonIng");
    const botonReg = document.getElementById("botonReg");
    if(register.style.display !== "none") {
        register.style.display = "none";
        login.style.display = "";
        botonIng.style.display = "";
        botonReg.style.display = "";
    }
    else {
        register.style.display = "";
        login.style.display = "none";
        botonIng.style.display = "none";
        botonReg.style.display = "none";
    }
}

function getUser() {
    return document.getElementById("username").value;
}

function getPassword() {
    return document.getElementById("password").value;
}