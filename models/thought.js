const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema (
    {
        thoughtTest: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type: String,
            required: true,
        },
        reaction:[{
            type: Schema.Types.ObjectId, ref: 'reactionSchema'
        }],
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
)
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thoughts = model('thought', thoughtsSchema);

module.export = Thoughts;
