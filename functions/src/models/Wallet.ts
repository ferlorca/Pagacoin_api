export class Wallet{
    alias:string;
    balance:number;
    ownerid:string;

    constructor(ownerid:string,alias:string, balance:number) {
        this.ownerid=ownerid;
        this.alias=alias !== null && alias.length > 0 ?  alias : "My Wallet";       
        this.balance=balance;
    }

    public toJson(): any {
        return {
            ownerid: this.ownerid,
            alias :this.alias,
            balance:this.balance  
        }
    }

}