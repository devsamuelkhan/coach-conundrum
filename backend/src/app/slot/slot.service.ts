import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericService } from "@utils/generic-service.utill";
import { Slot } from "./entities/slot.entity";

@Injectable()
export class SlotService extends GenericService<Slot> {
  constructor(@InjectRepository(Slot) private readonly SlotRepository: Repository<Slot>) {
    super(SlotRepository);
  }
}
