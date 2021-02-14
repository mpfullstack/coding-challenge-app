import * as React from "react";
import MUITextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const TextField = ({ id, label, ...rest }) => {
  return (
    <MUITextField
      id={id}
      label={label}
      variant="outlined"
      {...rest} />
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default TextField;