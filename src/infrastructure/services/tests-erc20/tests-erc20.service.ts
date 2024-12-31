import { Injectable } from '@nestjs/common';
import TestService from 'src/infrastructure/interfaces/test-service/test.interface';
import { test } from 'src/infrastructure/types/test/test';

@Injectable()
export class TestsERC20 implements TestService {
  readonly tests: test[] = [];
  private results: string[] = [];

  addTest(test: test): void {
    this.tests.push(test);
  }

  async runTests(tests: test[]): Promise<boolean> {
    for (const test of tests) {
      this.results.push(String(await test()));
    }

    const negativeResults = this.results.filter((result) => !result).length;

    this.results.forEach((result, inx) => {
      console.log(
        `${result ? '+' : '-'} TEST ${inx + 1}: ${result ? 'is passed' : "isn't passed"}`,
      );
    });

    if (negativeResults) {
      console.log('Tests is failed');
      return false;
    } else {
      console.log('Tests is passed');
      return true;
    }
  }
}
