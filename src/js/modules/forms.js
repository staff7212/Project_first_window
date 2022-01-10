const forms = () => {
    const form = document.querySelectorAll('.form'),
          inputs = document.querySelectorAll('input'),
          phoneInput = document.querySelectorAll('input[name="user_phone"]');

    phoneInput.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
    
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

            postData ('assets/server.php', formData)
            .then(data => {
                console.log(data);
                statusMessage.textContent = message.success;
            }).catch(() => {
                statusMessage.textContent = message.failire;
            }).finally(() => {
                //form.reset();
                clearInput();
                setTimeout(() => {
                    statusMessage.remove();  
                }, 3000);
            });
        });

    }




};

export default forms;

