const EtherWallet = require('../models/EtherWallet');
const EthereumConnection = require('../models/EthereumConnection');
const SolidityContract = require('../models/SolidityContract');

function main(res, req) {
    const privateKey = '';
    const wallet = new EtherWallet(privateKey);
    const connection = new EthereumConnection('http://localhost:8454');
    const contract = new SolidityContract('./contracts/sampleContract', 'SampleContract');
    const pushedContract = connection.pushContract(contract);
}

module.exports = {
    main,
}