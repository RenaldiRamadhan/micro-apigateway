const apiAdapter = require('../../apiAdapter');

const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    // yang bedain disini sama backtik
    const id = req.params.id;
    const course = await api.get(`/api/courses/${id}`);
    return res.json(course.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailabel' });
    }

    const { status, data } = error.response;
    console.log(status, data);
    return res.status(status).json(data);
  }
};

// variable nya harus beda sama get all, kalo get all mentors kalo ini mentor
