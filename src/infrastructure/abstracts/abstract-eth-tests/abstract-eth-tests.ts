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

    try {
      this.owner = new Wallet(
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        this.provider,
      );
    } catch (err) {
      console.error('Wallet connection error:', err);
      throw new InternalServerErrorException(
        'Failed to connect wallet for tests',
      );
    }
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
      console.error('Error setting wallet:', err);
      throw new BadRequestException(err.message);
    }
    return this.owner;
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

    const negativeResults = this.results.filter((result) => !result).length;

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
