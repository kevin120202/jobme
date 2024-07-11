import React from 'react'
import { useState } from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer'
import BarChartComponent from './BarChart'
import AreaChartComponent from './AreaChart'

export default function ChartsContainer({ data }) {
    const [barChart, setBarChart] = useState(true)


    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button onClick={() => setBarChart(!barChart)}>
                {barChart ? "Area Chart" : "Bar Chart"}
            </button>
            {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
        </Wrapper>
    )
}
