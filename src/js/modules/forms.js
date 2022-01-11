import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('.form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]');
    
    checkNumInputs('input[name="user_phone"]');
    
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failire: 'Что-то пошло не так...'
    };

    form.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    };

    const clearInput = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);

            const formData = new FormData(form);
            if (form.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData ('assets/server.php', formData)
            .then(data => {
                console.log(data);
                statusMessage.textContent = message.success;
            }).catch(() => {
                statusMessage.textContent = message.failire;
            }).finally(() => {
                //form.reset();
                clearInput();
                for (let key in state) {
                    if (key == 'width' && key == 'height') {
                        delete state[key];
                    }  
                }
                setTimeout(() => {
                    statusMessage.remove();
                    windows.forEach(item => {
                        item.style.display = 'none';
                    }); 
                }, 3000);
            });
        });

    }




};

export default forms;

