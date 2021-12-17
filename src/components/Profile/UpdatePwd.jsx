import { useState } from "react";
import {useHistory} from "react-router-dom";
import {Card} from "react-bootstrap";
import {userService} from "../../services/users.service";
import { Icon } from '@iconify/react';
import "styles/style.css"
import {authService} from "services/auth.service"
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Form, FormikProvider, useFormik} from "formik";
import { Stack, TextField, IconButton, InputAdornment, Select } from '@mui/material';
import {LoadingButton} from "@mui/lab";
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import ProfileData from "./ProfileData";

const UpdatePwd = (user) => {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [updatedUser, setUpdatedUser] = useState()
    const [modifPwd, setModifPwd] = useState(false);
    const [page, setPage] = useState("updatePwd")
    const bcrypt = require('bcryptjs');




    const validate = values => {
        const errors = {};
        if (!values.currentPwd) {
            errors.currentPwd = 'Entrez votre mot de passe actuel';
        } 
        if (!values.newPwd1) {
            errors.newPwd1 = 'Entrez votre nouveau mot de passe';
        } else{
            if(values.newPwd1.length <6)errors.newPwd2 = 'Mot de passe trop court';
        }
        if (!values.newPwd2) {
            errors.newPwd2 = 'Confirmez votre nouveau mot de passe';
        }else if (values.newPwd1!==values.newPwd2) {
            errors.newPwd2 = 'Les mots de passe ne concordent pas';
          }

        return errors;
    };

    async function checkPassword () {
    
        let currentUser = authService.getCurrentUser();
        let userUpdated = await userService.getById(currentUser.id_user);
        let userPassword=userUpdated.user.password;
        if(!bcrypt.compareSync(formik.values.currentPwd,userPassword)){
            toast.error('Erreur: mot de passe actuel incorrect', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });

        }else {
            toast.success('Succès: Mot de passe mis à jour', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
            let salt = bcrypt.genSaltSync(10);

            let newPassword = {
                first_name: userUpdated.user.first_name,
                last_name: userUpdated.user.last_name, 
                role: userUpdated.user.role,
                campus: userUpdated.user.campus,
                email: userUpdated.user.email,
                password: bcrypt.hashSync(formik.values.newPwd1, salt),
            }
           
            userService.update(userUpdated.user.id_user, newPassword);
            history.push("/home")
        } 
    }
    

    const formik = useFormik({
        initialValues: {
            currentPwd: '',
            newPwd1: '',
            newPwd2: ''
        },
        validate,
        onSubmit: checkPassword
    });


    const {errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

    if(page==="displayUser")return( <ProfileData/>)

    return(<>        
    <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            {...getFieldProps('currentPwd')}

            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.currentPwd && errors.currentPwd)}
            helperText={touched.currentPwd && errors.currentPwd}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Nouveau mot de passe"
            {...getFieldProps('newPwd1')}

            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.newPwd1 && errors.newPwd1)}
            helperText={touched.newPwd1 && errors.newPwd1}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirmer mot de passe"
            {...getFieldProps('newPwd2')}
            error={Boolean(touched.newPwd2 && errors.newPwd2)}
            helperText={touched.newPwd2 && errors.newPwd2}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}

          />  
            
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Confirmer
            </LoadingButton>
            <LoadingButton
              fullWidth
              size="large"
              type="button"
              variant="contained"
              loading={isSubmitting}
              onClick={()=>{setPage("displayUser")}}
              color="error"
            >
              Annuler
            </LoadingButton>
            
  
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
      <ToastContainer/>

        
   </>)
}

export default UpdatePwd;

