//To install npm packages -- npm i nodemailer dotenv express mongoose
const nodemailer = require ("nodemailer"); 
require("dotenv").config();
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Mailmodel=require('./mailmodel')
const schedule =require("./schedule")
 var Agenda = require('./schedule');
require("dotenv").config;


    //mongodb connection
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connected")
    })
    .catch((e)=>{
        console.log(e)
    })


    app.use(express.json());
    app.use(express.urlencoded({extended: false}))
    app.use((req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })



    //transporter to send mail
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user : process.env.USER,
            pass : process.env.PASSWORD,
        }
    });


   
    //post request
    //endpoint : http://localhost:3001/mail
    /* JSON BODY
    {
    "email":"XXXXXXXXXXX@gmail.com",
    "to":"XXXXXXX@gmail.com",
    "subject":"Email",
    "text":"To send mail"
}
    */
    app.post('/mail',(req,res,next)=>{

                const mail= new Mailmodel({
                    ...req.body,
                })
                   
                
                    transporter.sendMail(req.body, function (error, response) {
                        if(error){
                            console.log(error)
                        }else{
                        console.log('Message sent successfully' );
                        transporter.close();
                        done();
                        }
                    });

                        mail.save().then((result)=>{
                            res.status(200).json({
                                email: result.email,
                                to: result.to,
                                subject:result.subject,
                                text: result.text,
                            
                            })
                        })
    });  

   

           
        
    app.listen(process.env.PORT, function () {

            console.log("Running on PORT", process.env.PORT);

    });

