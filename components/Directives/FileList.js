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
var File_1 = require('./File');
var FileStore_service_1 = require("../Services/FileStore.service");
var FileList = (function () {
    function FileList(filesStore) {
        this.filesStore = filesStore;
    }
    FileList.prototype.removeFile = function (iFile) {
        this.filesStore.removeFiles(iFile);
    };
    FileList = __decorate([
        core_1.Component({
            selector: 'fileList, [fileList]',
            directives: [File_1.File],
            styles: ["\n        .file-list {\n            width: 430px;\n            margin-bottom: 5px;\n            display: flex;\n            flex-flow: wrap;\n            justify-content: flex-start;\n         }\n    "],
            template: "\n        <div class=\"file-list\">\n            <fileItem *ngFor=\"let file of filesStore.iFiles\"\n                [file]=\"file.File\"\n                [percentage]=\"file.percentage\"\n                [loadingSuccessful]=\"file.loadingSuccessful\"\n                [responseMessage]=\"file.responseMessage\"\n                (removeFile)=\"removeFile(file)\">\n            </fileItem>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [FileStore_service_1.FilesStore])
    ], FileList);
    return FileList;
}());
exports.FileList = FileList;
