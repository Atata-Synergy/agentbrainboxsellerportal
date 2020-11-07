import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'rsuite';

const StatisticCard = props => {
    return (
      <Panel {...props} bordered header="Card title">
        <Paragraph />
      </Panel>
    );
}

StatisticCard.propTypes = {

}

export default StatisticCard
