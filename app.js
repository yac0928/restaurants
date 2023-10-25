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
  let kw = req.query.keyword?.trim()
  let matchedOnes = kw ? restaurants.filter(one => 
    Object.values(one).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(kw.toLowerCase())
      }
      return false
    })
  ) : restaurants
  res.render('index', {layout: 'main', restaurants: matchedOnes, kw})
})

app.get('/restaurants/:id', (req, res) => {
  let id = req.params.id
  let restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)
  res.render('detail', {layout: 'main2', restaurant, id})
})

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})