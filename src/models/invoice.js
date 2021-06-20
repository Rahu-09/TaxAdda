const mongoose=require("mongoose");
const validator=require("validator");

const invoiceSchema=new mongoose.Schema({
    hoursofwork:{
        type:String,
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
            type:String,
            require:true
        }
    },
    labor:{
        type:Number,
        require:true
    },
    paidStatus:{
        type:Number,
        require:true
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