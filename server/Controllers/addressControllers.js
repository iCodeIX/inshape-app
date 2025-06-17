import ShippingAddress from "../Models/ShippingAddress.js";
import dotenv from 'dotenv';
dotenv.config();


export const addShippingAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressLine1, addressLine2, postalCode } = req.body;
        console.log("Console address", req.body);
        if (!addressLine1 || !addressLine2 || !postalCode) {
            return res.status(400).json({ message: "Required input empty" });
        }

        const shippingAddress = new ShippingAddress({
            userId,
            addressLine1,
            addressLine2,
            postalCode

        });

        await shippingAddress.save();

        res.status(200).json({ message: "Shipping address added", shippingAddress });
    } catch (error) {
        console.error("Add payment error:", error);
        res.status(500).json({ message: "Server error while adding shipping address" });
    }
};

export const fetchShippingAddress = async (req, res) => {
    try {
        const userId = req.user._id;

        const shippingAddress = await ShippingAddress.find({ userId });

        if (!shippingAddress || shippingAddress.length === 0) {
            console.log("No shipppingAddress found for this user");
            return res.status(404).json({ message: "No shippping Address found" });
        }

        res.status(200).json({ message: "shippingAddress fetched", shippingAddress });

    } catch (error) {
        console.log("Error fetching shipppingAddress", error);
        res.status(500).json({ messsage: "Server error" })
    }
}

export const deleteShippingAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const shippingAddressId = req.params.id;

        const shippingAddress = await ShippingAddress.findOne({ _id: shippingAddressId, userId });

        if (!shippingAddress) {
            return res.status(404).json({ message: "shipppingAddressd not found" });
        }

        await shippingAddress.deleteOne({ _id: shippingAddressId });

        res.status(200).json({ message: "shipppingAddress deleted successfully" });
    } catch (error) {
        console.error("Error deleting shipppingAddress:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// controllers/paymentController.js
export const updateShippingAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const shippingAddressId = req.params.id;
        const updatedData = req.body;

        const existingPayment = await ShippingAddress.findOne({ _id: shippingAddressId, userId });
        if (!existingPayment) {
            return res.status(404).json({ message: "ShippingAddress method not found" });
        }

        const updatedShippingAddress = await ShippingAddress.findByIdAndUpdate(shippingAddressId, updatedData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ message: "Shipping Addressupdated", updatedShippingAddress });
    } catch (error) {
        console.error("Error updating shippingAddress:", error);
        res.status(500).json({ message: "Server error" });
    }
};