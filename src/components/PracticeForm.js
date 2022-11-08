import React, { useState } from 'react';

function PracticeForm(props) {
  const [enteredValue, setEnteredValue] = useState({
    fname: '',
    lname: '',
    email: '',
    pwd: '',
  })

  const [error, setError] = useState({
    fname: '',
    lname: '',
    email: '',
    pwd: ''
  })

  const [touched, setTouched] = useState({
    fname: false,
    lname: false,
    email: false,
    pwd: false
  })

  const nameRegEx = /^[a-zA-Z0-9._-]+$/;
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleChange = e => {
    const { name, value } = e.target;

    setEnteredValue({ ...enteredValue, [name]: value })

    if (e.type === 'blur') {
      setTouched({
        fname: true,
        lname: true,
        email: true,
        pwd: true
      })
    }

    // validation
    if (name === 'fname') {
      if (value !== '') {
        if (nameRegEx.test(value)) {
          setError({ ...error, fname: '' })
        } else {
          setError({ ...error, fname: 'Only Alphabet, Numbers and . - and _ are Allowed.' })
        }
      } else {
        setError({ ...error, fname: 'This field is required.' })
      }
    }

    if (name === 'email') {
      if (value !== "") {
        if (emailRegEx.test(value)) {
          setError({ ...error, email: '' })
        } else {
          setError({ ...error, email: 'Please enter valid email address' })
        }
      } else {
        setError({ ...error, email: 'This field is required.' })
      }
    }

    if (name === 'lname') {
      if (value !== '') {
        setError({ ...error, lname: '' })
      } else {
        setError({ ...error, lname: 'This field is required.' })
      }
    }

    if (name === 'pwd') {
      if (value !== '') {
        if (value.length >= 6) {
          setError({ ...error, pwd: '' })
        } else {
          setError({ ...error, pwd: 'Password must be 6-8 characters long.' })
        }
      } else {
        setError({ ...error, pwd: 'This field is required.' })
      }
    }
  }

  const submitHandler = event => {
    event.preventDefault()

    setTouched({
      fname: true,
      lname: true,
      email: true,
      pwd: true
    })

    if (!enteredValue.fname || !enteredValue.lname || !enteredValue.email) {
      setError({
        fname: !enteredValue.fname ? 'This field is required.' : '',
        lname: !enteredValue.lname ? 'This field is required.' : '',
        email: !enteredValue.email ? 'This field is required.' : '',
        pwd: !enteredValue.pwd ? 'This field is required.' : ''
      })
      return
    }

    if (error.fname || error.lname || error.email || error.pwd) {
      return;
    }

    console.log(enteredValue);
    setEnteredValue({ fname: '', lname: '', email: '', pwd: '' })
    setTouched({
      fname: false,
      lname: false,
      email: false,
      pwd: false
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="fname">First name:</label>
        <input value={enteredValue.fname} type="text" onBlur={handleChange} onChange={handleChange} name='fname' id='fname' placeholder='Please enter your first name' />
        {error.fname && touched.fname && <p className='error-message'>{error.fname}</p>}
      </div>
      <div>
        <label htmlFor="lname">Last Name:</label>
        <input value={enteredValue.lname} type="text" id='lname' onBlur={handleChange} onChange={handleChange} name='lname' placeholder='Please enter your last name' />
        {error.lname && touched.lname && <p className='error-message'>{error.lname}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input value={enteredValue.email} type="email" id='email' onBlur={handleChange} onChange={handleChange} name='email' placeholder='Please enter your email' />
        {error.email && touched.email && <p className='error-message'>{error.email}</p>}
      </div>
      <div>
        <label htmlFor="pwd">Password</label>
        <input value={enteredValue.pwd} type="password" id='pwd' onBlur={handleChange} onChange={handleChange} name='pwd' placeholder='Please enter your pwd' />
        {error.pwd && touched.pwd && <p className='error-message'>{error.pwd}</p>}
      </div>
      <button>Submit</button>
    </form>
  );
}

export default PracticeForm;