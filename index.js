const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoutes = require('./Routes/UserRoutes');
const CartRoutes = require('./Routes/ProductsRoutes')
;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users',UserRoutes);
app.use('/api/cart',CartRoutes);

mongoose.connect("mongodb+srv://wuchenou1:wuchenou1@cluster0.krueo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB Successfully");

    // 只有在 MongoDB 连接成功后，才启动服务器
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
