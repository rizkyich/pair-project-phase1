const express = require('express')
const session = require('express-session')
const app = express()
const dateFormat = require('./helpers/dateFormat')

app.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


const averageRating = require('./helpers/averageRating')
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.locals.averageRating = averageRating
app.locals.dateFormat = dateFormat

app.get('/', (req, res) => {
  let loginStatus = false
  if (req.session.user) {
    loginStatus = true
  }
  res.render('home', { loginStatus })
})

app.use('/restaurants', require('./routes/RestaurantRoute'))
app.use('/user', require('./routes/UserRoute'))

app.listen(PORT, () => console.log(`SERVER LISTEN ON PORT: ${PORT}`))