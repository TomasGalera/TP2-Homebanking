let resultado = []

guardarLocalStorage()
clients = obtenerLocalStorageClients()
creditCards = obtenerLocalStorageCreditCards()
consumptions = obtenerLocalStorageConsumptions()
// localStorage.clear();

function transferencia(senderId, reciverId, amount, ca){
    let senderPos = searchClientById(senderId)
    let reciverPos = searchClientById(reciverId)
    if (ca == true){
        if (clients[senderPos].caPesos >= amount && amount > 0 && clients[reciverPos].habilitacion === true) {
            clients[senderPos].caPesos -= amount
            clients[reciverPos].caPesos += amount
            alert(`La transferencia se ha realizado con exito, su nuevo saldo es de: ${clients[senderPos].caPesos}`)
            guardarLocalStorage("client")
        } else {
            alert(`No tiene ese dinero en su cuenta de pesos, ingrese un monto correcto`)
        }
    } else if (ca == false){
        if (clients[senderPos].caDolares >= amount && amount > 0 && clients[reciverPos].habilitacion === true) {
            clients[senderPos].caDolares -= amount
            clients[reciverPos].caDolares += amount
            alert(`La transferencia se ha realizado con exito, su nuevo saldo es de: ${clients[senderPos].caDolares}`)
            guardarLocalStorage("client")
        } else {
            alert(`No tiene ese dinero en su cuenta de dolares, ingrese un monto correcto`)
        }
    }
}

function searchClientById(id){
    let i = 0
    while (i < clients.length && id != clients[i].id){
        i++
    }
    if (clients[i].id === id){
        return i
    } else {
        return -1
    }
}

function searchCurrentClientByDni(){
    let currentUser = resultado[0]
    let i = 0
    while (i < clients.length && clients[i].dni !== currentUser){
        i++
    }
    if (clients[i].dni === currentUser){
        return i
    } else {
        return -1
    }
}

