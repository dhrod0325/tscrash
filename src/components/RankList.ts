import { $ } from '../lib/utils';
import { Summary } from '../types';
import { Component } from '../interfaces';

export class RankList implements Component {
  private $rankList;

  constructor(onListClick: any) {
    this.$rankList = $('.rank-list');
    this.$rankList.addEventListener('click', onListClick);
  }

  setup(data: Summary): void {
    this.setCountryRanksByConfirmedCases(data);
  }

  setCountryRanksByConfirmedCases(data: Summary) {
    const sorted = data.Countries.sort(
      (a, b) => b.TotalConfirmed - a.TotalConfirmed,
    );

    sorted.forEach(value => {
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

      this.$rankList.appendChild(li);
    });
  }
}
