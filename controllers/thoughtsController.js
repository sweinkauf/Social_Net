const { Thought, User, Types } = require('../models/thought');

const ThoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById({ params }, res) {
        console.log("params sent", params)
        Thought.findOne({ _id: params.thoughtId })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thoughts" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    },
    
    addThought({ params, body }, res) {
        console.log("INCOMING BODY", body)
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedthought => {
                if (!deletedthought) {
                    return res.status(404).json({ message: 'No thought' });
                }
                return User.findOneAndUpdate(
                    { _id: params.username },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        console.log("INCOMING BODY", body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};
module.exports = ThoughtController