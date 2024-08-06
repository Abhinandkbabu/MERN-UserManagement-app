import React from 'react'

function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <p className='mb-4 text-slate-700'>
      Thank you for taking the time to review my work. This project was created as part of my studies and serves as a demonstration of my skills and learning.
      </p>
      <p className='mb-2 text-slate-800 font-bold'>Project Overview </p>
      <p className='text-slate-700 mb-4'>This is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). The application features robust authentication functionality utilizing JSON Web Tokens (JWT), allowing users to sign up, log in, and log out. Authenticated users gain access to protected routes, ensuring secure access control within the application</p>
      <p className='mb-2 text-slate-800 font-bold'>Key Features </p>
      <ul className='text-slate-800 list-disc ps-6'>
        <li><span className='font-bold'>Authentication:</span> JWT-based system enabling user sign-up, login, and logout.</li>
        <li><span className='font-bold'>Protected Routes:</span> Access control to ensure only authenticated users can access certain parts of the application.</li>
        <li><span className='font-bold'>Password Security:</span>  Bcrypt hashing to enhance password security by encrypting user passwords before storing them in the database.</li>
        <li><span className='font-bold'>Google Authentication:</span> Easy sign-in option through Google, providing a seamless and secure authentication process for users.</li>
      </ul>
      <p className="text-slate-700 mt-4">I am eager to further refine and enhance this project, aiming to achieve a professional standard in both functionality and design.</p>
    </div>
  )
}

export default About