const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
    ticketId: { type: String, unique: true, required: true },
    buyerName: { type: String, required: true },
    buyerPhone: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    vendor: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
