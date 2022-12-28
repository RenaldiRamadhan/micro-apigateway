const apiAdapter = require('../../apiAdapter');

const { URL_SERVICE_MEDIA } = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const media = await api.post('/media', req.body);
    return res.json(media.data);
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
