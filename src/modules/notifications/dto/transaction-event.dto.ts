import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  IsOptional,
} from 'class-validator';

export class TransactionEventDto {
  @IsString()
  @IsNotEmpty({ message: 'UserId không được để trống' })
  userId!: string;

  @IsNumber()
  @Min(1000, { message: 'Số tiền giao dịch tối thiểu là 1000đ' })
  amount!: number;

  @IsString()
  @IsOptional() // Cho phép không có message
  message?: string;
}
