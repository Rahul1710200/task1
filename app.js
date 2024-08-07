require('dotenv').config()
const express=require('express');

// const link ="https://task1-1-mied.onrender.com"

const userModel = require('./models/user');
// const bcrypt = require('bcrypt');
const path=require('path');
const app = express();

const PORT=process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, "views", "public")));


app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/read',async (req,res)=>{
    
     try {
       let users = await userModel.find();
       res.render("read", { users });
     } catch (error) {
       console.error(error);
       res.status(500).send("Internal Server Error");
     }
})
app.get('/delete/:id',async (req,res)=>{
    
     try {
       let users = await userModel.findOneAndDelete({_id:req.params.id});
       res.redirect("/read")

     } catch (error) {
       console.error(error);
       res.status(500).send("Internal Server Error");
     }
})
app.post('/create',async (req,res)=>{
   try {
        let { firstName, lastName, number, email, street, city, state, country, login, password } = req.body;

        
        let existingEmailUser = await userModel.findOne({ email });
        if (existingEmailUser) {
          return res.status(400).send("User with this email already exists.");
        }

        let existingLoginUser = await userModel.findOne({ login });
        if (existingLoginUser) {
          return res.status(400).send("User with this login already exists.");
        }
        // Hashing the password
        // const hashedPassword = await bcrypt.hash(password, 10);m

        let createdUser = await userModel.create({
            firstName,
            lastName,
            number,
            email,
            street,
            city,
            state,
            country,
            login,
            password
        });
        console.log(createdUser);
        res.redirect('/read')
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server started at port ${PORT}`);
})

// module.exports.handler=serverless(app)

