
export class Wallet{
    alias:string;
    balance:number;
    ownerid:string;
    id:string;

    constructor(id:string,ownerid:string,alias:string, balance:number) {
        this.ownerid=ownerid;
        this.alias=alias !== null && alias.length > 0 ?  alias : "My Wallet";       
        this.balance=balance;
        this.id =id;
    }

    public toJson(): any {
        return {
            ownerid: this.ownerid,
            alias :this.alias,
            balance:this.balance  
        }
    }

    static fromFirebaseDocument(data: FirebaseFirestore.DocumentData): Wallet {
        const wallet = data.data();
        const alias = wallet.alias;
        const id =  data.id;
        const balance = wallet.balance;
        const ownerid = wallet.ownerid;
        return new this(id,ownerid,alias,balance);
    }

    static fromRequest(data:any): Wallet {
        const ownerid = data.ownerid;
        const id = data.id ?? "";
        const alias = data.name ?? "My name";
        const balance =  data.email;         
        return new this(id,ownerid,alias,balance);
    }
}