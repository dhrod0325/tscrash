import './assets/css/main.css';
import { api } from './lib/api';
import { ConfirmedTotal } from './components/ConfirmedTotal';
import { RankList } from './components/RankList';
import { ChartBox } from './components/ChartBox';
import { RecoveredList } from './components/RecoveredList';
import { DeathTotalList } from './components/DeathTotalList';
import { LastUpdateTime } from './components/LastUpdateTime';
import { Component } from './interfaces';
import { findClickedId } from './lib/utils';

const rankList = new RankList(handleListClick);
const confirmedTotal = new ConfirmedTotal();
const chart = new ChartBox();
const recoveredList = new RecoveredList();
const deathTotalList = new DeathTotalList();
const lastUpdateTime = new LastUpdateTime();

const components: Component[] = [
  rankList,
  confirmedTotal,
  recoveredList,
  deathTotalList,
  lastUpdateTime,
];

function startApp() {
  setupData();

  initEvents();
}

// events
function initEvents() {
  document.addEventListener('rankListClicked', handleListClick);
}

async function handleListClick(event: Event) {
  const selectedId = findClickedId(event);

  if (selectedId === 'united-states') {
    return alert('데이터가 많아 총괄 현황은 제공하지 않아요😭');
  }

  recoveredList.loadData(selectedId);
  deathTotalList.loadData(selectedId);
  chart.loadData(selectedId);
}

async function setupData() {
  const data = await api.fetchCovidSummary();

  components.forEach(component => component.setup(data));
}

startApp();
