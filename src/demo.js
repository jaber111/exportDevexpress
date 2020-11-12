import React, { useRef, useCallback } from "react";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  Toolbar,
  ExportPanel
} from "@devexpress/dx-react-grid-bootstrap4";
import saveAs from "file-saver";
import styled from "styled-components";
import { orders } from "./demo-data/orders";

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "DataGrid.xlsx"
    );
  });
};

const columns = [
  { name: "Employee", title: "Employee" },
  { name: "OrderNumber", title: "Invoice Number" },
  { name: "CustomerStoreCity", title: "City" },
  { name: "SaleAmount", title: "Sale Amount" }
];

export default () => {
  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const ExportButton = (props) => (
    <button style={{ color: "green" }} onClick={startExport}>
      walo
    </button>
  );
  const ExportMenu = (props) => <ExportPanel.Menu {...props} visible={false} />;
  return (
    <div className="card">
      <Grid rows={orders} columns={columns}>
        <VirtualTable />
        <TableHeaderRow />
        <Toolbar />
        <ExportPanel
          toggleButtonComponent={ExportButton}
          menuComponent={ExportMenu}
        />
      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={orders}
        columns={columns}
        onSave={onSave}
      />
    </div>
  );
};
