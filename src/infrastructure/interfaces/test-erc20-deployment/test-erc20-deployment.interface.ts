import IETHTest from '../test-eth/test-eth.interface';
import TestETHDto from 'src/infrastructure/dtos/test-eth/test-eth.dto';

export interface IERC20DeploymentTests extends IETHTest {
  testDeployment(dto: TestETHDto): Promise<boolean>;
}
