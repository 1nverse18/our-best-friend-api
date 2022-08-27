const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js').development);


router.get('/', (req, res) => {
  knex
    .select(
      'roll_over_comments.id as post_id',
      'roll_over_comments.title',
      'roll_over_comments.content',
      'roll_over_comments.updated_at',
      'users.id as user_id',
      'users.avatar_url',
      'users.username'
    )
    .from('roll_over_comments')
    .leftJoin('users', 'roll_over_comments.user_id', 'users.id')
    .orderBy('roll_over_comments.id', 'desc')
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

  knex('roll_over_comments')
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