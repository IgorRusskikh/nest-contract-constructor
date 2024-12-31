import { BaseETHTests } from 'src/infrastructure/abstracts/abstract-eth-tests/abstract-eth-tests';
import IERC20TransactionTests from 'src/infrastructure/interfaces/test-erc20-transaction/test-erc20-transaction.interface';

export class ERC20TransactionTests
  extends BaseETHTests
  implements IERC20TransactionTests
{
  async checkOwnerBalance(): Promise<boolean> {
    try {
      if (!this.deployedContract) {
        // TODO: ADD RETURN MESSAGE THAT NEED TO DEPLOY FIRSTLY
      }

      const balance = this.deployedContract.balanceOf(this.getOwner());
      const totalSupply = await this.deployedContract.totalSupply();

      if (balance === totalSupply) {
        console.log(`Owner balance is correct: ${balance.toString()} tokens`);
        return true;
      } else {
        console.log(
          `Owner balance is incorrect. Expected: ${totalSupply.toString()}, Got: ${balance.toString()}`,
        );
        return false;
      }
    } catch (err) {
      console.log(`Error checking owner balance: ${err}`);
      return false;
    }
  }

  async checkTotalSupply(): Promise<boolean> {
    // Ваша логика для проверки общего объема
    return true; // или false в зависимости от результата
  }

  async testApprove(): Promise<boolean> {
    // Ваша логика для тестирования approve
    return true; // или false в зависимости от результата
  }

  async testTransfer(): Promise<boolean> {
    // Ваша логика для тестирования transfer
    return true; // или false в зависимости от результата
  }

  async testTransferFrom(): Promise<boolean> {
    // Ваша логика для тестирования transferFrom
    return true; // или false в зависимости от результата
  }
}
