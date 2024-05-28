const express = require('express');
const { jwtDecode } = require('jwt-decode');

const { v4: uuidv4 } = require('uuid');

const { readFile, filteredAndPaginationSort } = require("../utils.js");

const usersPath = './users/data.json'
const router = express.Router();

router.get('/users', (req, res) => {
  const users = readFile(usersPath)
  const params = req.query
  res.send(filteredAndPaginationSort(users, params))
});

module.exports = router;