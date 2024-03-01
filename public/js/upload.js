const sendFileForm = document.getElementById('send-file')

sendFileForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const fileInput = document.getElementById('file-input')
    const input = document.querySelector('input[type="file"]')

    const file = fileInput.files[0]
    const formData = new FormData();
    formData.append("file", file);

    if (!file.name.endsWith('.csv')) {
        console.error('Invalid file type. Please select a CSV file.')
        return;
    }

    // const reader = new FileReader()
    // reader.onload = function(e) {
    //     const csvContent = e.target.result
    //     const jsonData = parseCSV(csvContent)
        // Send to API
        // const formData = new FormData(sendFileForm);
        // formData.append('file', file);
        // console.log(formData)
        fetch('http://localhost:3000/transactions/upload', {
            method: 'POST',
            body: formData
            // ,
            // headers: {
            //   'Content-Type': 'multipart/form-data'
            // }
        })
        .then((res) => console.log(res))
        .catch(error => {
            console.error('Erreur lors de l\'envoi du JSON au serveur:', error);
        });
    // }
//     reader.readAsText(file)
});

// function parseCSV(data, delimiter = ';') {
//   const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
//   const cleanTitles = titles.map((title) => title.replace(/"/g, '').trim());
//   return data
//     .slice(data.indexOf('\n') + 1)
//     .split('\n')
//     .map(v => {
//       const values = v.split(delimiter);
//       const cleanValues = values.map((value) => value.replace(/"/g, '').trim());
//       return cleanTitles.reduce(
//         (obj, title, index) => ((obj[title] = cleanValues[index]), obj),
//         {}
//       );
//     });
// };