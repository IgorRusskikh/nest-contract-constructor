import { BaseETHTests } from 'src/infrastructure/abstracts/abstract-eth-tests/abstract-eth-tests';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ETHTest {
  private strategy: BaseETHTests;

  setStrategy(strategy: BaseETHTests) {
    this.strategy = strategy;
  }

  async test() {
    if (!this.strategy) {
      throw new Error('Strategy is not set');
    }
    return this.strategy.runTests(this.strategy.tests);
  }
}
