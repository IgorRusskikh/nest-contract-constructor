import compileContractDto from '../../dtos/compile-contract/compile-contract.dto';

export default interface ICompiler {
  compile(compileContractDto: compileContractDto): Promise<string>;
}
