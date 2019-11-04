/*
Name: Sammar Abbas
ID: 157-597-170
Email: sabbas21@myseneca.ca
link: https://webapp322.herokuapp.com/
*/
// Importing 3rd Parties Modules / libraries
const express = require (`express`);
const exphbs = require (`express-handlebars`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);

// Assigning variables
const app = express();

// load all static files inside folder public
app.use(express.static(`public`));

//to get values from forms
app.use(bodyParser.urlencoded({extended: false}));

// setting express-handlebars engine with express
app.engine(`handlebars`, exphbs());
app.set(`view engine`, `handlebars`);

//This code is used to connect mongoose to our MONGODB in the Cloud
const DBURL = 'mongodb+srv://userAdmin110:LostMongo110$@cluster0-swotc.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(DBURL, {useNewUrlParser: true})
//Then block will only be executed if the above-mentioned line is successful
.then(()=>{
    console.log(`Database is connected`)
})
//The catch block will only be executed if the connection failed
.catch(err=>{
    console.log(`Something went wrong : ${err}`);
})


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

    
    if(req.body.selectMonth == "Month" || req.body.selectDay == "Day" || req.body.selectYear == "Year")
        errors.push(`Incorrect Date input not allowed!`);

    if(errors.length > 0){
        res.render(`register`, {
        register:errors
        //errors: register
        })
    }

    else {
        const Schema = mongoose.Schema;

        const taskSchema = new Schema({
            email: String,
            firstName: String,
            lastName: String,
            password: String,
            selectMonth: String,
            selectDay: Number,
            selectYear: Number
        });

        //This creates a Model called Tasks. This model represents our Collection in our database
        const Tasks = mongoose.model('Tasks', taskSchema);

        const formData ={
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password,
            selectMonth:req.body.selectMonth,
            selectDay:req.body.selectDay,
            selectYear:req.body.selectYear
        }

        //To create a  Task document we have to call the Model constructor
        const ta = new Tasks(formData);
        ta.save()
        .then(() => {
        console.log('Task was inserted into database')
        })

        .catch((err)=>{
            console.log(`Task was not inserted into the database because ${err}`)
        })


        // Send Email Message
        const nodemailer = require('nodemailer');
        const sgTransport = require('nodemailer-sendgrid-transport');
        
        const options = {
            auth: {
                api_key: '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'
            }
        }
        
        const mailer = nodemailer.createTransport(sgTransport(options));
        
        const email = {
            to: `${req.body.email}`,
            from: 'mastersagh@hotmail.com',
            subject: 'SAMMAR ABBAS has registered you, Please login to book ROOMS',
            text: `Dear ${req.body.firstName} ${req.body.lastName}, your email address: ${req.body.email} has been registered`,
            html: `Dear ${req.body.firstName} ${req.body.lastName}, your email address: ${req.body.email} has been registered`
        };
                 
        mailer.sendMail(email, (err, res)=> {
            if (err) { 
                console.log(err) 
            }
        
           console.log(res);
        });
        
        //REDIRECT THE USER TO THE DASHBOARD ROUTE
        res.redirect("/dashboard");
    }
})

// Route for Dashboard
app.get(`/dashboard`, (req, res)=>{
    res.render("userDashboard");
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