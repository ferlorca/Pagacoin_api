
export class User{
    
    email: string;
    id:string;
    name:string;
    phone:string;
    wallets: Array<string>;

    constructor(id:string ,email:string,name:string,phone:string,wallets:Array<string>) {
        this.email=email;   
        this.id=id;   
        this.name=name ?? "My name" ;       
        this.phone=phone ?? "-" ;      
        this.wallets = wallets ?? []; 
    }

    static fromSignUp(id:string,email: string) {
        const name = "My name";
        const phone = "-";
        return new this(id,email,name,phone,[]);
    }

    static fromFirebaseDocument(data: FirebaseFirestore.DocumentData): User {
        const user = data.data();
        const email=user.email;  
        const id = data.id;
        const name = user.name;
        const phone = user.phone;
        const wallets = [...user.wallets];
        return new this(id,email,name,phone,wallets);
    }

    static fromRequest(data:any): User {
        const id = data.id ?? "";
        const name = data.name ?? "My name";
        const email =  data.email;
        const phone=  data.phone ?? "";
        const wallets =  data.wallets ?? [];            
        return new this(id,email,name,phone,wallets);
    }

    public toJson(): any {
        return {           
            email: this.email,
            name : this.name,
            phone : this.phone,
            wallets :this.wallets
        }
    }


}