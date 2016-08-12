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
const GetSize_pipe_1 = require('../Pipes/GetSize.pipe');
let File = class File {
    constructor() {
        this.ext = '';
        this.previewSrc = '';
        this.fileName = '';
        this.previewHeight = 75;
        this.removeFile = new core_1.EventEmitter(true);
    }
    ngAfterContentInit() {
        this.file && this.getFileType();
    }
    removeFileListener(e) {
        e.preventDefault();
        this.removeFile && this.removeFile.emit(true);
    }
    getFileType() {
        let imageType = /^image\//, reader;
        if (!imageType.test(this.file.type)) {
            let ext = this.file.name.split('.').pop();
            this.fileName = this.file.name;
            this.ext = ext.length > 3
                ? 'file'
                : `.${ext}`;
            return;
        }
        reader = new FileReader();
        reader.addEventListener("load", () => {
            let img = new Image, result = reader.result;
            img.onload = () => {
                let ratio = img.height / img.width, scaledHeight = ratio * this.previewHeight;
                this.previewSrc = result;
                this.previewHeight = (scaledHeight < this.previewHeight)
                    ? this.previewHeight
                    : scaledHeight;
            };
            img.src = result;
        }, false);
        if (this.file) {
            reader.readAsDataURL(this.file);
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], File.prototype, "file", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], File.prototype, "index", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], File.prototype, "percentage", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], File.prototype, "loadingSuccessful", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], File.prototype, "responseMessage", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], File.prototype, "removeFile", void 0);
File = __decorate([
    core_1.Component({
        selector: 'fileItem',
        pipes: [GetSize_pipe_1.GetSizePipe],
        styles: [`
        .file-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 75px;
            margin: 20px 10px 0 0;
            transition: opacity 0.5s, margin 0.5s linear;
            flex-direction: column;
            position:relative;
        }

        .file-container.uploaded {
            opacity: 0;
            margin: 0;
            height: 0;
            overflow: hidden;
        }

        .flex-block {
            width: 90%;
            text-align: center;
            font-size: 0.8em;
            margin: 2px 0;
        }

        .file-remove {
            cursor: pointer;
            position: absolute;
            left: 87%;
            top: 8px;
        }
        .file-upload-error {
            position: absolute;
            top: 8px;
            left:-8px;
        }
        .file-name {
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .file-preview {
            background: #ccc;
            border-radius: 2px;
            width: inherit;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-size: cover;
            color: #fff;
        }

         .file-preview-ext {
            text-transform: uppercase;
        }

        .file-progress {
            width: 80%;
            display: block;
        }


        button {
            margin: 0;
        }

span {
    position:relative;
    z-index:1;
    overflow:hidden;
    list-style:none;
    padding:0;
    margin:0 0 0.25em;
}

span a:link {
    display:block;
    border:0;
    padding-left:28px;
    color:#c55500;
}

span a:hover,
span a:focus {
    color:#730800;
    background:transparent;
}

span:before,
span:after,
span a:before,
span a:after {
    content:"";
    position:absolute;
    top:50%;
    left:0;
}

span a:before,
span a:after {
    margin:-8px 0 0;
    background:#c55500;
}

span a:hover:before,
span a:focus:before {
    background:#730800;
}


.remove a:before {
    width:16px;
    height:16px;
    /* css3 */
    -webkit-border-radius:16px;
    -moz-border-radius:16px;
    border-radius:16px;
}

.remove a:after {
    left:3px;
    width:10px;
    height:2px;
    margin-top:-1px;
    background:#fff;
}
.warning:before {
    content:"!";
    z-index:2;
    left:8px;
    margin-top:-8px;
    font-size:14px;
    font-weight:bold;
    color:#000;
}

.warning:after {
    z-index:1;
    border-width:0 11px 18px;
    border-style:solid;
    border-color:#F8D201 transparent;
    margin-top:-10px;
    background:transparent;
}

.file-upload-error .tooltiptext {
    visibility: hidden;
    white-space:nowrap;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
}

.file-upload-error:hover .tooltiptext {
    visibility: visible;
}

    `],
        template: `
        <div *ngIf="file" class="file-container">
            <div class="flex-block file-preview" [ngStyle]="{'background-image': 'url(' + previewSrc + ')', 'height': previewHeight + 'px'}">
                <div *ngIf="ext" class="flex-block file-preview-ext ">{{ext}}</div>
                <div *ngIf="!previewSrc" class="flex-block file-name">{{fileName}}</div>
                <progress [value]="percentage" max="100" class="file-progress"></progress>
            </div>
            <div class="file-remove">
                <span class="remove"><a href="#" (click)="removeFileListener($event)"></a></span>
            </div>
            <div *ngIf="!loadingSuccessful" class="file-upload-error">
                <span class="warning"></span>
                <span *ngIf="responseMessage" class="tooltiptext">{{responseMessage}}</span>
            </div>
            <div class="flex-block">{{file.size | getSize }}</div>
        </div>
    `
    }), 
    __metadata('design:paramtypes', [])
], File);
exports.File = File;
