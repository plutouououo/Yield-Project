const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Load ABIs
const yieldVaultAbi = JSON.parse(fs.readFileSync(path.join(__dirname, '../abi/YieldVault.json'), 'utf8'));
const idrxTokenAbi = JSON.parse(fs.readFileSync(path.join(__dirname, '../abi/IDRXToken.json'), 'utf8'));

// Initialize contracts
const getContracts = (provider, wallet) => {
  const yieldVault = new ethers.Contract(
    process.env.YIELD_VAULT_ADDRESS,
    yieldVaultAbi,
    wallet
  );
  const idrxToken = new ethers.Contract(
    process.env.IDRX_TOKEN_ADDRESS,
    idrxTokenAbi,
    wallet
  );
  return { yieldVault, idrxToken };
};

module.exports = { getContracts };