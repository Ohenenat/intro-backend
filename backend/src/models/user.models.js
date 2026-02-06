import mongoose , { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // Remove leading and trailing whitespace
        minLength: 1,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // Remove leading and trailing whitespace
        minLength: 5,
        maxLength: 100
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

const User = mongoose.model('User', userSchema);

export default User;