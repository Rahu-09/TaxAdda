const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/TaxAdda-api",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("Connection Successfully");
}).catch((err)=>{
    console.log(err);
})