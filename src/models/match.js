export class Match {
  constructor({ id, teams, date, time, result } = {}) {
    this.id = id;
    this.teams = teams;
    this.date = date;
    this.time = time;
    this.result = result;
  }

  static shape() {
    return {
      id: "",
      teams: "",
      date: "",
      time: "",
      result: ""
    }
  }
}

export function buildMatchColumns(actionsCell) {
  const columns = [
    { field: 'id', headerName: 'Id', width: 120 },
    { field: 'teams', headerName: 'Teams', width: 280 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'time', headerName: 'Time', width: 90 },
    { field: 'result', headerName: 'Result', width: 160 },
    { field: 'actions', headerName: 'Actions', width: 120, disableClickEventBubbling: true,
      renderCell: actionsCell
    }
  ];

  return columns;
}