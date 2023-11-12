// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const User = require('../models/User');
const Blog = require('../models/Blog');

//admin dashboard (default)
router.get('/users', authenticateToken, authenticateAdmin, async (req, res) => {
    //if it got here, it passed admin authentication. congrats!
    res.status(200).send('Admin Dashboard');
});


//view all users
router.get('/users', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving users');
    }
});

//route to block/Disable a user
router.put('/block/:userId', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.isBlocked = true;
        await user.save();

        res.status(200).send('User blocked successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error blocking user');
    }
});

//list all Blog Posts
router.get('/blogPosts', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const blogPosts = await Blog.find({}, 'title owner createdAt averageRating isVisible');//second parameter is the projection
        res.status(200).json(blogPosts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving blog posts');
    }
});

//view a Particular Blog Post (no restriction on isVisible)
router.get('/blogPosts/:blogId', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const blogPost = await Blog.findById(req.params.blogId);
        if (!blogPost) {
            return res.status(404).send('Blog post not found');
        }

        res.json(blogPost);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving blog post');
    }
});

//disable a blog, wont be visible to users.
router.put('/disableBlog/:blogId', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);
        if (!blog) {
            return res.status(404).send('Blog post not found');
        }

        blog.isVisible = false;
        await blog.save();

        res.status(200).send('Blog post hidden successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error hiding blog post');
    }
});

module.exports = router;
