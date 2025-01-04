import { existsSync, readFileSync } from 'fs';

import { BadRequestException } from '@nestjs/common';
import TestETHDto from 'src/infrastructure/dtos/test-eth/test-eth.dto';
import { resolve } from 'path';

export abstract class BaseCompiler {
  readonly compilerVersion = 'v0.8.28+commit.7893614a';

  format(sourceCode: string): string {
    if (sourceCode.length) {
      const licenseRegex = /\/\/\s*SPDX-License-Identifier:\s*MIT/g;
      const formattedCode = sourceCode.replace(
        licenseRegex,
        (match) => `${match}\n`,
      );

      return formattedCode;
    } else {
      throw new BadRequestException('Code is necessary');
    }
  }

  readImports(importPath: string) {
    const contractDir = resolve(__dirname, '../../../../node_modules/');
    const absolutePath = resolve(contractDir, importPath);

    if (!existsSync(absolutePath)) {
      throw new BadRequestException(`Cannot find module: ${absolutePath}`);
    }

    const content = readFileSync(absolutePath, 'utf-8');
    return {
      contents: content,
    };
  }

  abstract compile(dto: any): Promise<TestETHDto>;
}
