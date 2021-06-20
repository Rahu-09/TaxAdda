const mongoose=require("mongoose");
const validator=require("validator");

const invoiceSchema=new mongoose.Schema({
    hoursofwork:{
        type:Number,
        require:true
    },
    rate:{
        type:Number,
        require:true
    },
    expenses:{
        type:Number,
        require:true
    },
    notes:{
        payDetails:{
            type:String,
            require:true
        },
        chequeDetails:{
            type:Date,
            require:true
        }
    },
    labor:{
        type:Number,
        require:true
    },
    paidStatus:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:[true,"Email is Necessary"],
        unique:[true,"Email Should be unique"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    dueDate:{
        type:Date,
        validate(value){
            if(!validator.isDate(value)){
                throw new Error("Invalid Date");
            }
        },
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const invoice=new mongoose.model('invoice',invoiceSchema);

module.exports= invoice;