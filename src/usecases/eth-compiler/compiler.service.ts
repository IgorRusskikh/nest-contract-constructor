import { BaseCompiler } from 'src/infrastructure/abstracts/abstract-compiler/abstract-compiler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ETHCompiler {
  private strategy: BaseCompiler;

  setStrategy(strategy: BaseCompiler) {
    this.strategy = strategy;
  }

  compile(dto: any): Promise<string> {
    if (!this.strategy) {
      throw new Error('Strategy is not set');
    }
    return this.strategy.compile(dto);
  }

  validate(sourceCode: string): Promise<boolean> {
    if (!this.strategy) {
      throw new Error('Strategy is not set');
    }
    return this.strategy.validate(sourceCode);
  }
}
