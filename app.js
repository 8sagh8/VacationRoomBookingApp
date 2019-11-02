/*
Name: Sammar Abbas
ID: 157-597-170
Email: sabbas21@myseneca.ca
link: https://webapp322.herokuapp.com/
*/// Importing 3rd Parties Modules / libraries
const express = require (`express`);
const exphbs = require (`express-handlebars`);
const bodyParser = require(`body-parser`);

// Assigning variables
const app = express();

// load all static files inside folder public
app.use(express.static(`public`));


// setting express-handlebars engine with express
app.engine(`handlebars`, exphbs());
app.set(`view engine`, `handlebars`);

app.use(bodyParser.urlencoded({extended: false}));

//Assigning Ports to templates Files
//Index/Home Page
app.get(`/`, (req, res)=>{
    res.render(`index`);
})

//Room listing Page
app.get(`/room`, (req, res)=>{
    res.render(`room`);
})

//Registration Page
app.get(`/reg`, (req, res)=>{
    res.render(`register`);
})

//post Registration Page
app.post(`/reg`, (req, res)=>{
    res.send(`Form is submitted Successfully!`);
})

//Login page
app.get(`/login`, (req, res)=>{
    res.render(`login`);
})

app.post(`/login`, (req, res)=>{
    const errors = [];

    if(req.body.name == "" || req.body.pLogin == "")
        errors.push(`username OR password is incorrect`);

    if(errors.length > 0){
        res.render(`login`, {
        login:errors
        })
    }

    else {

        
    }
})

// Port:3000 creation
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Room Booking Server is listening PORT: ${PORT}`);
})