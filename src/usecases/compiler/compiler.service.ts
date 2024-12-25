import { BadRequestException, Injectable } from '@nestjs/common';

import Compiler from 'src/infrastructure/interfaces/compiler/compiler.interface';
import { format as codeFormatter } from 'prettier';
import { resolve } from 'path';

@Injectable()
export class CompilerService implements Compiler {
  contractDir = resolve(__dirname, '../../../node_modules/');

  async format(sourceCode: string): Promise<string> {
    if (sourceCode) {
      try {
        const formattedCode = await codeFormatter(sourceCode, {
          parser: 'solidity-parse',
          plugins: [require.resolve('prettier-plugin-solidity')],
        });

        return formattedCode;
      } catch (err) {
        console.log(err);
        return '';
      }
    } else {
      throw new BadRequestException('Code is necessary');
    }
  }

  async compile(sourceCode: string): Promise<string> {
    return '';
  }

  async validate(sourceCode: string): Promise<boolean> {
    return true;
  }
}
