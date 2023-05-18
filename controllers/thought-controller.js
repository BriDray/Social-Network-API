// requiring the models
const { Thought, User } = require('../models');

// Getting all the thoughts from the DB
const thoughtController = {
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find()
        .sort({ createdAt: -1 });

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Getting one thought by using the id
  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });

    //   error
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Creating a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);

      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

    // Error
      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

    // Success!
      res.json({ message: 'Thought successfully created!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Updating a thought!
  async updateThought(req, res) {
    const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

    // error
    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
// return thought data
    res.json(dbThoughtData);

    console.log(err);
    res.status(500).json(err);
  },
  // Removing a thought
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId })

    //   error
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      // removing a thought id from the user's `thoughts`
      const dbUserData = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

    // error
      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

    // success!
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Adding a reation to a thought
  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

    //   error
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Removing a reaction from a thought
  async removeReaction(req, res) {
    try {
        // update
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

    //   error
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

// exporting thought controller
module.exports = thoughtController;
