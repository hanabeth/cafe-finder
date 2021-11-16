import { table, getMinifiedRecords } from '../../lib/airtable';

const createCafe = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, address, neighborhood, imgUrl, voting } = req.body;

    try {
      if (id) {
        const findCafeRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();
        if (findCafeRecords.length !== 0) {
          const records = getMinifiedRecords(findCafeRecords);
          res.json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json(records);
          }
          res.status(400);
          res.json({ message: 'Cafe name is missing' });
        }
      } else {
        res.json({ message: 'Cafe ID is missing' });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: 'Error creating or finding cafe - ', error });
    }
  }
};

export default createCafe;
