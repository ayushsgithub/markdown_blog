const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

// mongoose.connect('mongodb+srv://ayush:ayush@cluster0.zjbil2x.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })

mongoose.connect('mongodb+srv://ayush:ayush@cluster0.zjbil2x.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log("Connected to MongoDB Database"))
.catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000, () => console.log("Server is listening on port 5000"))