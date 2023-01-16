import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {

  private count = 0;

  constructor(private loaderService: LoaderService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.loaderService.setHttpProgressStatus(true);
    }
    this.count++;
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.loaderService.setHttpProgressStatus(false);
        }
      })
    );
  }}
