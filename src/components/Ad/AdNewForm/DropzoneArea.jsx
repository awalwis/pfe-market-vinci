import React, { useState } from "react";
import { Theaters } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';


const DropzoneAreaComponent = (props) => {

    const [key, setKey] = useState(0);

    const handlePreviewIcon = (fileObject, classes) => {
        const {type} = fileObject.file
        const iconProps = {
          className : classes.image,
        }
      
        if (type.startsWith("video/")) return <Theaters {...iconProps} />
        else return <img className="MuiDropzonePreviewList-image" role="presentation" src={fileObject.data}/>
      

    }

    const addFile = (fileName) => {
        props.setMedias(fileName);
    }

    const addMessage = (fileName) => {
        toast.success(fileName+' ajouté avec succès', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
    }

    const removeMessage = (fileName) => {
        toast.info('Fichier '+fileName+' supprimé', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
    }

    const rejectMessage = (files) => {
        toast.error('Le fichier '+files.name+' n\'est pas autorisé', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
    }

    const limitMessage = (filesLimit) => {
        toast.warn('Seul les fichier de moins de '+filesLimit+' sont autorisé"', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
    }
    
    return(
        <Box component="span" sx={{ p: 5 }}>
        <DropzoneArea
            key={key}
            dropzoneText={"Drag and drop an image or video here or click"}
            onChange={addFile}
            acceptedFiles={['image/*,video/*']}
            getPreviewIcon={handlePreviewIcon}
            filesLimit={9}
            fileObjects
            maxFileSize={7000000}
            clearOnUnmount={true}
            getFileAddedMessage={(fileName)=>{addMessage(fileName)}}
            getFileRemovedMessage={(fileName)=>{removeMessage(fileName)}}
            getDropRejectMessage={(rejectedFile)=>{rejectMessage(rejectedFile)}}  
            getFileLimitExceedMessage={(filesLimit)=>{limitMessage(filesLimit)}}  
            classesName={"MuiSnackbar-anchorOriginBottomRight"}
            showAlerts={false}
        />
        </Box>
    )
}
export default DropzoneAreaComponent;
