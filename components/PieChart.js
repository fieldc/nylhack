/**
 * Created by chris on 10/13/16.
 */

import React from 'react';
import rd3 from 'rd3';

var PieChart = rd3.PieChart;
var pieData = [{label: 'ltc', value: 20.0}, {label: 'life', value: 55.0}, {label: 'annuity', value: 25.0}];

var Chart = React.createClass({
  render: function() {
    return (
      <PieChart
        data={pieData}
        width={275}
        height={250}
        radius={75}
        innerRadius={40}
        sectorBorderColor='white'
        title='Product Mix' />
    );
  }
});

export default Chart;
