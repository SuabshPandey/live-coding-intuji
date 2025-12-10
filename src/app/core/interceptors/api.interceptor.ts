import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageServiceWrapper } from '../services/message.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { ApiMessage } from '../config/api-messages.config';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const msg = inject(MessageServiceWrapper);
  const token = localStorage.getItem('token');
  if (!req.url.includes('auth')) {
    req = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        msg.error(ApiMessage.ERROR.NETWORK);
      } else if (error.status === 401) {
        msg.error(ApiMessage.ERROR.UNAUTHORIZED);
      } else if (error.status === 403) {
        msg.error(ApiMessage.ERROR.FORBIDDEN);
      } else if (error.status === 404) {
        msg.error(ApiMessage.ERROR.NOT_FOUND);
      } else if (error.status === 500) {
        msg.error(ApiMessage.ERROR.SERVER);
      }
      return throwError(() => error);
    })
  );
};
