const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect')
require('dotenv').config() 
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Middleware

app.use(express.static('./public'))
app.use(express.json( ))


// Routes
// app.get('/api/v1/tasks')        - Gets All The Tasks
// app.post('/api/v1/tasks')       - Create A New Task
// app.get('/api/v1/tasks/:id')    - Get A Single Task
// app.patch('/api/v1/tasks/:id')  - Update A Specific Task
// app.delete('/api/v1/tasks/:id') - Delete A Specific Task

app.use('/api/v1/tasks',tasks)
 
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server Is Listening On Port ${port}....`))

    } catch (error) {
        console.log(error)

    }
}

start()
