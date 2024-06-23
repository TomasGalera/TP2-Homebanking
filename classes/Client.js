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
        
        if (habilitacion == true){
            this.habilitacion = true
            this.caDolares = 0;
        } else {
            this.habilitacion = false
        }
        clientId++
        debitCardNumber++
    }
    extraction (amount, CajaAhorro){
        if (CajaAhorro == "dolares" && this.caDolares>= amount && this.habilitacion == true){
            this.caDolares -= amount;
            return true
        } else if(CajaAhorro == "pesos"){
            if (this.caPesos>=amount){
                this.caPesos -= amount;
                return true
            } else {
                let extraccion = (this.caPesos - amount)*-1;
                this.caPesos = 0;
                if (this.deudaDescubierto + extraccion <= this.limiteDescubierto){
                    this.deudaDescubierto += extraccion
                    return 1
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    }
    deposit(amount, CajaAhorro){
        if (CajaAhorro == "dolares" && this.habilitacion == true){
            this.caDolares += amount;
            return true
        } else if(CajaAhorro == "pesos"){
            this.caPesos += amount;
            return true
        } else {
            return -1
        }
    }
    cancelarDescubierto(amount){
        if (amount<=this.caPesos && amount > 0 && this.deudaDescubierto > 0){
            let deuda = this.deudaDescubierto - amount
            if (deuda<0){
                amount += deuda
                document.getElementById("ptt").innerHTML = `Depositaste más que tu deuda, se te debitó solo la parte que debías: ${amount}`
            }
            this.caPesos-=amount;
            this.deudaDescubierto-=amount
            if (this.deudaDescubierto === 0){
                document.getElementById("ptt").innerHTML = `Saldaste tu deuda`
            } else {
                document.getElementById("ptt").innerHTML = `Se a realizado un pago total de la tarjeta`
            }
        } else if (amount>=this.caPesos && this.deudaDescubierto > 0){
            document.getElementById("ptt").innerHTML = "No tenes ese dinero en tu caja de ahorros"
        } else {
            document.getElementById("ptt").innerHTML = "No fue posible completar la operación"
        }
    }
    compraVentaDolares(amount, ca){
        if (ca === 1 && amount > 0){
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
        } else if (ca === 2 && amount > 0){
            let amountPesos = amount * PRECIO_DOLAR;
            if (amountPesos <= this.caPesos){
                let extraccion = this.extraction(amountPesos, "pesos")
                if(extraccion === true){
                    let deposito = this.deposit(amount, "dolares")
                    if (deposito === true){
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                return -1
            }
        } else {
            return false
        }
    }
}


let clients = [
    new Client (47944052, "hola", "Tomas", "Galera", 5000, true),
    new Client (47944053, "chau", "Nicolas", "Salles", 500000, true),
    new Client (47944054, "a", "a", "a", 500000, true)
]

clients[0].deposit(4000, "pesos")
clients[0].deposit(4000, "dolares")
clients[2].deposit(10000, "dolares")