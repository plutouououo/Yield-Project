const express = require('express');
const router = express.Router();
const { getContracts } = require('../services/contract');

router.post('/', async (req, res) => {
  try {
    const { yieldVault } = getContracts(req.provider, req.wallet);

    // Call the withdraw function
    const withdrawTx = await yieldVault.withdraw();
    const receipt = await withdrawTx.wait();

    res.status(200).json({
      message: 'Withdrawal successful',
      transactionHash: receipt.transactionHash
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Withdrawal failed' });
  }
});

module.exports = router;