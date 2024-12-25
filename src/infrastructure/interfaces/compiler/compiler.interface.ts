export default interface Compiler {
  contractDir: string;

  format(sourceCode: string): Promise<string>;
  compile(sourceCode: string): Promise<string>;
  validate(sourceCode: string): Promise<boolean>;
}