import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
// import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import { HardhatUserConfig, task } from "hardhat/config";
import "solidity-coverage";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import 'solidity-docgen';

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 9999,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 40000000,
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC || "",
      accounts: {
        mnemonic,
      },
    },
    ropsten: {
      url: process.env.ROPSTEN_RPC || "",
      accounts: {
        mnemonic,
      },
    },
    mainnet: {
      url: process.env.MAINNET_RPC || "",
      accounts: {
        mnemonic,
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    // outputFile: process.env.REPORT_GAS ? 'gas-report.txt' : undefined,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  docgen: {
    pages: "files",
    collapseNewlines: true,
    outputDir: "docs/api",
  }
};

export default config;
