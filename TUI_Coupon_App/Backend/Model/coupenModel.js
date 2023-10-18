import mongoose from 'mongoose';

const couponSchema = mongoose.Schema(
  {
    // Ticket_ID: {
    //   type: Number,
    //   required: true,
    // },
    // Ticket_Price: {
    //   type: Number,
    //   required: true,
    // },
    // From: {
    //   type: String,
    //   required: true,
    // },
    // To: {
    //     type: String,
    //     required: true,
    //   },
    coupon_code: {
        type: String,
        required: true,
      },
    coupon_offer: {
        type: Number,
        required: true,
      }
      // Out: {
      //   type: String,
      //   required: true,
      // },
      // Return: {
      //   type: String,
      //   required: true,
      // },
      // Nights: {
      //   type: Number,
      //   required: true,
      // },
      // Adults: {
      //   type: Number,
      //   required: true,
      // },
  },
  {
    timestamps: true,
  }
);

export const Coupon = mongoose.model('Coupon', couponSchema);
