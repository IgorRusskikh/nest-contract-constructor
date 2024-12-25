export default interface Compiler {
  compile(sourceCode: string): Promise<string>;
  validate(sourceCode: string): Promise<boolean>;
}