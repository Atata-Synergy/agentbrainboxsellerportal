import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions } from "../../Actions/TransactionAction";
import {
  Table,
  Dropdown,
  IconButton,
  Icon,
  Whisper,
  Button,
  Popover,
  Modal,
} from "rsuite";

const Transaction = (props) => {
  React.useEffect(() => {
    props.getTransactions();
  }, []);
  const { Column, HeaderCell, Cell } = Table;

  return (
    <>
      <Table
        height={400}
        data={props.transactions}
        loading={props.gettingTransactions}
        wordWrap
        // onRowClick={(data) => {
        //   console.log(data);
        // }}
      >
        <Column width={100} align="center" fixed>
          <HeaderCell>Date</HeaderCell>
          <Cell dataKey="created_at" />
        </Column>
        <Column width={200} align="center" fixed>
          <HeaderCell>Yser has Paid</HeaderCell>
          <Cell>
            {(r) => (
              <p>
                {r.payment_confirmed
                  ? "user has made payment"
                  : "Payment not confirmed"}
              </p>
            )}
          </Cell>
        </Column>

        <Column width={200} align="center">
          <HeaderCell>commission on Product</HeaderCell>
          <Cell dataKey="commission_charge" />
        </Column>

        <Column width={200}>
          <HeaderCell>Amount Paid By User</HeaderCell>
          <Cell dataKey="user_paid_amount" />
        </Column>

        <Column width={200}>
          <HeaderCell>Amount to be received</HeaderCell>
          <Cell>
            {(r) => <p>{r.merchant_received_payment ? "True" : "False"}</p>}
          </Cell>
        </Column>

        {/*       <Column width={100} fixed="right">
          <HeaderCell>Action</HeaderCell>

          <Cell>
            {(rowData) => {
              return (
                <Whisper
                  trigger="click"
                  placement={"left"}
                  speaker={<Speaker content={rowData} />}
                >
                  <IconButton appearance="subtle" icon={<Icon icon="more" />} />
                </Whisper>
              );
            }}
          </Cell> 
        </Column>*/}
      </Table>
    </>
  );
};

const mapStateToProps = (state) => ({
  gettingTransactions: state.transaction.gettingTransactions,
  transactions: state.transaction.transactions,
  transactionsErrors: state.transaction.transactionsErrors,
});

const mapDispatchToProps = {
  getTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
