let creditCardId = 1
let numeroTarjetaCredito = 4502041831720840

class CreditCard {
    constructor (clientId, proveedor, interest){
        this.id = creditCardId;
        this.clientId = clientId;
        this.type = "credito";
        this.proveedor = proveedor;
        this.numero = numeroTarjetaCredito
        let currentDate = new Date();
        this.expiration = new Date(currentDate.getFullYear() + 3, currentDate.getMonth(), currentDate.getDate());
        this.saldo = 0;
        this.interest = interest
        creditCardId++
        numeroTarjetaCredito++
    }
    pagarSaldo(amount){
        if (amount >= 0 && amount > this.saldo * 0.10){
            this.saldo -= amount;
            if (this.saldo === 0){
                return 1
            } else if (this.saldo > 0){
                return 0
            }
        } else {
            return -1
        }
    }
}

let creditCards = [
    new CreditCard (1, "VISA", 0),
    new CreditCard (1, "VISA", 0.25),
    new CreditCard (3, "American Express", 0.10)
]