const checkNumInputs = (selector) => {
    const input = document.querySelectorAll(selector);
    
    input.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};

export default checkNumInputs;