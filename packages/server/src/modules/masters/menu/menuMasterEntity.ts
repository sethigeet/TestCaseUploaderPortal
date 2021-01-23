import {
  AfterInsert,
  AfterUpdate,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { ModuleMaster } from "../module";
import { TestingForMaster } from "../testingFor";
import { BaseMaster, BaseMasterHistory } from "../baseClasses";

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

  @AfterInsert()
  async InsertIntoHistory(): Promise<void> {
    await MenuMasterHistory.create({
      pid: this.id,
      code: this.code,
      name: this.name,
      deprecated: this.deprecated,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
    }).save();
  }

  @AfterUpdate()
  async UpdateIntoHistory(): Promise<void> {
    await MenuMasterHistory.create({
      pid: this.id,
      code: this.code,
      name: this.name,
      deprecated: this.deprecated,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
    }).save();
  }
}

@ObjectType()
@Entity()
export class MenuMasterHistory extends BaseMasterHistory {
  @Field(() => ModuleMaster)
  @ManyToOne(() => ModuleMaster, (module) => module.menus, {
    onDelete: "CASCADE",
  })
  module!: ModuleMaster;

  @Field(() => [TestingForMaster], { nullable: true })
  @OneToMany(() => TestingForMaster, (testingFor) => testingFor.menu)
  testingFors!: TestingForMaster[];
}
