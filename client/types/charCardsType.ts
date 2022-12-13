export interface UserInfoType {
  img: string;
  chk: string;
  totalMoney: string;
  mapleMoney: string;
  lv: string;
  guild: string;
  name: string;
  setup: string;
  storageMoney: string;
  job: string;
  exp: string;
  fame: string;

  equipInfo : {
    equipCategory: string;
    equipName: string;
    equipPotential: string;
    equipImg: string;
    equipAdditionalPotential: string;
  }[];

  characterBasicInfo: {
    defenseIgnore: string;
    luk: string;
    hp: string;
    guild: string;
    world: string;
    dex: string;
    criticalDamage: string;
    ability: string;
    hyperStat: string;
    starForce: string;
    defensePower: string;
    stat: string;
    famous: string;
    mp: string;
    int: string;
    str: string;
    stateResistance: string;
    moveSpeed: string;
    money: string;
    bossAttack: string;
    jumpPower: string;
    maplePoint: string;
    job: string;
    fame: string;
    stance: string;
    arcaneForce: string;
  };
  characterInfo: { img: string; level: string; name: string };
}
