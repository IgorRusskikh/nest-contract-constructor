import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import TestETHDto from 'src/infrastructure/dtos/test-eth/test-eth.dto';
import { TestERC20Service } from 'src/infrastructure/tests/erc20/erc20-tests';

@Controller('contract/test')
export class ContractTestController {
  constructor() {}

  @Post('erc20')
  async TestERC20(@Body() testERC20Dto: TestETHDto) {
    const test = new TestERC20Service();
    test.addMinimalTests(testERC20Dto);
    const testsResult = await test.runTests(test.tests);

    if (!testsResult) {
      throw new BadRequestException("Some tests isn't passed");
    }
  }
}
