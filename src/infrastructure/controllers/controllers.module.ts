import { CompilerController } from './contract/contract.controller';
import { CompilerERC20Service } from 'src/infrastructure/services/compiler-erc20/compiler-erc20.service';
import { ETHCompiler } from 'src/usecases/eth-compiler/compiler.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CompilerController],
  providers: [CompilerERC20Service, ETHCompiler],
})
export class ControllersModule {}
