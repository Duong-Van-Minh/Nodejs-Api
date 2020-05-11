const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const app = express()
//set up connet mongodb by mongoose 
mongoose.connect('mongodb://localhost/nodejsAPI',{
        useNewUrlParser: true,    
        useUnifiedTopology: true
})
    .then(() => console.log('connect sucssec mongoose'))
    .catch(() => console.error(`connect database ${error}`))

const users = require('./Routers/user')
const decks = require('./Routers/Deck')
//middleware
app.use(logger('dev'))
app.use(bodyParser.json())
//routers
app.use('/user' ,users);
app.use('/decks' ,decks);
// ruoter
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK?'
    })
})
// catch 404 Errors and froward them to err handler
app.use((req, res, next) =>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // response to clinet
    return res.status(status).json({
        error: {
            message: error.message
        }
    })


})  
// Start the server
const port = app.get('port') || 3000
app.listen(port, () => console.log(`Ser ver is listenting on port ${port}`))