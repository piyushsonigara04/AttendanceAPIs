// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.createOrder = factory.createOne(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.getOrderforuser = factory.getbyid(Order);

exports.updateUser = factory.updateUser(Order, User);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently ordered items
  const items = req.body.items; // You should pass the ordered items in the request body

  // 2) Calculate the total amount
  const totalAmount = items.reduce((total, item) => {
    return total + item.quantity * item.item.price; // Assuming each item has a "price" property
  }, 0);

  // 3) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/my-orders?alert=order`,
    cancel_url: `${req.protocol}://${req.get("host")}/`,
    customer_email: req.user.email,
    client_reference_id: req.user.id, // Use the user's ID as a reference
    line_items: items.map((item) => {
      return {
        name: item.item.itemName,
        description: item.item.description,
        images: [item.item.image],
        amount: item.item.price * 100, // Convert to cents
        currency: "usd",
        quantity: item.quantity,
      };
    }),
  });

  // 4) Create session as a response
  res.status(200).json({
    status: "success",
    session,
    totalAmount,
  });
});

const createOrderCheckout = async (session) => {
  const userId = session.client_reference_id;
  const user = await User.findById(userId);

  const items = session.display_items.map((item) => {
    return {
      item: item.description, // You might need to adjust this depending on your data structure
      quantity: item.quantity,
    };
  });

  const totalAmount = session.amount_total / 100; // Convert back to dollars

  await Order.create({ user, items, totalAmount });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    createOrderCheckout(event.data.object);

  res.status(200).json({ received: true });
};
