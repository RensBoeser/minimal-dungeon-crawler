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
          name: "Wooden Sword",
          description: "A simple wooden sword",
        },
        stoneSword: {
          name: "Stone Sword",
          description: "A sword made of stone",
        },
      },
      drops: {
        bone: {
          name: "Bone | Bones",
          description: "A bone from a skeleton.",
        },
        rottenMeat: {
          name: "Rotten Meat",
          description: "A piece of rotten meat.",
        },
      },
      enemies: {
        "skeleton:straggler": {
          name: "Skeleton Straggler",
          description: "A lone skeleton wandering the crypt.",
        },
        "skeleton:warrior": {
          name: "Skeleton Warrior",
          description: "A skeleton with light armor.",
        },
        "zombie:walker": {
          name: "Zombie Walker",
          description: "A slow-moving zombie.",
        },
      },
      dungeons: {
        cryptOfTheForgotten: {
          name: "Crypt of the Forgotten",
          description: "A dark and damp crypt filled with the undead.",
        },
      },
      ui: {
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
          sellableLoot: "Sellable Loot",
          inventoryValue: "Inventory Value",
        },
        shop: {
          title: "Shop",
          weapons: "Weapons",
        },
        dungeonPicker: {
          title: "Dungeon",
          enemies: "Enemies",
          name: "Name",
        },
        logs: {
          title: "Logs",
          enemiesDefeated: "Enemies Defeated",
          noEnemiesDefeated: "No enemies defeated",
          enemyDrops: "Looted",
          noEnemyDrops: "Nothing looted",
        },
      },
      actions: {
        sell: "Sell",
        buy: "Buy",
        runDungeon: "Run Dungeon",
        recovering: "Recovering",
      }
    },
    nl: {
      title: "Virtuele Dungeon Crawler",
      weapons: {
        fists: {
          name: "Vuisten",
          description: "Je blote handen",
        },
        woodenSword: {
          name: "Houten Zwaard",
          description: "Een simpel houten zwaard",
        },
        stoneSword: {
          name: "Stenen Zwaard",
          description: "Een zwaard gemaakt van steen",
        },
      },
      drops: {
        bone: {
          name: "Bot | Botten",
          description: "Een bot van een skelet.",
        },
        rottenMeat: {
          name: "Rottend Vlees",
          description: "Een stuk rottend vlees.",
        },
      },
      enemies: {
        "skeleton:straggler": {
          name: "Dwalende Skelet",
          description: "Een eenzaam skelet dat door de crypte dwaalt.",
        },
        "skeleton:warrior": {
          name: "Skelet Krijger",
          description: "Een skelet met een lichte bepantsering.",
        },
        "zombie:walker": {
          name: "Lopende Zombie",
          description: "Een langzaam bewegende zombie.",
        },
      },
      dungeons: {
        cryptOfTheForgotten: {
          name: "Crypte van de Vergetenen",
          description: "Een donkere en vochtige crypte gevuld met de ondoden.",
        },
      },
      ui: {
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
          sellableLoot: "Verkoopbare Buit",
          inventoryValue: "Inventaris Waarde",
        },
        shop: {
          title: "Winkel",
          weapons: "Wapens",
        },
        dungeonPicker: {
          title: "Dungeon",
          enemies: "Vijanden",
          name: "Naam",
        },
        logs: {
          title: "Historie",
          enemiesDefeated: "Vijanden Verslagen",
          noEnemiesDefeated: "Geen vijanden verslagen",
          enemyDrops: "Geloot",
          noEnemyDrops: "Niks geloot",
        },
      },
      actions: {
        sell: "Verkoop",
        buy: "Koop",
        runDungeon: "Dungeon Rennen",
        recovering: "Bijkomen",
      }
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
      }
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
      }
    },
  }
}))
