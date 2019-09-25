const express = require('express')
const app = express()
const averageRating = require('./helpers/averageRating')
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.locals.averageRating = averageRating

app.get('/', (req, res) => {
  res.render('home')
})

app.use('/restaurants', require('./routes/RestaurantRoute'))

app.listen(PORT, () => console.log(`SERVER LISTEN ON PORT: ${PORT}`))