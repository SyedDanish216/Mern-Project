const express = require("express");
const { userRegister, createPost, savedPost } = require("./models/collection");
const multer = require('multer');
// const upload=multer({dest:'./uploads/'})
const mongoose=require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("./middleware/authenticate");
// const authenticate2 = require("./middleware/authenticate2");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//Connecting to database
require("./db/conn");



app.use('/uploads', express.static('uploads'));


//express don't understand json so we write this line 
//to make express understand otherwise undefined error will occur
app.use(express.json());


const port = process.env.PORT || 5000;







const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads');
    },

    filename: function (request, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
})

//uploads parameter for multer
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
    // fileFilter:fileFilter
})


//
app.get('/',(res,req)=>{
    res.send("App is running perfectly");
})

app.post("/register", async (req, res) => {

    const { fname, lname, email, phone, password, cpassword } = req.body;
    if (!fname || !lname || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Please Fill all fields" });
    }


    try {
        const userExist = await userRegister.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });

        }
        else if (password != cpassword) {
            return res.status(408).json({ error: "Password Mismatch" });
        }


        const user = new userRegister({ fname, lname, email, phone, password, cpassword, saved: [{ postid: "123" }] });
        await user.save();
        res.status(201).json({ message: "user registered successfully" });

    }



    catch (e) {
        res.status(401).send(e);
    }



});

app.post("/signin", async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Please Fill all fields" });
        }



        const userLogin = await userRegister.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid Credentials" });

            }
            else {
                return res.json({ error: "User signin Successfully" });
            }

        }
    }
    catch (e) {
        res.status(401).send(e);
    }
});








app.get('/userLogin', authenticate, (req, res) => {
    console.log("Home Page");

    res.send(req.rootUser);
})


app.get('/logout', (req, res) => {
    console.log("Home Page");
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send("logout Successfull");
})










//Post creation
app.post("/createpost", upload.single('photo'), async (req, res) => {
    try {
        console.log(req.body.email);
        //const {email}=req.body;
        const photo = req.file ? req.file.path : null;
        const post = new createPost({
            fname: req.body.fname,
            title: req.body.title,
            description: req.body.description,
            photo: photo,
            email: req.body.email,
            likes: [{ Email: "abc" }]
        });
        if (!post) { throw new Error('User not Found') }


        const data = await post.save();

        // res.send(req.file);
        res.status(201).json({ message: "post created successfully" });

    }
    catch (err) {
        res.json({ message: err });
    }



});

//savedpost creation
app.post("/savedpost", upload.single('photo'), async (req, res) => {
    try {
        console.log(req.body.email);
        //const {email}=req.body;
        //  const photo = req.file ? req.file.path : null;
        const {email,postid}=req.body;
        const savedpost_data = await savedPost.find({postid:postid,email:email}).count() > 0;
        if(savedpost_data===true)
        {
            res.json({ message: "This post is already saved" });
        }
        else{
        const post = new savedPost({
            fname: req.body.fname,
            title: req.body.title,
            description: req.body.description,
            photo: req.body.photo,
            email: req.body.email,
            likes: [{ Email: "qwe" }],
            postid: req.body.postid,
            count:req.body.count
        });
    
        if (!post) { throw new Error('User not Found') }


        const data = await post.save();
    }

        // res.send(req.file);
        res.status(201).json({ message: "post saved successfully" });

    }
    catch (err) {
        res.json({ message: err });
    }



});








app.get("/getData", async (req, res) => {

    try {

        const data = await createPost.find();

        res.send(data);

    }
    catch (e) {
        res.status(401).send(e);
    }
});
app.get("/getData/:data", async (req, res) => {

    try {
        const cType = req.params.data;

        const data = await createPost.find({ email: cType });

        res.send(data);
   
    }
    catch (e) {
        res.status(401).send(e);
    }
});
app.get("/getsavedpost/:data", async (req, res) => {

    try {

        const data = await savedPost.find({ email: req.params.data });
        res.json(data);

    }
    catch (e) {
        res.status(401).send(e);
    }
});



//Like functionality
app.put("/like/:email", async (req, res) => {

    try {
        const cType = req.params.email;

        const { post_id, add_id } = req.body;


        const post_data = await createPost.findOne({ _id: post_id });
        let _id_;
        const savedpost_data = await savedPost.find({postid:post_id}).count() > 0;
        if(savedpost_data===true)
        {
            let saved_data = await savedPost.findOne({ postid: post_id });
            const {_id}=saved_data;
            _id_=_id;

        }
        
        //   const   { _id } = saved_data;

        let flag = false;
        const { likes, count } = post_data;


        likes.map(async (elem) => {
            const { Email } = elem;
            if (Email === cType) {
                flag = true;

                await createPost.findByIdAndUpdate(post_id, { $inc: { 'count': -1 } }, { new: true });
                const result = await createPost.findByIdAndUpdate(post_id, { $pull: { likes: { 'Email': cType } } }, { new: true });
                if (savedpost_data === true ) {
                    await savedPost.findByIdAndUpdate(_id_, { $inc: { 'count': -1 } }, { new: true });
                    await savedPost.findByIdAndUpdate(_id_, { $pull: { likes: { 'Email': cType } } }, { new: true });
                }
                res.send(result);
            }
        })

        if (flag === false) {
            if (savedpost_data === true) {
            await savedPost.findByIdAndUpdate(_id_, { $inc: { 'count': 1 } }, { new: true });
            await savedPost.findByIdAndUpdate(_id_, { $push: { likes: { 'Email': cType } } }, { new: true });
            }
            await createPost.findByIdAndUpdate(post_id, { $inc: { 'count': 1 } }, { new: true });
            const result = await createPost.findByIdAndUpdate(post_id, { $push: { likes: { 'Email': cType } } }, { new: true });
            res.send(result);
        }

    }
    catch (e) {
        res.status(401).send(e);
    }
});

//edit post
app.put("/editpost/:id", upload.single('photo'), async (req, res) => {

    try {
        const photo = req.file ? req.file.path : null;
        const updateData = await createPost.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description, photo: photo });


        res.send(updateData);



    }
    catch (e) {
        res.status(401).send(e);
    }
});









//delete post
app.delete("/deletepost/:id", async (req, res) => {

    try {

        const deleteData = await createPost.findByIdAndDelete(req.params.id);


        res.send(deleteData);

    }
    catch (e) {
        res.status(500).send(e);
    }
});
//delete saved post
app.delete("/deletesaved/:id", async (req, res) => {

    try {

        const deleteData = await savedPost.findByIdAndDelete(req.params.id);


        res.send(deleteData);

    }
    catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});
