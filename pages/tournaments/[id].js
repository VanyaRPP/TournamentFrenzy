import { useRouter } from 'next/router'
import BracetsTree from '../../components/BracetsTree'

const Tour = ({ tournirs }) => {
  const router = useRouter()
  const { id } = router.query

  const games = tournirs.data.games.data
  const teams = tournirs.data.teams
  console.log(games);
  return (
    <div>

      <p>Tour: {id}</p>
      <h1>{tournirs.data.name}</h1>
      <p>Date create: {tournirs.data.date}</p>
      {teams.map((t) => <div>{t}</div>)}
      <BracetsTree games={games} />

    </div>
  )
}

export default Tour

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/tournaments/${context.params.id}`)
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