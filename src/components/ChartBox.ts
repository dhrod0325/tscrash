import { Country } from '../types';
import { $ } from '../lib/utils';
import { api } from '../lib/api';

export class ChartBox {
  setChartData(data?: Country[]) {
    if (!data) return;

    const chartData: string[] = data.slice(-14).map(value => value.Cases);
    const chartLabel = data
      .slice(-14)
      .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));

    this.renderChart(chartData, chartLabel);
  }

  renderChart(data: string[], labels: string[]) {
    const ctx = (<HTMLCanvasElement>$('#lineChart')).getContext('2d');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Chart.defaults.global.defaultFontColor = '#f5eaea';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Chart.defaults.global.defaultFontFamily = 'Exo 2';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Confirmed for the last two weeks',
            backgroundColor: '#feb72b',
            borderColor: '#feb72b',
            data,
          },
        ],
      },
      options: {},
    });
  }

  async loadData(selectedId: string | undefined) {
    const confirmedResponse = await api.fetchCountryInfo(
      selectedId,
      'confirmed',
    );

    this.setChartData(confirmedResponse);
  }
}
