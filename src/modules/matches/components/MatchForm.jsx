import * as React from "react";
import Button from "../../common/components/Buttons/Button";
import styled from "styled-components";
import TextField from "../../common/components/TextField";
import { Match } from "../../../models/match";
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


export default ({ onSubmit }) => {
  function renderForm(formState, input) {
    // NOTE: Data validation might be added
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
    <Form
      formData={Match.shape()}
      renderForm={renderForm}
      onSubmit={onSubmit} />
  );
}