let consumptionId = 1;

class Consumption {
    constructor(cardId, date, nombreLocal, monto){
        this.id = consumptionId;
        this.cardId = cardId;
        this.date = date;
        this.nombreLocal = nombreLocal;
        this.monto = monto;
    }
}

let consumptions = [
    new Consumption (1, "14/5", "Puma", 200),
    new Consumption (2, "14/5", "Nike", 200),
    new Consumption (3, "14/5", "Adidas", 200)
]