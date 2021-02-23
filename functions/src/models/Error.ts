import { AxiosError } from "axios";

export class ErrorApp {
    id?:string;
    message:string;
    code:string;
    createDate:Date;
    stacktrace:string;

    constructor(id:string, message:string,code:string,createDate:Date,stacktrace:string) {
        this.id = id ?? "";
        this.message= message;
        this.code=code;
        this.createDate=createDate;
        this.stacktrace=stacktrace ?? "";
    }

    static fromFirebaseDocument(data:  FirebaseFirestore.DocumentData): ErrorApp {   
        const error  =  data.data();
        return new this(data.id,error.message,error.code,error.createDate ?? new Date(),error.stacktrace);
    }  

    static fromObject(data: any): ErrorApp {   
        if(data.isAxiosError)
            return ErrorApp.getAxiosNewError(data);        
        return new this("bff",data.message,data.code ?? "500",data.createDate ?? new Date(),data.stacktrace ?? data.stack);
    }  

    static getAxiosNewError(data:AxiosError): ErrorApp {
        return new this(
            "axios",
            data.message + "  //  "+ data.response?.data?.error?.message,
            data.response ? data.response.status.toString() : "500",
            new Date(data.response?.headers?.date),
            data.stack ? data.stack : ""); 
    }
}