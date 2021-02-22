const express = require('express');
const postRouter = express.Router();
const { getAllPosts, createPost } = require('../db');
const { requireUser } = require('./utils');


postRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

 next();
});

postRouter.get('/', async (req, res) => {
    const posts = await getAllPosts();
    res.send({
        posts
    });
});

postRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = "" } = req.body;

    const tagArr = tags.trim().split(/\s+/)
    const postData = {};
    if (tagArr.length) {
        postData.tags = tagArr;
    }
    try {
    // add authorId, title, content to postData object
    postData.authorId = req.user.authorId;
    postData.title = title;
    postData.content = content;
    const post = await createPost(postData);
    // this will create the post and the tags for us
    // if the post comes back, res.send({ post });
    // otherwise, next an appropriate error object 
        if(post){
            res.send({post})
        }
    }catch ({name, message}){
        next ({name, message })
    }
      }
  );

module.exports = postRouter;
