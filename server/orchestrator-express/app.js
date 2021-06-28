const express = require('express')
const cors = require('cors')
const app = express()
const movieRouter = require('./routes/movie')
const serieRouter = require('./routes/serie')

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome To Entertain Me')
})

app.use('/movies', movieRouter)
app.use('/tv', serieRouter)

app.listen(PORT,()=>{
  console.log("APP running at PORT :", PORT);
})