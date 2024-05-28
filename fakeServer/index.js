const express = require('express')
const cors = require('cors');

const { generateUsers } = require('./entityUtils');

const app = express()
const port = 6100
app.use(cors())
app.use(express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.use('/', require('./users'))
app.use('/auth', require('./auth'))

app.listen(port, () => {
  generateUsers(111)
  console.log(`Example app listening on port ${port}`)
})

