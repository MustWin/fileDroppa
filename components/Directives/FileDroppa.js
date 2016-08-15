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
var core_1 = require('@angular/core');
var FileDropZone_1 = require('./FileDropZone');
var FileList_1 = require('./FileList');
var FileStore_service_1 = require("../Services/FileStore.service");
var FileUpload_service_1 = require("../Services/FileUpload.service");
var FileDroppa = (function () {
    function FileDroppa(filesStore, fileUploadService) {
        var _this = this;
        this.filesStore = filesStore;
        this.fileUploadService = fileUploadService;
        this.showFilesList = true;
        this.autoUpload = false;
        this.dropZoneTemplate = "\n                <div class=\"file_dropZone_internal\">\n                    Drop Files Here\n                </div>\n    ";
        this.filesUpdated = new core_1.EventEmitter(true);
        this.fileUploaded = new core_1.EventEmitter(true);
        filesStore.filesUpdated.subscribe(function () {
            _this.filesUpdated.emit(filesStore.files);
        });
        fileUploadService.fileUploadedEvent.subscribe(function (_a) {
            var success = _a[0], response = _a[1], iFile = _a[2], xhr = _a[3];
            if (success) {
                _this.filesStore.removeFiles(iFile);
            }
            else {
                iFile.loadingSuccessful = false;
                iFile.responseText = false;
            }
            _this.fileUploaded.emit([success, response, iFile.file, xhr]);
        });
        filesStore.startAutoUploading = this.startAutoUploading.bind(this);
    }
    Object.defineProperty(FileDroppa.prototype, "beforeRequest", {
        set: function (tmpRequest) {
            console.info('FileDroppa.beforeRequest', tmpRequest);
            this.fileUploadService.beforeRequest = tmpRequest;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDroppa.prototype, "url", {
        set: function (tmpUrl) {
            console.info('FileDroppa.url', tmpUrl);
            this.fileUploadService.url = tmpUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDroppa.prototype, "beforeFileUpload", {
        set: function (tmpFileUpload) {
            console.info('FileDroppa.beforeFileUpload', tmpFileUpload);
            this.fileUploadService.beforeFileUpload = (typeof tmpFileUpload === "function") ? tmpFileUpload : function (formData) { return true; };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDroppa.prototype, "beforeAddFile", {
        set: function (tmpAddFile) {
            console.info('FileDroppa.beforeAddFile', tmpAddFile);
            this.filesStore.beforeAddFile = (typeof tmpAddFile == "function") ? tmpAddFile : function (file) { return true; };
        },
        enumerable: true,
        configurable: true
    });
    FileDroppa.prototype.startAutoUploading = function (iFile) {
        this.autoUpload && this.fileUploadService.uploadFile(iFile);
    };
    FileDroppa.prototype.ngOnInit = function () { };
    FileDroppa.prototype.removeAllFiles = function () {
        this.filesStore.clearStore();
    };
    FileDroppa.prototype.uploadAllFiles = function () {
        this.fileUploadService.uploadFiles(this.filesStore.iFiles);
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
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Function])
    ], FileDroppa.prototype, "beforeRequest", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], FileDroppa.prototype, "url", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Function])
    ], FileDroppa.prototype, "beforeFileUpload", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Function])
    ], FileDroppa.prototype, "beforeAddFile", null);
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
            styles: ["\n        .file-droppa-container {\n            width: 400px;\n        }\n        .btns {\n            text-align: center;\n        }\n        .btn {\n              margin: 15px;\n              padding: 0;\n\n              overflow: hidden;\n\n              border-width: 0;\n              outline: none;\n              border-radius: 2px;\n              box-shadow: 0 1px 4px rgba(0, 0, 0, .6);\n\n              background-color: #2ecc71;\n              color: #ecf0f1;\n\n              transition: background-color .3s;\n        }\n\n        .btn:hover{\n          background-color: #27ae60;\n        }\n\n        .btn span {\n          display: block;\n          padding: 12px 24px;\n        }\n\n        .btn.orange {\n          background-color: #e67e22;\n        }\n\n        .btn.orange:hover {\n          background-color: #d35400;\n        }\n\n        .btn.red {\n          background-color: #e74c3c;\n        }\n\n        .btn.red:hover{\n          background-color: #c0392b;\n        }\n        "
            ],
            template: "\n        <div class=\"file-droppa-container\">\n            <fileDropZone>\n                <div [innerHTML]=\"dropZoneTemplate\"></div>\n            </fileDropZone>\n            <br/>\n            <ng-content></ng-content>\n            <fileList *ngIf=\"showFilesList\"></fileList>\n            <div class=\"btns\" *ngIf=\"filesStore.iFiles.length\">\n                <button class=\"btn orange\" (click)=\"uploadAllFiles($event)\"><span>Upload All Files</span></button>\n                <button class=\"btn red\" (click)=\"removeAllFiles($event)\"><span>Remove All Files</span></button>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [FileStore_service_1.FilesStore, FileUpload_service_1.FileUpload])
    ], FileDroppa);
    return FileDroppa;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileDroppa;
