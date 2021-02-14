import * as React from "react";
import styled from "styled-components";
import TextField from "../../common/components/TextField";
import Table from "../../common/components/Table";
import DeleteButton from "../../common/components/Buttons/DeleteButton";
import Button from "../../common/components/Buttons/Button";
import { getMatches, deleteMatch, createMatch } from "../../../services/matches";
import { buildMatchColumns, Match } from "../../../models/match";
import Drawer from "../../common/components/Drawer";
import Form from "../../common/components/Form";

const Fields = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 300px;
  * > div {
    margin-bottom: 20px;
  }
`;

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

  function renderForm(formState, input) {
    // NOTE: There's no validation of data here, but might be added
    return (
      <Fields>
        <TextField
          label="Id"
          id="id"
          {...input.text({
            name: "id"
          })} />
        <TextField
          label="Teams"
          id="teams"
          {...input.text({
            name: 'teams'
          })} />
        <TextField
          label="Date"
          id="date"
          {...input.text({
            name: 'date'
          })} />
        <TextField
          label="Time"
          id="time"
          {...input.text({
            name: 'time'
          })} />
        <TextField
          label="Result"
          id="result"
          {...input.text({
            name: 'result'
          })} />
        <Button type="submit">SAVE</Button>
      </Fields>
    )
  }

  return (
    <div>
      <Table rows={matchesData} cols={columns} />
      <Button onClick={() => addMatch(new Match())}>Add new match</Button>
      <Drawer
        visible={typeof match !== 'undefined'}
        onHide={() => addMatch(undefined)}
      >
        <Form
          formData={Match.shape()}
          renderForm={renderForm}
          onSubmit={async (e, values) => {
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