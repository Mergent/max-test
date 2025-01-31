const express = require('express');
const sign = require('jwt-encode');
const { readFile, putElemById } = require('../utils');

const router = express.Router();

const filePath = './users/data.json'

router.post('/oauth/token', (req, res) => {
  const users = readFile(filePath)
  const { body } = req
  const findUser = users.find(user => user.username === body.username)

  if (findUser === undefined) {
    res.status(401).send({ error: "Bad credential" })
    return;
  }

  const jwt = sign({ user_name: body.username }, '')

  const userWithLoginDate = {
    ...findUser,
    lastLogonTime: (new Date()).toISOString().slice(0,10)
  }

  putElemById(users, userWithLoginDate, findUser.id, filePath)

  const user = {
    access_token: jwt,
    email: findUser.email,
    expires_in: 86399,
    refresh_token: jwt,
    source: "AD",
    token_type: "bearer",
    username: body.username,
  }

  res.send(user)
});

router.get('/401', (req, res) => {
  res.status(401).send({})
});

module.exports = router;