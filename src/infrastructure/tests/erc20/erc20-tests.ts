import { BaseETHTests } from 'src/infrastructure/abstracts/abstract-eth-tests/abstract-eth-tests';
import { ERC20DeploymentTests } from './implementations/erc20-deployment-tests';
import { ERC20TransactionTests } from './implementations/erc20-transaction-tests';
import TestETHDto from 'src/infrastructure/dtos/test-eth/test-eth.dto';

export class TestERC20Service extends BaseETHTests {
  async addMinimalTests(testERC20Dto: TestETHDto) {
    const deployment = new ERC20DeploymentTests();
    const transactions = new ERC20TransactionTests();

    this.addTest([
      deployment.testDeployment.bind(this, testERC20Dto),
      transactions.checkOwnerBalance.bind(this),
      transactions.checkTotalSupply.bind(this, testERC20Dto),
      transactions.testApprove.bind(this, testERC20Dto),
      transactions.testTransfer.bind(this, testERC20Dto),
      transactions.testTransferFrom.bind(this, testERC20Dto),
    ]);
  }
}
