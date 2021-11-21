import { findRecordByFilter } from '../../lib/airtable';

const getCafeById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        res.status(200);
        res.json(records);
      } else {
        res.status(400);
        res.json({ message: 'ID could not be found' });
      }
    } else {
      res.status(400);
      res.json({ message: 'ID is missing' });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: 'something went wrong' });
  }
};

export default getCafeById;
