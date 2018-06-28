const mongoose = require('mongoose'); //imports mongoose
const Schema = mongoose.Schema; //extract schema from mongoose and put into its own variable

const UserSchema = new Schema({ //object passed to new Schema
    firstName: { type: String, required: true }, //first name property is a string and is required
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    social:{
        facebook:{ type: String, required: false },
        twitter:{ type: String, required: false },
        linkedIn:{ type: String, required: false }
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }], //many in a one-to-many relationship
});

module.exports = mongoose.model('User', UserSchema); //first parameter "User" is the name given to the model and second is the schema you want to use.