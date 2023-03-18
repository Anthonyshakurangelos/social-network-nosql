const { ObjectId }= require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

  // Get all thoughts

  getThought(req, res) {
    Thought.find()
      .then(thoughts => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then(thoughts => {
        if (!thoughts) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        res.json(thoughts);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Create a thought

  createThought({ body }, res) {
    Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.id },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(thoughts => {
            if (!thoughts) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(thoughts);
        })
        .catch(err => res.json(err));
  },
  
  // Delete a thought

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(thoughts => {
        if (!thoughts) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: parmas.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        )
      })
      .then(thoughts => {
        if (!thoughts) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(thoughts);
      })
      .catch(err => res.json(err));
  },
//  creates reaction
createReaction({params}, res) {
  Thought.findOneAndUpdate({ _id: params.id })
    .then(thoughts => {
      if (!thoughts) {
        res.status(404).json({ message: 'No thoughts found with that id!' });
        return;
      }
      return User.findOneAndUpdate(
        {_id: req.params.id},
        {
            $addToSet: {reactions: req.body}
        },
        {new: true}
    )
    })
    .then(thoughts => {
      if (!thoughts) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(thoughts);
    })
    .catch(err => res.json(err));
},
//  deletes reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { id: params.id } } },
      { new: true }
    )
      .then(thoughts => {
        if (!thoughts) {
          res.status(404).json({ message: 'No reaction with this ID!'});
          return;
        }
       res.json(thoughts);
      })
      .catch(err => res.json(err));
  },
};
