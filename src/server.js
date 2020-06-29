const express = require('express')
const nunjucks = require('nunjucks')

const db = require('./database/db')

const server = express()

nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true }))



server.get('/', (req, res) => {
    return res.render('index.html')
})



server.get('/create-point', (req, res) => {
    return res.render('create-point.html')
})



server.post('/savepoint', (req, res) => {
    const query = `
        INSERT INTO PLACES (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log('Cadastro realizado com sucesso!')
        console.log(this)

        return res.render('create-point.html', {saved:true})
    }

    db.run(query, values, afterInsertData)
})



server.get('/search-results', (req, res) => {

    const search = req.query.search

    if (search == "") {
        return res.render('search-results.html', { total:0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        total = rows.length

        return res.render('search-results.html', { places: rows, total})
    })
})



server.listen(3000)