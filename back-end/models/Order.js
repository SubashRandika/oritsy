import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Product'
		}
	},
	{
		timestamps: true
	}
);

const orderSchema = mongoose.Schema(
	{
		orderItems: [orderItemSchema],
		shippingAddress: {
			address: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			},
			postalCode: {
				type: String,
				required: true
			}
		},
		paymentMethod: {
			type: String,
			required: true
		},
		paymentResult: {
			id: {
				type: String
			},
			status: {
				type: String
			},
			updatedTime: {
				type: String
			},
			emailAddress: {
				type: String
			}
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false
		},
		paidAt: {
			type: Date
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false
		},
		deliveredAt: {
			type: Date
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
