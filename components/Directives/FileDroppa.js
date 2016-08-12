"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const FileDropZone_1 = require('./FileDropZone');
const FileList_1 = require('./FileList');
const FileStore_service_1 = require("../Services/FileStore.service");
const FileUpload_service_1 = require("../Services/FileUpload.service");
let FileDroppa = class FileDroppa {
    constructor(filesStore, fileUploadService) {
        this.filesStore = filesStore;
        this.fileUploadService = fileUploadService;
        this.showFilesList = true;
        this.autoUpload = false;
        this.beforeRequest = null;
        this.beforeFileUpload = null;
        this.beforeAddFile = null;
        this.dropZoneTemplate = `
                <div class="file_dropZone_internal">
                    Drop Files Here
                </div>
    `;
        this.filesUpdated = new core_1.EventEmitter(true);
        this.fileUploaded = new core_1.EventEmitter(true);
        filesStore.filesUpdated.subscribe(() => {
            this.filesUpdated.emit(filesStore.files);
        });
        fileUploadService.fileUploadedEvent.subscribe(([success, response, iFile]) => {
            if (success) {
                this.filesStore.removeFiles(iFile);
            }
            else {
                iFile.loadingSuccessful = false;
                iFile.responseText = false;
            }
            this.fileUploaded.emit([success, response, iFile.file]);
        });
        filesStore.startAutoUploading = this.startAutoUploading.bind(this);
    }
    set url(tmpUrl) {
        this.fileUploadService.url = tmpUrl;
    }
    startAutoUploading(iFile) {
        this.autoUpload && this.fileUploadService.uploadFile(iFile);
    }
    ngOnInit() {
        this.filesStore.beforeAddFile = (typeof this.beforeAddFile === "function") ? this.beforeAddFile : (file) => true;
        this.fileUploadService.beforeRequest = this.beforeRequest;
        this.fileUploadService.beforeFileUpload = (typeof this.beforeFileUpload === "function") ? this.beforeFileUpload : (formData) => true;
    }
    removeAllFiles() {
        this.filesStore.clearStore();
    }
    uploadAllFiles() {
        this.fileUploadService.uploadFiles(this.filesStore.iFiles);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], FileDroppa.prototype, "showFilesList", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], FileDroppa.prototype, "autoUpload", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Function)
], FileDroppa.prototype, "beforeRequest", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], FileDroppa.prototype, "url", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Function)
], FileDroppa.prototype, "beforeFileUpload", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Function)
], FileDroppa.prototype, "beforeAddFile", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], FileDroppa.prototype, "dropZoneTemplate", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], FileDroppa.prototype, "filesUpdated", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], FileDroppa.prototype, "fileUploaded", void 0);
FileDroppa = __decorate([
    core_1.Component({
        selector: 'fileDroppa',
        directives: [FileDropZone_1.FileDropZone, FileList_1.FileList],
        providers: [FileStore_service_1.FilesStore, FileUpload_service_1.FileUpload],
        styles: [`
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
    }), 
    __metadata('design:paramtypes', [FileStore_service_1.FilesStore, FileUpload_service_1.FileUpload])
], FileDroppa);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileDroppa;
