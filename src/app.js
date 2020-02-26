const express = require('express');
const path = require('path');
const request = require('request');
const hbs = require('hbs');
const app = express()
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
console.log(publicDirectoryPath);

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialPath);



app.get('', (req, res) => {
    res.render('index', {
        title : 'Wheater App',
        name : 'riza fahlepi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'Wheater App',
        name : 'riza fahlepi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Wheater App',
        name : 'help page',
        helpText : 'find on google'

    })
})

app.get('/wheater', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error : 'you must provide a search term'
        })
    }
    
    geocode(req.query.address, (error, {latitude , longtitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, data) => {
            if(error){
                return res.send({error})
            }
            res.send({
                data : data,
                location : location,
                address : req.query.address
            });
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : 'Wheater App',
        name : 'riza fahlepi',
        errorMessage: 'page not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title : 'Wheater App',
        name : 'riza fahlepi',
        errorMessage: '404 error'
    })
})


app.listen(3000, () => {
    console.log('server running at port 3000')
})






 


