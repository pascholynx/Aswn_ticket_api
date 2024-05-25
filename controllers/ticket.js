const mongoose = require('mongoose');
const Ticket = require('../models/ticket');
const Vendor = require('../models/vendor');

// Function to generate unique ticket ID
const generateUniqueTicketId = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id;
    let isUnique = false;

    while (!isUnique) {
        id = characters.charAt(Math.floor(Math.random() * characters.length)) +
             characters.charAt(Math.floor(Math.random() * characters.length)) +
             Math.floor(100 + Math.random() * 900); // Random 3-digit number

        const existingTicket = await Ticket.findOne({ ticketId: id });
        if (!existingTicket) {
            isUnique = true;
        }
    }

    return id;
};

// Controller function to handle ticket purchase
const buyTicket = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { buyerName, buyerPhone, buyerEmail, vendorId } = req.body;

        // Validate vendor
        const vendor = await Vendor.findOne({ vendorId }).session(session);
        if (!vendor) {
            await session.abortTransaction();
            return res.status(404).send('Vendor not found');
        }

        // Generate unique ticket ID
        const ticketId = await generateUniqueTicketId();

        // Create ticket sale record
        const ticket = new Ticket({
            ticketId,
            buyerName,
            buyerPhone,
            buyerEmail,
            vendor: vendor.vendorId
        });

        await ticket.save({ session });

        // Update vendor's ticket sales count
        vendor.ticketsSold += 1;
        await vendor.save({ session });

        await session.commitTransaction();
        res.send('Ticket purchased successfully!');
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).send({ message: 'Failed to purchase ticket', error });
    } finally {
        session.endSession();
    }
};

// Controller function to get all ticket sales
const getAllTicketSales = async (req, res) => {
    try {
        const ticketSales = await Ticket.find().populate('vendor');
        res.send(ticketSales);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve ticket sales', error });
    }
};

// Controller function to get all tickets sold by a vendor
const getTicketsByVendor = async (req, res) => {
    try {
        const vendorId = req.params.vendorId;

        // Find all tickets with the specified vendor ID
        const tickets = await Ticket.find({ vendor: vendorId });

        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve tickets', error });
    }
};

module.exports = { buyTicket, getAllTicketSales, getTicketsByVendor };
