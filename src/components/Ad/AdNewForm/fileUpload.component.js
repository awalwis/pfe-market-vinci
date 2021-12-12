import React, {useState} from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import {mediaService} from "services/medias.service"


const FileUploadComponent = (id) => {

    const [url2,setFileUrl]=useState("")
    const [type,setFileType]=useState("")
    const id_ad=id.id
    const url ="https://pfemedias.blob.core.windows.net/medias/hqdefault.jpg"
    
    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }

    const onFileChange = ({ meta, file }, status) => { 
        if(status==="done"){
            setFileUrl(meta.previewUrl)
            setFileType(meta.type.split("/")[0])
        }
    }

    const onSubmit = (files, allFiles) => {
        allFiles.forEach(f =>{ 
            f.remove()
        })
        const newMedia = {
            url,
            type,
            id_ad,
        };
        console.log(newMedia)
        mediaService.createNewMedia(newMedia)   
    }

    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }

    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Upload Again' : 'Select File'

        return (
            <label className="btn btn-danger mt-4">
                {textMsg}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
            </label>
        )
    }

    return (
        <Dropzone
            onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*,video/*"
            maxFiles={1}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: 200, height: 200 },
                dropzoneActive: { borderColor: 'green' },
            }}            
        />
    );
};

export default FileUploadComponent;