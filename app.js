const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('restaurants')
})

app.get('/restaurants', (req, res) => {
  res.render('index', {layout: 'main', restaurants})
})

app.get('/restaurants/:id', (req, res) => {
  let id = req.params.id
  let restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)
  res.render('detail', {layout: 'main2', restaurant})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})