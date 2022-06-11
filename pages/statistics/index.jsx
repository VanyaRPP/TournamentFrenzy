import React from 'react'
import { Chart } from 'react-charts';

const Statistics = ({ stats }) => {
  const data = stats.data

  const primaryAxis = React.useMemo(
    () => ({
      getValue: datum => datum.date,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: datum => datum.stars,
      },
    ],
    []
  )

  return (
    <div>
      <h1>
        Statistics
      </h1>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>


  )
}

export default Statistics

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/statistics`)
  const stats = await res.json()
  if (!stats) {
    return {
      notFound: true,
    }
  }

  return {
    props: { stats },
  }
}