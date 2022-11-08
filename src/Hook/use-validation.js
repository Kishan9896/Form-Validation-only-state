const useValidation = (initialValue = {},) => {
  const [enteredValue, setEnteredValue] = useState({
    fname: '',
    lname: '',
    email: ''
  })

  const [error, setError] = useState({
    fname: '',
    lname: '',
    email: ''
  })

  const err = {
    fname: '',
    lname: '',
    email: ''
  }

  console.log(Object.keys(err))

  const succObj = {}

  Object.keys(err).forEach(item => {
    succObj[item] = '';
  })

  console.log(succObj)


  const [touched, setTouched] = useState({
    fname: false,
    lname: false,
    email: false
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
        email: true
      })
    }

    // validation
    if (name === 'fname') {
      if (value !== '') {
        if (nameRegEx.test(value)) {
          setError({ ...error, fname: '' })
        } else {
          if (touched.fname) {
            setError({ ...error, fname: 'Only Alphabet, Numbers and . - and _ are Allowed.' })
          }
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
          if (touched.email) {
            setError({ ...error, email: 'Please enter valid email address' })
          }
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
  }

  const handleSubmit = event => {
    event.preventDefault()

    setTouched({
      fname: true,
      lname: true,
      email: true
    })

    if (!enteredValue.fname || !enteredValue.lname || !enteredValue.email) {
      setError({
        fname: !enteredValue.fname ? 'This field is required.' : '',
        lname: !enteredValue.lname ? 'This field is required.' : '',
        email: !enteredValue.email ? 'This field is required.' : ''
      })
      return
    }

    if (error.fname || error.lname || error.email) {
      return;
    }

    console.log(enteredValue);
    setEnteredValue({ fname: '', lname: '', email: '' })
    setTouched({
      fname: false,
      lname: false,
      email: false
    })
  }

  return {
    values: enteredValue,
    errors: error,
    touched,
    handleChange,
    handleBlur: handleChange,
    handleSubmit
  }
}

export default useValidation