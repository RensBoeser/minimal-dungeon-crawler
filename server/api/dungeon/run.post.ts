import cloneDeep from "lodash/cloneDeep"
import type { EnemyDropId } from "~/utils/drops"
import type { Enemy, EnemyId } from "~/utils/dungeons"
import { dungeons } from "~/utils/dungeons"
import { getLevel } from "~/utils/levels"
import type { Weapon } from "~/utils/weapons"
import { weapons } from "~/utils/weapons"

export const getDungeonEnemy = (enemies: Array<Enemy>): Enemy => {
  // Calculate the total encounter rate
  const totalEncounterRate = enemies.reduce((sum, enemy) => sum + enemy.encounterRate, 0)

  // Generate a random number between 0 and the total encounter rate
  const rand = Math.random() * totalEncounterRate

  let cumulativeProbability = 0

  // Loop through the enemies to select one based on their encounterRate
  for (const enemy of enemies) {
    cumulativeProbability += enemy.encounterRate

    // If the random number is less than the cumulative probability, return this enemy
    if (rand <= cumulativeProbability) {
      return enemy
    }
  }

  // Fallback in case no enemy is selected (shouldn't happen)
  return enemies[enemies.length - 1]
}

interface FightEnemyResult {
  wonFight: boolean
  staminaLost: number
  drops: Array<EnemyDropId>
}

export const fightEnemy = (enemy: Enemy, weapon: Weapon, stamina: number): FightEnemyResult => {
  let { health: enemyHealth } = cloneDeep(enemy)
  let staminaLost = 0

  // Calculate the damage negation based on the enemy's armor and the weapon's armor penetration
  const damageNegation = enemy.armor - weapon.armorPenetration

  while (enemyHealth > 0 && staminaLost < stamina) {
    // Calculate the damage dealt by the player
    const damageDealt = weapon.damage - damageNegation

    if (damageDealt <= 0) {
      staminaLost = stamina
      break
    }

    // Deal the damage to the enemy
    enemyHealth -= damageDealt
    staminaLost += weapon.staminaCost
  }

  // Calculate the drops
  const drops: Array<EnemyDropId> = []
  for (const drop of enemy.lootTable) {
    if (Math.random() < drop.probability) {
      drops.push(drop.item)
    }
  }

  return {
    wonFight: enemyHealth <= 0,
    staminaLost,
    drops,
  }
}

export interface RunDungeonResult {
  dateTime: string
  dungeonId: string
  enemiesDefeated: Array<EnemyId>
  enemyDrops: Array<EnemyDropId>
  xpGained: number
}

export default defineEventHandler(async (): Promise<RunDungeonResult> => {
  const userStorage = useStorage("db")

  const userXp = (await userStorage.getItem<number>("user:experience")) ?? 0
  const weaponId = (await userStorage.getItem<string>("user:weapon")) ?? "fists"

  let { stamina: userStamina } = getLevel(userXp)
  const userWeapon = weapons.find(({ id }) => id === weaponId)!

  const currentDungeon = dungeons[0]

  const enemiesDefeated: Array<EnemyId> = []
  const enemyDrops: Array<EnemyDropId> = []
  let xpGained = 0

  while (userStamina > 0) {
    const enemy = getDungeonEnemy(currentDungeon.enemies)
    const { wonFight, drops, staminaLost } = fightEnemy(enemy, userWeapon, userStamina)

    if (!wonFight) {
      break
    }

    userStamina -= staminaLost
    enemiesDefeated.push(enemy.id)
    enemyDrops.push(...drops)
    xpGained += enemy.xp
  }

  // Update the database
  const currentBone = (await userStorage.getItem<number>("inventory:bone")) ?? 0
  const currentRottenMeat = (await userStorage.getItem<number>("inventory:rottenMeat")) ?? 0
  await userStorage.setItem("inventory:bone", currentBone + enemyDrops.filter((drop) => drop === "bone").length)
  await userStorage.setItem("inventory:rottenMeat", currentRottenMeat + enemyDrops.filter((drop) => drop === "rottenMeat").length)
  await userStorage.setItem("user:experience", userXp + xpGained)

  return {
    dateTime: new Date().toISOString(),
    dungeonId: currentDungeon.id,
    enemiesDefeated,
    enemyDrops,
    xpGained,
  }
})
