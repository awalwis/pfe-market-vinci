import {useHistory} from "react-router-dom";
import {useState} from "react";
import {Form, FormikProvider, useFormik} from "formik";
import { Stack, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import {LoadingButton} from "@mui/lab";
import ProfileData from "./ProfileData";
import {authService} from 'services/auth.service'
import { userService } from "services/users.service";
import UpdatePwd from "./UpdatePwd";


const UpdateProfile =  (user) => {
    const history = useHistory();
    const [campus, setCampus] = useState("Woluwe");
    const [page, setPage] = useState("updateUser")
    const submitValues = async () =>{
        const userget = await userService.getByEmail(user.user.email)
        const userObject =
            {
                last_name: formik.values.lastName,
                first_name: formik.values.firstName,
                email: formik.values.email,
                campus: formik.values.campus,
                password: userget.data.user.password,
                role: userget.data.user.role
            }
        if (userService.update(user.user.id_user,userObject)) {
            history.push("/login")
            authService.logout();
            return;
        }
   
        history.push("/register")
    
        }

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

        if (!values.campus) {
            errors.campus = 'Campus requis';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            firstName: user.user.first_name,
            lastName: user.user.last_name,
            email: user.user.email,
            campus: user.user.campus
        },
        validate,
        onSubmit: submitValues
    });


    const {errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

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
    

    const annuler = () => {
        setPage("displayUser")
    }
    if (page==="displayUser")return <ProfileData/>
    if (page==="updatePwd")return <UpdatePwd user={user}/>

    return (
        <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
            <TextField
              fullWidth
              label="Prénom"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              defaultValue={user.first_name}
            />
            <TextField
              fullWidth
              label="Nom"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

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
            <LoadingButton
            fullWidth
            size="medium"
            type="button"
            variant="outlined"
            onClick={()=>{setPage("updatePwd")}}  
            >
            Modifier mot de passe
          </LoadingButton>

          
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
            onClick={annuler}
            color="error"
          >
            Annuler
          </LoadingButton>
          

          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
    );
}
export default UpdateProfile