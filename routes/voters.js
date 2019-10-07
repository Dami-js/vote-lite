const router = require('express').Router()
const VoterModel = require('../models/Voter')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/', async (req, res) => {
  const allVoters = await VoterModel.find({})
  res.json(allVoters)
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/register', (req, res) => {
  res.render('register');
})

// register voters router
router.post('/register', (req, res) => {
  const {
    surname,
    voterId
  } = req.body

  const errors = []

  if (!surname || !voterId) {
    errors.push({
      message: 'Please fill out all fields'
    })
  }

  VoterModel.findOne({
    voterId: voterId
  }, (err, user) => {
    if (user) {
      errors.push({
        message: 'Voter ID already exist'
      })
    }
    if (errors.length > 0) {
      res.render('register', {
        errors,
        surname,
        voterId
      })
    } else {
      const newVoter = new VoterModel({
        surname,
        voterId
      })
      newVoter.save()
        .then(user => {
          req.flash('success_msg', 'Please login to continue')
          res.redirect('/voters/login')
        })
        .catch(err => console.log(err))
    }

  })
})

router.post('/login', async (req, res, next) => {
  resp = await passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/voters/login',
    failureFlash: true
  })(req, res, next)
})

module.exports = router