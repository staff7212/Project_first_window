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
const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector){
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);
        
        function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            //clearTimeout(timerId);
        }

        function closeModal(e) {
            if (e.target === modal || e.currentTarget === close || e.key === "Escape") {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }     
        }

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                openModal();
            });
        });

        close.addEventListener('click', closeModal);
        modal.addEventListener('click', closeModal);
        document.addEventListener('keydown' , closeModal);
    }

    // const timerId = setTimeout(function() {
    //     document.querySelector('.popup').style.display = 'block';
    //     document.body.style.overflow = 'hidden';
    // }, 60000);

   
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');

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