import * as React from "react";
import Table from "../../common/components/Table";
import DeleteButton from "../../common/components/Buttons/DeleteButton";
import Button from "../../common/components/Buttons/Button";
import { getMatches, deleteMatch, createMatch } from "../../../services/matches";
import { buildMatchColumns, Match } from "../../../models/match";
import Drawer from "../../common/components/Drawer";
import MatchForm from "./MatchForm";

const MatchesTable = () => {
  const [matchesData, setMatches] = React.useState([]);
  const [match, addMatch] = React.useState();

  // Fetch data and update matches state on component mount
  React.useEffect(() => {
    // Using an IIFE
    (async function() {
      const matches = await getMatches();
      setMatches(matches);
    })();

  }, []);

  const columns = buildMatchColumns((params) => <DeleteButton onClick={async () => {
    // NOTE: Delete confirmation might be added here

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
  }} />);

  return (
    <div>
      <Table rows={matchesData} cols={columns} />
      <Button onClick={() => addMatch(new Match())}>Add new match</Button>
      <Drawer
        visible={typeof match !== 'undefined'}
        onHide={() => addMatch(undefined)}
      >
        <MatchForm onSubmit={async (e, values) => {
            // Simulate call to API to create a match
            try {
              const match = await createMatch({ ...values })
              // If delete match was OK, we update matches state properly
              if (id) {
                setMatches([new Match({ ...match }), ...matchesData]);
                // Hide form
                addMatch(undefined);
              } else {
                throw new Error("An error ocurred");
              }
            } catch(e) {
              alert("An error ocurred while creating a match...");
            }
          }} />
      </Drawer>
    </div>
  );
}

export default MatchesTable;