const express = require('express');

const userDb = require("./userDb")
const postDb = require("../posts/postDb")
const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  // do your magic!
  userDb.insert(req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong"
      })
    })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  // do your magic!
  postDb.insert(req.post)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      console.log(error),
      res.status(500).json({
        message: "Something went wrong"
      })
    })
});

router.get('/', (req, res) => {
  userDb.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong"
      })
    })

});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!
  userDb.getUserPosts(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts)
      }
      else {
        res.status(404).json({
          errorMessage: "This user has no post"
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "Something went wrong"
      })
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  userDb.remove(req.params.id)
    .then((user) => {
      res.status(200).json({
        message: "Removed"
      })
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "Something went wrong"
      })
    })
});

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  // do your magic!
  userDb.update(req.params.id, req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "Something went wrong"
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    userDb.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user
          next()
        }
        else {
          res.status(400).json({
            message: "invalid user id"
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

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return (res.status(400).json({
        message: "missing user data"
      })
      )
    }
    else if (!req.body.name) {
      return (res.status(400).json({
        message: "missing required name field"
      }))
    }
    next()
  }

}

function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    postDb.getById(req.params.id)
      .then((post) => {
        if (post) {
          req.post = {
            user_id: req.params.id,
            text: req.body.text
          }
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
