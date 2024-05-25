const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor');
const ticketController = require('../controllers/ticket');


router.get('/api', (req,res) => { res.end('Welcome to our site')});

router.post('/api/vendors', vendorController.addVendor);
router.get('/api/vendors', vendorController.getAllVendors );
router.get('/api/vendors/:id', vendorController.getVendorById);
router.patch('/api/vendors/:id', vendorController.updateVendor);
router.delete('/api/vendors/:id', vendorController.deleteVendor);

router.post('/api/buy-ticket', ticketController.buyTicket);
router.get('/api/tickets', ticketController.getAllTicketSales);
router.get('/api/vendors/:vendorId/tickets', ticketController.getTicketsByVendor);

module.exports = router;