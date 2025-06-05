const { ethers } = require('ethers');
const yieldVaultAbi = require('../abi/YieldVault.json');
const idrxAbi = require('../abi/IDRXToken.json');

const YIELD_VAULT_ADDRESS = '0xA15BB66138824a1c7167f5E85b957d04Dd34E468'; // Alamat contract di anvil
const IDRX_ADDRESS = '0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35'; // Alamat token IDRX

function getContracts() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const yieldVault = new ethers.Contract(YIELD_VAULT_ADDRESS, yieldVaultAbi, wallet);
  const idrxToken = new ethers.Contract(IDRX_ADDRESS, idrxAbi, wallet);

  return { yieldVault, idrxToken };
}

module.exports = { getContracts };
