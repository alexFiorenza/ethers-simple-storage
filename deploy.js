// Contracts deploy must be in asynchronous functions
async function main() {
  //http://127.0.0.1:7545
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
