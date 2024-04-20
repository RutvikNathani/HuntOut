// import express from 'express';
// import {
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
//   getUsers,
//   deleteUser,
//   getUserById,
//   updateUser,
// } from '../controllers/userController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.route('/').post(registerUser).get(protect, admin, getUsers);
// router.post('/auth', authUser);
// router.post('/logout', logoutUser);
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router
//   .route('/:id')
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);

// const sendEmailToAdmin = require('../../frontend/src/utils/email.js');

// router.post('/send-email', async (req, res) => {
//   const { email, message } = req.body;
//   try {
//     await sendEmailToAdmin(
//       'New Message from User',
//       `Email: ${email}\n\nMessage: ${message}`
//     );
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Failed to send email');
//   }
// });

// export default router;
// userRoutes.js

import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