function searchCreditCard(id){
    let i = 0
    while (i < creditCards.length && id != creditCards[i].id){
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
    while (i < consumptions.length && consumptions[i].id != id){
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
    if (creditCards[pos].expiration > new Date()){
        if (amount > 0){
            let consumo = new Consumption(cardId, date, local, amount)
            consumptions.push(consumo)
            creditCards[pos].saldo += amount
            guardarLocalStorage("consumption")
            guardarLocalStorage("creditcard")
            alert("Nuevo consumo agragado")
            return true
        } else {
            alert("Ingrese un monto valido")
            return false
        }
    } else {
        alert("Su tarjeta está vencida")
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
        llenarSelect()
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
        llenarSelect()
        guardarLocalStorage("client")
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
        document.getElementById("dnir").value = ""
        document.getElementById("passwordr").value = ""
        document.getElementById("username").value = ""
        document.getElementById("apellido").value = ""
        document.getElementById("limite").value = ""
        document.getElementById("habilitacion").checked = false
    }
    resultado = []
    document.getElementById("dni").value = ""
    document.getElementById("password").value = ""
    document.getElementById("tenvia").innerHTML = infoSelects[0]
    document.getElementById("trecibe").innerHTML = infoSelects[1]
    document.getElementById("nc").innerHTML = infoSelects[2]
    document.getElementById("pg").innerHTML = infoSelects[2]
}

function deposit() {
    let amount = Number(document.getElementById("dinero").value);
    let ca = document.getElementById("rpeso").checked;
    let i = 0;
    while (i < clients.length - 1 && clients[i].dni != resultado[0]){
        i++
    }
    if (ca === true && amount > 0 && clients[i].dni === resultado[0]){
        let result = clients[i].deposit(amount, "pesos")
        if (result === true){
            alert(`Dinero depositado en la caja de ahorro en pesos por un monto de: ${amount} \nSu nuevo saldo es de: ${clients[i].caPesos}`)
            guardarLocalStorage("client")
        } else {
            alert("La caja de ahorros no existe")
        }
    } else if (ca === false && amount > 0 && clients[i].dni === resultado[0]) {
        let result = clients[i].deposit(amount, "dolares")
        if (result === true){
            alert(`Dinero depositado en la caja de ahorro en dolares por un monto de: ${amount} \nSu nuevo saldo es de: ${clients[i].caDolares}`)
            guardarLocalStorage("client")
        }  else {
            alert("La caja de ahorros no existe")
        }
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
        let result = clients[i].extraction(amount, "pesos")
        if (result === false){
            alert("No es posible hacer la extracción");
        } else if (result === 1){
            alert(`Su saldo es de 0 y su deuda de descubierto es ${clients[i].deudaDescubierto}`)
            guardarLocalStorage("client")
        } else {
            alert(`Dinero extraido de la caja de ahorro en pesos por un monto de: ${amount} \nSu nuevo saldo es de: ${clients[i].caPesos}`)
            guardarLocalStorage("client")
        }
    } else if (ca === false && amount > 0 && clients[i].dni === resultado[0]) {
        let result = clients[i].extraction(amount, "dolares")
        if (result === true){
            alert(`Dinero extraido de la caja de ahorro en dolares por un monto de: ${amount} \nSu nuevo saldo es de: ${clients[i].caDolares}`)
            guardarLocalStorage("client")
        } else {
            alert("No es posible hacer la extracción");
        }
    } else {
        alert("Se ha producido un error")
    }
}

function higherBalance(){
    let higherClient = [0,0]
    let clientConsumptions = []
    for (let i in clients){
        if ((clients[i].caDolares * 1210 + clients[i].caPesos) > higherClient[0]) {
            higherClient[1] = i
            higherClient[0] = clients[i].caDolares * 1210 + clients[i].caPesos
        }
    }
    let creditCardsById = searchCreditCardByClientId(clients[higherClient[1]].id)
    let saldoRestanteTotal = 0
    for (let i in creditCardsById){
        saldoRestanteTotal += creditCardsById[i].saldo
    }
    higherClient.push(saldoRestanteTotal)
    for (let i in consumptions){
        for (let x in creditCardsById){
            if (creditCardsById[x].id === consumptions[i].cardId){
                clientConsumptions.push(consumptions[i])
            }
        }
    }
    let ult3 = clientConsumptions.length - 3
    let table = `<thead>
                    <tr>
                        <th scope="col">Local</th>
                        <th scope="col">Consumo</th>
                    </tr>
                </thead>`
    if (ult3 < 0) {
        ult3 -= ult3
    }
    while (ult3 <= clientConsumptions.length - 1){
        table += `<tr>
                    <td>${clientConsumptions[ult3].nombreLocal}</td>
                    <td>${clientConsumptions[ult3].monto}</td>
                    </tr>`
        ult3++
    }
    higherClient.push(table)
    printHigherLower(higherClient)
}

function printHigherLower(higherClient){
    document.getElementById("bdni").innerHTML = clients[higherClient[1]].dni
    document.getElementById("bapellido").innerHTML = clients[higherClient[1]].surname
    document.getElementById("bnombre").innerHTML = clients[higherClient[1]].name
    document.getElementById("bcp").innerHTML = `$ ${clients[higherClient[1]].caPesos}`
    document.getElementById("bcd").innerHTML = `U$S ${clients[higherClient[1]].caDolares}`
    document.getElementById("bpt").innerHTML = `$ ${higherClient[2]}`
    document.getElementById("buc").innerHTML = ""
    document.getElementById("tmm").innerHTML = higherClient[3]
}


function lowerBalance(){
    let higherClient = [clients[0].caDolares * 1210 + clients[0].caPesos, 0]
    let clientConsumptions = []
    for (let i in clients){
        if ((clients[i].caDolares * 1210 + clients[i].caPesos) < higherClient[0] && clients[i].deudaDescubierto == 0) {
            higherClient[1] = i
            higherClient[0] = clients[i].caDolares * 1210 + clients[i].caPesos
        }
    }
    let creditCardsById = searchCreditCardByClientId(clients[higherClient[1]].id)
    let saldoRestanteTotal = 0
    for (let i in creditCardsById){
        saldoRestanteTotal += creditCardsById[i].saldo
    }
    higherClient.push(saldoRestanteTotal)
    for (let i in consumptions){
        for (let x in creditCardsById){
            if (creditCardsById[x].id === consumptions[i].cardId){
                clientConsumptions.push(consumptions[i])
            }
        }
    }
    let ult3 = clientConsumptions.length - 3
    let table = `<thead>
                    <tr>
                        <th scope="col">Local</th>
                        <th scope="col">Consumo</th>
                    </tr>
                </thead>`
    if (ult3 < 0) {
        ult3 -= ult3
    }
    while (ult3 <= clientConsumptions.length - 1){
        table += `<tr>
                    <td>${clientConsumptions[ult3].nombreLocal}</td>
                    <td>${clientConsumptions[ult3].monto}</td>
                    </tr>`
        ult3++
    }
    higherClient.push(table)
    printHigherLower(higherClient)
}

function llenarSelect(){
    let currentUser = searchCurrentClientByDni()
    let infoSelects = []
    let options = ""
    let optionsText = ""
    let clientCards = searchCreditCardByClientId(clients[currentUser].id)
    let textCreditCards = ""
    if (clients[currentUser].dni === resultado[0]){
        let text = `<option value="${clients[currentUser].id}">${clients[currentUser].name} ${clients[currentUser].surname} ${clients[currentUser].dni}</option>`
        infoSelects.push(text)
    }
    for (let i in clients){
        if (clients[i].dni !== clients[currentUser].dni){
            optionsText = `${clients[i].name} ${clients[i].surname} ${clients[i].dni}`
            options += `<option value="${clients[i].id}">${optionsText}</option>`
        }
        i++
    }
    infoSelects.push(options)
    for (let i in clientCards){
        textCreditCards += `<option value="${creditCards[i].id}">${creditCards[i].numero} ${creditCards[i].proveedor}</option>`
        i++
    }
    infoSelects.push(textCreditCards)
    printSelects(infoSelects)
}

function printSelects(infoSelects){
    document.getElementById("tenvia").innerHTML = infoSelects[0]
    document.getElementById("trecibe").innerHTML = infoSelects[1]
    document.getElementById("nc").innerHTML = infoSelects[2]
    document.getElementById("pg").innerHTML = infoSelects[2]
}

function clientList(){
    let table = `<thead>
                    <tr>
                        <th scope="col">DNI</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                    </tr>
                </thead>`
    for (let i in clients){
        table += `<tr>
                    <td>${clients[i].dni}</td>
                    <td>${clients[i].name}</td>
                    <td>${clients[i].surname}</td>
                    </tr>`
        i++
    }
    const tableMorososList = document.getElementById("tlistadom")
    const tableClientList = document.getElementById("tlistadoc")
    if(tableClientList.style.display !== "none") {
        tableClientList.style.display = "none";
    }
    else {
        tableClientList.style.display = "";
        tableMorososList.style.display = "none";
    }
    document.getElementById("tlistadoc").innerHTML = table
}

function dniCsv(){
    let text = "DNI,Nombre,Apellido\n"
    for (let i in clients){
        text += `${clients[i].dni},${clients[i].name},${clients[i].surname}\n`
    }
    console.log(text)
}

function morososList(){
    let table = `<thead>
                    <tr>
                        <th scope="col">DNI</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Saldo Descubierto</th>
                    </tr>
                </thead>`
    for (let i in clients){
        if (clients[i].deudaDescubierto > 0){
            table += `<tr>
                        <td>${clients[i].dni}</td>
                        <td>${clients[i].name}</td>
                        <td>${clients[i].surname}</td>
                        <td>${clients[i].deudaDescubierto}</td>
                        </tr>`
        }
        i++
    }
    const tableMorososList = document.getElementById("tlistadom")
    const tableClientList = document.getElementById("tlistadoc")
    if(tableMorososList.style.display !== "none") {
        tableMorososList.style.display = "none";
    }
    else {
        tableMorososList.style.display = "";
        tableClientList.style.display = "none";
    }
    document.getElementById("tlistadom").innerHTML = table
}

function searchClientByDniOrSurname(){
    let dniOrSurname = document.getElementById("busqueda").value
    let table = `<thead>
                    <tr>
                        <th scope="col">DNI</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                    </tr>
                </thead>`
    for (i in clients){
        if (clients[i].dni == Number(dniOrSurname) || clients[i].surname == String(dniOrSurname)){
            table += `<tr>
                        <td>${clients[i].dni}</td>
                        <td>${clients[i].name}</td>
                        <td>${clients[i].surname}</td>
                        </tr>`
        }
        i++
    }
    document.getElementById("tbusqueda").innerHTML = table
}

function transferenciaInfo(){
    let senderId = document.getElementById("tenvia").value
    let reciverId = document.getElementById("trecibe").value
    let amount = document.getElementById("amountT").value
    let radioPesos = document.getElementById("radioPesos").checked
    if (senderId !== "" && reciverId !== "" && amount !== ""){
        transferencia(Number(senderId), Number(reciverId), Number(amount), radioPesos)
    } else {
        alert ("Faltan completar datos")
    }
}

function consumptionInfo(){
    let consumptionCreditCard = document.getElementById("nc").value
    let local = document.getElementById("ncl").value
    let consumptionAmount = document.getElementById("nca").value
    let consumptionDate = document.getElementById("ncd").value
    if (consumptionCreditCard !== "" && local !== "" && consumptionAmount !== "" && consumptionDate !== ""){
        let newConsumption = addConsumption(Number(consumptionCreditCard), local, Number(consumptionAmount), consumptionDate)
        if (newConsumption === true){
            document.getElementById("ncl").value = ''
            document.getElementById("nca").value = ''
            document.getElementById("ncd").value = ''
        }
    } else {
        alert("Complete todos los datos")
    }
}

function payCreditCard(){
    let amount = document.getElementById("pcc").value
    let idTarjeta = document.getElementById("pg").value
    idTarjeta = Number(idTarjeta)
    let posTarjeta = searchCreditCard(idTarjeta)
    let currentClient = searchCurrentClientByDni()
    if (amount !== '' && clients[currentClient].caPesos >= Number(amount)){
        amount = Number(document.getElementById("pcc").value)
        let pagarTarjeta = creditCards[posTarjeta].pagarSaldo(amount)
        if (pagarTarjeta === 1){
            document.getElementById("ptt").innerHTML = `Se a realizado un pago total de la tarjeta, su saldo es de $${creditCards[posTarjeta].saldo}`
            clients[currentClient].caPesos -= amount
            guardarLocalStorage("client")
            guardarLocalStorage("creditcard")
        } else if(pagarTarjeta === 0){
            document.getElementById("ptt").innerHTML = `Te falta pagar $${creditCards[posTarjeta].saldo}`
            clients[currentClient].caPesos -= amount
            guardarLocalStorage("client")
            guardarLocalStorage("creditcard")
        } else {
            document.getElementById("ptt").innerHTML = "No fue posible completar la operación"
        }
    } else {
        document.getElementById("ptt").innerHTML = "No fue posible completar la operación"
    }
}

function payTotalCreditCard(){
    let amount = document.getElementById("pcc").value
    let idTarjeta = document.getElementById("pg").value
    idTarjeta = Number(idTarjeta)
    let posTarjeta = searchCreditCard(idTarjeta)
    let currentClient = searchCurrentClientByDni()
    if (amount !== '' && Number(amount) === creditCards[posTarjeta].saldo && clients[currentClient].caPesos > Number(amount)){
        amount = Number(document.getElementById("pcc").value)
        let pagarTarjeta = creditCards[posTarjeta].pagarSaldo(amount)
        if (pagarTarjeta === 1){
            clients[currentClient].caPesos -= amount
            document.getElementById("ptt").innerHTML = `Se a realizado un pago total de la tarjeta, su saldo es de $${creditCards[posTarjeta].saldo}`
            guardarLocalStorage("client")
            guardarLocalStorage("creditcard")
        } else {
            document.getElementById("ptt").innerHTML = "No fue posible completar la operación"
        }
    } else {
        document.getElementById("ptt").innerHTML = "No fue posible completar la operación"
    }
}

function compraVentaDolares(){
    let option = Number(document.getElementById("compraventa").value)
    let amount = document.getElementById("icompvent").value
    let currentClient = searchCurrentClientByDni()
    if (option === 1 && amount !== ""){
        amount = Number(document.getElementById("icompvent").value)
        console.log(amount)
        let movement = clients[currentClient].compraVentaDolares(amount, option)
        if (movement === true){
            document.getElementById("h5compvent").innerHTML = (`La compra se ha realizado con exito<br>Su nuevo saldo en sus cuentas es:<br>$ ${clients[currentClient].caPesos}<br>U$S ${clients[currentClient].caDolares}`)
            guardarLocalStorage("client")
        } else  {
            document.getElementById("h5compvent").innerHTML = (`Ocurrio un error al momento de efectuar la compra`)
        }
    } else if (option === 2 && amount  !== ""){
        amount = Number(document.getElementById("icompvent").value)
        let movement = clients[currentClient].compraVentaDolares(amount, option)
        if (movement === true){
            document.getElementById("h5compvent").innerHTML = (`La venta se ha realizado con exito<br>Su nuevo saldo en sus cuentas es:<br>$ ${clients[currentClient].caPesos}<br>U$S ${clients[currentClient].caDolares}`)
            guardarLocalStorage("client")
        } else if (movement === -1){
            document.getElementById("h5compvent").innerHTML = (`Saldo insuficiente`)
        } else {
            document.getElementById("h5compvent").innerHTML = (`Ocurrio un error al momento de efectuar la venta`)
        }
    }
}


//MARK: Local Storage
function guardarLocalStorage(boton){
    if (localStorage.getItem("cargado") === null){
        localStorage.setItem("cargado", "si")
        localStorage.setItem("Client",  JSON.stringify(clients))
        localStorage.setItem("Consumption",  JSON.stringify(consumptions))
        localStorage.setItem("CreditCard",  JSON.stringify(creditCards))
    } else if (localStorage.getItem("cargado") === "si" && boton === "client"){
        localStorage.setItem("Client",  JSON.stringify(clients))
    } else if (localStorage.getItem("cargado") === "si" && boton === "consumption"){
        localStorage.setItem("Consumption",  JSON.stringify(consumptions))
    } else if (localStorage.getItem("cargado") === "si" && boton === "creditcard"){
        localStorage.setItem("CreditCard",  JSON.stringify(creditCards))
    }
}

function obtenerLocalStorageClients(){
    if (localStorage.getItem("Client")){
        let clientsLS = JSON.parse(localStorage.getItem("Client"));
        clients = []
        clientId = 1
        debitCardNumber = 4000123456789010
        for (let i in clientsLS){
            let NewClient = new Client(clientsLS[i].dni, clientsLS[i].password, clientsLS[i].name, clientsLS[i].surname, clientsLS[i].limiteDescubierto, clientsLS[i].habilitacion)
            clients.push(NewClient)
            clients[i].caPesos = clientsLS[i].caPesos
            if (clientsLS[i].habilitacion === true){
                clients[i].caDolares = clientsLS[i].caDolares
            }
            clients[i].deudaDescubierto = clientsLS[i].deudaDescubierto
        }
        return clients
    }
}

function obtenerLocalStorageCreditCards(){
    if (localStorage.getItem("CreditCard")){
        let creditcardLS = JSON.parse(localStorage.getItem("CreditCard"));
        creditCards = []
        creditCardId = 1
        numeroTarjetaCredito = 4502041831720840
        for (let i in creditcardLS){
            let NewCreditCard = new CreditCard(creditcardLS[i].clientId, creditcardLS[i].proveedor, creditcardLS[i].interest)
            creditCards.push(NewCreditCard)
            creditCards[i].saldo = creditcardLS[i].saldo
            creditCards[i].id = creditcardLS[i].id
            creditCards[i].numero = creditcardLS[i].numero
        }
    }
    return creditCards
}

function obtenerLocalStorageConsumptions(){
    if (localStorage.getItem("Consumption")){
        let consumptionsLS = JSON.parse(localStorage.getItem("Consumption"));
        consumptions = []
        consumptionId = 1;
        for (let i in consumptionsLS){
            let newConsumption = new Consumption(consumptionsLS[i].cardId, consumptionsLS[i].date, consumptionsLS[i].nombreLocal, consumptionsLS[i].monto)
            consumptions.push(newConsumption)
        }
        return consumptions
    }
}