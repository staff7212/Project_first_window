const calcScroll = () => {

    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;


};

function modifyBody(flow, scroll) {
    document.body.style.overflow = flow;
    document.body.style.marginRight = `${scroll}px`;
}

export {calcScroll};
export {modifyBody};