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
    const errors = [];

    if(req.body.email == "")
        errors.push(`Please enter Email Address`);


    if(req.body.firstName == "")
        errors.push(`Please enter First Name`);

    if(req.body.lastName == "")
        errors.push(`Please enter Last Name`);

    if(req.body.password == "" || req.body.password.length < 6 || req.body.password.length > 12)
        errors.push(`Please enter password between 6 to 12 characters only`);

    if(req.body.password != "" && req.body.password.length > 5 && req.body.password.length < 13){
        let alpha = "";
        let num = -1;
        for (let i = 0; i < req.body.password.length; ++i){
            if (req.body.password[i] == [a-z][A-Z])
                alpha = req.body.password[i];
        
            else if (req.body.password[i] == [0-9])
                num = req.body.password[i];

            else {}
        }
        if(alpha == "" || num < 0)
            errors.push(`Password must have letters and numbers only!`);
    }

    
    if(req.body.selectMonth == "Month" || req.body.selectDay == "Day" || req.body.selectYear == "Year")
        errors.push(`Incorrect Date input not allowed!`);

    if(errors.length > 0){
        res.render(`register`, {
        register:errors
        //errors: register
        })
    }

    else {
        res.send(`Form is submitted Successfully!`);
        
    }
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