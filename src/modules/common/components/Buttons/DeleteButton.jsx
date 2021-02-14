import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "./IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteButton = ({ onClick }) => {
  return <IconButton
    color="primary"
    aria-label="delete"
    onClick={() => typeof onClick === 'function' ? onClick() : null}
  >
    <DeleteIcon />
  </IconButton>;
}

DeleteButton.propTypes = {
  onClick: PropTypes.func
};

export default DeleteButton;