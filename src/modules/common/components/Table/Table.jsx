import * as React from "react";
import { DataGrid } from '@material-ui/data-grid';

export default ({ rows, cols }) => {
  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid rows={rows} columns={cols} pageSize={20} />
    </div>
  );
}