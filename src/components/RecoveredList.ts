import { $, calcTotalCountData, getUnixTimestamp } from '../lib/utils';
import { createSpinnerElement } from '../lib/spinner';
import { Country, Summary } from '../types';
import { api } from '../lib/api';
import { Component } from '../interfaces';

export class RecoveredList implements Component {
  private $recoveredList;
  private $recoveredSpinner;
  private $recoveredTotal;

  constructor() {
    this.$recoveredList = $('.recovered-list');
    this.$recoveredSpinner = createSpinnerElement('recovered-spinner');
    this.$recoveredTotal = $('.recovered');
  }

  setup(data: Summary): void {
    const TotalRecovered = calcTotalCountData(data, 'TotalRecovered');
    this.setTotalRecoveredByWorld(String(TotalRecovered));
  }

  setRecoveredList(data?: Country[]) {
    if (!data) return;

    const sorted = data.sort(
      (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );
    sorted.forEach(value => {
      const li = document.createElement('li');
      li.setAttribute('class', 'list-item-b flex align-center');
      const span = document.createElement('span');

      span.textContent = String(value.Cases);
      span.setAttribute('class', 'recovered');

      const p = document.createElement('p');
      p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);

      li.appendChild(span);
      li.appendChild(p);

      this.$recoveredList.appendChild(li);
    });
  }

  startLoadingAnimation() {
    this.$recoveredList.appendChild(this.$recoveredSpinner);
  }

  endLoadingAnimation() {
    this.$recoveredList.removeChild(this.$recoveredSpinner);
  }

  clearRecoveredList() {
    this.$recoveredList.innerHTML = '';
  }

  setTotalRecoveredByWorld(count: string) {
    console.log(count);
    this.$recoveredTotal.innerText = count;
  }

  async loadData(selectedId: string | undefined) {
    this.clearRecoveredList();

    this.startLoadingAnimation();

    const recoveredResponse = await api.fetchCountryInfo(
      selectedId,
      'recovered',
    );

    this.setRecoveredList(recoveredResponse);
    this.setTotalRecoveredByCountry(recoveredResponse);

    this.endLoadingAnimation();
  }

  setTotalRecoveredByCountry(data?: Country[]) {
    if (!data) return;

    this.setTotalRecoveredByWorld(data[0].Cases);
  }
}
