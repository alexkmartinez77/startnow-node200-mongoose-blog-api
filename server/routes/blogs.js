const express = require('express'); // bring in express to access the router object
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');


router.get('/', (req,res,next) => {                               //Good to go!
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req,res,next) => {
    Blog
        .find({featured: "yes"})
        .then(featuredBlogs => {
            res.status(200).json(featuredBlogs);
        });
});

router.get('/notfeatured', (req,res,next) => {
    Blog
        .find({featured: "no"})
        .then(featuredBlogs => {
            res.status(200).json(featuredBlogs);
        });
});

router.get('/:id', (req,res,next) => {                              //GOOD TO GO!
    const id = req.params.id;
    Blog
        .findById(id)                                            //returns 0 or 1 document
        .then(foundBlog => {
            if(foundBlog){
            res.status(200).json(foundBlog);
            } else {
            res.status(404).json({message: 'No valid entry for this id!'});    
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.post('/', (req,res,next) => {                                  //GOOD TO GO!
    User
    .findById(req.body.author)                                      //fetch the user from the database
    .then(user => {                                                 
        // Create a blog
        const newBlog = new Blog(req.body);                           //this will create a blog
        console.log(newBlog);
        // Bind the user ot it
        newBlog.author = user._id;                                  //set the new blog's author to user_id
        console.log(newBlog);
        // Save it to the database
        return newBlog.save();
    })

    let dbUser = null;

    // Fetch the user from the database
    User
    .findById(req.body.author)
    .then(user => {
        // Store the fetched user in higher scope variable
        dbUser = user;

        // Create a blog
        const newBlog = new Blog(req.body);

        // Bind the user to it
        newBlog.author = user._id;

        // Save it to the database
        return newBlog.save();
    })
    .then(blog => {
        // Push the saved blog to the array of blogs associated with the User
        dbUser.blogs.push(blog);

        // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
        dbUser.save().then(() => res.status(201).json(blog));
    })
});

router.put('/:id', (req,res,next) => {                              //GOOD TO GO!
    const id = req.params.id;

    Blog
        .findByIdAndUpdate(id, req.body)
        .then(updatedBlog => {
            res.status(204).json(updatedBlog);
        });
});

router.delete('/:id', (req,res,next) => {                               //GOOD TO GO!
    const id = req.params.id;
    Blog
        .findByIdAndRemove(id)
        .then(deletedBlog => {
            res.status(200).json();
        })
});

module.exports = router;