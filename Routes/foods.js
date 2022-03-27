const { getAll, getOne, createOne, editOne, deleteOne } = require('../Controllers/foods');
const router = require('express').Router();
// const pagination = require('../middlewars/pagination');

router.get('/',  getAll);
router.get('/:id', getOne);
router.post('/', createOne);
router.put('/:id', editOne);
router.delete('/:id', deleteOne);

module.exports = router;