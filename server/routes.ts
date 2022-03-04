const express = require('express');
const router = express.Router();

router.get('/', (req: any, res: any) => {
  res.render('index', { title: 'Express' });
});

router.get('/users', (req: any, res: any) => {

})

module.exports = router;
