// code is below to related comments.

// 5. require the data base
const db = require('./data/hubs-model.js')

// 1. require express after adding it as a dependency.
const express = require('express');
// 2. create a server object that calls express()
const server = express()
// 3. call the server to listen for trafic on a port. use is a call back function to do it. 
const port = 4000

server.listen(port, () => {
    console.log(`=== server listening on port ${port} ===`)
})

// 4. once server is created, we need to make a end point for a path that has a call back function request and response. That is called a route handler. Request and response are responses.
// response.send is a method from the response object.
// 7. add middleware for json object.

server.use(express.json())

server.get('/', (request, response) => {
    response.send("hello world")
})
// CRUD - Create/post, Read/get, Update/put, Delete/delete (Destroy)
// get 200 
server.get('/hubs', (req, res) => {
   // 6. function from data base. [db.find()] Status is a method of response. It is the error or success code. .json is the format we are sending are data as.
   db.find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(err => {
            res.status(500).json({
                message: err,
                success: false
            })
        })
    
})

server.post('/hubs', (req, res) => {

    
    
    // req.body is the saved body object coming in from the front end post. 
    
    const hubInfo = req.body;

    db.add(hubInfo)
        .then((hub) => {
            res.status(201).json({
                success: true,
                hub
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: fail,
                err
            })
        })
})

server.delete('/hubs/:id', (req, res) => {
    
    // req.params are paramaters from the body object coming in from the delete. Set it the id object.
    const { id } = req.params
    db.remove(id)
        .then(deletedHub => {
            if (deletedHub) {
                res.status(204).end()
            } else {
                res.status(404).json({
                    message: `I could not find id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            })
        })
})

server.put('/hubs/:id', (req, res) => {
    // const { id } = req.params
    const id = req.params.id // also works.
    const hubInfo = req.body

    db.update(id, hubInfo)
        .then(hub => {
            if (hub) {
                res.status(200).json({ 
                    success: true,
                    hubInfo
                })
            } else {
                res.status(404).json({ 
                    success: false,
                    message: `I could not find id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            })
        })
})

// console.log('Hello World!!');