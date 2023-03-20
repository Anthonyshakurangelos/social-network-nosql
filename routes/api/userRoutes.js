const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getSingleUser).delete(deleteUser);

router.route('/:id').put(updateUser);

router.route('/:id/friends/:id').post(addFriend);

router.route('/:id/friends/:id').delete(removeFriend);

module.exports = router;
