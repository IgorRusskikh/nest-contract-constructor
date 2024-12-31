import { BaseContract, JsonRpcProvider, Wallet } from 'ethers';

import { BadRequestException } from '@nestjs/common';
import ETHTest from 'src/infrastructure/interfaces/test-eth/test-eth.interface';

export abstract class BaseETHTests implements ETHTest {
  hardhatServer = `http://127.0.0.1:8545/`;

  readonly provider: JsonRpcProvider;
  private owner: Wallet;

  protected deployedContract: BaseContract | any;

  constructor() {
    this.provider = new JsonRpcProvider(this.hardhatServer);
    this.owner = new Wallet(
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      this.provider,
    );
  }

  getOwner() {
    return this.owner;
  }

  setOwner(privateKey: string) {
    if (!privateKey) {
      return 'Private key is necessary';
    }

    try {
      this.owner = new Wallet(privateKey, this.provider);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
    return this.owner;
  }
}
