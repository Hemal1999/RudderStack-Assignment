const express = require('express');

const router = express.Router()

module.exports = router;

const Model = require('../models/sourcetemplates');
const ConfigPayloads = require('../models/configpayloads');

//Post Method to post a new source template
router.post('/post-template', async (req, res) => {
    const data = new Model({
        type: req.body.type,
        fields: req.body.fields
    })
    Model.find({ type: req.body.type }, function (err, response) {
        var blank = [];
        if (err)
            res.send(err);
        else if (response.length != 0) {
            res.send("Source with this type is already present");
        }
        else {
            try {
                const dataToSave = data.save();
                res.status(200).json(dataToSave)
            }
            catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    });
})

// Post Method to post a new config payload
router.post('/post-payload', async (req, res) => {
    const configpayloads = new ConfigPayloads({
        sourceType: req.body.sourceType,
        payload: req.body.payload
    })

    try {
        const dataToSave = await configpayloads.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Templates Method
router.get('/getAllTemplates', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get particular template by source type
router.get('/getOneTemplate/:type', async (req, res) => {
    Model.find({ type: req.params.type }, function (err, response) {
        if (err)
            res.send(err);
        else
            res.send(response[0]);
    });
})

//Get all types of sourceTemplates present
router.get('/getAllTypes', async (req, res) => {
    try {
        const data = await Model.find();
        var array = [];
        for (let i = 0; i < data.length; i++) {
            array.push(data[i].type);
        }
        res.send(array);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get all config payloads Method
router.get('/getAllPayloads', async (req, res) => {
    try {
        const data = await ConfigPayloads.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ALL config payloads of a particular sourceType
router.get('/getAll/:sourceType', async (req, res) => {
    ConfigPayloads.find({ sourceType: req.params.sourceType }, function (err, response) {
        if (err)
            res.send(err);
        else
            var array = [];
        for (let i = 0; i < response.length; i++) {
            array.push(response[i].payload);
        }
        res.send(array);
    });
})

// //Update by ID Method
// router.patch('/update/:id', async(req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// //Delete by ID Method
// router.delete('/delete/:id', async(req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Model.findByIdAndDelete(id)
//         res.send(`Document with ${data.id} has been deleted..`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// //Get by ID Method
// router.get('/getTemplate/:id', async(req, res) => {
//     try{
//         const data = await Model.findById(req.params.id);
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })
