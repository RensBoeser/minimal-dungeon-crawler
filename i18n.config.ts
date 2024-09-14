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
        }
      },
      actions: {
        sell: "Sell",
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
      ui: {
        user: {
          weapon: "Wapen",
          level: "Level",
          experience: "Ervaring",
          xp: "XP",
          gold: "Goud",
          stamina: "Uithoudingsvermogen",
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
      },
      actions: {
        sell: "Verkoop",
      }
    },
  },
}))
