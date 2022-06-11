import { Collapse, Card, Divider, Tag } from 'antd'
import Link from 'next/link'

import React from 'react'

const TournireItem = ({ tournire }) => {
  return (
    <Link href={`//tournaments/${tournire._id}`}>
      <Card
        style={{
          width: '90%',
          margin: '0.5rem auto',
          border: '1px dashed black',
          background: '#3f3f3f3f',
          padding: 10
        }}
      >
        <h3>{tournire.name}</h3>
        <Divider orientation="left"><h6>{tournire?.teams.length} Teams:</h6></Divider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '90%',
            margin: '0.5rem auto',
          }}
        >
          {tournire?.teams?.map((i) =>
            <span
              style={{
                margin: '0.25rem',
                border: '3px dashed violet',
                background: '#fcba03'
              }}
              color="magenta"
            >{i}</span>
          )}
        </div>
        <p>Cteate: {tournire.date}</p>
      </Card>
    </Link>
  )
}

export default TournireItem