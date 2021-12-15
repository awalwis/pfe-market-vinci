import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useHistory } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import bcrypt from "bcryptjs";
import {authService} from "../../../services/auth.service";
import SelectInput from "@mui/material/Select/SelectInput";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const bcrypt = require('bcryptjs');

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password1: Yup.string().required('Mot de passe requis'),
    password2: Yup.string().required('Veuillez confirmer votre mot de passe')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
      campus:''
    },

    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log(formik.values)
      if (formik.values.password1!==formik.values.password2) {alert("mots de passe differents");return ;}
      let salt = bcrypt.genSaltSync(10);
      const userObject =
          {
            last_name: formik.values.lastName,
            first_name: formik.values.firstName,
            email: formik.values.email,
            password: bcrypt.hashSync(formik.values.password1, salt),
            campus: formik.values.campus,
          }
      if(authService.register(userObject)){
        //setNewUser(emptyUser);
        history.push("/")
      }
      history.push('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Prénom"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              fullWidth
              label="Nom"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Addresse mail"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
            <Select
                fullWidth
                label="Campus"
                {...getFieldProps('campus')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
            ><children></children></Select>

          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            {...getFieldProps('password1')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirmer mot de passe"
            {...getFieldProps('password2')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
