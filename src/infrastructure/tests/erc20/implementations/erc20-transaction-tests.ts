import { formatUnits, parseUnits } from 'ethers';

import { BaseETHTests } from 'src/infrastructure/abstracts/abstract-eth-tests/abstract-eth-tests';
import IERC20TransactionTests from 'src/infrastructure/interfaces/test-erc20-transaction/test-erc20-transaction.interface';
import { TestERC20Dto } from 'src/infrastructure/dtos/test-erc20/test-erc20.dto';

export class ERC20TransactionTests
  extends BaseETHTests
  implements IERC20TransactionTests
{
  isApproved: boolean;

  async checkOwnerBalance(): Promise<boolean> {
    try {
      if (!this.deployedContract) {
        console.log('Contract needs to be deployed first.');
        return false;
      }

      const balance = await this.deployedContract.balanceOf(
        this.getOwner().address,
      );
      const totalSupply = await this.deployedContract.totalSupply();

      if (balance === totalSupply) {
        console.log(`Owner balance is correct: ${balance.toString()} tokens`);
        return true;
      } else {
        console.log(
          `[TEST ERROR] Owner balance is incorrect. Expected: ${totalSupply.toString()}, Got: ${balance.toString()}`,
        );
        return false;
      }
    } catch (err) {
      console.log(`[TEST ERROR] Error checking owner balance: ${err}`);
      return false;
    }
  }

  async checkTotalSupply({
    decimals,
    totalSupply,
  }: TestERC20Dto): Promise<boolean> {
    try {
      if (!this.deployedContract) {
        console.log('Contract needs to be deployed first.');
        return false;
      }

      const contractTotalSupply = BigInt(
        await this.deployedContract.totalSupply(),
      );
      const calcSupply = BigInt(totalSupply) * 10n ** BigInt(decimals);

      if (contractTotalSupply !== calcSupply) {
        console.log(
          `[TEST ERROR] Contract total supply (${contractTotalSupply}) isn't equal to user total supply (${calcSupply})`,
        );
        return false;
      }

      return true;
    } catch (err) {
      console.log(`[TEST ERROR] Error checking total supply: ${err}`);
      return false;
    }
  }

  async testApprove({ decimals }: TestERC20Dto): Promise<boolean> {
    try {
      if (!this.deployedContract) {
        console.log('Contract needs to be deployed first.');
        return false;
      }

      const approveAmount = parseUnits('50', decimals);

      const approveTx = await this.deployedContract.approve(
        this.getSpender().address,
        BigInt(approveAmount),
      );

      await approveTx.wait();

      const approvedAmount = await this.deployedContract.allowance(
        this.getOwner().address,
        this.getSpender().address,
      );

      if (BigInt(approvedAmount) !== approveAmount) {
        console.log(
          `[TEST ERROR] Spender approved amount isn't equal target amount: ${approvedAmount} !== ${approveAmount}`,
        );
        return false;
      }

      return true;
    } catch (err) {
      console.log(`[TEST ERROR] Error checking approve: ${err}`);
      return false;
    }
  }

  async testTransfer({ decimals }: TestERC20Dto): Promise<boolean> {
    try {
      const ownerBalanceBefore = await this.deployedContract.balanceOf(
        this.getOwner().address,
      );
      const spenderBalanceBefore = await this.deployedContract.balanceOf(
        this.getSpender().address,
      );

      const transferAmount = parseUnits('50', decimals);
      const transferTx = await this.deployedContract.transfer(
        this.getSpender().address,
        transferAmount,
      );

      await transferTx.wait();

      const ownerBalanceAfter = await this.deployedContract.balanceOf(
        this.getOwner().address,
      );
      const spenderBalanceAfter = await this.deployedContract.balanceOf(
        this.getSpender().address,
      );

      if (
        ownerBalanceAfter === ownerBalanceBefore - transferAmount &&
        spenderBalanceAfter === spenderBalanceBefore + transferAmount
      ) {
        return true;
      } else {
        console.log("[TEST ERROR] Balances of wallets isn't equals");
        return false;
      }
    } catch (err) {
      console.log(`[TEST ERROR] Error checking transfer: ${err}`);
      return false;
    }
  }

  async testTransferFrom({ decimals }: TestERC20Dto): Promise<boolean> {
    try {
      const ownerAddress = this.getOwner().address;
      const spenderAddress = this.getSpender().address;
      const tokensAmount = parseUnits('25', decimals);

      const ownerBalance = await this.deployedContract.balanceOf(ownerAddress);
      if (ownerBalance < tokensAmount) {
        console.log(
          `Insufficient balance: ${formatUnits(ownerBalance, decimals)}`,
        );
        return false;
      }

      const approveTx = await this.deployedContract.approve(
        spenderAddress,
        tokensAmount,
      );
      await approveTx.wait();

      const allowance = await this.deployedContract.allowance(
        ownerAddress,
        spenderAddress,
      );

      if (allowance < tokensAmount) {
        console.log(
          `[TEST ERROR] Insufficient allowance: ${formatUnits(allowance, decimals)}`,
        );
        return false;
      }

      const spenderBalanceBefore = await this.deployedContract.balanceOf(
        this.getSpender(),
      );

      const transferFromTx = await this.deployedContract
        .connect(this.getSpender())
        .transferFrom(ownerAddress, spenderAddress, tokensAmount);

      await transferFromTx.wait();

      const ownerBalanceAfter =
        await this.deployedContract.balanceOf(ownerAddress);
      const spenderBalanceAfter =
        await this.deployedContract.balanceOf(spenderAddress);

      if (
        ownerBalanceAfter === ownerBalance - tokensAmount &&
        spenderBalanceAfter === spenderBalanceBefore + tokensAmount
      ) {
        return true;
      } else {
        console.log('[TEST ERROR] Balances did not update correctly.');
        return false;
      }
    } catch (err) {
      console.log(
        `[TEST ERROR] Error details: ${JSON.stringify(err, null, 2)}`,
      );
      return false;
    }
  }
}
