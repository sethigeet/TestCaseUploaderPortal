import { Entity, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { ModuleMaster } from "../module";
import { BaseMaster } from "../baseClasses";

@ObjectType()
@Entity()
export class ProductMaster extends BaseMaster {
  @Field(() => [ModuleMaster], { nullable: true })
  @OneToMany(() => ModuleMaster, (module) => module.product)
  modules!: ModuleMaster[];
}
