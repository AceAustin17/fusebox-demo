import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      switch (err.status) {
        case 400:
          console.log('Validation Failure');
          break;
        case 401:
          console.log('Unauthorized');
          break;
        default:
          console.log('Internal Server Error');
          break;
      }
      return throwError(() => err);
    })
  );
};
