import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Panel } from "rsuite";

const WalletHistory = (props) => {
  const { Column, HeaderCell, Cell } = Table;

  return (
    <div className="container">
      <Panel>
        <Table height={400} data={props.walletHistory.data} wordWrap>
          <Column width={70} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>
          <Column width={150} align="center" fixed>
            <HeaderCell>Date</HeaderCell>
            <Cell dataKey="created_at" />
          </Column>
          <Column width={300} align="center" fixed>
            <HeaderCell>Description</HeaderCell>
            <Cell dataKey="payload" />
          </Column>
          <Column width={150} align="center" fixed>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="remark" />
          </Column>{" "}
        </Table>
        <Table.Pagination
          activePage={props.walletHistory.current_page}
          first
          total={props.walletHistory.total}
          next
          last
        />
      </Panel>
    </div>
  );
};

const mapStateToProps = (state) => ({
  walletHistory: state.wallet.walletHistory,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WalletHistory);
