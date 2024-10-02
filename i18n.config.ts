export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: {
      title: "Virtual Dungeon Crawler",
      weapons: {
        fists: {
          name: "Fists",
          description: "Your bare hands",
        },
        woodenSword: {
          name: "Wooden sword",
          description: "A simple wooden sword",
        },
        stoneSword: {
          name: "Stone sword",
          description: "A sword made of stone",
        },
        ironSword: {
          name: "Iron sword",
          description: "A strong sword made of iron",
        },
        diamondSword: {
          name: "Diamond sword",
          description: "A powerful sword made of diamonds",
        },
        netheriteSword: {
          name: "Netherite sword",
          description: "A mighty sword made of netherite",
        },
      },
      drops: {
        bone: {
          name: "Bone | Bones",
          description: "A bone from a skeleton.",
        },
        rottenMeat: {
          name: "Rotten meat | Rotten meat",
          description: "A piece of rotten meat.",
        },
        oldCoin: {
          name: "Old coin | Old coins",
          description: "An old coin from a long-lost civilization. Still looks shiny.",
        },
        potteryShard: {
          name: "Pottery shard | Pottery shards",
          description: "A piece of pottery from a long-lost civilization.",
        },
      },
      enemies: {
        "skeleton:straggler": {
          name: "Skeleton straggler",
          description: "A lone skeleton wandering the crypt.",
        },
        "skeleton:warrior": {
          name: "Skeleton warrior",
          description: "A skeleton with light armor.",
        },
        "zombie:walker": {
          name: "Zombie walker",
          description: "A slow-moving zombie.",
        },
      },
      dungeons: {
        cryptOfTheForgotten: {
          name: "Crypt",
          description: "A dark and damp crypt filled with the undead.",
        },
      },
      ui: {
        general: {
          stats: "Stats",
          new: "New",
        },
        user: {
          weapon: "Weapon",
          level: "Level",
          experience: "Experience",
          xp: "XP",
          gold: "Gold",
          stamina: "Stamina",
        },
        inventory: {
          title: "Inventory",
          sellableLoot: "Sellable loot",
          inventoryValue: "Inventory value",
        },
        weapons: {
          title: "Weapons",
        },
        dungeonPicker: {
          title: "Dungeon",
          enemies: "Enemies",
          name: "Name",
        },
        run: {
          title: "Run",
          enemiesDefeated: "Enemies defeated",
          noEnemiesDefeated: "No enemies",
          enemyDrops: "Loot",
          noEnemyDrops: "No loot",
          levelUp: "Level up!",
          rewards: "Rewards",
          noRuns: "Start a run to see it here",
        },
        drop: {
          sellValue: "Worth",
        },
        weapon: {
          damage: "Damage",
          staminaCost: "Stamina cost",
          criticalChance: "Crit chance",
          criticalMultiplier: "Crit multiplier",
          classModifiers: "Class modifiers",
        },
        enemy: {
          health: "Health",
          armor: "Armor",
          xp: "XP reward",
          blockChance: "Block chance",
          drops: "Drops",
          class: "Class",
        },
      },
      actions: {
        sell: "Sell",
        buy: "Buy",
        runDungeon: "Run dungeon",
        runningDungeon: "Running dungeon",
        recovering: "Recovering",
        fighting: "Fighting",
        equipped: "Equipped",
        equip: "Equip",
      },
    },
    nl: {
      title: "Virtuele Dungeon Crawler",
      weapons: {
        fists: {
          name: "Vuisten",
          description: "Je blote handen",
        },
        woodenSword: {
          name: "Houten zwaard",
          description: "Een simpel houten zwaard",
        },
        stoneSword: {
          name: "Stenen zwaard",
          description: "Een zwaard gemaakt van steen",
        },
        ironSword: {
          name: "Ijzeren zwaard",
          description: "Een sterk zwaard gemaakt van ijzer",
        },
        diamondSword: {
          name: "Diamanten zwaard",
          description: "Een krachtig zwaard gemaakt van diamanten",
        },
        netheriteSword: {
          name: "Netherite zwaard",
          description: "Een machtig zwaard gemaakt van netherite",
        },
      },
      drops: {
        bone: {
          name: "Bot | Botten",
          description: "Een bot van een skelet.",
        },
        rottenMeat: {
          name: "Rottend vlees",
          description: "Een stuk rottend vlees.",
        },
        oldCoin: {
          name: "Oude munt | Oude munten",
          description: "Een oude munt van een lang-verloren beschaving. Schitterd nogsteeds in het licht.",
        },
        potteryShard: {
          name: "Potten scherf | Potten scherven",
          description: "Een stuk aardewerk van een lang-verloren beschaving.",
        },
      },
      enemies: {
        "skeleton:straggler": {
          name: "Dwalende skelet",
          description: "Een eenzaam skelet dat door de crypte dwaalt.",
        },
        "skeleton:warrior": {
          name: "Skelet krijger",
          description: "Een skelet met een lichte bepantsering.",
        },
        "zombie:walker": {
          name: "Lopende zombie",
          description: "Een langzaam bewegende zombie.",
        },
      },
      dungeons: {
        cryptOfTheForgotten: {
          name: "Crypte",
          description: "Een donkere en vochtige crypte gevuld met de ondoden.",
        },
      },
      ui: {
        general: {
          stats: "Stats",
          new: "Nieuw",
        },
        user: {
          weapon: "Wapen",
          level: "Level",
          experience: "Ervaring",
          xp: "XP",
          gold: "Goud",
          stamina: "Stamina",
        },
        inventory: {
          title: "Inventaris",
          sellableLoot: "Verkoopbare buit",
          inventoryValue: "Inventaris waarde",
        },
        weapons: {
          title: "Wapens",
        },
        dungeonPicker: {
          title: "Dungeon",
          enemies: "Vijanden",
          name: "Naam",
        },
        run: {
          title: "Run",
          enemiesDefeated: "Vijanden verslagen",
          noEnemiesDefeated: "Geen vijanden",
          enemyDrops: "Geloot",
          noEnemyDrops: "Geen loot",
          levelUp: "Level up!",
          rewards: "Beloningen",
          noRuns: "Start een run om het hier te zien",
        },
        drop: {
          sellValue: "Waarde",
        },
        weapon: {
          damage: "Schade",
          staminaCost: "Stamina kosten",
          criticalChance: "Kans op kritiek",
          criticalMultiplier: "Kritieke vermenigvuldiger",
          classModifiers: "Klasse modificaties",
        },
        enemy: {
          health: "Levens",
          armor: "Pantser",
          xp: "XP beloning",
          drops: "Loot",
          class: "Klasse",
        },
      },
      actions: {
        sell: "Verkoop",
        buy: "Koop",
        runDungeon: "Dungeon rennen",
        runningDungeon: "Dungeon rennen",
        recovering: "Bijkomen",
        fighting: "Vechten",
        equipped: "Uitgerust",
        equip: "Uitrusten",
      },
    },
  },
  datetimeFormats: {
    en: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      time: {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
    nl: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      time: {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
  },
}))
