function transferencia(){
    let senderId = searchClientById(2)
    let reciverId = searchClientById(1)
    let amount = document.getElementById("montoTransferencia").value
    if (clients[senderId].caPesos >= amount && amount > 0) {
        clients[senderId].caPesos -= amount
        clients[reciverId].caPesos += amount
        console.log(`La transferencia se ha realizado con exito, su nuevo saldo es de: ${clients[senderId].caPesos}`)
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
    }
}