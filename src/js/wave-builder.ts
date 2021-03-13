import * as Chart from 'chart.js'
import { ChartData, ChartDataSets } from 'chart.js'
import WaveManager from './wave-manager'

function rdmRgba() {
  return (
    'rgba(' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ', 0.2)'
  )
}

let colorsMap = {
  BasicEnemy: 'rgba(134, 140, 150, 0.2)',
  FastEnemy: 'rgba(81, 124, 196, 0.2)',
  UfoEnemy: 'rgba(255, 255, 66, 0.2)',
  TankEnemy: 'rgba(227, 200, 50, 0.2)',
  StrongEnemy: 'rgba(61, 209, 95, 0.2)',
}

$(() => {
  let datasets: ChartDataSets[] = []

  for (const wave of WaveManager.WavesEnemies) {
    let dataset: ChartDataSets = datasets.find(
      (ds) => ds.label === wave.enemy.name
    )
    let exists = !!dataset
    if (!dataset) {
      let color = (colorsMap as any)[wave.enemy.name] || rdmRgba()
      dataset = {
        label: wave.enemy.name,
        backgroundColor: color,
        lineTension: 0,
      }
      dataset.data = []
    }

    ;(dataset.data as any).push(
      {
        x: wave.spawnAtWave,
        y: 0,
      },
      {
        x: wave.spawnAtWave,
        y: wave.startFreq,
      },
      {
        x: wave.spawnAtWave + wave.stopAtWave,
        y: 0,
      }
    )

    if (!exists) {
      datasets.push(dataset)
    }
  }

  let data: ChartData = {
    datasets: datasets,
  }
  if ($('#chart').length > 0)
    new Chart($('#chart') as any, {
      type: 'line',
      data: data,
      options: {
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
            },
          ],
        },
      },
    })
})
