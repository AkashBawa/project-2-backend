import {Schema, Model, model} from 'mongoose';

const UserSchema = new Schema( {
    userName: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['volunteer', 'elder'],
        required: true
    }
}, {
    timestamps: true
})

const userSchema = model('user', UserSchema);

export default  userSchema;