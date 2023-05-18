// require
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// route users
router.route('/').get(getUsers).post(createUser);

// route user id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// route friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// export
module.exports = router;