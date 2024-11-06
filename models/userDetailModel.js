const mongoose = require('mongoose'); // Corrected spelling from 'mangoose'

const userSchema = new mongoose.Schema({ // Changed to mongoose
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const UserDetailModel = mongoose.model('UserDetail', userSchema); // Changed to 'UserDetail'

module.exports = UserDetailModel;