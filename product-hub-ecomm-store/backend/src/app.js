const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const OAuth2Client = require("google-auth-library").OAuth2Client;
const signupModel = require("./models/signup.model");
const loginModel = require("./models/login.model");
const orderModel = require("./models/order.model");

const app = express();

// middleware
app.use(
  // cors({
  //   origin: "http://localhost:5173",
  // }),
  cors(),
);

app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = "my_super_secret_key_123";

// Google OAuth route (post api)
app.post("/api/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    // verify token from Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: client._clientId,
    });

    const payload = ticket.getPayload();

    const { sub, name, email } = payload;

    let user = await signupModel.findOne({
      $or: [{ email }, { googleId: sub }],
    });

    if (!user) {
      user = await signupModel.create({
        fullName: name,
        email,
        password: null, // No password for Google users
        googleId: sub,
      });
    } else {
      // existing user - update their Google ID if not already set
      if (!user.googleId) {
        user = await signupModel.findOneAndUpdate(
          { email },
          { googleId: sub },
          { returnDocument: "after" },
        );
      }
    }

    // Store only last login
    await loginModel.findOneAndUpdate(
      { email: user.email },
      {
        fullName: user.fullName,
        timestamp: new Date(),
      },
      { upsert: true, returnDocument: "after" },
    );

    // Create JWT token
    const jwtToken = jwt.sign(
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role || "user",
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Google login successful!",
      token: jwtToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Error logging in with Google" });
  }
});

// route 1: SIGNUP
// (post api)
app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body; //data sent from fronend

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" }); //sent data back to frontend
    }

    const existingUser = await signupModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      fullName,
      email,
      password: hashedPassword,
    };
    await signupModel.create(newUser);

    res
      .status(201)
      .json({ message: "Account created successfully! Please login." });
  } catch (error) {
    res.status(500).json({ message: "Error creating account" });
  }
});

// (get api)
app.get("/api/signup", async (req, res) => {
  try {
    const signups = await signupModel
      .find()
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Signup Data fetched successfully",
      signups,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching signup data" });
  }
});

// (delete api)
app.delete("/api/signup/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await signupModel.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// route 2: LOGIN
// (post api)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const user = await signupModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "No account found with this email. Please signup first.",
    });
  }

  // Check if user only has Google login (no password set)
  if (!user.password) {
    return res.status(400).json({
      message:
        "This account was created with Google Sign-In. Please use Google to login.",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect password or email. Please try again.",
    });
  }

  // Store only last login
  await loginModel.findOneAndUpdate(
    { email: user.email },
    {
      fullName: user.fullName,
      timestamp: new Date(),
    },
    { upsert: true, returnDocument: "after" },
  );

  // login token creation
  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.json({
    message: "Login successful!",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

// (get api)
app.get("/api/login", async (req, res) => {
  try {
    const logins = await loginModel.find().sort({ timestamp: -1 });
    res.status(200).json({
      message: "Login Data fetched successfully",
      logins,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching login data" });
  }
});

// (delete api)
app.delete("/api/login/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedLogin = await loginModel.findOneAndDelete({ _id: id });
    if (!deletedLogin) {
      return res.status(404).json({ message: "Login record not found" });
    }
    res.status(200).json({ message: "Login record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting login record" });
  }
});

// route 3: ORDERS
// (POST API)
app.post("/api/orders", async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      userName,
      products,
      totalAmount,
      totalItems,
      shippingAddress,
      notes,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }
    if (!userName) {
      return res.status(400).json({ message: "User name is required" });
    }
    if (!products) {
      return res.status(400).json({ message: "Products array is required" });
    }
    if (!totalAmount && totalAmount !== 0) {
      return res.status(400).json({ message: "Total amount is required" });
    }

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Products must be an array" });
    }

    if (products.length === 0) {
      return res
        .status(400)
        .json({ message: "Products array cannot be empty" });
    }

    const newOrder = {
      userId,
      userEmail,
      userName,
      products,
      totalAmount,
      totalItems: totalItems || products.length,
      shippingAddress: shippingAddress || "",
      notes: notes || "",
      orderStatus: "pending",
      paymentStatus: "completed",
    };

    const order = await orderModel.create(newOrder);

    res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error placing order: " + error.message,
      error: error.toString(),
    });
  }
});

// GET API - Fetch all orders (for admin dashboard)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .sort({ timestamp: -1 })
      .populate("userId", "fullName email");

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
      totalOrders: orders.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// GET API - Fetch user's orders
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.find({ userId }).sort({ timestamp: -1 });

    res.status(200).json({
      message: "User orders fetched successfully",
      orders,
      totalOrders: orders.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
});

// UPDATE API - Update order status
app.patch("/api/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus, notes } = req.body;

    const updatedOrder = await orderModel.findOneAndUpdate(
      { _id: orderId },
      {
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus }),
        ...(notes && { notes }),
      },
      { returnDocument: "after" },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating order" });
  }
});

// DELETE API - Delete order
app.delete("/api/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await orderModel.findOneAndDelete({ _id: orderId });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
});

module.exports = app;
