import {
  Injectable
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericService } from "src/utils/generic-service.utill";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }


}
