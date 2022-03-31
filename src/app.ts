import './assets/css/main.css';

import { Component } from 'covid';

import { RecoveredTotalList } from '@/components/Recovered/RecoveredTotalList';
import { DeathTotalList } from '@/components/Death/DeathTotalList';
import { RankList } from '@/components/Rank/RankList';
import { ChartBox } from '@/components/Chart/ChartBox';
import { Confirmed } from '@/components/Confirmed/Confirmed';
import { LastUpdate } from '@/components/LastUpdate/LastUpdate';
import { App } from '@/lib/App';

const components: Component[] = [
  new RankList(),
  new RecoveredTotalList(),
  new RecoveredTotalList(),
  new DeathTotalList(),
  new ChartBox(),
  new Confirmed(),
  new LastUpdate(),
];

const app = new App(components);
app.startApp();
