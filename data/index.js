const Zomato = require('zomato.js')
const z = new Zomato('3ece6f9b7e0d8cb46e1b39235a14a5a2')
const fs = require('fs')

z.locations({
  query: 'bali'
})
  .then(data => {
    return z.geocode({ lat: data[0].latitude, lon: data[0].longitude })
  })
  .then(el => {
    // console.log(JSON.stringify(el, null, 2))
    const data = []
    el.nearby_restaurants.forEach(res => {
      data.push({ name: res.restaurant.name, details: res.restaurant.location, photo_url: res.restaurant.featured_image })
    })

    fs.appendFileSync('./data.json', JSON.stringify(data, null, 2))
  })
  .catch(err => console.log(err))


