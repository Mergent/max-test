const { v4: uuidv4 } = require('uuid');
const { readFile, rewriteFile } = require('./utils');

const usersPath = './users/data.json'

const randomEntity = (entity) => {
  const randomIndex = Math.floor(Math.random() * entity.length); 
  return entity[randomIndex];
}

const randomEntities = (entity, count) => {
  const shuffled = [...entity].sort(() => 0.5 - Math.random());
  if (count) {
    return shuffled.slice(0, count)
  }

  return shuffled.slice(0, Math.random() * entity.length);
}

const generateUsers = (count) => {
  const users = readFile(usersPath)
  const usersLength = users.length
  const createUsersCount = count - usersLength
  for (let i = 0; i < createUsersCount; i++) {
    users.push({
      id: uuidv4(),
      username: `username${i + usersLength + 1}`,
      email: `email${i + usersLength + 1}@gmail.com`,
      firstName: `firstName${i + usersLength + 1}`,
      lastName: `lastName${i + usersLength + 1}`,
      role: randomEntity(["ADMINISTRATOR", "USER"])
    })
  }
  rewriteFile(users, usersPath)
}

module.exports = {
  randomEntity,
  randomEntities,
  generateUsers
}