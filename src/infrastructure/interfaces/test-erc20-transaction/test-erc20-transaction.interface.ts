import IETHTest from '../test-eth/test-eth.interface';

export default interface IERC20TransactionTests extends IETHTest {
  checkOwnerBalance(): Promise<boolean>;
  checkTotalSupply(): Promise<boolean>;
  testApprove(): Promise<boolean>;
  testTransfer(): Promise<boolean>;
  testTransferFrom(): Promise<boolean>;
}
