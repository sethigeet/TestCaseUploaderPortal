import { AfterInsert, AfterUpdate, Entity, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { ModuleMaster, ModuleMasterHistory } from "../module";
import { BaseMaster, BaseMasterHistory } from "../baseClasses";

@ObjectType()
@Entity()
export class ProductMaster extends BaseMaster {
  @Field(() => [ModuleMaster], { nullable: true })
  @OneToMany(() => ModuleMaster, (module) => module.product)
  modules!: ModuleMaster[];

  @AfterInsert()
  async InsertIntoHistory(): Promise<void> {
    await ProductMasterHistory.create({
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
    await ProductMasterHistory.create({
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
export class ProductMasterHistory extends BaseMasterHistory {
  @Field(() => [ModuleMasterHistory], { nullable: true })
  @OneToMany(() => ModuleMasterHistory, (module) => module.product)
  modules!: ModuleMaster[];
}
