export class User{
    email: string;
    role: string;

    constructor(email:string,role:string) {
        this.email=email;
        this.role=role;          
    }

    public toJson(): any {
        return {
            email: this.email,
            role: this.role,
        }
    }
}