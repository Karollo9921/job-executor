import { IsNotEmpty, IsNumber } from 'class-validator';

import { IFibonacciData } from '@job-executor-v2/shared-types';

export class FibonacciData implements IFibonacciData {
  @IsNumber()
  @IsNotEmpty()
  iterations: number;
}
