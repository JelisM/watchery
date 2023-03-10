const express = require('express')
const router = express.Router()
const watchesCtrl = require('../../controllers/api/watches')

router.get('/',watchesCtrl.index);

router.get('/:id',watchesCtrl.show)

module.exports=router