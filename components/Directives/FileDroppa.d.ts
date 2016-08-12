import { EventEmitter } from '@angular/core';
import { FilesStore } from "../Services/FileStore.service";
import { FileUpload } from "../Services/FileUpload.service";
export default class FileDroppa {
    private filesStore;
    private fileUploadService;
    showFilesList: boolean;
    autoUpload: boolean;
    beforeRequest: Function;
    url: string;
    beforeFileUpload: Function;
    beforeAddFile: Function;
    dropZoneTemplate: string;
    filesUpdated: EventEmitter<{}>;
    fileUploaded: EventEmitter<{}>;
    constructor(filesStore: FilesStore, fileUploadService: FileUpload);
    private startAutoUploading(iFile);
    ngOnInit(): void;
    removeAllFiles(): void;
    uploadAllFiles(): void;
}
