import express from 'express'
import cors from 'cors'
import Instagram from './apis/routers/instagram.js'

// creating express app
const app = express()

// constants
const PORT = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/api/instagram', Instagram)

// root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  })
})

// spinning server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
