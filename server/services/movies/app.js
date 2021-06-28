const express = require('express')
const app = express()
const cors = require('cors')
const { connect } =require('./config/mongodb')
const movieRouter = require('./routes/movie')

const PORT = process.env.PORT || 4001

app.use(cors())
app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.get('/', async (req, res) => {
  res.send('Welcome To Entertain Me')
})

app.use('/movies', movieRouter)

connect()
  .then(() => {
    app.listen(PORT, ()=>{
      console.log('I LOVE YOU ' + PORT);
    })
  })
