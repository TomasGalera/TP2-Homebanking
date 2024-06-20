let resultado = []

function transferencia(senderId, reciverId, ca){
    let senderPos = searchClientById(senderId)
    let reciverPos = searchClientById(reciverId)
    if (ca == "pesos"){
        if (clients[senderPos].caPesos >= amount && amount > 0) {
            clients[senderPos].caPesos -= amount
            clients[reciverPos].caPesos += amount
            console.log(`La transferencia se ha realizado con exito, su nuevo saldo es de: ${clients[senderPos].caPesos}`)
        }
    } else if (ca == "dolares"){
        if (clients[senderPos].caDolares >= amount && amount > 0) {
            clients[senderPos].caDolares -= amount
            clients[reciverPos].caDolares += amount
            console.log(`La transferencia se ha realizado con exito, su nuevo saldo es de: ${clients[senderPos].caDolares}`)
        }
    }
}

function searchClientById(id){
    let i = 0
    while (i < clients.length - 1 && id != clients[i].id){
        i++
    }
    if (creditCards[i].id === id){
        return i
    } else {
        return -1
    }
}

function searchCreditCard(id){
    let i = 0
    while (i < creditCards.length - 1 && id != creditCards[i].id){
        i++
    }
    if (creditCards[i].id === id){
        return i
    } else {
        return -1
    }
}

function searchCreditCardByClientId(clientId){
    let clientCards = []
    for (let i in creditCards){
        if (creditCards[i].clientId === clientId){
            clientCards.push(creditCards[i])
        }
    }
    return clientCards
}

function searchConsumption(id){
    let i = 0
    while (i < consumptions.length - 1 && consumptions[i].id != id){
        i++
    }
    if (consumptions[i].id === id){
        return i
    } else {
        return -1
    }
}

function searchConsumptionByCardId(id){
    let consumptionsByCardId = []
    for (let i in consumptions){
        if (consumptions[i].cardId === id){
            consumptionsByCardId.push(consumptions[i])
        }
    }
    return consumptionsByCardId
}

function addConsumption(cardId, local, amount, date){
    let pos = searchCreditCard(cardId);
    if (creditCards[pos].expiration < new Date()){
        let consumo = new Consumption(cardId, date, local, amount)
        consumptions.push(consumo)
        creditCards[pos].saldo += amount
        return true
    } else {
        return false
    }
}

function login(){
    let dni = document.getElementById("dni").value
    let password = document.getElementById("password").value
    let i = 0
    while (i < clients.length - 1 && clients[i].dni != dni){
        i++
    }
    if (clients[i].dni == dni && clients[i].password === password){
        resultado.push(Number(dni))
        alert("Se a logeado correctamente")
        changeScreen()
        return resultado
    } else {
        alert("El dni o la contraseña es incorrecta")
    }
}

function register(){
    let dni = document.getElementById("dnir").value
    let password = document.getElementById("passwordr").value
    let clientName = document.getElementById("username").value
    let clientSurname = document.getElementById("apellido").value
    let limite = document.getElementById("limite").value
    let habilitacion = document.getElementById("habilitacion").checked
    let i = 0
    while (i < clients.length - 1 && clients[i].dni != dni){
        i++
    }
    if (clients[i].dni != dni && dni != "" && password != "" && clientName != "" && clientSurname != "" && limite != ""){
        let newClient = new Client(dni, password, clientName, clientSurname, limite, habilitacion)
        clients.push(newClient)
        resultado.push(Number(dni))
        alert("Cliente registrado correctamente")
        changeScreen()
        return resultado
    } else {
        alert("No se a podido registrar correctamente")
    }
}

function logout(){
    changeScreen()
    const register = document.getElementById("register");
    if(register.style.display!== "none"){
        changeLogin()
    }
    resultado = []
}

function deposit() {
    let amount = Number(document.getElementById("dinero").value);
    let ca = document.getElementById("rpeso").checked;
    let i = 0;
    while (i < clients.length - 1 && clients[i].dni != resultado[0]){
        i++
    }
    if (ca === true && amount > 0 && clients[i].dni === resultado[0]){
        clients[i].deposit(amount, "pesos")
    } else if (ca === false && amount > 0 && clients[i].dni === resultado[0]) {
        clients[i].deposit(amount, "dolares")
    } else {
        alert("Se ha producido un error")
    }
}

function extraction() {
    let amount = Number(document.getElementById("dinero").value);
    let ca = document.getElementById("rpeso").checked;
    let i = 0;
    while (i < clients.length - 1 && clients[i].dni != resultado[0]){
        i++
    }
    if (ca === true && amount > 0 && clients[i].dni === resultado[0]){
        clients[i].extraction(amount, "pesos")
    } else if (ca === false && amount > 0 && clients[i].dni === resultado[0]) {
        clients[i].extraction(amount, "dolares")
    } else {
        alert("Se ha producido un error")
    }
}

function higherBalance(){
    let higherClient = [0,0]
    for (let i in clients){
        if ((clients[i].caDolares * 1210 + clients[i].caPesos) > higherClient[0]) {
            higherClient[0] = clients[i].caDolares * 1210 + clients[i].caPesos
            higherClient[1] = i
        }
    }
    let creditCardsById = searchCreditCardByClientId(clients[higherClient[1]].id)
    let saldoRestanteTotal = 0
    for (let i in creditCardsById){
        saldoRestanteTotal += creditCardsById[i].saldo
    }
    higherClient.push(saldoRestanteTotal)
    printHigher(higherClient)
}

function printHigher(higherClient){
    document.getElementById("bdni").innerHTML = clients[higherClient[1]].dni
    document.getElementById("bapellido").innerHTML = clients[higherClient[1]].surname
    document.getElementById("bnombre").innerHTML = clients[higherClient[1]].name
    document.getElementById("bcp").innerHTML = `$ ${clients[higherClient[1]].caPesos}`
    document.getElementById("bcd").innerHTML = `U$S ${clients[higherClient[1]].caDolares}`
    document.getElementById("bpt").innerHTML = `$ ${higherClient[2]}`
    // document.getElementById("buc").innerHTML = clients[higherClient[1]].dni
}