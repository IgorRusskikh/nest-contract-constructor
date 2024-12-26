import { MinLength } from 'class-validator';

export default class ContractCompileDto {
  @MinLength(3, {
    message: 'Token name must be greater or equal 3 chars',
  })
  readonly tokenName: string;

  @MinLength(3, {
    message: 'Token symbol must be greater or equal 3 chars',
  })
  readonly tokenSymbol: string;

  @MinLength(1, {
    message: 'Solidity code is necessary',
  })
  sourceCode: string;
}
