import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation hook
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import heroImage from '../assets/hero-image.jpg'; // Import your hero image
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation(); // Get current location

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  // Check if current location is the home page
  const isHomePage = location.pathname === '/';

  return (
    <header>
      <Navbar
        bg='primary'
        variant='dark'
        expand='lg'
        collapseOnSelect
        fixed='top'
      >
        {' '}
        {/* Add fixed='top' */}
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>H U N T O U T</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Conditionally render hero section only on the home page */}
      {isHomePage && (
        <div
          className='hero-section primary'
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '500px',
            marginTop: '50px',
          }}
        >
          {/* Hero content */}
          <Container className='h-100 '>
            {/* <div className='align-items-center h-100'>
              <div>
                <h1 className='text-light text-center'>Your Hero Heading</h1>
                <p className='text-light text-center'>Your hero subheading</p>
              </div>
            </div> */}
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;

// import React from 'react';
// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
// import { FaShoppingCart, FaUser } from 'react-icons/fa';
// import { LinkContainer } from 'react-router-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation hook
// import { useLogoutMutation } from '../slices/usersApiSlice';
// import { logout } from '../slices/authSlice';
// import SearchBox from './SearchBox';
// import heroImage from '../assets/hero-image.jpg'; // Import your hero image
// import { resetCart } from '../slices/cartSlice';

// const Header = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.auth);
//   const location = useLocation(); // Get current location

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       dispatch(resetCart());
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Check if current location is the home page
//   const isHomePage = location.pathname === '/';

//   return (
//     <header>
//       <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
//         <Container>
//           <LinkContainer to='/'>
//             <Navbar.Brand>H U N T O U T</Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls='basic-navbar-nav' />
//           <Navbar.Collapse id='basic-navbar-nav'>
//             <Nav className='ms-auto'>
//               <SearchBox />
//               <LinkContainer to='/cart'>
//                 <Nav.Link>
//                   <FaShoppingCart /> Cart
//                   {cartItems.length > 0 && (
//                     <Badge pill bg='success' style={{ marginLeft: '5px' }}>
//                       {cartItems.reduce((a, c) => a + c.qty, 0)}
//                     </Badge>
//                   )}
//                 </Nav.Link>
//               </LinkContainer>
//               {userInfo ? (
//                 <>
//                   <NavDropdown title={userInfo.name} id='username'>
//                     <LinkContainer to='/profile'>
//                       <NavDropdown.Item>Profile</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item onClick={logoutHandler}>
//                       Logout
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </>
//               ) : (
//                 <LinkContainer to='/login'>
//                   <Nav.Link>
//                     <FaUser /> Sign In
//                   </Nav.Link>
//                 </LinkContainer>
//               )}

//               {/* Admin Links */}
//               {userInfo && userInfo.isAdmin && (
//                 <NavDropdown title='Admin' id='adminmenu'>
//                   <LinkContainer to='/admin/productlist'>
//                     <NavDropdown.Item>Products</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to='/admin/orderlist'>
//                     <NavDropdown.Item>Orders</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to='/admin/userlist'>
//                     <NavDropdown.Item>Users</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Conditionally render hero section only on the home page */}
//       {isHomePage && (
//         <div
//           className='hero-section'
//           style={{
//             backgroundImage: `url(${heroImage})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             height: '500px',
//           }}
//         >
//           {/* Hero content */}
//           <Container className='h-100 '>
//             {/* <div className='align-items-center h-100'>
//               <div>
//                 <h1 className='text-light text-center'>Your Hero Heading</h1>
//                 <p className='text-light text-center'>Your hero subheading</p>
//               </div>
//             </div> */}
//           </Container>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
