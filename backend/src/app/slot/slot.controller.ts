import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteResult, UpdateResult } from "typeorm";
import { API_OPERATIONS } from "../../common/constants/api-operation-details";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { UpdateSlotDto } from "./dto/update-slot.dto";
import { Slot } from "./entities/slot.entity";
import { SlotService } from "./slot.service";

@ApiTags("Slots")
@Controller("slots")
export class SlotController {
  constructor(private readonly SlotService: SlotService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation(API_OPERATIONS.DEFAULT.CREATE)
  create(@Body() createSlotDto: CreateSlotDto): Promise<Slot> {
    return this.SlotService.create(createSlotDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation(API_OPERATIONS.DEFAULT.FIND_ALL)
  findAll(
    @Query('user_id') userId: number,
    @Query('coach_id') coachId: number 
  ): Promise<Slot[]> {
    return this.SlotService.findAll({ 
      relations: ["coach", "student"],
      where:[
        {...(userId && {coach_id:userId})},
        {...(userId && {student_id:userId})},
        {...(coachId && {coach_id:coachId})},
      ]
    });
  }


  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation(API_OPERATIONS.DEFAULT.FIND_ONE)
  findOne(@Param("id") id: number): Promise<Slot> {
    return this.SlotService.findOneOrFail({ where: { id } });
  }

  @Patch(":id")
  @ApiOperation(API_OPERATIONS.DEFAULT.UPDATE)
  @HttpCode(HttpStatus.OK)
  update(
    @Param("id") id: number,
    @Body() updateSlotDto: UpdateSlotDto
  ): Promise<UpdateResult> {
    return this.SlotService.update({ id }, updateSlotDto);
  }

  @Delete(":id")
  @ApiOperation(API_OPERATIONS.DEFAULT.REMOVE)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: number): Promise<DeleteResult> {
    return this.SlotService.remove({ id });
  }
}
