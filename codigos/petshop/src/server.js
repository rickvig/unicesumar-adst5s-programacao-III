const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

require('./database')

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.urlencoded())

app.use(express.static(__dirname + '/public'))

app.use(routes)

app.listen(port, () => {
    console.log(`Petshop is on http://localhost:${port}`)
})

