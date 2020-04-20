import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req:HttpRequest<any>, next:HttpHandler){
        console.log("everything is working");
        const modifiedReq=req.clone({
            headers: req.headers.append('Auth', 'hello')
        });
        return next.handle(modifiedReq);
    }
}