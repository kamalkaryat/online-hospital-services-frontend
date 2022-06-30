import { RowOutlet } from "@angular/cdk/table";
import { Role } from "./Role";

export class Login{
    username: string;
    password: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    role: Role[];
    constructor(){
        this.username= '';
        this.password= '';
        this.accountNonExpired= true;
        this.accountNonLocked= true;
        this.credentialsNonExpired= true;
        this.enabled= true;
        this.accountNonExpired= true;
        this.role= [];
    }
}