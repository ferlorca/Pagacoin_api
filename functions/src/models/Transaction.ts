export class MyTransactions{
    received: Array<Transaction>;
    delivered: Array<Transaction>;

    constructor() {
        this.received = [];
        this.delivered = [];
    }    
}

export class Transaction{
    destiny: string;
    origin: string;
    amount: number;
    date: Date;

    constructor(destiny:string,origin:string,amount:number,date:Date) {
        this.destiny = destiny;
        this.origin = origin;
        this.amount = amount;
        this.date =  new Date();
    }

    static fromFirebaseDocument(data: FirebaseFirestore.DocumentData): Transaction {
        const transaction = data.data();
        const date = transaction.date;
        const amount = transaction.amount;
        const origin = transaction.origin;
        const destiny = transaction.destiny;
        return new this(destiny,origin,amount,date);
    }

    public toJson(): any {
        return {
            destiny: this.destiny,
            origin :this.origin,
            date:this.date ,
            amount:this.amount ,
        }
    }
}