//node core module
    const path = require('path');
    
    const geocode = require('./utils/geocode');
    const forecast = require('./utils/forecast');

//express module or library or framework
    const express = require('express');
    const app = express();
    const hbs = require('hbs');

    const port = process.env.PORT || 3000 
//Define paths for Express config
    const publicfiles = path.join(__dirname,`../public`);
    const viewpath = path.join(__dirname,`../templates/views`);
    //the below variable stores the path of common content for all view files like headers,footers,navbar,sidebar and etc.
    const partialspath = path.join(__dirname, `../templates/partials`);
//setup static directory to load static html files
    app.use(express.static(publicfiles));

//setup handlebar engine (template engines)
    app.set(`view engine`,'hbs');
    //using the below method we can change the views folder instead of any other name as we want 
    app.set(`views`,viewpath);
    //the below hbs module registers the partialpath using this we can use this partial path files into all view files as we want 
    hbs.registerPartials(partialspath);
//setup dynamic directory to load dynamic handlebar(hbs(template engines)) files
    app.get('', (req,res) => {
        res.render('index', {
            title: `Weather`
        });
    });
    app.get('/about', (req,res) => {
        res.render('about',{
            title: `About Us`,
            name: `vasanth`
        });
    });
    app.get('/help', (req,res) => {
        res.render('help', {
            title: `Help`
        });
    });
    app.get(`/weather`, (req,res) => {
        if(!req.query.search) {
          return  res.send({
                error: `You must provide a location to search`
            });
        }
        const searchLocation = req.query.search;
        
        geocode(searchLocation, (error,{latitude,longitude,placename} = {} ) => {
            if(error) {
                return  res.send({
                    error //short hand operator es6 object instead od (error: error)
                });
            } 
            forecast(latitude, longitude, (error, Forcastdata) => {
                if(error){
                    return  res.send({
                        error //short hand operator es6 object instead od (error: error)
                    }) 
                } 
                return  res.send({
                    Location: placename,
                     Data: Forcastdata
                });
            });
    
        })

    });
    //the below fill pass the error message to the error view
    app.get('/help/*', (req,res) => {
        res.render('error',{
            errormessage:`404 : Help Page Not Found`
        }
     );
    });
    app.get('*', (req,res) => {
        res.render('error',{
            errormessage:`404 : Page Not Found`
        }
     );
    });
app.listen(port, () => {
    console.log('your port is running on port 3000');
});