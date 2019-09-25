module.exports = (rating) => {
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