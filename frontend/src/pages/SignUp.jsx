import {Link, useNavigate} from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { useState } from 'react';
import Swal from 'sweetalert2'
import OAuth from '../components/OAuth';
axios.defaults.withCredentials = true;

function SignUp() {

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function sweetAlert(icon,title){

    // return Swal.fire({
    //   position: "center",
    //   icon,
    //   title,
    //   showConfirmButton: false,
    //   timer: 1500,
    // });

    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.style.backgroundColor = '	#ede9ee';
        toast.style.color = '#d94a4e'
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icon,
      title: title
    });
    return
  }

  const submitForm = async (values) => {
    const formData = JSON.stringify(values, null, 2);
  
    try {
      setLoading(true)
      setError(false)

      const res = await axios.post('http://localhost:3000/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = res.data;
      setLoading(false)
      if(data) navigate('/sign-in')

    } catch (error) {
      setLoading(false)
      setError(true)

      if (error.response) {
      sweetAlert('info','Email Already in Use')
      
    } else if (error.request) {
      sweetAlert('error','Server not Responding')
    } else {
      sweetAlert('error', "Something Went Wrong")
    }
      console.error(error);
    }
  };

 
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters long')
      .required('Username is required'), 
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: submitForm
  });



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
          <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder='Username'
            id='username'
            name='username'
            className='bg-slate-100 p-3 rounded-lg outline-none'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500">{formik.errors.username}</div>
          ) : null}

          <input
            type="email"
            placeholder='Email'
            id='email'
            name='email'
            className='bg-slate-100 p-3 rounded-lg outline-none'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 m-0 p-0">{formik.errors.email}</div>
          ) : null}

          <input
            type="password"
            placeholder='Password'
            id='password'
            name='password'
            className='bg-slate-100 p-3 rounded-lg outline-none'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}

          <input
            type="password"
            placeholder='Confirm Password'
            id='confirmPassword'
            name='confirmPassword'
            className='bg-slate-100 p-3 rounded-lg outline-none'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          ) : null}

          <button
            type="submit"
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            disabled={formik.isSubmitting || loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
          <OAuth /> 
      <div className='flex gap-2 mt-5'>
        <p>Have an accout ?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
      <div className="flex justify-center items-center w-full">
        <p className="text-red-700 mt-5">{error && 'Something went wrong!'}</p>
      </div>
    </div>
  )
}

export default SignUp
