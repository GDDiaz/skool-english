import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from '../../services/upload.service';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  accept = '*';
  files: File[] = [];
  progress: number;
  hasBaseDropZoneOver = false;
  httpEmitter: Subscription;
  httpEvent: HttpEvent<{}>;
  sendableFormData: FormData;

  dragFiles: any;
  validComboDrag: any;
  lastInvalids: any;
  fileDropDisabled: any;
  maxSize: any;
  baseDropValid: any;

  constructor(
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<FileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadRules) {

    }

  onNoClick(): void {
    this.dialogRef.close('');
  }

  ngOnInit() {
  }

  cancel() {
    this.progress = 0;
    if ( this.httpEmitter ) {
      this.httpEmitter.unsubscribe();
    }
  }

  uploadFiles(): Subscription {

    return this.httpEmitter = this.uploadService.uploadFiles(this.sendableFormData).subscribe(
      event => {
        this.httpEvent = event;
        if (event instanceof HttpResponse) {
          delete this.httpEmitter;
          console.log('request done', event);
          this.dialogRef.close('/ok');
        }
      },
      error => alert('Error Uploading Files: ' + error.message)
    );
  }

  fileChange() {
    this.data.fileDropDisabled = false;
    if (this.data.multiple === '1' && this.files.length >  0) {
      this.data.fileDropDisabled = true;
    }
  }

}

export class UploadRules {
  accept: string;
  maxSize: number;
  multiple: string;
  fileDropDisabled: boolean;
}

