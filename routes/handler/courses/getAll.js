const apiAdapter = require('../../apiAdapter');

const { URL_SERVICE_COURSE, HOSTNAME } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const courses = await api.get('/api/courses', {
      params: {
        ...req.query,
        status: 'published',
      },
    });

    const coursesData = courses.data;
    const firstPage = coursesData.data.first_page_url.split('?').pop();
    const lastPage = coursesData.data.last_page_url.split('?').pop();
    // console.log(coursesData.data);

    coursesData.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`;
    coursesData.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`;

    // cek next page url dan prev page url nya keisi atau engga
    if (coursesData.data.next_page_url) {
      const nextPage = coursesData.data.next_page_url.split('?').pop();
      coursesData.data.next_page_url = `${HOSTNAME}/courses?${nextPage}`;
    }

    if (coursesData.data.prev_page_url) {
      const prevPage = coursesData.data.prev_page_url.split('?').pop();
      coursesData.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`;
    }

    // mengubah data url pada path
    coursesData.data.path = `${HOSTNAME}/courses`;

    return res.json(coursesData);
  } catch (error) {
    // console.log(error);
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailabel' });
    }

    const { status, data } = error.response;
    console.log(status, data);
    return res.status(status).json(data);
  }
};

// cara ubah local host dari 8000 ke 3000 ai gateway
// 1 buat HOSTNAME di env samain lokasi nya
// 2 PAnggil di process.env
