import { fetchCafes } from '../../lib/cafes';

const getCafesByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCafes(latLong, limit);

    res.status(200);
    res.json(response);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Something went wrong. An error occurred: ', error });
  }

  // return
};

export default getCafesByLocation;
