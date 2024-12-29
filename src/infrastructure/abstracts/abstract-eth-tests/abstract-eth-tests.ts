import { JsonRpcProvider, Wallet } from 'ethers';

import { BadRequestException } from '@nestjs/common';
import TestETHDto from 'src/infrastructure/dtos/test-eth/test-eth.dto';

export abstract class BaseETHTests {
  hardhatServer = `http://127.0.0.1:8545/`;

  readonly provider: JsonRpcProvider;
  private wallet: Wallet;

  constructor() {
    this.provider = new JsonRpcProvider(this.hardhatServer);
    this.wallet = new Wallet(
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      this.provider,
    );
  }

  getWallet() {
    return this.wallet;
  }

  setWallet(privateKey: string) {
    if (!privateKey) {
      return 'Private key is necessary';
    }

    try {
      this.wallet = new Wallet(privateKey, this.provider);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
    return this.wallet;
  }

  async deploy(deployData: TestETHDto): Promise<boolean> {
    return true;
  }
}
