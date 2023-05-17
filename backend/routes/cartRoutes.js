const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn } = require('../middleware/verifyAuthToken');
const {
  // createCart,
  // getUserCart,
  getCart,
  addToCart,
  // updateItem,
  deleteItem,
  removeAllItems
} = require('../controllers/cartController');

router.use(verifyIsLoggedIn);

// router.post('/create', createCart);
// router.get('/:userId', getUserCart);
router.get('/', getCart);
router.post('/add', addToCart);
// router.patch('/update/:itemId', updateItem);
router.delete('/delete/:itemId', deleteItem);
router.delete('/remove', removeAllItems);

module.exports = router;
