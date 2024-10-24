const express = require('express');
const router = express.Router();
const AdminUser = require('../Models/AdminUser');


router.post('/adminUser', async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { userId, name, email, roles, picture } = req.body;

            //await connectDB(); // Connect to your MongoDB

            // Check if the admin user already exists
            let adminUser = await AdminUser.findOne({ userId });

            if (!adminUser) {
                // Create a new admin user
                adminUser = new AdminUser({
                    userId,
                    name,
                    email,
                    roles,
                    picture, // Save the picture URL
                });

                await adminUser.save();
            }

            res.status(200).json({ message: 'Admin user saved successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error saving admin user' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
});

router.get('/get', async (req, res) => {
    try {


        // Retrieve all admin users
        const adminUsers = await AdminUser.find();

        res.status(200).json(adminUsers); // Return the list of admin users
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching admin users' });
    }
});

// Update Admin User by userId
router.get('/adminUser/:userId', async (req, res) => {
    const userId = decodeURIComponent(req.params.userId);
    console.log('Fetching admin user with userId:', userId); // Log userId for debugging

    try {
        const adminUser = await AdminUser.findOne({ userId });
        if (!adminUser) {
            console.log('User not found:', userId); // Log if user is not found
            return res.status(404).json({ message: `Admin user with ID ${userId} not found` });
        }

        console.log('Found admin user:', adminUser); // Log if user is found
        res.status(200).json(adminUser);
    } catch (error) {
        console.error("Error fetching admin user:", error);
        res.status(500).json({ message: 'Error fetching admin user', error: error.message });
    }
});




router.put('/adminUser/:userId', async (req, res) => {
    // Decode the userId to handle special characters
    const decodedUserId = decodeURIComponent(req.params.userId);
    console.log(`Received request to update admin user with decoded ID: ${decodedUserId}`);

    const updateData = req.body;

    try {
        // Find the user by the decoded userId and update with the new data
        const updatedUser = await AdminUser.findOneAndUpdate(
            { userId: decodedUserId },  // Use the decoded userId
            updateData,
            { new: true, runValidators: true } // Return the updated document and run validation
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Admin user not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating admin user:", error);
        res.status(500).json({ message: 'Error updating admin user', error });
    }
});

module.exports = router;
