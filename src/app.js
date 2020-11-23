const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define path for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup static directory to serve
app.use(express.static(publicPath))

//Setup handlebars view engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Siddharth'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Siddharth'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Siddharth'
    })
})

app.get('/weather', (req,res) => {
    const address= req.query.address
    if(!address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
    // res.send({
    //     address: req.query.address
    // })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Siddharth',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Siddharth',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is started')
})