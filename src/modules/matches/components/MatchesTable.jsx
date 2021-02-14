import * as React from "react";
import Table from "../../common/components/Table";
import DeleteButton from "../../common/components/Buttons/DeleteButton";
import { getMatches, deleteMatch, createMatch } from "../../../services/matches";

const MatchesTable = () => {
  const [matchesData, setMatches] = React.useState([]);

  const columns = [
    { field: 'id', headerName: 'Id', width: 120 },
    { field: 'teams', headerName: 'Teams', width: 280 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'time', headerName: 'Time', width: 90 },
    { field: 'result', headerName: 'Result', width: 160 },
    { field: 'actions', headerName: 'Actions', width: 120, disableClickEventBubbling: true,
      renderCell: (params) => <DeleteButton onClick={async () => {
        // Simulate call to API to delete a match
        try {
          const id = await deleteMatch(params.getValue('id'));
          // If delete match was OK, we update matches state properly
          if (id) {
            setMatches(matchesData.filter(match => match.id !== id));
          } else {
            throw new Error("An error ocurred");
          }
        } catch(e) {
          alert("An error ocurred while deleting a match...");
        }
      }} />
    }
  ];

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