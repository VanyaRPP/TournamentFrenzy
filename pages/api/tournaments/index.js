import dbConnect from "../../../utils/dbConnect";
import Tournirm from '../../../models/tournamentmodel'

async function start() {
  await dbConnect()
}
start()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const tournirs = await Tournirm.find({})
        return res.status(200).json({ success: true, data: tournirs })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const tournire = await Tournirm.create(req.body)
        return res.status(201).json({ success: true, data: tournire })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
      break
    default:
      return res.status(400).json({ success: false })
      break
    case 'DELETE':
      await Tournirm.findOneAndRemove({ _id: req.body._id})
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
