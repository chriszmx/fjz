import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    middleName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

function Application() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const docRef = await addDoc(collection(db, "application"), {
                    "first name": values.firstName,
                    "middle name": values.middleName,
                    "last name": values.lastName,
                });

                console.log("Document written with ID: ", docRef.id);

                formik.resetForm();
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" {...formik.getFieldProps('firstName')} />
            {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

            <label htmlFor="middleName">Middle Name</label>
            <input id="middleName" type="text" {...formik.getFieldProps('middleName')} />
            {formik.touched.middleName && formik.errors.middleName ? <div>{formik.errors.middleName}</div> : null}

            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
            {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

            <button type="submit">Submit</button>
        </form>
    );
}

export default Application;
