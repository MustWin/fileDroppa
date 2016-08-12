import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FileDropZone} from './FileDropZone';
import {FileList} from './FileList';
import {FilesStore} from "../Services/FileStore.service";
import {File} from "./File";
import {FileUpload} from "../Services/FileUpload.service";

@Component({
    selector: 'fileDroppa',
    directives: [FileDropZone, FileList],
    providers:[FilesStore, FileUpload],
    styles:[`
        .file-droppa-container {
            width: 400px;
        }
        .btns {
            text-align: center;
        }
        .btn {
              margin: 15px;
              padding: 0;

              overflow: hidden;

              border-width: 0;
              outline: none;
              border-radius: 2px;
              box-shadow: 0 1px 4px rgba(0, 0, 0, .6);

              background-color: #2ecc71;
              color: #ecf0f1;

              transition: background-color .3s;
        }

        .btn:hover{
          background-color: #27ae60;
        }

        .btn span {
          display: block;
          padding: 12px 24px;
        }

        .btn.orange {
          background-color: #e67e22;
        }

        .btn.orange:hover {
          background-color: #d35400;
        }

        .btn.red {
          background-color: #e74c3c;
        }

        .btn.red:hover{
          background-color: #c0392b;
        }
        `
    ],
    template: `
        <div class="file-droppa-container">
            <fileDropZone>
                <div [innerHTML]="dropZoneTemplate"></div>
            </fileDropZone>
            <br/>
            <ng-content></ng-content>
            <fileList *ngIf="showFilesList"></fileList>
            <div class="btns" *ngIf="filesStore.iFiles.length">
                <button class="btn orange" (click)="uploadAllFiles($event)"><span>Upload All Files</span></button>
                <button class="btn red" (click)="removeAllFiles($event)"><span>Remove All Files</span></button>
            </div>
        </div>
    `
})
export default class FileDroppa {
    @Input() showFilesList:boolean = true;
    @Input() autoUpload:boolean = false;
    @Input() set beforeRequest(tmpRequest: Function) {
      this.fileUploadService.beforeRequest = tmpRequest;
    }
    @Input() set url(tmpUrl: string) {
      this.fileUploadService.url = tmpUrl;
    }
    @Input() set beforeFileUpload(tmpFileUpload: Function) {
      this.fileUploadService.beforeFileUpload = (typeof tmpFileUpload==="function") ? tmpFileUpload : (formData) => true;
    }
    @Input() set beforeAddFile(tmpAddFile: Function) {
      this.filesStore.beforeAddFile = (typeof tmpAddFile=="function") ? tmpAddFile : (file) => true;
    }
    @Input() dropZoneTemplate:string = `
                <div class="file_dropZone_internal">
                    Drop Files Here
                </div>
    `;
    @Output() filesUpdated = new EventEmitter(true);
    @Output() fileUploaded = new EventEmitter(true);

    constructor(private filesStore:FilesStore, private fileUploadService: FileUpload){
        filesStore.filesUpdated.subscribe(()=>{
            this.filesUpdated.emit(filesStore.files);
        });
        fileUploadService.fileUploadedEvent.subscribe(([success, response, iFile])=>{
            if(success){
                this.filesStore.removeFiles(iFile);
            } else {
                iFile.loadingSuccessful = false;
                iFile.responseText = false;
            }
            this.fileUploaded.emit([success, response, iFile.file]);
        });
        filesStore.startAutoUploading = this.startAutoUploading.bind(this);
    }

    private startAutoUploading(iFile){
        this.autoUpload && this.fileUploadService.uploadFile(iFile);
    }

    /**
     * We got to pass Input parameters to Service instances
     */
    ngOnInit(){ }

    removeAllFiles() {
        this.filesStore.clearStore();
    }

    uploadAllFiles() {
        this.fileUploadService.uploadFiles(this.filesStore.iFiles);
    }
}
