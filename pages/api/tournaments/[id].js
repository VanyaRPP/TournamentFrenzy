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
        const tournirs = await Tournirm.findById(req.query.id)
        return res.status(200).json({ success: true, data: tournirs })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
    case 'DELETE':
      try {
        const tournire = await Tournirm.findOneAndRemove(req.query.id)
        return res.status(201).json({ success: true, data: tournire })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
  }
}
