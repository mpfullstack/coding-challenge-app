import * as React from "react";
import Table from "../../common/components/Table";
import { getMatches } from "../../../services/matches";

const columns = [
  { field: 'id', headerName: 'Id', width: 120 },
  { field: 'teams', headerName: 'Teams', width: 280 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'time', headerName: 'Time', width: 90 },
  { field: 'result', headerName: 'Result', width: 160 }
];

const MatchesTable = () => {
  const [matchesData, setMatches] = React.useState([]);

  React.useEffect(() => {
    // Using an IIFE
    (async function() {
      const matches = await getMatches();
      setMatches(matches);
    })();

  }, []);

  return (
    <Table rows={matchesData} cols={columns} />
  );
}

export default MatchesTable;