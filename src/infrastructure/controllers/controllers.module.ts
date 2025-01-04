import { BaseETHTests } from '../abstracts/abstract-eth-tests/abstract-eth-tests';
import { CompilerERC20Service } from 'src/infrastructure/services/compiler-erc20/compiler-erc20.service';
import { ContractCompilerController } from './contract-compile/contract-compile.controller';
import { ContractTestController } from './contract-test/contract-test.controller';
import { ERC20DeploymentTests } from '../tests/erc20/implementations/erc20-deployment-tests';
import { ERC20TransactionTests } from '../tests/erc20/implementations/erc20-transaction-tests';
import { ETHCompiler } from 'src/usecases/eth-compiler/compiler.service';
import { ETHTest } from 'src/usecases/eth-test/eth-test.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ContractCompilerController, ContractTestController],
  providers: [
    ETHCompiler,
    CompilerERC20Service,
    ETHTest,
    ERC20DeploymentTests,
    ERC20TransactionTests,
  ],
})
export class ControllersModule {}
