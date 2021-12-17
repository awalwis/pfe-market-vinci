import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { toast, ToastContainer } from 'react-toastify';
// material
import {
    Stack,
    TextField,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import {useState} from "react";

import "styles/style.css"
import {useHistory} from "react-router-dom";
import {authService} from "services/auth.service";

const LoginForm = () => {
    const history = useHistory();

    const [refreshKey, setRefreshKey] = useState(0);

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Format non valide').required('Email requis'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            authService.login(formik.values.email,formik.values.password).then((response)=>{
                if(response === null){                    
                    toast.error('Erreur: Adresse email ou mot de passe invalide', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored'
                    });
                    setRefreshKey(refreshKey+1);
                    formik.setFieldValue("email","");
                    formik.setFieldValue("password","");
                    formik.setSubmitting(false);
                }else if(response==='banni'){
                    toast.error('Erreur: Votre compte a été suspendu.', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored'
                    });
                    setRefreshKey(refreshKey+1);
                    formik.setFieldValue("email","");
                    formik.setFieldValue("password","");
                    formik.setSubmitting(false);
                    
                }else{history.push("/"); }
            });
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };



    return (    
    <>
    <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Adresse mail"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />
                <TextField
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Mot de passe"
                    {...getFieldProps('password')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword} edge="end">
                                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                />
                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Connexion
                </LoadingButton>
            </Stack>


        </Form>
        </FormikProvider>
    <ToastContainer/>
    </>
    )
}
export default LoginForm;


