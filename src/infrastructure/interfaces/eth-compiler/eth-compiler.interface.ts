import ICompiler from '../compiler/compiler.interface';
import compileContractDto from '../../dtos/compile-contract/compile-contract.dto';

export default interface IETHCompiler extends ICompiler {
  format(sourceCode: string): string;
  compile(compileContractDto: compileContractDto): Promise<string>;
  validate(sourceCode: string): Promise<boolean>;
}
