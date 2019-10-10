// Importing 3rd Parties Modules / libraries
const express = require (`express`);
const exphbs = require (`express-handlebars`);

// Assigning variables
const app = express();

// load all static files inside folder public
app.use(express.static(`public`));


// setting express-handlebars engine with express
app.engine(`handlebars`, exphbs());
app.set(`view engine`, `handlebars`);

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

// Port:3000 creation
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Room Booking Server is listening PORT: ${PORT}`);
})