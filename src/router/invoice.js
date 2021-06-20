const express=require('express');
const invoice=require("../models/invoice")
const nodemailer = require("nodemailer");

const router=new express.Router();


router.get('/invoice', async (req, res) => {
    try {
        const result = await invoice.find();
        console.log(result);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
})

router.get("/invoice/:id", async (req, res) => {
    try {
        const _id=req.params.id;
        const result = await invoice.findById(_id);
        if(!result){
            return res.status(404).send();
        }
        let paidStatus=result.paidStatus;
        let email=result.email;
        main(email, paidStatus).then(() => {
            console.log("Completely invoices status detail sent")
        }
        ).catch(err => {
            console.log('==================', err)
        });
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

async function main(email, paidStatus) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "ak7365801709@gmail.com",
            pass: "Rahul@123"
        }
        // tls: {
        //     rejectUnauthorized: false
        // }
    });

    let info = await transporter.sendMail({
        from: '<ak7365801709@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "View invoices status", // Subject line
        text: "Your status is :-" + paidStatus, // plain text body
        html: "Your status is :- <b>" + paidStatus + "</b>" // html body
    });
    console.log("Message sent: %s", info.messageId);
    return info.messageId;
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

router.delete("/invoice/:id", async (req, res) => {
    try {
        const _id=req.params.id;
        const result = await invoice.findByIdAndDelete(_id);
        if(!result){
            return res.status(404).send();
        }
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

router.patch("/invoice/:id", async (req, res) => {
    try {
        const _id=req.params.id;
        const result = await invoice.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.status(200).send(result);
    }
    catch (err) {
        res.status(404).send(err);
    }
})

router.post('/invoice', async (req, res) => {
    try {
        const user = new invoice(req.body);
        const result = await user.save();
        res.status(201).send(result);
        }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports=router;