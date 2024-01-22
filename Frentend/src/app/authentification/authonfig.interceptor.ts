import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from
'@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from
'@angular/common/http';
import { AuthService } from "./auth.service";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
private isRefreshing = false;
private refreshTokenSubject: BehaviorSubject<any> = new
BehaviorSubject<any>(null);
constructor(private authService: AuthService) { }
intercept(req: HttpRequest<any>, next: HttpHandler):
Observable<HttpEvent<Object>> {
let authReq = req;
const authToken = this.authService.getToken();
if (authToken != null) {
authReq = this.addTokenHeader(req, authToken);

}
return next.handle(authReq).pipe(catchError(error => {
if (error instanceof HttpErrorResponse && error.status === 403) {
return this.handle403Error(authReq, next);
}
return throwError(error);
}));
}
private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
if (!this.isRefreshing) {
this.isRefreshing = true;
this.refreshTokenSubject.next(null);
const token = localStorage.getItem('refresh_token');
/*

17

nous devons appeler la fonction refreshToken()
qui utilise HttpClient pour envoyer une requête HTTP
avec rafraîchirToken dans le body.
*/
/*

L'Angular SwitchMap mappe chaque valeur de l'observable source vers un
observable interne,
s'y abonne, puis commence à en émettre les valeurs.
Il crée un nouvel observable intérieur pour chaque valeur qu'il reçoit de la
Source.
Chaque fois qu'il crée un nouvel observable interne,
il se désabonne de tous les observables internes précédemment créés.
Fondamentalement, il passe au plus récent observable en éliminant tous les
autres.
*/
if (token)
return this.authService.refreshToken(token).pipe(
switchMap((res: any) => {
this.isRefreshing = false;
localStorage.setItem('access_token', res.token);
localStorage.setItem('refresh_token', res.refreshToken);
this.refreshTokenSubject.next(res.token);
return next.handle(this.addTokenHeader(request, res.token));
}),
catchError((err) => {
this.isRefreshing = false;
this.authService.doLogout();
return throwError(err);
})
);
}
return this.refreshTokenSubject.pipe(
filter(token => token !== null),
take(1),
switchMap((token) => next.handle(this.addTokenHeader(request,

token)))
);
}
private addTokenHeader(request: HttpRequest<any>, token: string) {
return request.clone({ setHeaders: {
Authorization: "Bearer " + token
}
});
}
}

18
export const authInterceptorProviders = [
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];