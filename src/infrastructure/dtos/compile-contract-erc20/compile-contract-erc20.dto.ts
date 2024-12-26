import { IsNumber, Min } from 'class-validator';

import CompileEthDto from '../compile-eth-contract/compile-eth-contract.dto';

export default class ERC20CompileDto extends CompileEthDto {
  @IsNumber()
  @Min(0, {
    message: 'Initial supply must be greater or equal to 0',
  })
  readonly initialSupply: number;
}
