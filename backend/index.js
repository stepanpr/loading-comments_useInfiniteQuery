const express = require('express')

const port = process.env.PORT || 3001

const app = express()

app.listen(port, () => {
    console.log(`Server is starting on port ${port}`)
})

app.get('/api', (req, res) => {
    res.json({
        message: "hello world"
    })
})