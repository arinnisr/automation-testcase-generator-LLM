import express from 'express';

const router = express.Router();

// Route to display the form
router.get('/', (req, res) => {
  
  res.render('form', { 
    title: 'Input URL'
  }); // Render the form view
});

export default router;
