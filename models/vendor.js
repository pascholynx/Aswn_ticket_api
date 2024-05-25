const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
 vendorId: { type: String, unique: true },
 name: { type: String, required: true },
 phone: { type: String, required: true },
 email: { type: String, required: true, unique: true },
 ticketsSold: { type: Number, default: 0 }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;