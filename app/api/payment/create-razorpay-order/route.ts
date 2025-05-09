import { NextResponse } from "next/server"
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request: Request){
    try{
        const { amount } = await request.json();
        console.log('Creating order with amount:', amount);
        

        if(!amount) return NextResponse.json({error: "Invalid plan"}, {status: 400});
        const order = await razorpay.orders.create({
            amount : Number(amount) * 100,
            currency: 'INR',
            receipt: `TT${Date.now()}`,
        })

        

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });
    }catch(error) {
        console.log('Error in creating order', error);
        return NextResponse.json(
            {error: 'Error'},
            {status: 500}
        );
    }
}