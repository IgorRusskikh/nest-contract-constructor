import { BadRequestException, Injectable } from '@nestjs/common';
import { ContractFactory, ethers, parseUnits } from 'ethers';

import { BaseETHTests } from 'src/infrastructure/abstracts/abstract-eth-tests/abstract-eth-tests';
import TestETHDto from 'src/infrastructure/dtos/test-eth/test-eth.dto';

@Injectable()
export class TestsERC20 extends BaseETHTests {
  getAddress() {
    this.setWallet(
      '0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa',
    );
    return this.getWallet().address;
  }

  async deploy({ abi, bytecode }: TestETHDto): Promise<boolean> {
    try {
      const factory = new ContractFactory(abi, bytecode, this.getWallet());

      const contract = await factory.deploy();
      await contract.waitForDeployment();

      if (!contract.target) {
        return false;
      }

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
