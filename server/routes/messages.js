import express from express;
import Message from '../models/Message.js';

const router = express.Router(); 

router.post('/', async (req, res) => {
    const { customerId, message } = req.body;
    try {
        const newMessage = new Message({ customerId, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: `Error saving message: ${error}` });
    }
});

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: `Error fetching messages: ${error}` });
    }
})


router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { agentResponse } = req.body;
    try {
        const updatedMessage = await Message.findByIdAndUpdate(id, { agentResponse }, { new: true });
        res.status(200).json(updatedMessage);
    } catch (error) { 
        res.status(500).json({ error: `Error updating response: ${error}` });
    }
});

module.exports = router;