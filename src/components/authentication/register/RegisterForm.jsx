import * as Yup from 'yup';
import {useEffect, useState} from 'react';
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
import {FormControl, FormHelperText, InputLabel, MenuItem} from "@material-ui/core";

// ----------------------------------------------------------------------


export default function RegisterForm() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [campus, setCampus] = useState("Woluwe");
  const bcrypt = require('bcryptjs');

  const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Prénom requis';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
      errors.lastName = 'Nom requis';
    } else if (values.lastName.length < 2) {
      errors.lastName = 'Nom trop court';
    }

    if (!values.email) {
      errors.email = 'Email requis';
    } else if (!/^[a-z]+.[a-z]+@(student.)?vinci.be/i.test(values.email)) {
      errors.email = 'Format non valide';
    }

    if (!values.password1) {
      errors.password1 = 'Mot de passe requis';
    } else if (values.password1.length<6) {
      errors.password1 = 'Mot de passe trop court';
    }
    if (!values.password2) {
      errors.password1 = 'Veuillez confirmer votre mot de passe';
    } else if (values.password1!==values.password2) {
      errors.password2 = 'Les mots de passe ne concordent pas';
    }
    if (!values.campus) {
      errors.campus = 'Campus requis';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
      campus:''
    },
    validate,
    onSubmit: () => {
      console.log("submit:")
      console.log(formik.values)

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
        console.log("registered")
        history.push("/login")
        return;
      }
      console.log("problem ?")
       history.push("/register")
    }
  });


  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  let campuses = [
    {
      value: 'Woluwe',
      label: 'Woluwe',
    },
    {
      value: 'Ixelles',
      label: 'Ixelles',
    },
    {
      value: 'Louvain la neuve',
      label: 'Louvain la neuve',
    }
  ];


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
            <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Campus"
                value={campus}
                onChange={(e)=>{setCampus(e.target.value)}}
                {...getFieldProps('campus')}
                error={Boolean(touched.campus && errors.campus)}
                helperText={touched.campus && errors.campus}
            >
              {campuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>

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
            error={Boolean(touched.password1 && errors.password1)}
            helperText={touched.password1 && errors.password1}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirmer mot de passe"
            {...getFieldProps('password2')}
            error={Boolean(touched.password2 && errors.password2)}
            helperText={touched.password2 && errors.password2}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password2 && errors.password2)}
            helperText={touched.password2 && errors.password2}
          />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            S'inscrire
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
