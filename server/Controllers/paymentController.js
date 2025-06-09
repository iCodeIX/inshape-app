import Payment from "../Models/Payment.js";

export const addPaymentMethod = async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstName, middleInitial, lastName, email, payerNumber, paymentMethod } = req.body;

        if (!firstName || !lastName || !email || !payerNumber || !paymentMethod) {
            return res.status(400).json({ message: "Required input empty" });
        }

        const payment = new Payment({
            userId,
            firstName,
            middleInitial,
            lastName,
            email,
            payerNumber,
            paymentMethod,
        });

        await payment.save();

        res.status(200).json({ message: "Payment added", payment });
    } catch (error) {
        console.error("Add payment error:", error);
        res.status(500).json({ message: "Server error while adding payment" });
    }
};

export const fetchPaymentMethods = async (req, res) => {
    try {
        const userId = req.user._id;

        const payments = await Payment.find({ userId });

        if (!payments || payments.length === 0) {
            console.log("No payment methods found for this user");
            return res.status(404).json({ message: "No payment methods found" });
        }

        res.status(200).json({ message: "payment fetched", payments });

    } catch (error) {
        console.log("Error fetching payments", error);
        res.status(500).json({ messsage: "Server error" })
    }
}

export const deletePaymentMethod = async (req, res) => {
    try {
        const userId = req.user._id;
        const paymentId = req.params.id;

        const payment = await Payment.findOne({ _id: paymentId, userId });

        if (!payment) {
            return res.status(404).json({ message: "Payment method not found" });
        }

        await Payment.deleteOne({ _id: paymentId });

        res.status(200).json({ message: "Payment method deleted successfully" });
    } catch (error) {
        console.error("Error deleting payment method:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// controllers/paymentController.js
export const updatePaymentMethod = async (req, res) => {
    try {
        const userId = req.user._id;
        const paymentId = req.params.id;
        const updatedData = req.body;

        const existingPayment = await Payment.findOne({ _id: paymentId, userId });
        if (!existingPayment) {
            return res.status(404).json({ message: "Payment method not found" });
        }

        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updatedData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ message: "Payment method updated", updatedPayment });
    } catch (error) {
        console.error("Error updating payment method:", error);
        res.status(500).json({ message: "Server error" });
    }
};
