const apiAdapter = require('../../apiAdapter');

const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const mentor = await api.post('/api/mentors', req.body);
    return res.json(mentor.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailabel' });
    }

    const { status, data } = error.response;
    console.log(status, data);
    return res.status(status).json(data);
  }
};

// return res.json(media.data); bawaan dari node
