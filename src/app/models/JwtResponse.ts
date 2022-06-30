import { User } from "./User";

export class JwtResponse{
    token: string;
    user: User;
    public constructor(){
        this.token= '';
        this.user= new User();
    }
}
