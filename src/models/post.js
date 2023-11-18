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

    address : {
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
    },

    rating: {
        type: Number,
        required: false
    },

    review: {
        type: String,
        required: false
    },

    invitations: [
        {
            _id: false,
            user : {
                type: mongoose.Types.ObjectId,
                ref: "user"
            },

            status: {
                type: String,
                enum: ['PENDING', 'REJECTED' ,'ACCEPTED'],
                default: "PENDING"
            }
        }
    ],

    startTime: {
        type: String
    },
    
    endTime : {
        type: String
    },

    acceptedVolunteerId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }

}, {
    timestamps: true
});

PostSchema.index({ location: "2dsphere" });

const postSchema = model('post', PostSchema);

export default postSchema;