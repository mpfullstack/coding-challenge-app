import * as React from "react";
import PropTypes from "prop-types";
import UIDrawer from '@material-ui/core/Drawer';
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const DrawerWrapper = styled(UIDrawer)`
  .MuiPaper-root {
    height: 45vh;
  }
  .content {
    padding: 10px;
  }
`;

const Drawer = ({ title, children, visible, onHide, position = "bottom" }) => {
  return (
      <DrawerWrapper
        anchor={position}
        open={visible}
        onClose={onHide}
      >
        {title ? <Typography>{title}</Typography> : null}
        <div className="content">{children}</div>
    </DrawerWrapper>
  );
}

Drawer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  position: PropTypes.oneOf(["top", "right", "bottom", "left"])
}

export default Drawer;