import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from '../../lib/airtable';

const favoriteCafeById = async (req, res) => {
  if (req.method === 'PUT') {
    const { id } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = parseInt(record.voting) + parseInt(1);

          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);

          if (updateRecord) {
            const minifiedRecord = getMinifiedRecords(updateRecord);
            res.json(minifiedRecord);
          }
        } else {
          res.status(400);
          res.json({ message: 'Cafe could not be found', id });
        }
      }
    } catch (error) {
      console.error('something went wrong', error);
      res.status(500);
      res.json({ message: 'Error when calling favoriteCafeById', error });
    }
  }
};

export default favoriteCafeById;
