let clientId = 1

class Client {
    constructor(dni, password, clientName, clientSurname, caPesos, limit, debitCardNumber, debitCardExpiration, caDolares, habilitacion){
        this.id = clientId;
        this.dni = dni;
        this.password = password;
        this.name = clientName;
        this.surname = clientSurname;
        this.caPesos = caPesos;
        this.limiteDescubierto = limit;
        this.deudaDescubierto = 0
        this.cards = [{cardNumber: debitCardNumber, cardExpiration: debitCardExpiration}];
        if (habilitacion == "si"){
            this.habilitacion = true
            this.caDolares = caDolares;
        } else {
            this.habilitacion = false
        }
        clientId++
    }
    extraction (amount, CajaAhorro){
        if (CajaAhorro == "dolares" && this.caDolares>amount && this.habilitacion == true){
            this.caDolares -= amount;
            console.log(`Dinero extraido de la caja de ahorro en dolares por un monto de: ${amount} \nSu nuevo saldo es de: ${this.caDolares}`)
            return true
        } else if(CajaAhorro == "pesos"){
            if (this.caPesos>=amount){
                this.caPesos -= amount;
                console.log(`Dinero extraido de la caja de ahorro en pesos por un monto de: ${amount} \nSu nuevo saldo es de: ${this.caPesos}`)
            } else {
                let extraccion = (this.caPesos - amount)*-1;
                this.caPesos = 0;
                if (this.deudaDescubierto + extraccion <= this.limiteDescubierto){
                    this.deudaDescubierto += extraccion
                    console.log(`Su saldo es de 0 y su deuda de descubierto es ${this.deudaDescubierto}`)
                    return true
                } else {
                    console.log("No es posible hacer la extracción");
                    return false
                }
            }
        } else {
            console.log("La caja de ahorros no existe")
            return false
        }
    }
    deposit(amount, CajaAhorro){
        if (CajaAhorro == "dolares" && this.habilitacion == true){
            this.caDolares += amount;
            console.log(`Dinero depositado en la caja de ahorro en dolares por un monto de: ${amount} \nSu nuevo saldo es de: ${this.caDolares}`)
            return true
        } else if(CajaAhorro == "pesos"){
                this.caPesos += amount;
                console.log(`Dinero depositado en la caja de ahorro en pesos por un monto de: ${amount} \nSu nuevo saldo es de: ${this.caPesos}`)
                return true
        } else {
            console.log("La caja de ahorros no existe")
            return false
        }
    }
    cancelarDescubierto(amount){
        if (amount<=this.caPesos && amount > 0){
            let deuda = this.deudaDescubierto - amount
            if (deuda<0){
                amount += deuda
                console.log(`Depositaste más que tu deuda, se te debitó solo la parte que debías: ${amount}`)
            }
            this.caPesos-=amount;
            this.deudaDescubierto-=amount
            console.log(`Descubierto cancelado, su saldo es de: ${this.caPesos}`)
        } else if (amount>=this.caPesos){
            console.log("No tenes ese dinero en tu caja de ahorros")
        } else {
            console.log("No fue posible completar la operación")
        }
    }
}


let clients = [
    new Client (47944052, "hola", "Tomas", "Galera", 5000, 10000, 47, "04/12", 400, "si"),
    new Client (47944052, "chau", "Nicolas", "Salles", 500000, 10000000, 87, "04/12", 400, "si"),
    new Client (47944052, "a", "a", "a", 500000, 10000000, 74, "04/12", 400, "si")
]

clients[0].extraction(6000, "pesos")
clients[0].deposit(4000, "pesos")
clients[0].cancelarDescubierto(6000)