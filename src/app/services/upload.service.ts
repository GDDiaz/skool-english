import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url = `${environment.apiUrl}/v1/upload`;
  httpEmitter: Subscription;
  httpEvent: HttpEvent<{}>;
  constructor(public httpClient: HttpClient) { }

  /**
   * This method send files to server
   * @param sendableFormData
   */
  uploadFiles(sendableFormData: FormData) {
    console.log('perroo', sendableFormData);
    const req = new HttpRequest<FormData>(
      'POST',
      this.url,
      sendableFormData, {
      reportProgress: true
    });
    return  this.httpClient.request(req);
  }
}
