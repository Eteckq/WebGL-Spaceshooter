export default interface Damageable {
  health: number
  damageCooldown: number
  DAMAGE_COOLDOWN: number

  damage(amount: number): void
}
