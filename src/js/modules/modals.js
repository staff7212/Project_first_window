/*const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector){
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);

    }

   
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    showModalByTime('.popup', 3000);

};

export default modals;*/

//мой вариант
////////////////////////////////
const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverflay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              inputs = document.querySelectorAll('input');
        
        function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            //clearTimeout(timerId); //включить про готовности проекта
        }

        function closeModal(e) {
            if ((e.target === modal && closeClickOverflay) || e.currentTarget === close || e.key === "Escape") {
                
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                inputs.forEach(item => {
                    item.value = '';
                });

                for (let key in state) {
                    if (key == 'width' && key == 'height') {
                        delete state[key];
                    }  
                }
                // modal.style.display = 'none';
                document.body.style.overflow = '';
            }     
        }

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                if (modal.classList.contains('popup_calc_profile')) {
                    if (!state.form || !state.width || state.width <= 0 || !state.height || state.height <= 0) {
                        return;
                    }
                }

                if (modal.classList.contains('popup_calc_end')) {
                    if (!state.type || !state.profile) {
                        return;
                    }
                }


                windows.forEach(item => {
                    item.style.display = 'none';
                });
                openModal();
            });
        });

        close.addEventListener('click', closeModal);
        modal.addEventListener('click', closeModal);
        document.addEventListener('keydown', closeModal);
    }
    //по готовности проекта, вызов модального окна через 60 сек
    // const timerId = setTimeout(function() {
    //     document.querySelector('.popup').style.display = 'block';
    //     document.body.style.overflow = 'hidden';
    // }, 60000);

   
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};


export default modals;



//наработки
/*function show() {
    document.querySelector('.popup').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearTimeout(showModalByTime);
}

const showModalByTime = setTimeout(show, 5000);*/





//альтернатива с удалением событий
/*const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) {
 
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);
 
        function triggerHandle(event) {
            if (event.target) {
                event.preventDefault();
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            }
            attachModalEvents();
        }
 
        trigger.forEach(item => {
            item.addEventListener('click', triggerHandle);
        });
 
 
        function closeModal(event) {
            if (event.currentTarget === close || event.target === modal || event.key === "Escape") {
                modal.style.display = "none";
                document.body.style.overflow = "";
                detachModalEvents();
            }
        }
 
        function attachModalEvents() {
            close.addEventListener('click', closeModal);
            modal.addEventListener('click', closeModal);
            document.addEventListener('keydown', closeModal);
        }
 
        function detachModalEvents() {
            close.removeEventListener('click', closeModal);
            modal.removeEventListener('click', closeModal);
            document.removeEventListener('keydown', closeModal);
        }
    }
 
    function showModalByTime(selector, timeout) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
        }, timeout);
    }
 
 
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    // showModalByTime('.popup', 60000); // не забыть включить
 
};*/