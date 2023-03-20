const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // This gets all users

  getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},

  // gets a single user

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // this creates a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },


  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : User.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: 'thoughts and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

   // this updates the user
   updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(user);
      })
      .catch(err => res.json(err));
  },

//  this adds a friend to the user
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.id } },
      { runValidators: true, new: true }
    )

      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

// this removes friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.id } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

 
};


