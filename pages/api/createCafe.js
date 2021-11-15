const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('cafes');
console.log({ table });

const createCafe = async (req, res) => {
  console.log({ req });
  if (req.method === 'POST') {
    try {
      const findCafeRecords = await table
        .select({
          filterByFormula: `id="0"`,
        })
        .firstPage();

      if (findCafeRecords.length !== 0) {
        const records = findCafeRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json(records);
      } else {
        // create record
      }
    } catch (error) {
      console.log({ error });
      res.status(500);
      res.json({ message: 'Error finding cafe - ', err });
    }
  }
};

export default createCafe;
