import mongoose, {Schema, Model, model} from 'mongoose';

const PostSchema = new Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    serviceTitle: {
        type: String,
        required: true
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true,
            default: "Point"
        },

        coordinates: {
            type: [Number],   // longitude first and then latitude
            // required: true
        }
    },

    serviceType: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['PENDING', 'BOOKED' ,'COMPLETED', 'DELETED'],
        required: true,
        default: "PENDING"
    }

}, {
    timestamps: true
});

PostSchema.index({ location: "2dsphere" });

const postSchema = model('post', PostSchema);

export default postSchema;