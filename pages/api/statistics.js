import dbConnect from "../../utils/dbConnect"
import Team from '../../models/teamsmodel'

async function start() {
  await dbConnect()
}
start()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const teams = await Team.find({})
        return res.status(200).json({ success: true, data: teams })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const maybeteam = await Team.findOne({ name: req.body.name }).exec()
        console.log(req.body.name, '--------', maybeteam)
        let team
        !maybeteam ? team = await Team.create(req.body) : team = await Team.updateOne({ name: req.body.name }, { $set: { score: maybeteam.score + 1 } })
        return res.status(201).json({ success: true, data: team })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
    default:
      return res.status(400).json({ success: false })
    case 'DELETE':
      await Tournirm.findOneAndRemove({ _id: req.body._id })
        .then((Tournirm) => {
          if (!Tournirm) {
            res.status(400).send(req.params.Tournirm + ' was not found');
          } else {
            res.status(200).send(req.params.Tournirm + ' was deleted.');
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
        })
  }
}
