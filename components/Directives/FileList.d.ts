import { FilesStore } from "../Services/FileStore.service";
import { iFile } from "../Services/FileWrapper.service";
export declare class FileList {
    private filesStore;
    constructor(filesStore: FilesStore);
    removeFile(iFile: iFile): void;
}
