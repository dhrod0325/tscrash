import { $, calcTotalCountData, sortByTimeStamp } from '../lib/utils';
import { Country, Summary } from '../types';
import { api } from '../lib/api';
import { Component } from '../interfaces';
import { RecoveredSpinner } from './RecoveredSpinner';
import { RecoveredTotal } from './RecoveredTotal';

export class RecoveredList implements Component {
  private $recoveredList: HTMLElement;

  private $spinner: RecoveredSpinner;

  private $total: RecoveredTotal;

  constructor() {
    this.$recoveredList = $('.recovered-list');

    this.$spinner = new RecoveredSpinner(this.$recoveredList);

    this.$total = new RecoveredTotal();
  }

  setup(data: Summary): void {
    const TotalRecovered = calcTotalCountData(data, 'TotalRecovered');
    this.setTotalRecoveredByWorld(String(TotalRecovered));
  }

  public async loadData(selectedId: string | undefined) {
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

  private setRecoveredList(data?: Country[]) {
    if (!data) return;

    const sorted = data.sort((a, b) => sortByTimeStamp(b.Date, a.Date));

    sorted.forEach(value => {
      this.$recoveredList.appendChild(this.createListItem(value));
    });
  }

  private createListItem(value: Country) {
    const $li = document.createElement('li');
    $li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');

    span.textContent = String(value.Cases);
    span.setAttribute('class', 'recovered');

    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);

    $li.appendChild(span);
    $li.appendChild(p);

    return $li;
  }

  private startLoadingAnimation() {
    this.$spinner.show();
  }

  private endLoadingAnimation() {
    this.$spinner.hide();
  }

  private clearRecoveredList() {
    this.$recoveredList.innerHTML = '';
  }

  private setTotalRecoveredByWorld(count: string) {
    this.$total.setTotalHtml(count);
  }

  private setTotalRecoveredByCountry(data?: Country[]) {
    if (!data) return;

    this.setTotalRecoveredByWorld(data[0].Cases);
  }
}
