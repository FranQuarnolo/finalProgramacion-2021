import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    editorial: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    pages: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Producto = mongoose.model('Producto', productSchema);

export default Producto;