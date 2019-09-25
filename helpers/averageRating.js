module.exports = (arr) => {
  let rate = 0
  arr.forEach(user => {
    console.log(user.dataValues.UserRestaurant)
    // rate += Number(user.dataValues.UserRestaurant.ratingUSer) 
  })
  console.log(rate)
  let rating = Math.floor(rate / arr.length)
  
  if(rating >= 5) {
    return '🌟🌟🌟🌟🌟'
  } else if(rating < 5 && rating >= 4) {
    return '🌟🌟🌟🌟'
  } else if(rating <4 && rating >= 3) {
    return '🌟🌟🌟'
  } else if (rating < 3 && rating >= 2) {
    return '🌟🌟'
  } else {
    return '🌟'
  }
}