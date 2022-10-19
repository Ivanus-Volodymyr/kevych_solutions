import { Column, Entity } from "typeorm";
import { CommonFields } from "./commonFields";

import { ITrain } from "../interfaces";

@Entity("Trains", { database: "root" })
export class Train extends CommonFields implements ITrain {
  @Column({
    type: "varchar",
    width: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    width: 255,
    nullable: false,
  })
  description: string;

  @Column({
    type: "varchar",
    width: 255,
    nullable: false,
  })
  route: string;

  @Column({
    type: "int",
    default: 0,
  })
  arrival_time?: number;

  @Column({
    type: "int",
    default: 0,
  })
  departure_time?: number;
}
