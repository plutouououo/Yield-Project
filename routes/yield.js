const express = require('express');
const router = express.Router();
const { getContracts } = require('../services/contract');
const { getDummyOracleData } = require('../services/oracle');

router.get('/', async (req, res) => {
  try {
    const { yieldVault } = getContracts(req.provider, req.wallet);

    // Get base yield from smart contract
    const baseYield = await yieldVault.getYield();

    // Get dummy oracle data for yield variation
    const yieldVariation = await getDummyOracleData();

    // Adjust yield with oracle data (e.g., add variation)
    const adjustedYield = Number(ethers.utils.formatEther(baseYield)) * (1 + yieldVariation);

    res.status(200).json({
      yield: adjustedYield.toFixed(4) // Format to 4 decimal places
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch yield' });
  }
});

module.exports = router;