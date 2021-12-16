import {useHistory} from "react-router-dom";
import {useState} from "react";
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import bcrypt from "bcryptjs";
import {authService} from "../../services/auth.service";
import {Button, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import {Icon} from "@iconify/react/dist/iconify";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import {LoadingButton} from "@mui/lab";
import ProfileData from "./ProfileData";



const UpdateProfile =  (user) => {

    const history = useHistory();
    const [campus, setCampus] = useState("Woluwe");
    const [page, setPage] = useState("updateUser")

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
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            campus: user.campus
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
            if (authService.register(userObject)) {
                console.log("registered")
                history.push("/login")
                return;
            }
            console.log("problem ?")
            history.push("/register")
        }
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

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
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
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <TextField
                            placeholder={user.email}
                            disabled
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
                            onChange={(e) => {
                                setCampus(e.target.value)
                            }}
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

                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Confirmer
                    </LoadingButton>
                    <Button
                        fullWidth
                        size="large"
                        type="button"
                        variant="contained"
                        color={"error"}
                        onClick={annuler}
                    >
                        Annuler
                    </Button>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
export default UpdateProfile