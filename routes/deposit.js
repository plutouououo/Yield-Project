const express = require('express');
const router = express.Router();
const { getContracts } = require('../services/contract');

router.post('/', async (req, res) => {
  try {
    const { amount } = req.body; // Amount of IDRX to deposit
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const { yieldVault, idrxToken } = getContracts(req.provider, req.wallet);

    // Approve the YieldVault to spend IDRX tokens (ERC20 approval)
    const approveTx = await idrxToken.approve(yieldVault.address, amount);
    await approveTx.wait();

    // Call the deposit function on YieldVault
    const depositTx = await yieldVault.deposit(amount);
    const receipt = await depositTx.wait();

    res.status(200).json({
      message: 'Deposit successful',
      transactionHash: receipt.transactionHash
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Deposit failed' });
  }
});

module.exports = router;