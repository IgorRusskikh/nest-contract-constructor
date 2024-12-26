import { Controller, Post, Body } from '@nestjs/common';
import ERC20CompileDto from '../../dtos/compile-contract-erc20/compile-contract-erc20.dto';
import { ETHCompiler } from 'src/usecases/eth-compiler/compiler.service';
import { CompilerERC20Service } from 'src/infrastructure/services/compiler-erc20/compiler-erc20.service';

@Controller('contract/compile')
export class CompilerController {
  constructor(
    private readonly ethCompiler: ETHCompiler,
    private readonly erc20Compiler: CompilerERC20Service,
  ) {}

  @Post('erc20')
  async compileERC20(@Body() dto: ERC20CompileDto): Promise<string> {
    this.ethCompiler.setStrategy(this.erc20Compiler);
    return this.ethCompiler.compile(dto);
  }
}
