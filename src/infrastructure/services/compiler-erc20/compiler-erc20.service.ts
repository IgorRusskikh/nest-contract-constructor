import * as solc from 'solc';

import { BadRequestException, Injectable } from '@nestjs/common';

import { BaseCompiler } from 'src/infrastructure/abstracts/abstract-compiler/abstract-compiler';
import ERC20CompileDto from '../../dtos/compile-contract-erc20/compile-contract-erc20.dto';

@Injectable()
export class CompilerERC20Service extends BaseCompiler {
  async compile(dto: ERC20CompileDto): Promise<string> {
    const formattedCode = this.format(dto.sourceCode);

    try {
      const input = {
        language: 'Solidity',
        sources: {
          [`${dto.tokenName}.sol`]: {
            content: formattedCode,
          },
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*'],
            },
          },
        },
      };

      const output = JSON.parse(
        solc.compile(JSON.stringify(input), { import: this.readImports }),
      );

      if (output.errors) {
        const errors = output.errors.filter((e: any) => e.severity === 'error');
        if (errors.length > 0) {
          throw new BadRequestException('Compilation failed', {
            cause: errors,
          });
        }
      }

      console.log(output);

      return 'Cool';
    } catch (err) {
      console.error('Compilation error:', err);
      throw new BadRequestException('Failed to compile contract');
    }
  }

  async validate(sourceCode: string): Promise<boolean> {
    return true;
  }
}
