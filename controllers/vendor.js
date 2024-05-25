const Vendor = require('../models/vendor');

// Function to generate unique vendor ID
const generateUniqueVendorId = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id;
    let isUnique = false;

    while (!isUnique) {
        id = characters.charAt(Math.floor(Math.random() * characters.length)) +
             characters.charAt(Math.floor(Math.random() * characters.length)) +
             Math.floor(10 + Math.random() * 90); // Random 2-digit number

        const existingVendor = await Vendor.findOne({ vendorId: id });
        if (!existingVendor) {
            isUnique = true;
        }
    }

    return id;
};

// Create a new vendor
const addVendor = async (req, res) => {
    try {
        const vendorId = await generateUniqueVendorId();
        const vendor = new Vendor({ vendorId, ...req.body });
        await vendor.save();
        res.status(201).send(vendor);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.send(vendors);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a vendor by ID
const getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findOne({ vendorId: req.params.id });
        if (!vendor) {
            return res.status(404).send();
        }
        res.send(vendor);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a vendor by ID
const updateVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findOneAndUpdate({ vendorId: req.params.id }, req.body, { new: true, runValidators: true });
        if (!vendor) {
            return res.status(404).send();
        }
        res.send(vendor);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a vendor by ID
const deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findOneAndDelete({ vendorId: req.params.id });
        if (!vendor) {
            return res.status(404).send();
        }
        res.send(vendor);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { addVendor, getAllVendors, getVendorById, updateVendor, deleteVendor };
