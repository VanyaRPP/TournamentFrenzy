import { Button } from "antd";
import { Table } from "reactstrap";
import { Tree } from "tournament-bracket-tree"
import { TreeGenerator } from "tournament-bracket-tree"
// import s from './style.module.sass'
import "tournament-bracket-tree/dist/index.css"

import generator from 'tournament-generator';



const BracetsTree = ({ games, clicker }) => {

  const onWin = async (Tname) => {
    console.log('Win', Tname)
    try {
      const url = 'http://localhost:3000/api/statistics'
      const res = await fetch(
        url, {
        method: 'POST',
        body: JSON.stringify({
          "name": Tname,
          "score": 1
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      const json = await res.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>
              HOMETEAM
            </th>

            <th>
              FF
            </th>

            <th>
              AWAYTEAM
            </th>
          </tr>
        </thead>
        {games?.map(({ awayTeam, homeTeam, round }) => <tbody>
          <tr>
            <td>
              {
                clicker !== false ? <Button
                  onClick={() => onWin(homeTeam)}
                >
                  {homeTeam}
                </Button> : homeTeam
              }

            </td>
            <td>
              /\
            </td>
            <td>
              {
                clicker !== false ? <Button
                  onClick={() => onWin(awayTeam)}
                >
                  {awayTeam}
                </Button> : awayTeam
              }
            </td>
          </tr>
        </tbody>)}
      </Table>
    </div>
  )
}

export default BracetsTree



