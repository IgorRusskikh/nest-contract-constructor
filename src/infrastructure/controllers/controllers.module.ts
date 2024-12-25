import { Module } from '@nestjs/common';
import { CompilerController } from './compiler/compiler.controller';

@Module({
  controllers: [CompilerController]
})
export class ControllersModule {}
