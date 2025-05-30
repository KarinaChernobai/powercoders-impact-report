document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.getElementById('editForm');
    const previewBtn = document.querySelector('.preview-btn');
    const saveBtn = document.querySelector('.save-btn');

    function formatText(text) {
        text = text.replace(/(\d+%|\d+)(?=\s|$)/g, '<span class="red__highlight2">$1</span>');
        
        text = text.replace(/NEW/g, '<span class="red__highlight2">NEW</span>');
        
        text = text.replace(/\n/g, '<br>');
        
        return text;
    }

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {

                    let preview = input.parentElement.querySelector('img');
                    if (!preview) {
                        preview = document.createElement('img');
                        input.parentElement.appendChild(preview);
                    }
                    preview.src = e.target.result;
                    preview.style.maxWidth = '200px';
                    preview.style.marginTop = '10px';
                    preview.style.borderRadius = '4px';
                };
                reader.readAsDataURL(file);
            }
        });
    });

    previewBtn.addEventListener('click', () => {
        const formData = new FormData(editForm);
        const previewData = {};
        
        for (let [key, value] of formData.entries()) {
            if (key.endsWith('Image')) {
                const fileInput = document.getElementById(key);
                if (fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        previewData[key] = e.target.result;

                        localStorage.setItem('previewData', JSON.stringify(previewData));

                        window.open('impact.html?preview=true', '_blank');
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }
            } else {

                previewData[key] = formatText(value);
            }
        }

        if (!Object.keys(previewData).some(key => key.endsWith('Image'))) {
            localStorage.setItem('previewData', JSON.stringify(previewData));
            window.open('impact.html?preview=true', '_blank');
        }
    });

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(editForm);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key.endsWith('Image')) {
                const fileInput = document.getElementById(key);
                if (fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        data[key] = e.target.result;

                        localStorage.setItem('previewData', JSON.stringify(data));
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }
            } else {
                if (typeof(value) === 'string') {
                    data[key] = formatText(value);
                } else {
                    console.error(value);
                }
            }
        }

        try {
           
            alert('Changes saved successfully!');
            
            localStorage.setItem('previewData', JSON.stringify(data));

            // var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
            // var dlAnchorElem = document.getElementById('downloadAnchorElem');
            // dlAnchorElem.setAttribute("href",     dataStr     );
            // dlAnchorElem.setAttribute("download", "scene.json");
            // dlAnchorElem.click();
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes. Please try again.');
        }
    });

    const savedData = localStorage.getItem('previewData');
    if (savedData) {
        const data = JSON.parse(savedData);
        for (let [key, value] of Object.entries(data)) {
            const input = document.getElementById(key);
            if (input) {
                if (key.endsWith('Image')) {
                  
                    const fileInput = input;
                    const preview = document.createElement('img');
                    preview.src = value;
                    preview.style.maxWidth = '200px';
                    preview.style.marginTop = '10px';
                    preview.style.borderRadius = '4px';
                    fileInput.parentElement.appendChild(preview);
                } else {

                    input.value = value.replace(/<[^>]*>/g, '').replace(/<br>/g, '\n');
                }
            }
        }
    }
}); 