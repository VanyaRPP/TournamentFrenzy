import { Table } from "reactstrap";
import React from 'react'
import { Chart } from 'react-charts';

const Statistics = ({ stats }) => {

  const data = stats.data
  // console.log('tdty',
  //   data.sort(
  //     (a, b) => (a.score > b.score) ? 1 : -1
  //   )
  // )
  return (
    <div>
      <h1>
        Statistics
      </h1>
      <Table responsive>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Score
            </th>
          </tr>
        </thead>
        {
          data.sort(
            (a, b) => (a.score > b.score) ? 1 : -1
          ).reverse().map(({ name, score }) =>
            <tbody>
              <tr>
                <td>
                  {name}
                </td>
                <td>
                  {score}
                </td>
              </tr>
            </tbody>
          )
        }
      </Table>
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