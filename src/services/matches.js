import SuperFetch from '../helpers/superFetch';
import { Match } from '../models/match';

export async function getMatches() {
  // Fetch data from source URL
  const data = await SuperFetch.get(process.env.SOURCE_URL);

  // Access matches object data
  const matchesObj = data.doc[0].data.matches;

  // Build array of matches
  const matches = [];
  Object.keys(matchesObj).forEach(id => {
    const match = matchesObj[id];
    matches.push(new Match({
      id,
      teams: `${match.teams.home.name} - ${match.teams.away.name}`,
      date: match.time.date,
      time: match.time.time,
      result: `${match.result.home} - ${match.result.away}`
    }));
  });

  return matches;
}

export async function deleteMatch(id) {
  // NOTE: We simulate an API call to delete a match
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 200);
  });
}

export async function createMatch(match) {
  // NOTE: We simulate an API call to create a match
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(match);
    }, 200);
  });
}