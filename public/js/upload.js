const sendFileForm = document.getElementById('send-file')

sendFileForm.addEventListener('submit', function(e) {
    //e.preventDefault()

    const fileInput = document.getElementById('file-input')
    const file = fileInput.files[0]
    const formData = new FormData();
    
    formData.append("file", file);

    if (!file.name.endsWith('.csv')) {
        console.error('Invalid file type. Please select a CSV file.')
        return;
    }

    fetch('http://localhost:3000/transactions/upload', {
        method: 'POST',
        body: formData
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi du JSON au serveur:', error);
    });
});