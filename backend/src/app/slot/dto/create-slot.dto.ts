import { ApiProperty } from "@nestjs/swagger";

export class CreateSlotDto {
   
  @ApiProperty({
    description: 'Start time of the slot',
    type: String,
    example: '2024-12-01T09:00:00Z',   
  })
  start_time: Date;

  @ApiProperty({
    description: 'The ID of the coach',
    type: Number,
    example: 1,  
  })
  coach_id: number;
}
