import {calcScroll, modifyBody} from './calcScroll';

const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverflay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              inputs = document.querySelectorAll('input'),
              scroll = calcScroll();
        
        function openModal() {
            modal.style.display = 'block';
            modifyBody('hidden', scroll);
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
                
                modifyBody('', scroll);
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
