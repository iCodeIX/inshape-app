import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";

export const add = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({ message: 'Invalid product or quantity' });
        }

        const cart = await Cart.findOne({ userId }) || new Cart({ userId, items: [] });

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        // Fetch full updated cart with populated product details
        const updatedCart = await Cart.findOne({ userId }).populate('items.productId');

        res.json({ items: updatedCart.items }); // ✅ return only items array
    } catch (err) {
        console.error('Add single item error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const fetchCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.json({ items: [] });
        }

        res.json({ items: cart.items });
    } catch (err) {
        console.error('Get cart error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const removeItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Remove item by filtering
        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();
        await cart.populate('items.productId'); // Important!

        res.json({ success: true, items: cart.items });
    } catch (error) {
        console.error('Remove item error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        console.log(productId, quantity);

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

        if (quantity < 1) {
            // Remove item
            cart.items.splice(itemIndex, 1);
        } else {
            // Update quantity
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();

        // ✅ Repopulate after save
        await cart.populate('items.productId');

        res.json({ success: true, items: cart.items });
    } catch (err) {
        console.error('Update quantity error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
