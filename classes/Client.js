let clientId = 1
const PRECIO_DOLAR = 1210
let debitCardNumber = 4000123456789010

class Client {
    constructor(dni, password, clientName, clientSurname, limit, habilitacion){
        this.id = clientId;
        this.dni = dni;
        this.password = password;
        this.name = clientName;
        this.surname = clientSurname;
        this.caPesos = 0
        this.limiteDescubierto = limit;
        this.deudaDescubierto = 0
        
        let currentDate = new Date();
        this.debitCardNumber = debitCardNumber
        this.cardExpiration = new Date(currentDate.getFullYear() + 3, currentDate.getMonth(), currentDate.getDate())
        
        if (habilitacion == "si"){
            this.habilitacion = true
            this.caDolares = 0;
        } else {
            this.habilitacion = false
        }
        clientId++
        debitCardNumber++
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
            return -1
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
    compraVentaDolares(amount, ca){
        if (ca === "dolar" && amount > 0){
            let amountPesos = amount * PRECIO_DOLAR;
            let extraccion = this.extraction(amount, "dolares")
            if(extraccion === true){
                let deposito = this.deposit(amountPesos, "pesos")
                if (deposito === true){
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else if (ca === "peso" && amount > 0){
            let amountDolares = amount / PRECIO_DOLAR;
            let extraccion = this.extraction(amount, "pesos")
            if(extraccion === true){
                let deposito = this.deposit(amountDolares, "dolares")
                if (deposito === true){
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }
}


let clients = [
    new Client (47944052, "hola", "Tomas", "Galera", 5000, "si"),
    new Client (47944052, "chau", "Nicolas", "Salles", 500000, "si"),
    new Client (47944052, "a", "a", "a", 500000, "si")
]

clients[0].extraction(6000, "pesos")
clients[0].deposit(4000, "pesos")
clients[0].deposit(4000, "dolares")
clients[0].cancelarDescubierto(6000)