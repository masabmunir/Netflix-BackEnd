const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userdata = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})



userdata.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()}, "fdvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(e){
        res.send("error part" + e);
        console.log("error part" + e);
    }
}

// userdata.pre("save",async function(next){
//     if(this.isModified("password")){

//         this.password = await bcrypt.hash(this.password,10);
//         this.confirmpassword = await bcrypt.hash(this.password,10);
//     }
//     next();

//     bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    
//     });
// })



module.exports = mongoose.model('data',userdata,);


