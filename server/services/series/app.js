const express = require('express')
const app = express()
const { connect } =require('./config/mongodb')
const serieRouter = require('./routes/serie')
const cors = require('cors')
const PORT = process.env.PORT || 4002

app.use(cors())
app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.get('/', async (req, res) => {
  res.send('Welcome To Entertain Me')
})

app.use('/tv', serieRouter)

connect()
  .then(() => {
    app.listen(PORT, ()=>{
      console.log('I LOVE YOU ' + PORT);
    })
  })
