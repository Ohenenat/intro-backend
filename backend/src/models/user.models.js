import mongoose , { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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
        maxLength: 100
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

// Hash the password before saving the user
userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare the entered password with the hashed password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;