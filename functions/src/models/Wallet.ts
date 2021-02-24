
export class Wallet{
    alias:string;
    balance:number;
    ownerId:string;
    id:string;

    constructor(id:string,ownerId:string,alias:string, balance:number) {
        this.ownerId=ownerId;
        this.alias=alias !== null && alias.length > 0 ?  alias : "My Wallet";       
        this.balance=balance;
        this.id =id;
    }

    public toJson(): any {
        return {
            ownerId: this.ownerId,
            alias :this.alias,
            balance:this.balance  
        }
    }

    static fromFirebaseDocument(data: FirebaseFirestore.DocumentData): Wallet {
        const wallet = data.data();
        const alias = wallet.alias;
        const id =  data.id;
        const balance = wallet.balance;
        const ownerId = wallet.ownerId;
        return new this(id,ownerId,alias,balance);
    }

    static fromRequest(data:any): Wallet {
        const ownerId = data.ownerId;
        const id = data.id ?? "";
        const alias = data.alias ?? "My Wallet";
        const balance =  parseFloat(data.balance);         
        return new this(id,ownerId,alias,balance);
    }
}