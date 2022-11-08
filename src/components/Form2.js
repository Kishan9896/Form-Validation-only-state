import React, { useState } from 'react';

function PracticeForm(props) {
  const [common, setCommon] = useState({
    fname: '',
    lname: '',
    email: '',
    pwd: '',
    fnameErr: '',
    lnameErr: '',
    emailErr: '',
    pwdErr: '',
    fnameTouched: false,
    lnameTouched: false,
    emailTouched: false,
    pwdTouched: false
  })

  const nameRegEx = /^[a-zA-Z0-9._-]+$/;
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleCommonChange = obj => {
    setCommon({ ...common, ...obj })
  }

  const handleChange = e => {
    const { name, value } = e.target;

    // setCommon({ ...common, [name]: value })
    handleCommonChange({ [name]: value })

    if (e.type === 'blur') {
      handleCommonChange({
        fnameTouched: true,
        lnameTouched: true,
        emailTouched: true,
        pwdTouched: true
      })
    }

    // validation
    if (name === 'fname') {
      if (value !== '') {
        if (nameRegEx.test(value)) {
          handleCommonChange({ fnameErr: '' })
        } else {
          handleCommonChange({ fnameErr: 'Only Alphabet, Numbers and . - and _ are Allowed.' })
        }
      } else {
        handleCommonChange({ fnameErr: 'This field is required.' })
      }
    }

    if (name === 'email') {
      if (value !== "") {
        if (emailRegEx.test(value)) {
          handleCommonChange({ emailErr: '' })
        } else {
          handleCommonChange({ fnameErr: 'Please enter valid email address' })
        }
      } else {
        handleCommonChange({ emailErr: 'This field is required.' })
      }
    }

    if (name === 'lname') {
      if (value !== '') {
        handleCommonChange({ lnameErr: '' })
      } else {
        handleCommonChange({ lnameErr: 'This field is required.' })
      }
    }

    if (name === 'pwd') {
      if (value !== '') {
        if (value.length >= 6) {
          handleCommonChange({ pwdErr: '' })
        } else {
          handleCommonChange({ pwdErr: 'Password must be 6-8 characters long.' })
        }
      } else {
        handleCommonChange({ pwdErr: 'This field is required.' })
      }
    }
  }

  const submitHandler = event => {
    event.preventDefault()

    handleCommonChange({
      fnameTouched: true,
      lnameTouched: true,
      emailTouched: true,
      pwdTouched: true
    })

    if (!common.fname || !common.lname || !common.email) {
      setCommon({
        fnameErr: !common.fname ? 'This field is required.' : '',
        lnameErr: !common.lname ? 'This field is required.' : '',
        emailErr: !common.email ? 'This field is required.' : '',
        pwdErr: !common.pwd ? 'This field is required.' : ''
      })
      return
    }

    if (common.fnameErr || common.lnameErr || common.emailErr || common.pwdErr) {
      return;
    }

    console.log(common);
    setCommon({ fname: '', lname: '', email: '', pwd: '' })
    handleCommonChange({
      fnameTouched: false,
      lnameTouched: false,
      emailTouched: false,
      pwdTouched: false
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="fname">First name:</label>
        <input value={common.fname} type="text" onBlur={handleChange} onChange={handleChange} name='fname' id='fname' placeholder='Please enter your first name' />
        {common.fnameErr && common.fnameTouched && <p className='common-message'>{common.fnameErr}</p>}
      </div>
      <div>
        <label htmlFor="lname">Last Name:</label>
        <input value={common.lname} type="text" id='lname' onBlur={handleChange} onChange={handleChange} name='lname' placeholder='Please enter your last name' />
        {common.lnameErr && common.lnameTouched && <p className='common-message'>{common.lnameErr}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input value={common.email} type="email" id='email' onBlur={handleChange} onChange={handleChange} name='email' placeholder='Please enter your email' />
        {common.emailErr && common.emailTouched && <p className='common-message'>{common.emailErr}</p>}
      </div>
      <div>
        <label htmlFor="pwd">Password</label>
        <input value={common.pwd} type="password" id='pwd' onBlur={handleChange} onChange={handleChange} name='pwd' placeholder='Please enter your pwd' />
        {common.pwdErr && common.pwdTouched && <p className='common-message'>{common.pwdErr}</p>}
      </div>
      <button>Submit</button>
    </form>
  );
}

export default PracticeForm;