import {Link , useNavigate} from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { useState } from 'react';
import Swal from 'sweetalert2'

function SignIn() {

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function sweetAlert(icon,title){

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

      const res = await axios.post('http://localhost:3000/api/auth/signin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await res.data;
      if(data) navigate('/')
      setLoading(false)

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
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: submitForm
  });



  return (
    <div className='p-3 max-w-lg mx-auto my-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
          <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>

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

          <button
            type="submit"
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            disabled={formik.isSubmitting || loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an accout ?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <div className="flex justify-center items-center w-full">
        <p className="text-red-700 mt-5">{error && 'Something went wrong!'}</p>
      </div>
    </div>
  )
}

export default SignIn
