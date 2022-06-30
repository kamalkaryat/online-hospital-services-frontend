import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication-service/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthenticationService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpEvent<any>> {
        
            let authReq= req;
            let token= this.authService.getToken();
            
            if(token!=null)
                authReq= authReq.clone({setHeaders:{Authorization:`Bearer ${token}`}});
            return next.handle(authReq);
            // if(token!=null)
            //     authReq= req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});

            // if(token){
            //     const cloned= req.clone({
            //         headers: req.headers.set("Authorization", "Bearer " + token)
            //     });
            //     return next.handle(cloned);
            // }
            // else
            //     return next.handle(req);
    }
    
}

export const authInterceptorProviders= [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];