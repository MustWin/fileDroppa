import {Injectable, EventEmitter, Output, Input, NgZone} from "@angular/core";

@Injectable()
export class FileUpload {
    private zone = new NgZone({enableLongStackTrace: false});
    public url = null;
    public beforeRequest = null;
    public beforeFileUpload = null;
    public fileUploadedEvent = new EventEmitter(true);

    uploadFiles(iFiles){
        return Promise.all(iFiles.reduce((res, iFile) => {
            return res.push(this.uploadFile(iFile)), res;
        }, []))
    }

    uploadFile(iFile) {
        if (!this.url) {
            throw "url to upload needs to be provided";
        }
        if (iFile.loading) {
            throw "Already under loading";
        }
        let that = this,
            formData = new FormData();


        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
            let progress = (event.loaded * 100) / event.total | 0;
            this.zone.run(()=> {
                iFile.percentage = progress;
            })
        };

        const pr = new Promise((resolve, reject)=> {
            xhr.onload = xhr.onerror = function (e) {
                that.zone.run(()=> {
                    if (this["status"] == 200) {
                        iFile.loading = false;
                        iFile.loadingSuccessful = true;
                        resolve(true);
                    } else {
                        iFile.loading = false;
                        iFile.loadingSuccessful = false;
                        reject(false);
                    }
                })
            };
        }).then((success)=>{
            this.fileUploadedEvent.emit([success, xhr.response, iFile, xhr]);
        });

        iFile.loading = true;

        xhr.open("POST", this.url, true);

        //Hook before request to provide user ability to add headers or something else in XHR
        typeof this.beforeRequest === "function" && this.beforeRequest(xhr);

        formData.append(`${iFile.File.name}`, iFile.File);

        if(typeof this.beforeFileUpload === "function"){
            Promise.resolve(this.beforeFileUpload(formData)).then((formData)=> {
                formData && xhr.send(formData);
                formData || console.warn(`beforeFileUpload didn't return formData for ${iFile.File.name} and upload was aborted`);
            });
        } else {
            xhr.send(formData);
        }

        return pr;
    }


}
