import IETHCompiler from '../eth-compiler/eth-compiler.interface';

export default interface ICompilerERC20 extends IETHCompiler {
  initialSupply: number;
}
