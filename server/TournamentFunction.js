import dbConnect, { connectToDatabase } from "../utils/dbConnect";

export async function getTournire(req, res) {
  try {

    let { db } = await connectToDatabase();

    let tournite = await db
      .collection('tournire')
      .find({})
      .sort({ published: -1 })
      .toArray();

    return res.json({
      message: JSON.parse(JSON.stringify(tournite)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
/////////
export async function addTournire(req, res) {
  try {

      // let { db } = await connectToDatabase();

      // await db.collection('tournire').insertOne(JSON.parse(req.body));

      // return res.json({
      //     message: 'tournite added successfully',
      //     success: true,
      // });
      const link = new Link({
        code, to, from, owner: req.user.userID
      })
      await link.save()
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}
/////////
export async function deletePost(req, res) {
  try {
      // Connecting to the database
      let { db } = await connectToDatabase();

      // Deleting the post
      await db.collection('tournire').deleteOne({
          _id: new ObjectId(req.body),
      });

      // returning a message
      return res.json({
          message: 'tournite deleted successfully',
          success: true,
      });
  } catch (error) {

      // returning an error
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}