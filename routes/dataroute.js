// creating paths

const router = require("express").Router();
var dataController = require('../models/data');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const data = await dataController.find();
    //console.log(data);
    if(data){
        res.render("SampleForm", {
            data: data
        });
    } else {
        console.log('Failed to retrieve the Course List: ');
    }
});

// Insert product
router.post('/', async (req, res)=>{
    console.log(req.body)
    const data = await dataController.create(req.body);
    if(data){
        res.status(200).json({data})
    } else {
        res.status(401).json({success: false})
    }
});

// Update product
router.post('/update/:id', async (req, res, next)=>{
    console.log(req.body);
    const userId = req.params.id; 
    const title1 = req.body.title;
    const price1 = req.body.price;
    const image1 = req.body.image;
    const details1 = req.body.details;
    const updatedata = await dataController.findByIdAndUpdate(userId, { title: title1, price: price1, image: image1, details: details1 }, { new: true });
    if(updatedata){
      console.log('User updated successfully:', updatedata);
      res.redirect('/');
    }
    else{
      console.error('Error updating user:', error);
    }
});

// Delete product
router.post('/delete/:id', async (req, res, next) => {
    //console.log(req.params)
    const removeProduct = await dataController.findByIdAndDelete(req.params.id);
    if(removeProduct){
        res.json(removeProduct);
        res.redirect('/');
        //res.redirect('/');
    } else {
        res.json({ message: error });
    }
});

module.exports = router;