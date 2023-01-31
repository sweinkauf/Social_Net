

Reaction.init(
    {
        reactionId: {
            type: DataTypes.ObjectId,
            defaultValue: new ObjectId,
        },
        reactionBody:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        username:{
            type: DataTypes.STRING,
        },
        createdAt:{
            timestamps: true,
        },
    }
)