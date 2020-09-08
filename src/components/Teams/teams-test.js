import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import Teams from './teams';

describe('teams', async (assert) => {
  // const renderTeams = (teams) => render(<Teams teams={teams} />);
  // {
  //   const teams = [
  //     { id: '1', name: 'team1', img: 'team1Img' },
  //     { id: '2', name: 'team2', img: 'team2Img' },
  //   ];
  //   const $ = renderTeams(teams);
  //   const contains = match($.html().trim());
  //   assert({
  //     given: 'a list of teams',
  //     should: 'render the teams preview',
  //     actual: teams.map((team) => contains(team.name)),
  //     expected: teams.map((team) => team.name),
  //   });
  //   assert({
  //     given: 'a list of teams',
  //     should: 'render the teams images',
  //     actual: teams.map((team) => contains(team.img)),
  //     expected: teams.map((team) => team.img),
  //   });
  // }
});
