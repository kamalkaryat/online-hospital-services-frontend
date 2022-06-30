export class ForgotPswRequest{
    psw: string;
    cnfPsw: string;
    code: number;
    username: string;

    constructor(){
        this.psw= '';
        this.cnfPsw= '';
        this.code= 0;
        this.username= '';
    }
}