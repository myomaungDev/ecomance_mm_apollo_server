import {
    model,
    Schema
} from 'mongoose';
import mongoose from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';
const orderSchema = new Schema({
    status: {
        type: String,
        enum: ['pending', 'pickup', 'completed'],
        default: 'pending'
    },
    product_info: [{
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }],
    buyer_info: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    delivery_info: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    seller_info: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
});
orderSchema.plugin(MongoosePaginate);
export default model('order', orderSchema);