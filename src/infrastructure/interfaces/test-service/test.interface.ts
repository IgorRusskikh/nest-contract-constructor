import { test } from 'src/infrastructure/types/test/test';

export default interface ITestService {
  addTest(test: test): void;
  runTests(tests: test[]): Promise<boolean>;
}
