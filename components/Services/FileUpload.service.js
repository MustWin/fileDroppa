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
var core_1 = require("@angular/core");
var FileUpload = (function () {
    function FileUpload() {
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.url = null;
        this.beforeRequest = null;
        this.beforeFileUpload = null;
        this.fileUploadedEvent = new core_1.EventEmitter(true);
    }
    FileUpload.prototype.uploadFiles = function (iFiles) {
        var _this = this;
        return Promise.all(iFiles.reduce(function (res, iFile) {
            return res.push(_this.uploadFile(iFile)), res;
        }, []));
    };
    FileUpload.prototype.uploadFile = function (iFile) {
        var _this = this;
        if (!this.url) {
            throw "url to upload needs to be provided";
        }
        if (iFile.loading) {
            throw "Already under loading";
        }
        var that = this, formData = new FormData();
        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (event) {
            var progress = (event.loaded * 100) / event.total | 0;
            _this.zone.run(function () {
                iFile.percentage = progress;
            });
        };
        var pr = new Promise(function (resolve, reject) {
            xhr.onload = xhr.onerror = function (e) {
                var _this = this;
                that.zone.run(function () {
                    if (_this["status"] == 200) {
                        iFile.loading = false;
                        iFile.loadingSuccessful = true;
                        resolve(true);
                    }
                    else {
                        iFile.loading = false;
                        iFile.loadingSuccessful = false;
                        reject(false);
                    }
                });
            };
        }).then(function (success) {
            _this.fileUploadedEvent.emit([success, xhr.response, iFile]);
        });
        iFile.loading = true;
        xhr.open("POST", this.url, true);
        typeof this.beforeRequest === "function" && this.beforeRequest(xhr);
        formData.append("" + iFile.File.name, iFile.File);
        if (typeof this.beforeFileUpload === "function") {
            Promise.resolve(this.beforeFileUpload(formData)).then(function (formData) {
                formData && xhr.send(formData);
                formData || console.warn("beforeFileUpload didn't return formData for " + iFile.File.name + " and upload was aborted");
            });
        }
        else {
            xhr.send(formData);
        }
        return pr;
    };
    FileUpload = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FileUpload);
    return FileUpload;
}());
exports.FileUpload = FileUpload;
