import * as React from "react";
import MUIButton from "@material-ui/core/Button";

export default ({ children, ...rest }) => <MUIButton {...rest} variant="contained" color="primary">{children}</MUIButton>;