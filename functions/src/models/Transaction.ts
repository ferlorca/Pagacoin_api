export class Transaction{
    destiny: string;
    origin: string;
    amount: number;
    date: Date;

    constructor(destiny:string,origin:string,amount:number,date:Date) {
        this.destiny = destiny;
        this.origin = origin;
        this.amount = amount;
        this.date = date;
    }

}