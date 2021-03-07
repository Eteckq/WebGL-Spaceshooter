export default class View {
  public static setHP(hp: number) {
    document.getElementById('info_HP').innerHTML = hp.toString()
  }

  public static setScore(score: number) {
    document.getElementById('info_SCORE').innerHTML = score.toString()
  }
}
