import {Component, EventEmitter} from 'angular2/core';
import {FileDropZone} from '../index'

@Component({
    selector: 'my-app',
    directives: [FileDropZone],
    template: `<fileDropZone 
                    [config]="fileDroppaConfig"
                    (filesUpdated)="filesUpdated($event)">
               </fileDropZone>`
})
export class AppComponent {
    uploadEvent;
    fileDroppaConfig;

    constructor() {
        this.uploadEvent = new EventEmitter();
        this.fileDroppaConfig = {
            overCls: "customDrop",
            autoUpload: true,
            uploadUrl: "https://salty-taiga-80701.herokuapp.com/upload"
        };
    }

    filesUpdated(files) {
    }

}
