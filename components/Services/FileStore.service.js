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
var FileWrapper_service_1 = require("./FileWrapper.service");
var FilesStore = (function () {
    function FilesStore() {
        this.filesUpdated = new core_1.EventEmitter(true);
        this.startAutoUploading = null;
        this.beforeAddFile = null;
        this.WSfiles = new WeakSet();
        this._iFiles = [];
    }
    Object.defineProperty(FilesStore.prototype, "files", {
        get: function () {
            return this.iFiles.reduce(function (res, iFile) {
                res.push(iFile.File);
                return res;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilesStore.prototype, "iFiles", {
        get: function () {
            return this._iFiles;
        },
        set: function (files) {
            this._iFiles = files;
        },
        enumerable: true,
        configurable: true
    });
    FilesStore.prototype.addFiles = function (files) {
        var _this = this;
        files = files.filter(function (file) {
            if (!_this.WSfiles.has(file)) {
                if (typeof _this.beforeAddFile === "function" && _this.beforeAddFile(file)) {
                    _this.WSfiles.add(file);
                    return true;
                }
                else if (typeof _this.beforeAddFile !== "function") {
                    return true;
                }
                return false;
            }
        }).map(function (file) {
            var iFile = new FileWrapper_service_1.FileWrapper(file);
            _this.startAutoUploading && _this.startAutoUploading(iFile);
            return iFile;
        });
        this.iFiles = this.iFiles.concat(files);
        this.filesUpdated.emit(true);
    };
    FilesStore.prototype.removeFiles = function (iFile) {
        this.WSfiles.delete(iFile.File);
        this.iFiles = this.iFiles.filter(function (item) {
            return item.id !== iFile.id;
        });
        this.filesUpdated.emit(true);
    };
    FilesStore.prototype.clearStore = function () {
        var _this = this;
        this.iFiles.forEach(function (iFile) {
            _this.WSfiles.delete(iFile.File);
        });
        this.iFiles = [];
        this.filesUpdated.emit(true);
    };
    FilesStore = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilesStore);
    return FilesStore;
}());
exports.FilesStore = FilesStore;
