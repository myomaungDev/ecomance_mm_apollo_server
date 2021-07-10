import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const priceInfo = new Schema({
	price: {
		type: Number,
		required: true
	},
	discount: {
		type: Number,
		default: 0
	}
});
const productInfo = new Schema({
	weight: String,
	width: String,
	height: String
});
const productSchema = new Schema(
	{
		p_name: {
			type: String,
			required: [ true, 'Product name must not be empty' ],
			min: [ 3, 'Minimum length is 3' ],
			max: [ 200, 'Maximum length is 200.' ]
		},
		category_id: {
			type: mongoose.Types.ObjectId,
			ref: 'category'
		},
		seller_id: {
			type: mongoose.Types.ObjectId,
			ref: 'user'
		},
		description: {
			type: String,
			required: true
		},
		price_info: priceInfo,
		product_info: productInfo,
        p_img:{
            type:String,
            required:true
        }
	},
	{ timestamps: true }
);

productSchema.plugin(mongoosePaginate);

export default model('product', productSchema);
