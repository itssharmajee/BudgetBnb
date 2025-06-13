import mongoose, { Schema } from "mongoose";
const dbURI = 'mongodb://localhost:27017/budgetbnb';
mongoose.connect(dbURI).then(()=>{
    console.log('db conected succesfully');
    
}).catch((err)=>{
    console.log(err);
})

const orderSchema = new mongoose.Schema({
    item:String,
    price:Number
})

const customerSchema = new mongoose.Schema({
    name:String,
    ordersId:[{
        type:Schema.Types.ObjectId,
        ref:'Order'
    }]
})

const Order = mongoose.model('Order',orderSchema);
const Customer = mongoose.model("Customer",customerSchema);

const allOrder = async()=>{
    const orders = await Order.insertMany([{
        item:"paneer",
        price:200
    },{
        item:"Chhola",
        price:300
    }])

    console.log(orders)
}

const custAll = async()=>{
    const orders = await Order.find({})
    const res = await Customer.create({
        name:"Sapna Kumari",
        ordersId:[...orders]
    })

    console.log(res)
}

// custAll()
// allOrder()

// (async()=>{
//     await Order.deleteMany({}).then(()=>{
//         console.log("succesfully");
        
//     })
// })()

// (async()=>{
//     await Order.find({}).then((data)=>{
//         console.log(data);
        
//     })
// })()

// (async()=>{
//     await Customer.find({}).populate("ordersId").then((data)=>{
//         console.log(data[0]);
        
//     })
// })()

// (async()=>{
//     await Customer.deleteMany({}).then((data)=>{
//         console.log(data);
        
//     })
// })()