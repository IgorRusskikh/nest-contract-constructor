import { existsSync, readFileSync } from 'fs';

import { BadRequestException } from '@nestjs/common';
import { resolve } from 'path';

export abstract class BaseCompiler {
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

  abstract compile(dto: any): Promise<string>;
  abstract validate(sourceCode: string): Promise<boolean>;
}
