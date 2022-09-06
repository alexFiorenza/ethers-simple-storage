const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()
// Contracts deploy must be in asynchronous functions
async function main() {
  //http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_SERVER)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const encryptedJSON = fs.readFileSync("./.encryptedWallet.json", "utf8")
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8")
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8")
  const factory = new ethers.ContractFactory(abi, bin, wallet)
  console.log("Deploying contract...")
  const contract = await factory.deploy()
  console.log(`Contract address: ${contract.address}`)
  const currentFavoriteNumber = await contract.retrieve()
  console.log(`Current favorite number is ${currentFavoriteNumber}`)
  const transaction = await contract.store("7")
  const transactionReceipt = await transaction.wait(1)
  const updatedFavoriteNumber = await contract.retrieve()
  console.log(`Updated favorite number is ${updatedFavoriteNumber}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
