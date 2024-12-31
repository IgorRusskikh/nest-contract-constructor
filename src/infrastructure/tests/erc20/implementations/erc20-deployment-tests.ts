import { BadRequestException } from '@nestjs/common';
import { BaseETHTests } from 'src/infrastructure/abstracts/abstract-eth-tests/abstract-eth-tests';
import { ContractFactory } from 'ethers';
import TestETHDto from 'src/infrastructure/dtos/test-eth/test-eth.dto';

export class ERC20DeploymentTests
  extends BaseETHTests
  implements ERC20DeploymentTests
{
  async testDeployment({ abi, bytecode }: TestETHDto): Promise<boolean> {
    try {
      const factory = new ContractFactory(abi, bytecode, this.getOwner());
      const contract = await factory.deploy();
      await contract.waitForDeployment();

      if (!contract.target) {
        return false;
      }

      this.deployedContract = contract;

      console.log('Contract deployed at:', contract.target);
      return true;
    } catch (err) {
      console.error('Error deploying contract:', err);
      throw new BadRequestException(
        'Failed to test contract. Please try later',
      );
    }
  }
}
