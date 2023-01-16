export class ApiResponseModel<T>{
    constructor(){
        this.isSuccess = false;
        this.message = "";
        this.status = 0;
    }

    public data: T | undefined;
    public isSuccess: boolean;
    public message: string;
    public status: number;
}