
export class User{
    
    email: string;
    id:string;
    name:string;
    phone:string;

    constructor(id:string ,email:string,name:string,phone:string) {
        this.email=email;   
        this.id=id;   
        this.name=name ?? "My name" ;       
        this.phone=phone ?? "-" ;      
    }

    static fromSignUp(id:string,email: string) {
        const name = "My name";
        const phone = "-";
        return new this(id,email,name,phone);
    }

    static fromFirebaseDocument(data: FirebaseFirestore.DocumentData): User {
        const user = data.data();        
        const id = data.id;
        const email=user.email;  
        const name = user.name;
        const phone = user.phone;
        return new this(id,email,name,phone);
    }

    static fromRequest(data:any): User {
        const id = data.id ?? "";
        const name = data.name ?? "My name";
        const email =  data.email;
        const phone=  data.phone ?? "";         
        return new this(id,email,name,phone);
    }

    public toJson(): any {
        return {           
            email: this.email,
            name : this.name,
            phone : this.phone            
        }
    }


}