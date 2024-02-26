const sendFileForm = document.getElementById('send-file')

sendFileForm.addEventListener('submit', function(e) {
    //e.preventDefault()

    const fileInput = document.getElementById('file-input')
    const file = fileInput.files[0]

    if (!file.name.endsWith('.csv')) {
        console.error('Invalid file type. Please select a CSV file.')
        return;
    }

    const reader = new FileReader()
    reader.onload = function(e) {
        const csvContent = e.target.result
        const jsonData = parseCSV(csvContent)
        // Send to API
        fetch('http://localhost:3000/transactions', {
            method: 'POST',
            body: JSON.stringify({ data: jsonData }, null, 2),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Erreur lors de l\'envoi du JSON au serveur:', error);
        });
    }
    reader.readAsText(file)
});

function parseCSV(data, delimiter = ';') {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  const cleanTitles = titles.map((title) => title.replace(/"/g, '').trim());
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      const cleanValues = values.map((value) => value.replace(/"/g, '').trim());
      return cleanTitles.reduce(
        (obj, title, index) => ((obj[title] = cleanValues[index]), obj),
        {}
      );
    });
};