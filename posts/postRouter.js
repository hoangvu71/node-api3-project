const express = require('express');
const postDb = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong"
      })
    })
});

router.get('/:id', validatePostId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId(), (req, res) => {
  // do your magic!
  postDb.remove(req.params.id)
    .then((post) => {
      res.status(200).json({
        message: "removed"
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong"
      })
    })
});

router.put('/:id', validatePost(), validatePostId(), (req, res) => {
  // do your magic!
  postDb.update(req.params.id, req.body)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong"
      })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    postDb.getById(req.params.id)
      .then((post) => {
        req.post = post
        next()
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something went wrong"
        })
      })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    postDb.getById(req.params.id)
      .then((post) => {
        if (post) {
          req.post = post
          next()
        }
        else {
          res.status(404).json({
            message: "Post not found"
          })
        }
      })
      .catch((error) => {
        res.status(400).json({
          message: "Something went wrong"
        })
      })
  }
}

module.exports = router;
