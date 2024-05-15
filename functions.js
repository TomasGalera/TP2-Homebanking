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
    return i
}