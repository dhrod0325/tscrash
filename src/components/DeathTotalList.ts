import { $, calcTotalCountData, getUnixTimestamp } from '../lib/utils';
import { createSpinnerElement } from '../lib/spinner';
import { Country, Summary } from '../types';
import { api } from '../lib/api';
import { Component } from '../interfaces';

export class DeathTotalList implements Component {
  $deathsTotal;
  $deathsList;
  $deathSpinner;

  constructor() {
    this.$deathsTotal = $('.deaths');

    this.$deathsList = $('.deaths-list');

    this.$deathSpinner = createSpinnerElement('deaths-spinner');
  }

  setup(data: Summary): void {
    const count = calcTotalCountData(data, 'TotalDeaths');
    this.setTotalDeathsByWorld(String(count));
  }

  startLoadingAnimation() {
    this.$deathsList.appendChild(this.$deathSpinner);
  }

  endLoadingAnimation() {
    this.$deathsList.removeChild(this.$deathSpinner);
  }

  clearDeathList() {
    this.$deathsList.innerHTML = '';
  }

  setTotalDeathsByWorld(count: string) {
    this.$deathsTotal.innerText = count;
  }

  setDeathsList(data?: Country[]) {
    if (!data) return;

    const sorted = data.sort(
      (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );

    sorted.forEach(value => {
      const li = document.createElement('li');
      li.setAttribute('class', 'list-item-b flex align-center');
      const span = document.createElement('span');
      span.textContent = value.Cases;
      span.setAttribute('class', 'deaths');
      const p = document.createElement('p');
      p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
      li.appendChild(span);
      li.appendChild(p);
      this.$deathsList.appendChild(li);
    });
  }

  async loadData(selectedId: string | undefined) {
    this.clearDeathList();

    this.startLoadingAnimation();

    const deathResponse = await api.fetchCountryInfo(selectedId, 'deaths');

    this.setDeathsList(deathResponse);

    this.setTotalDeathsByCountry(deathResponse);

    this.endLoadingAnimation();
  }

  setTotalDeathsByCountry(data?: Country[]) {
    if (!data) return;
    this.setTotalDeathsByWorld(data[0].Cases);
  }
}
