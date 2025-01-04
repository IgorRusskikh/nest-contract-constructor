import TestETHDto from '../test-eth/test-eth.dto';

export class TestERC20Dto extends TestETHDto {
  decimals: number;
  totalSupply: number;
}
