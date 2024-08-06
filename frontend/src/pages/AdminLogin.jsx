import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {

    const navigate = useNavigate()
    const [error,setError] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post('http://localhost:3000/api/admin/signin', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = res.data
     
      if(data.success){
            navigate('/admin-Home')
            setError(false)
      }else setError(true)

    } catch (error) {
      setError(true)
    } finally {
      setSubmitting(false); // Set submitting to false after form submission
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto my-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Admin Sign in</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className='w-full'>
              <Field
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                className="bg-slate-100 p-3 rounded-lg outline-none w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className='w-full'>
              <Field
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                className="bg-slate-100 p-3 rounded-lg outline-none w-full"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </Form>
        )}
      </Formik>
      <p className='text-red-700'>{error ? 'invalid username or password' : ''}</p>
    </div>
  );
};

export default AdminLogin;
