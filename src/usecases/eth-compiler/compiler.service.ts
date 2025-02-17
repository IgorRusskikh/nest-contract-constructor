import { BaseCompiler } from 'src/infrastructure/abstracts/abstract-compiler/abstract-compiler';
import { Injectable } from '@nestjs/common';
import TestETHDto from 'src/infrastructure/dtos/test-eth/test-eth.dto';

@Injectable()
export class ETHCompiler {
  private strategy: BaseCompiler;

  setStrategy(strategy: BaseCompiler) {
    this.strategy = strategy;
  }

  compile(dto: any): Promise<TestETHDto> {
    if (!this.strategy) {
      throw new Error('Strategy is not set');
    }
    return this.strategy.compile(dto);
  }
}
