class DropBoxController {

  constructor() {
    this.btnSendfileEl = document.querySelector('#btn-send-file');
    this.inputFilesEl = document.querySelector('#files');
    this.snackModalEl = document.querySelector('#react-snackbar-root');
    this.initEvents();
  }

  initEvents() {
    console.log('input', this.inputFilesEl);
    
    this.btnSendfileEl.addEventListener('click', event => {
      this.inputFilesEl.click();
    });


    this.inputFilesEl.addEventListener('change', ev => {
      this.uploadTask(ev.target.files)
      this.snackModalEl.style.display = 'block';
    })
  }

  uploadTask(files) {
    console.log('uploadTask -> files coleções', files)
    let promises = [];

    [...files].forEach(file => {

    console.log('DropBoxController -> uploadTask -> file', file);

      promises.push(new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest();

        ajax.open('POST', '/upload');

        ajax.onload = event => {

          try {
            resolve(JSON.parse(ajax.responseText));
          } catch(e) {
            reject(e);
          }

        };

        ajax.onerror = event => {
          reject(event);
        };
        
        let formData = new FormData();
  
        formData.append('input-file', file );
  
        ajax.send(formData);

      }));

    });

    return Promise.all(promises);

  }
}