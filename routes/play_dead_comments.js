const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js').development);


router.get('/', (req, res) => {
  knex
    .select(
      'play_dead_comments.id as post_id',
      'play_dead_comments.title',
      'play_dead_comments.content',
      'play_dead_comments.updated_at',
      'users.id as user_id',
      'users.avatar_url',
      'users.username'
    )
    .from('play_dead_comments')
    .leftJoin('users', 'play_dead_comments.user_id', 'users.id')
    .orderBy('play_dead_comments.id', 'desc')
    .then(posts => {
      let updatedPosts = posts;

     
      if (req.user) {
        updatedPosts = updatedPosts.map(post => {
          return {
            ...post,
            isCurrentUser: post.user_id === req.user.id
          }
        });
      }

      res.status(200).json(updatedPosts);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error fetching posts' });
    });
});


router.post('/', (req, res) => {
 
  if (req.user === undefined) return res.status(401).json({ message: 'Unauthorized' });

  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: 'Missing post title or content fields' });
  }

  knex('play_dead_comments')
    .insert({
      user_id: req.user.id,
      title: req.body.title,
      content: req.body.content
    })
    .then(postId => {
    
      res.status(201).json({ newPostId: postId[0] });
    })
    .catch(() => {
      res.status(500).json({ message: 'Error creating a new post' });
    });
});

module.exports = router;