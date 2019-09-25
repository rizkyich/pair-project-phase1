const express = require('express')
const app = express()

const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('home')
})

app.use('/restaurants', require('./routes/RestaurantRoute'))
app.use('/user', require('./routes/UserRoute'))

app.listen(PORT, () => console.log(`SERVER LISTEN ON PORT: ${PORT}`))