let creditCardId = 1

class CreditCard {
    constructor (clientId, cardType, proveedor, expiration, balance, interest){
        this.id = creditCardId;
        this.clientId = clientId;
        this.type = cardType;
        this.proveedor = proveedor;
        this.expiration = expiration;
        this.balance = balance;
        this.interest = interest

    }
}

let creditCards = [
    new CreditCard (1, "credito", "VISA", "09/28", 0, 0),
    new CreditCard (1, "debito", "VISA", "09/28", 200, 25),
    new CreditCard (3, "debito", "American Express", "09/28", -200, 10)
]