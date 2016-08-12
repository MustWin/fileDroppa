"use strict";
class FileWrapper {
    constructor(file) {
        this.loading = false;
        this.percentage = 0;
        this.removing = false;
        this.responseMessage = "Error happened during upload";
        this.id = Math.random().toString(36).substr(2);
        this.loadingSuccessful = true;
        this.uploader = null;
        this.File = file;
    }
}
exports.FileWrapper = FileWrapper;
