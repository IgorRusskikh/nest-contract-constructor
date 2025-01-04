import IETHTest from '../test-eth/test-eth.interface';
import { TestERC20Dto } from 'src/infrastructure/dtos/test-erc20/test-erc20.dto';

export default interface IERC20TransactionTests extends IETHTest {
  checkOwnerBalance(): Promise<boolean>;
  checkTotalSupply(dto: TestERC20Dto): Promise<boolean>;
  testApprove(): Promise<boolean>;
  testTransfer(): Promise<boolean>;
  testTransferFrom(): Promise<boolean>;
}
