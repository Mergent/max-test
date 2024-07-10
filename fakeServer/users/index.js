const express = require('express');
const { jwtDecode } = require('jwt-decode');

const { v4: uuidv4 } = require('uuid');

const { readFile, filteredAndPaginationSort, pushElem } = require("../utils.js");

const usersPath = './users/data.json'
const router = express.Router();

router.get('/users', (req, res) => {
  const users = readFile(usersPath)
  const params = req.query
  res.send(filteredAndPaginationSort(users, params))
});

router.get('/register', (req, res) => {
  const users = readFile(usersPath)
  const { body } = req

  if (users.map(u => u.username).includes(body.username)) {
    res.status(403).send({ error: `User with username ${body.username} already exist` })
    return;
  }

  const newUser = pushElem(users, body, usersPath)

  res.send(newUser)
});

module.exports = router;