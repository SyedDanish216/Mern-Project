const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
//Defining schema
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    phone:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    cpassword:
    {
        type: String,
        required: true
    },
    // saved:[
    //     {
    //     postid:{
    //         type:Object
    //     }
    // }
    // ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

})












//Defining Schema for creating post
const createPostSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    
    },
    count: {
        type: Number,
        default: 0
    },
      likes: [
        {
            Email: {
                type: String,
                
            }
        }
    ]
 
});

const savedPostSchema=new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: false,
    
    },
    count: {
        type: Number,
        default: 0
    },
      likes: [
        {
            Email: {
                type: String,
                
            }
        }
    ],
    postid:{
        type:Object
    }

})
 

//we are hashing the password
userSchema.pre('save', async function (next) {
    //console.log("hello");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

//we are generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        // const tok='nudbcubucbncvchdvchvducb';
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}



//collection creation
const createPost = new mongoose.model("post", createPostSchema);
const userRegister = new mongoose.model("userRegister", userSchema);
const savedPost = new mongoose.model("savedpost", savedPostSchema);




module.exports = {
    userRegister, createPost,savedPost
}
