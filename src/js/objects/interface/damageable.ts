export default interface Damageable {
  health: number

  damage(amount: number): void
}
