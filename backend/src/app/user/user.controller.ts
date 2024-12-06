import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { API_OPERATIONS } from "src/common/constants/api-operation-details";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation(API_OPERATIONS.DEFAULT.FIND_ALL)
  findAll(): Promise<User[]> {
    return this.userService.findAll({});
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation(API_OPERATIONS.DEFAULT.FIND_ONE)
  findOne(@Param("id") id: number): Promise<User> {
    return this.userService.findOne({ where: { id }, relations: [] });
  }
}
