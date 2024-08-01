// import modules

import express from 'express'
import * as data from './data/data.js'

// create Express app

const app = express()

// configure the app (app.set)



// mount Middleware (app.use)



// mount routes

// 1. Be Polite, Greet the User
app.get('/greetings/:name', function(req, res) {
  res.send(`What a delight it is to see you once more, ${req.params.name}!`)
})

// 2. Rolling the Dice
app.get('/roll/:sides', function(req, res){
  let diceValue= Math.floor(Math.random()* parseInt(req.params.sides) + 1)
  if (isNaN(diceValue)) {
    res.send('You must specify a number.')
  } else {
    res.send(`You rolled a ${diceValue}`)
  }
})

// 3. I Want THAT One!
app.get('/collectibles/:item', function(req, res){
  let idx = parseInt(req.params.item)
  if (idx > data.collectibles.length - 1) {
    res.send('This item is not yet in stock. Check back soon!')
  } else {
    res.send(`So, you want the ${data.collectibles.at(idx).name}? For ${data.collectibles.at(idx).price}, it can be yours!`)
  }
})

//4. Filter Shoes by Query Parameters
app.get('/shoes', function(req, res){
  const minPrice = req.query['min-price'] ? req.query['min-price'] : 0
  const maxPrice = req.query['max-price'] ? req.query['max-price'] : Infinity
  const shoeType = req.query.type ? req.query.type : ''
  const filteredShoes = data.shoes.filter((shoe) => {
    return (shoe.price >= minPrice && shoe.price <= maxPrice && shoe.type.includes(shoeType))
  })
  res.send(filteredShoes)
})

// tell the app to listen on port 3000

app.listen(3000, function() {
  console.log('Listening on port 3000')
})