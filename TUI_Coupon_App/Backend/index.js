import express, { request, response } from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Coupon } from "./Model/CoupenModel.js";
import cors from 'cors';


const app = express();
//middleware
app.use(express.json());

//middleware to handle cors policy
// app.use(cors());

app.use(
    cors({
        origin : 'http://localhost:8080',
        methods:['GET','PUT','POST','DELETE'],
        allowedHeaders:['Contet-Type']
    })
)

//demo
app.get('/', (request, response) => {
    console.log(request);
    return response.status(233).send('Welcome to Coupen Project');
})


//post data
app.post('/data', async (request, response) => {
    try {
        if (
            // !request.body.Ticket_ID ||
            // !request.body.Ticket_Price ||
            // !request.body.From ||
            // !request.body.To ||
            !request.body.coupon_code ||
            !request.body.coupon_offer
            // !request.body.Out ||
            // !request.body.Return ||
            // !request.body.Nights ||
            // !request.body.Adults
        ) {
            return await response.status(400).send({
                message: 'Send all required fields: Ticket_ID, Ticket_Price, From,To,coupon_code,coupon_offer',
            });
        }
        const newCoupon = {
            // Ticket_ID: request.body.Ticket_ID,
            // Ticket_Price: request.body.Ticket_Price,
            // From: request.body.From,
            // To: request.body.To,
            coupon_code: request.body.coupon_code,
            coupon_offer: request.body.coupon_offer
            // Out : request.body.Out,
            // Return :request.body.Return,
            // Nights: request.body.Nights ,
            // Adults: request.body.Adults

        };
        const coupon = await Coupon.create(newCoupon);
        return response.status(201).send(coupon);
    } catch (eror) {
        console.log(eror.message);
        response.status(500).send({ message: eror.message });
    }
});




app.get('/data', async (request, response) => {
    try {
        const coupon = await Coupon.find({});
        return response.status(200).json({
            count: coupon.length,
            data: coupon
        });

    } catch {
        console.log(eror.message);
        response.status(500).send({ message: eror.message });
    }
});






app.delete('/data/:Coupon_Code', async (request, response) => {
    try {
        const Coupon_Code = request.params.Coupon_Code;
        const coupon = await Coupon.findOne({ coupon_code: Coupon_Code });
        if (!coupon) {
            return response.status(404).json({ message: 'Coupon not found' });
        }
        await Coupon.deleteOne({ coupon_code: Coupon_Code });
        return response.status(204).json();
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
});


app.get('/data/:Coupon_Code', async (request, response) => {
    try {
        const { Coupon_Code } = request.params;
        // Use the 'ticket_Id' parameter to query the database
        const coupon = await Coupon.findOne({ coupon_code : Coupon_Code });
        if (!coupon) {
            return response.status(404).json({ message: 'Coupon not found😐' });
        }
        return response.status(200).json({
            data: coupon
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: error.message});
    }
});


//MONGO Connection
mongoose.connect(mongoURL)
    .then(() => {
        console.log('App Connected to DB')
        app.listen(PORT, () => {
            console.log(`App is Listening  to port : ${PORT}`);
        })
    })
    .catch((eror) => {
        console.log(eror);
    })