import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import BracetsTree from '../../components/BracetsTree';
import Link from 'next/link';
import { Button } from 'reactstrap';
import TournireItem from '../../components/TournireItem';
import { Empty } from 'antd';


export default withPageAuthRequired(function Tournaments({ tournirs }) {
  return (
    <>
      <div className="mb-5" data-testid="csr">
        <h1 data-testid="csr-title">Tournaments</h1>
        <div data-testid="csr-text">
          <p>
            Tournaments
          </p>
          <Link href='/tournaments/create'><Button>NEW</Button></Link>

          {
            tournirs.data.map((tour) => {
              return (
                <div key={tour._id}>
                  <TournireItem tournire={tour} />
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
});

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/tournaments`)
  const tournirs = await res.json()
  if (!tournirs) {
    return {
      notFound: true,
    }
  }

  return {
    props: { tournirs },
  }
}