import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      // Send OTP via email
      // Example: await sendOtpEmail(email, otp); // Implement this function
      setIsOtpSent(true);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to send OTP');
      setIsLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        if (!isOtpSent) {
          // Send OTP
          await sendOtp();
        } else {
          // Verify OTP
          // Example: const isOtpValid = await verifyOtp(otp); // Implement this function
          const isOtpValid = true; // For demonstration, always consider OTP valid
          if (isOtpValid) {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
          } else {
            toast.error('Invalid OTP');
          }
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        {/* Render form fields */}
        {/* Name, Email, Password, Confirm Password */}

        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {!isOtpSent ? (
          <Button disabled={isLoading} type='submit' variant='primary'>
            Send OTP
          </Button>
        ) : (
          <>
            <Form.Group className='my-2' controlId='otp'>
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button disabled={isLoading} type='submit' variant='primary'>
              Verify OTP & Register
            </Button>
          </>
        )}

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;

// import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';

// import { useRegisterMutation } from '../slices/usersApiSlice';
// import { setCredentials } from '../slices/authSlice';
// import { toast } from 'react-toastify';

// const RegisterScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [register, { isLoading }] = useRegisterMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get('redirect') || '/';

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//     } else {
//       try {
//         const res = await register({ name, email, password }).unwrap();
//         dispatch(setCredentials({ ...res }));
//         navigate(redirect);
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <FormContainer>
//       <h1>Register</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group className='my-2' controlId='name'>
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type='name'
//             placeholder='Enter name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group className='my-2' controlId='email'>
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Enter email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group className='my-2' controlId='password'>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Enter password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group className='my-2' controlId='confirmPassword'>
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Confirm password'
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button disabled={isLoading} type='submit' variant='primary'>
//           Register
//         </Button>

//         {isLoading && <Loader />}
//       </Form>

//       <Row className='py-3'>
//         <Col>
//           Already have an account?{' '}
//           <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
//             Login
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// };

// export default RegisterScreen;
