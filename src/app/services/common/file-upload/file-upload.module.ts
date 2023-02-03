import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule
  ],
  exports: [
    FileUploadComponent
  ]
})


export class FileUploadModule {

}
