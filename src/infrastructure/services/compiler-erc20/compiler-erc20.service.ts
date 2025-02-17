import * as solc from 'solc';

import { BadRequestException, Injectable } from '@nestjs/common';

import { BaseCompiler } from 'src/infrastructure/abstracts/abstract-compiler/abstract-compiler';
import ERC20CompileDto from '../../dtos/compile-contract-erc20/compile-contract-erc20.dto';
import TestETHDto from 'src/infrastructure/dtos/test-eth/test-eth.dto';

@Injectable()
export class CompilerERC20Service extends BaseCompiler {
  async compile(dto: ERC20CompileDto): Promise<TestETHDto> {
    const formattedCode = this.format(dto.sourceCode);

    try {
      const solcSnapshot = await this.loadCompiler();
      const output = await this.compileContract(
        solcSnapshot,
        formattedCode,
        dto.tokenName,
      );
      const compiledContract = this.extractCompiledContract(
        output,
        dto.tokenName,
      );
      const deployData = this.prepareDeployData(compiledContract);
      return deployData;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  private loadCompiler(): Promise<any> {
    return new Promise((resolve, reject) => {
      solc.loadRemoteVersion(this.compilerVersion, (err, solcSnapshot) => {
        if (err) {
          reject(
            new Error(
              `Error loading compiler version ${this.compilerVersion}: ${err.message}`,
            ),
          );
        } else {
          resolve(solcSnapshot);
        }
      });
    });
  }

  private compileContract(
    solcSnapshot: any,
    sourceCode: string,
    tokenName: string,
  ): any {
    const input = {
      language: 'Solidity',
      sources: {
        [`${tokenName}.sol`]: { content: sourceCode },
      },
      settings: {
        outputSelection: { '*': { '*': ['*'] } },
      },
    };

    return JSON.parse(
      solcSnapshot.compile(JSON.stringify(input), { import: this.readImports }),
    );
  }

  private extractCompiledContract(output: any, tokenName: string): any {
    if (output.errors) {
      const errors = output.errors.filter((e: any) => e.severity === 'error');
      if (errors.length > 0) {
        throw new BadRequestException('Compilation failed', { cause: errors });
      }
    }

    const compiledContract = output.contracts[`${tokenName}.sol`][tokenName];
    if (!compiledContract) {
      throw new BadRequestException('Compiled contract not found');
    }

    return compiledContract;
  }

  private prepareDeployData(compiledContract: any): TestETHDto {
    return {
      abi: compiledContract.abi,
      bytecode: compiledContract.evm.bytecode.object,
    };
  }
}
