import { findRecordByFilter, getMinifiedRecords } from '../../lib/airtable';

const getCafeById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: 'ID could not be found' });
      }
    } else {
      res.state(400);
      res.json({ message: 'ID is missing' });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: 'something went wrong' });
    console.log({ error });
  }
};

export default getCafeById;
