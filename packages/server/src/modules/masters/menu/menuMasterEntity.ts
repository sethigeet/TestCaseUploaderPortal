import { Entity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { ModuleMaster } from "../module";
import { TestingForMaster } from "../testingFor";
import { BaseMaster } from "../baseClasses";

@ObjectType()
@Entity()
export class MenuMaster extends BaseMaster {
  @Field(() => ModuleMaster)
  @ManyToOne(() => ModuleMaster, (module) => module.menus, {
    onDelete: "CASCADE",
  })
  module!: ModuleMaster;

  @Field(() => [TestingForMaster], { nullable: true })
  @OneToMany(() => TestingForMaster, (testingFor) => testingFor.menu)
  testingFors!: TestingForMaster[];
}
