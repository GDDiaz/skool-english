import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file-widget',
  templateUrl: './upload-file-widget.component.html',
  styleUrls: ['./upload-file-widget.component.scss']
})
export class UploadFileWidgetComponent implements OnInit {

  @Input()
  accept = '*';
  @Input()
  maxSize: '200000';
  @Input()
  multiple = '0';
  @Output()
  formData: EventEmitter<FormData> = new EventEmitter<FormData>();

  files: File[] = [];
  hasBaseDropZoneOver = false;
  sendableFormData: FormData;
  dragFiles: any;
  validComboDrag: any;
  fileDropDisabled: any;
  baseDropValid: any;

  constructor() {
  }

  ngOnInit() {
  }

  changeFormData(formData) {
    this.formData.emit(formData);
  }

  fileChange() {
    this.fileDropDisabled = false;
    if (this.multiple === '1' && this.files.length >  0) {
      this.fileDropDisabled = false;
    }
  }

}
