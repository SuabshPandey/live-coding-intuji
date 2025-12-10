import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../config/api-config';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request url', req.url);
  if (!req.url.startsWith('http')) {
    const apiReq = req.clone({
      url: `${environment.apiBaseUrl}${req.url}`,
    });
    return next(apiReq);
  }
  return next(req);
};
