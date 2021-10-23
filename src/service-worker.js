importScripts('./ngsw-worker.js')

self.addEventListener('sync', (event) => {
  if (event.tag == 'post-data') {
    let data = {
        "name": "Labor 5",
        "description": "Labor de Abonamiento",
        "labor_type": "Abonamiento"
    }

    fetch('http://localhost:8000/api/labors/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => Promise.resolve())
      .catch(() => Promise.reject());
    }
})
