import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err) => {
      switch (err.status) {
        case 400:
          console.log('Validation Failure');
          snackbar.open(err.message, 'close');
          break;
        case 401:
          console.log('Unauthorized');
          snackbar.open(err.message, 'close');
          break;
        default:
          console.log('Internal Server Error');
          snackbar.open(err.message, 'close');
          break;
      }
      return throwError(() => err);
    })
  );
};
