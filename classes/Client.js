let clientId = 1

class Client {
    constructor(dni, password, clientName, clientSurname, caPesos, limit, debitCardNumber, debitCardExpiration, caDolares, habilitacion){
        this.id = clientId;
        this.dni = dni;
        this.password = password;
        this.name = clientName;
        this.surname = clientSurname;
        this.caPesos = caPesos;
        this.limit = limit;
        this.cardNumber = debitCardNumber;
        this.cardExpiration = debitCardExpiration;
        this.caDolares = caDolares;
        if (habilitacion == "si"){
            this.habilitacion = true
        } else {
            this.habilitacion = false
        }
        clientId++
    }
}


let clients = [
    new Client (47944052, "hola", "Tomas", "Galera", 500000, 10000000, 47),
    new Client (47944052, "chau", "Nicolas", "Salles", 500000, 10000000, 47),
    new Client (47944052, "a", "a", "a", 500000, 10000000, 47)
]