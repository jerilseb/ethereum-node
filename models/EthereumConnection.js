/**
 * Creates a connection to the provided etherRPC
 * */
const Web3Library = require('web3');

class EthereumConnection {

    constructor(url) {
        const web3 = new Web3Library();
        web3.setProvider(new web3.providers.HttpProvider(url));
        this.web3 = web3;
    }

    pushContract(sender, contract, ...params) {
        const parsedContract = this.web3.eth.contract(JSON.parse(contract.getABI()));
        return parsedContract.new(...params, {
            from: sender,
            data: contract.getByteCode,
            gas: this.getGasEstimate(contract.getBtyeCode()),
        }, function(err, pushedContract) {
            if (err) {
                console.log(err);
                return {};
            }
            if (!pushedContract.address) {
                console.log(pushedContract.transactionHash);
                return {};
            }
            console.log(pushedContract.address);
            return pushedContract;
        });
    }
    
    getGasEstimate(data) {
       return this.web3.eth.estimateGas({ data }); 
    }
}

module.exports = EthereumConnection;