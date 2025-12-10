import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MessageServiceWrapper } from './message.service';
import { tap } from 'rxjs';
import { ApiMessage } from '../config/api-messages.config';
@Injectable({ providedIn: 'root' })
export class HttpService {
  private http = inject(HttpClient);
  private messageService = inject(MessageServiceWrapper);

  get(url: string, successMsg = ApiMessage.SUCCESS.FETCH) {
    return this.http
      .get(url)
      .pipe(tap(() => this.messageService.success(successMsg)));
  }

  post(url: string, body: any, successMsg = ApiMessage.SUCCESS.CREATE) {
    return this.http
      .post(url, body)
      .pipe(tap(() => this.messageService.success(successMsg)));
  }

  put(url: string, body: any, successMsg = ApiMessage.SUCCESS.UPDATE) {
    return this.http
      .put(url, body)
      .pipe(tap(() => this.messageService.success(successMsg)));
  }
  patch(url: string, body: any, successMsg = ApiMessage.SUCCESS.UPDATE) {
    return this.http
      .patch(url, body)
      .pipe(tap(() => this.messageService.success(successMsg)));
  }
  delete(url: string, successMsg = ApiMessage.SUCCESS.DELETE) {
    return this.http
      .delete(url)
      .pipe(tap(() => this.messageService.success(successMsg)));
  }
}
