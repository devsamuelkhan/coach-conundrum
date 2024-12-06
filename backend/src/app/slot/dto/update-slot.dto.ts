import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsInt, IsBoolean, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class UpdateSlotDto {

  @ApiPropertyOptional({
    description: 'Start time of the slot in ISO 8601 format (e.g., 2024-12-01T09:00:00Z)',
    type: String,
    example: '2024-12-01T09:00:00Z',   
  })
  @IsOptional()
  @IsDateString()
  start_time?: Date;

  @ApiPropertyOptional({
    description: 'The ID of the student (nullable)',
    type: Number,
    example: 1,  
  })
  @IsOptional()
  @IsInt()
  student_id?: number | null;

  @ApiPropertyOptional({
    description: 'Whether the call has been completed for this slot',
    type: Boolean,
    example: false,  
    default: false
  })
  @IsOptional()
  @IsBoolean()
  call?: boolean;

  @ApiPropertyOptional({
    description: 'The satisfaction rate from 0 to 5, where 0 is the lowest and 5 is the highest. Null means not rated.',
    type: Number,
    example: 5,  
    default: null,
    minimum: 0,
    maximum: 5
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  satisfaction?: number | null;

  @ApiPropertyOptional({
    description: 'Additional notes regarding the slot',
    type: String,
    example: "",  
    default: null,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Notes must not be empty.' })  // Optional field but can't be an empty string.
  notes?: string | null;
}
