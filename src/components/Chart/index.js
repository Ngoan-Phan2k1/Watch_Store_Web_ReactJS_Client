//import "./chart.scss";
import PropTypes from 'prop-types';

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell, YAxis, Legend
} from "recharts";
//import useFetch from "../../hooks/useFetch";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    // pv: 2400,
    // amt: 2400,
  },
  {
    name: 'Page B',
    uv: '3000',
    // pv: '1398',
    // amt: '2210',
  },
  {
    name: 'Page C',
    uv: 2000,
    // pv: 9800,
    // amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    // pv: 4300,
    // amt: 2100,
  },
  {
    name: 'Page E',
    uv: 2780,
    // pv: 4300,
    // amt: 2100,
  }
]



const Chart = (props) => {

  const [filterDate] = props;
  console.log(filterDate);

  return(
    <ResponsiveContainer width="100%" aspect={3} >
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={50}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" padding={{right: 10}}/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="uv" fill="#82ca9d"/>

      </BarChart>

    </ResponsiveContainer>


    
  )


};


Chart.propTypes = {
  filterDate: PropTypes.array,
};

export default Chart;
