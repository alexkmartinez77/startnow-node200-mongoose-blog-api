const mongoose = require('mongoose'); //imports mongoose
const Schema = mongoose.Schema; //extract schema from mongoose and put into its own variable

const BlogSchema = new Schema({
    title: { type: String, required: true }, //first name property is a string and is required
    article: { type: String, required: true },
    published: { type: Date, required: true },
    featured: { type: Boolean, required: true },
    author: { type: Schema.Types.ObjectId , ref: 'User' }, //one in a one-to-many relationship
});




module.exports = mongoose.model('Blog', BlogSchema);