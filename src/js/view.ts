import * as $ from 'jquery'

class View {
  private healtBar
  constructor() {
    this.healtBar = new HealthBar()
  }

  public setHp(hp: number) {
    this.healtBar.setHp(hp)
  }

  public setScore(score: number) {
    document.getElementById('info_SCORE').innerHTML = score.toString()
  }
}

class HealthBar {
  hBar: any
  bar: any
  hit: any

  constructor() {
    this.hBar = $('.health-bar')
    this.bar = this.hBar.find('.bar')
    this.hit = this.hBar.find('.hit')
  }

  public setHp(hp: number) {
    let total = this.hBar.data('total')
    let value = this.hBar.data('value')

    let diff = hp - value

    console.log(total, value)

    if (value < 0) {
      return
    }

    var barWidth = (hp / total) * 100
    var hitWidth = (hp / value) * 100 + '%'

    this.hit.css('width', hitWidth)
    this.hBar.data('value', hp)

    if (diff < 0) {
      setTimeout(() => {
        this.hit.css({ width: '0' })
        this.bar.css('width', barWidth + '%')
      }, 500)
    } else {
      this.hit.css({ width: '0' })
      this.bar.css('width', barWidth + '%')
    }
  }

  public fullBar() {
    this.hBar.data('value', this.hBar.data('total'))

    this.hit.css({ width: '0' })

    this.bar.css('width', '100%')
  }
}

export default new View()
