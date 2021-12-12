import React, { useEffect, useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import * as mediasApi from "services/mediasApi"


const FileUploadComponent = (id,handle) => {

    const [url,setFileUrl]=useState("")
    const [type,setFileType]=useState("")
    const id_ad=id.id
    
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
         mediasApi.createNewMedia(newMedia)
         handle()
  
       
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
            accept="image/*,audio/*,video/*"
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