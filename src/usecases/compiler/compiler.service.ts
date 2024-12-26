import * as prettier from 'prettier';
import * as solc from 'solc';

import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';

import Compiler from 'src/infrastructure/interfaces/compiler/compiler.interface';
import { resolve } from 'path';

@Injectable()
export class CompilerService implements Compiler {
  async format(sourceCode: string): Promise<string> {
    if (sourceCode.length) {
      try {
        const formattedCode = await prettier.format(sourceCode, {
          parser: 'solidity-parse',
          plugins: [require.resolve('prettier-plugin-solidity')],
        });

        console.log(formattedCode)

        return formattedCode;
      } catch (err) {
        console.log(err);
        return '';
      }
    } else {
      throw new BadRequestException('Code is necessary');
    }
  }

  async compile(filename: string, sourceCode: string): Promise<string> {
    const formattedCode = await this.format(sourceCode);

    try {
      const input = {
        language: 'Solidity',
        sources: {
          [`${filename}.sol`]: {
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

      console.log(output);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to compile contract');
    }

    return '';
  }

  async validate(sourceCode: string): Promise<boolean> {
    return true;
  }

  readImports(importPath: string) {
    const contractDir = resolve(__dirname, '../../../node_modules/');

    const absolutePath = resolve(contractDir, importPath);

    if (!existsSync(absolutePath)) {
      throw new BadRequestException(`Cannot find module: ${absolutePath}`);
    }

    const content = readFileSync(absolutePath, 'utf-8');

    return {
      contents: content,
    };
  }
}
