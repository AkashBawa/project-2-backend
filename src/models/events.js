import mongoose, {Schema, Model, model} from "mongoose";

const EventShema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },

    name : {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    locationPoints : {
        type: {
            type: String,
            enum: ['Point'],
            default: "Point"
        },

        coordinates: {
            type: [Number],   // longitude first and then latitude
        }
    },

    date : {
        type: Date,
        required: true
    }, 

    startTime : {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true
    },

    image : {
        type: String,
        required: true
    },

    participants : [
        {
            _id: false,
            type: mongoose.Types.ObjectId,
            ref: "user"
        }
    ],
    specialNote : {
        type: String
    }
}, {timestamps: true});

const eventSchema = model('event', EventShema);

export default eventSchema;