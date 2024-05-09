import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    addResponseMessage('Welcome to our website! How can I assist you today?');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    // Handle user's message here
    addResponseMessage(`You said: ${newMessage}`);
  };

  const handleChatButtonClick = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };

  return (
    <>
      {!keyword ? (
        <ProductCarousel hide={true} />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Our Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
      {/* Chatbot widget */}
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title='Chat with Seller'
        subtitle='Ask anything about the product!'
        senderPlaceHolder='Type a message...'
        profileAvatar='/path/to/seller-avatar.png' // Profile picture of the seller
        showCloseButton={false}
        fullScreenMode={false}
        isOpen={isChatOpen}
        handleToggle={handleChatButtonClick}
      />

      {/* Chatbot button */}
      {/* <button className='chatbot-button' onClick={handleChatButtonClick}>
        Chat with Seller
      </button> */}
    </>
  );
};

export default HomeScreen;

// // // // // // // // import React, { useEffect } from 'react';
// // // // // // // // import { Row, Col } from 'react-bootstrap';
// // // // // // // // import { useParams } from 'react-router-dom';
// // // // // // // // import { useGetProductsQuery } from '../slices/productsApiSlice';
// // // // // // // // import { Link } from 'react-router-dom';
// // // // // // // // import Product from '../components/Product';
// // // // // // // // import Loader from '../components/Loader';
// // // // // // // // import Message from '../components/Message';
// // // // // // // // import Paginate from '../components/Paginate';
// // // // // // // // import ProductCarousel from '../components/ProductCarousel';
// // // // // // // // import Meta from '../components/Meta';
// // // // // // // // import { Widget, addResponseMessage } from 'react-chat-widget';
// // // // // // // // import 'react-chat-widget/lib/styles.css';

// // // // // // // // const HomeScreen = () => {
// // // // // // // //   const { pageNumber, keyword } = useParams();

// // // // // // // //   const { data, isLoading, error } = useGetProductsQuery({
// // // // // // // //     keyword,
// // // // // // // //     pageNumber,
// // // // // // // //   });

// // // // // // // //   // Initialize the chat widget on component mount
// // // // // // // //   useEffect(() => {
// // // // // // // //     addResponseMessage('Welcome to our website! How can I assist you today?');
// // // // // // // //   }, []);

// // // // // // // //   return (
// // // // // // // //     <>
// // // // // // // //       {!keyword ? (
// // // // // // // //         <ProductCarousel hide={true} />
// // // // // // // //       ) : (
// // // // // // // //         <Link to='/' className='btn btn-light mb-4'>
// // // // // // // //           Go Back
// // // // // // // //         </Link>
// // // // // // // //       )}
// // // // // // // //       {isLoading ? (
// // // // // // // //         <Loader />
// // // // // // // //       ) : error ? (
// // // // // // // //         <Message variant='danger'>
// // // // // // // //           {error?.data?.message || error.error}
// // // // // // // //         </Message>
// // // // // // // //       ) : (
// // // // // // // //         <>
// // // // // // // //           <Meta />
// // // // // // // //           <h1>Our Latest Products</h1>
// // // // // // // //           <Row>
// // // // // // // //             {data.products.map((product) => (
// // // // // // // //               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
// // // // // // // //                 <Product product={product} />
// // // // // // // //               </Col>
// // // // // // // //             ))}
// // // // // // // //           </Row>
// // // // // // // //           <Paginate
// // // // // // // //             pages={data.pages}
// // // // // // // //             page={data.page}
// // // // // // // //             keyword={keyword ? keyword : ''}
// // // // // // // //           />
// // // // // // // //         </>
// // // // // // // //       )}
// // // // // // // //       {/* Render the chat widget */}
// // // // // // // //       <Widget
// // // // // // // //         handleNewUserMessage={(newMessage) => {
// // // // // // // //           // Handle new user message here
// // // // // // // //           // For demo purposes, we'll just echo the message
// // // // // // // //           addResponseMessage(`You said: ${newMessage}`);
// // // // // // // //         }}
// // // // // // // //         title='Live Chat'
// // // // // // // //         subtitle='Ask me anything!'
// // // // // // // //         senderPlaceHolder='Type a message...'
// // // // // // // //         profileAvatar='https://example.com/avatar.png' // Provide a URL to an avatar image
// // // // // // // //       />
// // // // // // // //     </>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default HomeScreen;

// import { Row, Col } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import { useGetProductsQuery } from '../slices/productsApiSlice';
// import { Link } from 'react-router-dom';
// import Product from '../components/Product';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import Paginate from '../components/Paginate';
// import ProductCarousel from '../components/ProductCarousel';
// import Meta from '../components/Meta';

// const HomeScreen = () => {
//   const { pageNumber, keyword } = useParams();

//   const { data, isLoading, error } = useGetProductsQuery({
//     keyword,
//     pageNumber,
//   });

//   return (
//     <>
//       {!keyword ? (
//         <ProductCarousel hide={true} />
//       ) : (
//         <Link to='/' className='btn btn-light mb-4'>
//           Go Back
//         </Link>
//       )}
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant='danger'>
//           {error?.data?.message || error.error}
//         </Message>
//       ) : (
//         <>
//           <Meta />
//           <h1> Our Latest Products</h1>
//           <Row>
//             {data.products.map((product) => (
//               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>
//             ))}
//           </Row>
//           <Paginate
//             pages={data.pages}
//             page={data.page}
//             keyword={keyword ? keyword : ''}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default HomeScreen;
