import Razorpay from "razorpay";
import config from "../config/config.js";

const razorpay = new Razorpay({
  key_id: config.razorpayKeyId,
  key_secret: config.razorpayKeySecret,
});

export default razorpay;