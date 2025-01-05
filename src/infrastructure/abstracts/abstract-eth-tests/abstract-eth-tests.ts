import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseContract, JsonRpcProvider, Wallet } from 'ethers';

import ETHTest from 'src/infrastructure/interfaces/test-eth/test-eth.interface';
import { test } from 'src/infrastructure/types/test/test';

type testResult = {
  result: boolean;
  testName: string;
};

export abstract class BaseETHTests implements ETHTest {
  hardhatServer = `http://127.0.0.1:8545/`;

  readonly provider: JsonRpcProvider;
  private owner: Wallet;
  private spender: Wallet;
  private secondSpender: Wallet;

  tests: test[];
  private results: testResult[];

  protected deployedContract: BaseContract | any;

  constructor() {
    this.tests = [];
    this.results = [];
    this.deployedContract = null;

    try {
      this.provider = new JsonRpcProvider(this.hardhatServer);
      if (!this.provider) {
        throw new InternalServerErrorException('Failed to connect test server');
      }
    } catch (err) {
      console.error('Connection error:', err);
      throw new InternalServerErrorException('Failed to connect test server');
    }

    this.owner = this.createWallet(
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      'Owner wallet connection error',
    );
    this.spender = this.createWallet(
      '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
      'Spender wallet connection error',
    );
    this.secondSpender = this.createWallet(
      '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
      'Spender wallet connection error',
    );
  }

  private createWallet(privateKey: string, errorMessage: string): Wallet {
    try {
      return new Wallet(privateKey, this.provider);
    } catch (err) {
      console.error(errorMessage, err);
      throw new InternalServerErrorException(errorMessage);
    }
  }

  getOwner() {
    return this.owner;
  }

  getSpender() {
    return this.spender;
  }

  getSecondSpender() {
    return this.secondSpender;
  }

  setOwner(privateKey: string) {
    if (!privateKey) {
      return 'Private key is necessary';
    }

    try {
      this.owner = new Wallet(privateKey, this.provider);
    } catch (err) {
      console.error('Error setting owner wallet:', err);
      throw new BadRequestException(err.message);
    }
    return this.owner;
  }

  setSpender(privateKey: string) {
    if (!privateKey) {
      return 'Private key is necessary';
    }

    try {
      this.spender = new Wallet(privateKey, this.provider);
    } catch (err) {
      console.error('Error setting spender wallet:', err);
      throw new BadRequestException(err.message);
    }
    return this.spender;
  }

  setSecondSpender(privateKey: string) {
    if (!privateKey) {
      return 'Private key is necessary';
    }

    try {
      this.secondSpender = new Wallet(privateKey, this.provider);
    } catch (err) {
      console.error('Error setting second spender wallet:', err);
      throw new BadRequestException(err.message);
    }
    return this.secondSpender;
  }

  addTest(tests: test[]): void {
    this.tests.push(...tests);
  }

  clearTests() {
    this.tests = [];
  }

  async runTests(tests: test[]): Promise<boolean> {
    for (const test of tests) {
      const res = await test();
      this.results.push({
        result: res,
        testName: test.name,
      });
    }

    const negativeResults = this.results.filter(
      (result) => result.result === false,
    ).length;

    this.results.forEach(({ result, testName }, inx) => {
      console.log(
        `${result ? '+' : '-'} TEST ${inx + 1}: ${result ? 'is passed' : "isn't passed"} (function: ${testName})`,
      );
    });

    if (negativeResults) {
      console.log('Some tests is failed');
      return false;
    } else {
      console.log('All tests is passed');
      return true;
    }
  }
}
