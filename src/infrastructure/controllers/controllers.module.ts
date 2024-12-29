import { CompilerController } from './contract/contract.controller';
import { CompilerERC20Service } from 'src/infrastructure/services/compiler-erc20/compiler-erc20.service';
import { ETHCompiler } from 'src/usecases/eth-compiler/compiler.service';
import { Module } from '@nestjs/common';
import { TestsERC20 } from '../services/tests-erc20/tests-erc20.service';

@Module({
  controllers: [CompilerController],
  providers: [ETHCompiler, CompilerERC20Service, TestsERC20],
})
export class ControllersModule {}
