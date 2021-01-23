import { Entity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { MenuMaster } from "../menu";
import { TestingScopeMaster } from "../testingScope";
import { BaseMaster } from "../baseClasses";

@ObjectType()
@Entity()
export class TestingForMaster extends BaseMaster {
  @Field(() => MenuMaster)
  @ManyToOne(() => MenuMaster, (menu) => menu.testingFors, {
    onDelete: "CASCADE",
  })
  menu!: MenuMaster;

  @Field(() => [TestingScopeMaster], { nullable: true })
  @OneToMany(
    () => TestingScopeMaster,
    (testingScope) => testingScope.testingFor
  )
  tesingScopes!: TestingScopeMaster[];
}
