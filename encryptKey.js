const ethers = require('ethers');
const fs = require('fs');
require('dotenv').config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedWallet = await wallet.encrypt(
    process.env.PASSWORD,
    process.env.PRIVATE_KEY
  );
  fs.writeFileSync('./.encryptedWallet.json', encryptedWallet);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
