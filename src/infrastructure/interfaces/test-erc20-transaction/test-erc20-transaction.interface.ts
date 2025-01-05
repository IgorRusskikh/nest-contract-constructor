import IETHTest from '../test-eth/test-eth.interface';
import { TestERC20Dto } from 'src/infrastructure/dtos/test-erc20/test-erc20.dto';

export default interface IERC20TransactionTests extends IETHTest {
  isApproved: boolean;

  checkOwnerBalance(): Promise<boolean>;
  checkTotalSupply(dto: TestERC20Dto): Promise<boolean>;
  testApprove(dto: TestERC20Dto): Promise<boolean>;
  testTransfer(dto: TestERC20Dto): Promise<boolean>;
  testTransferFrom(dto: TestERC20Dto): Promise<boolean>;
}
