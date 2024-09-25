import type { EnemyDropId } from "~/utils/drops"
import type { Enemy, EnemyId, RunDungeonResult } from "~/utils/dungeons"
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
  let { health: enemyHealth } = enemy
  let staminaLost = 0

  // Calculate the damage negation based on the enemy's armor and the weapon's armor penetration
  const damageNegation = enemy.armor - weapon.armorPenetration

  // every iteration of the loop is a swing of the weapon
  while (enemyHealth > 0 && staminaLost < stamina) {
    // Check if the player lands a hit on the enemy
    if (Math.random() <= enemy.blockChance) {
      staminaLost = weapon.staminaCost
      continue
    }

    let compositeWeaponDamage = weapon.damage
    // Check if the player lands a critical hit
    if (weapon.criticalChance) {
      const hitCritically = Math.random() <= weapon.criticalChance
      if (hitCritically) {
        // Multiply the weapon's damage by the critical multiplier, if none is set, default to 1
        compositeWeaponDamage = weapon.damage * (weapon.criticalMultiplier ?? 1)
      }
    }

    // Calculate the damage dealt by the player
    const damageDealt = compositeWeaponDamage - damageNegation

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
    // Loop through the amount of drops and add them to the drops array based on the probability
    for (let i = 0; i < drop.amount; i++) {
      if (Math.random() < drop.probability) {
        drops.push(drop.item)
      }
    }
  }

  return {
    wonFight: enemyHealth <= 0,
    staminaLost,
    drops,
  }
}

export default defineEventHandler(async (event): Promise<RunDungeonResult> => {
  const { getUser, setUser: setUser } = useUserService(event.context.userId)
  const user = await getUser()

  if (!user) {
    throw createError("User not found")
  }

  const currentLevel = getLevel(user.experience)

  let userStamina = currentLevel.baseStamina

  const userWeapon = weapons.find(({ id }) => id === user.weapon)!

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

  for (const drop of enemyDrops) {
    user.inventory[drop] = (user.inventory[drop] ?? 0) + 1
  }

  user.experience += xpGained

  // Check for level up and process rewards if applicable
  const newLevel = getLevel(user.experience)
  const levelledUp = newLevel.level > currentLevel.level
  if (levelledUp) {
    user.gold += newLevel.reward?.gold ?? 0
  }

  await setUser(user)

  return {
    dateTime: new Date().toISOString(),
    dungeonId: currentDungeon.id,
    enemiesDefeated,
    enemyDrops,
    xpGained,
    currentLevel,
    levelledUpTo: levelledUp ? newLevel : undefined,
  }
})
