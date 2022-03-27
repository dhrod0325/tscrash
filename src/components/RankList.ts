import { $ } from '../lib/utils';
import { Country, Summary } from '../types';
import { Component } from '../interfaces';
import { EventEmitter } from '../lib/EventEmitter';

export class RankList implements Component {
  private $rankList;

  constructor(eventEmitter: EventEmitter) {
    this.$rankList = $('.rank-list');
    this.$rankList.addEventListener('click', e => {
      eventEmitter.emit('rankItemClicked', e);
    });
  }

  public setup(data: Summary): void {
    this.setCountryRanksByConfirmedCases(data);
  }

  private setCountryRanksByConfirmedCases(data: Summary) {
    const sorted = data.Countries.sort(
      (a, b) => b.TotalConfirmed - a.TotalConfirmed,
    );

    sorted.forEach(value => {
      this.$rankList.appendChild(this.createListItem(value));
    });
  }

  private createListItem(value: Country) {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);

    const span = document.createElement('span');
    span.textContent = String(value.TotalConfirmed);
    span.setAttribute('class', 'cases');

    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;

    li.appendChild(span);
    li.appendChild(p);

    return li;
  }
}
