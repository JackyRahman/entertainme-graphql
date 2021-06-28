const express = require('express')
const app = express()
const { connect } =require('./config/mongodb')
const movieRouter = require('./routes/movie')
const serieRouter = require('./routes/serie')

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.get('/', async (req, res) => {
  res.send('Welcome To Entertain Me')
})

app.use('/movies', movieRouter)
app.use('/tv', serieRouter)

connect()
  .then(() => {
    app.listen(PORT, ()=>{
      console.log('I LOVE YOU ' + PORT);
    })
  })
