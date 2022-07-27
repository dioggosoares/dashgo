import { theme } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'

export const series = [
  { name: 'series1', data: [31, 150, 10, 48, 80, 18, 130] },
  // { name: 'series2', data: [11, 100, 20, 60, 80, 48, 130] },
]

export const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2022-07-24T00:00:00.000Z',
      '2022-07-25T00:00:00.000Z',
      '2022-07-26T00:00:00.000Z',
      '2022-07-27T00:00:00.000Z',
      '2022-07-28T00:00:00.000Z',
      '2022-07-29T00:00:00.000Z',
      '2022-07-30T00:00:00.000Z',
    ],
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      offsetX: 2,
      color: theme.colors.gray[600],
    },
  },
}
