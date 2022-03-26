import './assets/css/main.css';

import { Country, Summary } from './types';
import { api } from './lib/api';
import { $, getUnixTimestamp } from './lib/utils';
import { createSpinnerElement } from './lib/spinner';

// DOM
const $confirmedTotal = $('.confirmed-total');
const $deathsTotal = $('.deaths');
const $recoveredTotal = $('.recovered');
const $lastUpdatedTime = $('.last-updated-time');
const $rankList = $('.rank-list');

const $deathsList = $('.deaths-list');
const $recoveredList = $('.recovered-list');

const $deathSpinner = createSpinnerElement('deaths-spinner');
const $recoveredSpinner = createSpinnerElement('recovered-spinner');

function startLoadingAnimation() {
  $deathsList.appendChild($deathSpinner);
  $recoveredList.appendChild($recoveredSpinner);
}

function endLoadingAnimation() {
  $deathsList.removeChild($deathSpinner);
  $recoveredList.removeChild($recoveredSpinner);
}

// state
let isDeathLoading = false;

// methods
function startApp() {
  // noinspection JSIgnoredPromiseFromCall
  setupData();
  initEvents();
}

// events
function initEvents() {
  $rankList.addEventListener('click', handleListClick);
}

async function handleListClick(event: Event) {
  let selectedId!: string | undefined;

  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement?.id;
  }

  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }

  if (isDeathLoading) {
    return;
  }

  if (selectedId === 'united-states') {
    return alert('데이터가 많아 총괄 현황은 제공하지 않아요😭');
  }

  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;

  const deathResponse = await api().fetchCountryInfo(selectedId, 'deaths');
  const recoveredResponse = await api().fetchCountryInfo(
    selectedId,
    'recovered',
  );
  const confirmedResponse = await api().fetchCountryInfo(
    selectedId,
    'confirmed',
  );

  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);

  isDeathLoading = false;
}

function setDeathsList(data?: Country[]) {
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
    $deathsList.appendChild(li);
  });
}

function clearDeathList() {
  $deathsList.innerHTML = '';
}

function setTotalDeathsByCountry(data?: Country[]) {
  if (!data) return;
  $deathsTotal.innerText = data[0].Cases;
}

function setRecoveredList(data?: Country[]) {
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

    $recoveredList.appendChild(li);
  });
}

function clearRecoveredList() {
  $recoveredList.innerHTML = '';
}

function setTotalRecoveredByCountry(data?: Country[]) {
  if (!data) return;
  $recoveredTotal.innerText = data[0].Cases;
}

async function setupData() {
  const data = await api().fetchCovidSummary();

  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: string[], labels: string[]) {
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

function setChartData(data?: Country[]) {
  if (!data) return;

  const chartData: string[] = data.slice(-14).map(value => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));

  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data: Summary) {
  const count = data.Countries.reduce(
    (total, current) => total + current.TotalConfirmed,
    0,
  );

  $confirmedTotal.innerText = String(count);
}

function setTotalDeathsByWorld(data: Summary) {
  const count = data.Countries.reduce(
    (total, current) => total + current.TotalDeaths,
    0,
  );

  $deathsTotal.innerText = String(count);
}

function setTotalRecoveredByWorld(data: Summary) {
  const count = data.Countries.reduce(
    (total, current) => total + current.TotalRecovered,
    0,
  );

  $recoveredTotal.innerText = String(count);
}

function setCountryRanksByConfirmedCases(data: Summary) {
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

    $rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: Summary) {
  $lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
