import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';          // ✅ lowercase 'jwt' (correct)
import bcrypt from 'bcrypt';
import Product from './model/Product.model.js';
import User from './model/user.model.js';
import Shopkeeper from './model/shopkepeper.model.js'; // ✅ Import Shopkeeper model

dotenv.config(); // ✅ Load environment variables

const app = express();
const PORT = 3000;

// ✅ Read environment variables
const jwtkey = process.env.Jwttoken;
const mongoURI = process.env.mongodb_uri;

// ✅ Log for debugging
console.log("JWT Key:", jwtkey);
console.log("MongoDB URI:", mongoURI);

// ✅ Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Registration route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    const result = await user.save();

    const { password: _, ...userWithoutPassword } = user._doc;

    jwt.sign({ user: userWithoutPassword }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.error("JWT Error:", err);
        return res.status(500).json({ error: "JWT signing failed" });
      }
      res.status(200).json({
        message: "Sign up successful",
        user: userWithoutPassword,
        token
      });
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message }); // ✅ Show real error during development
  }
});
app.post('/shopkeeper/login' ,async (req, res) => {
  try {
    const { email, password } = req.body;
    const shopkeeper = await Shopkeeper.findOne({ email });   
    if (!shopkeeper) {
      return res.status(404).json({ error: "Shopkeeper not found" });
    }
    const isMatch = await bcrypt.compare(password, shopkeeper.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    } 
    const { password: _, ...shopkeeperWithoutPassword } = shopkeeper._doc;
    jwt.sign({ shopkeeper: shopkeeperWithoutPassword }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.error("JWT Error:", err);
        return res.status(500).json({ error: "JWT signing failed" });
      }
      res.status(200).json({
        message: "Shopkeeper login successful",
        shopkeeper: shopkeeperWithoutPassword,
        token
      });
    });
  } catch (error) {
    console.error("Shopkeeper login error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.post('/shopkeeper/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, isShopkeeper } = req.body;

    // ✅ Validation check
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // ✅ Check if already registered
    const existingShopkeeper = await Shopkeeper.findOne({ email });
    if (existingShopkeeper) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // ✅ Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new shopkeeper document
    const shopkeeper = new Shopkeeper({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      isShopkeeper: isShopkeeper ?? true // default true if checkbox is not sent
    });

    const result = await shopkeeper.save();

    // ✅ Remove password before sending response
    const { password: _, ...userWithoutPassword } = result._doc;

    // ✅ Create JWT token
    jwt.sign({ user: userWithoutPassword }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.error("JWT Error:", err);
        return res.status(500).json({ error: "JWT signing failed" });
      }

      res.status(200).json({
        message: "Shopkeeper registration successful",
        ...userWithoutPassword,
        token
      });
    });
  } catch (error) {
    console.error("Shopkeeper registration error:", error);
    res.status(500).json({ error: error.message });
  }
})
// ✅ Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const { password: _, ...userWithoutPassword } = user._doc;

    jwt.sign({ user: userWithoutPassword }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.error("JWT Error:", err);
        return res.status(500).json({ error: "JWT signing failed" });
      }

      res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword,
        token
      });
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Add Product
app.post('/add-product', async (req, res) => {
  try {
    const { email, name, description, price, category, company, stockQuantity } = req.body;

    if (!name || !description || !price || !category || !company) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const product = new Product({ email, name, description, price, category, company, stockQuantity });
    const result = await product.save();

    res.status(201).json({ message: 'Product added successfully', product: result });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all products
app.get('/productList', async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete product by ID
app.delete('/delete-product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get single product
app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    console.error('Fetch single product error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Search product
app.get('/search/:key', async (req, res) => {
  try {
    const products = await Product.find({
      "$or": [
        { name: { $regex: req.params.key, $options: "i" } },
        { category: { $regex: req.params.key, $options: "i" } },
        { company: { $regex: req.params.key, $options: "i" } }
      ]
    });

    if (!products.length) return res.status(404).json({ error: 'No matching products found' });
    res.status(200).json(products);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update product
app.put('/update-product/:id', async (req, res) => {
  try {
    const { name, description, price, category, company, stockQuantity } = req.body;
    if (!name || !description || !price || !category || !company || !stockQuantity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, company, stockQuantity },
      { new: true }
    );

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
