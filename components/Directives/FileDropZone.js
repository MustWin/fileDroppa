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
const FileParser_service_1 = require("../Services/FileParser.service");
const FileStore_service_1 = require("../Services/FileStore.service");
let FileDropZone = class FileDropZone {
    constructor(filesStore, el, fileParser) {
        this.filesStore = filesStore;
        this.el = el;
        this.fileParser = fileParser;
        this.hiddenFileInput = null;
        this.promise = null;
        this.createHiddenInput();
    }
    onClick(e) {
        this.hiddenFileInput && this.hiddenFileInput.click();
    }
    drop(e) {
        e.preventDefault();
        if (!e.dataTransfer || !e.dataTransfer.files.length) {
            return;
        }
        this.promise = this.fileParser.processInputFromDrop(e)
            .then((files) => {
            this.updateFilesStore([...files]);
        });
        this.updateStyles();
    }
    dragenter(e) {
        e.preventDefault();
    }
    dragover(e) {
        e.preventDefault();
        this.updateStyles(true);
    }
    dragleave(e) {
        e.preventDefault();
        this.updateStyles();
    }
    OnDestroy() {
        this.hiddenFileInput && document.body.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
    }
    updateStyles(dragOver = false) {
    }
    updateFilesStore(files) {
        this.filesStore.addFiles(files);
    }
    createHiddenInput() {
        this.hiddenFileInput && document.body.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = document.createElement("input");
        this.hiddenFileInput.setAttribute("type", "file");
        this.hiddenFileInput.setAttribute("multiple", "multiple");
        this.hiddenFileInput.style.visibility = "hidden";
        this.hiddenFileInput.style.position = "absolute";
        this.hiddenFileInput.style.top = "0";
        this.hiddenFileInput.style.left = "0";
        this.hiddenFileInput.style.height = "0";
        this.hiddenFileInput.style.width = "0";
        this.hiddenFileInput.className = "_hiddenInputClassName";
        document.body.appendChild(this.hiddenFileInput);
        this.hiddenFileInput.addEventListener("change", (e) => {
            let files = [];
            for (let i = 0, l = e.target.files.length; i < l; i++) {
                files.push(e.target.files[i]);
            }
            this.hiddenFileInput.value = "";
            this.updateFilesStore(files);
        });
    }
};
FileDropZone = __decorate([
    core_1.Component({
        selector: 'fileDropZone, [fileDropZone]',
        providers: [FileParser_service_1.FileParser],
        styles: [`
        .file_dropZone_internal {
            border: 3px dashed #DDD;
            border-radius:10px;
            padding:10px;
            width:400px;
            height:200px;
            color:#CCC;
            text-align:center;
            display:table-cell;
            vertical-align:middle;
            cursor:pointer;
        }
    `],
        template: `
        <ng-content></ng-content>
    `,
        host: {
            '(drop)': 'drop($event)',
            '(dragenter)': 'dragenter($event)',
            '(dragover)': 'dragover($event)',
            '(dragleave)': 'dragleave($event)',
            '(click)': 'onClick($event)'
        },
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [FileStore_service_1.FilesStore, core_1.ElementRef, FileParser_service_1.FileParser])
], FileDropZone);
exports.FileDropZone = FileDropZone;
