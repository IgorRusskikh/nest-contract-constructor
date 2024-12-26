import ICompiler from '../eth-compiler/eth-compiler.interface';

export default interface ICompilerERC20 extends ICompiler {
  initialSupply: number;
}
