import ContractCompileDto from '../compile-contract/compile-contract.dto';
import { ETHStrategy } from 'src/infrastructure/types/eth-strategy/eth-strategy';

export default class CompileEthDto extends ContractCompileDto {
  strategy: ETHStrategy;
}
