import {
  $,
  calcTotalCountData,
  createSpinnerElement,
  getUnixTimestamp,
} from '../lib/utils';
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

  public async loadData(selectedId: string | undefined) {
    this.clearDeathList();

    this.startLoadingAnimation();

    const deathResponse = await api.fetchCountryInfo(selectedId, 'deaths');

    this.setDeathsList(deathResponse);

    this.setTotalDeathsByCountry(deathResponse);

    this.endLoadingAnimation();
  }

  private startLoadingAnimation() {
    this.$deathsList.appendChild(this.$deathSpinner);
  }

  private endLoadingAnimation() {
    this.$deathsList.removeChild(this.$deathSpinner);
  }

  private clearDeathList() {
    this.$deathsList.innerHTML = '';
  }

  private setTotalDeathsByWorld(count: string) {
    this.$deathsTotal.innerText = count;
  }

  private setDeathsList(data?: Country[]) {
    if (!data) return;

    const sorted = data.sort(
      (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );

    sorted.forEach(country => {
      this.$deathsList.appendChild(this.createListItem(country));
    });
  }

  private createListItem(value: Country) {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases;
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);

    return li;
  }

  private setTotalDeathsByCountry(data?: Country[]) {
    if (!data) return;
    this.setTotalDeathsByWorld(data[0].Cases);
  }
}
