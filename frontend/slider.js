const basisLabel = document.getElementById('Basis');
const basisInput = rangeLabel.children[0];
const jawOpenLabel = document.getElementById('Jaw_open');
const jawOpenInput = rangeLabel.children[0];
const thumbWidth = 6;

basisLabel.insertAdjacentHTML(
    'beforeend',
    `<span class="bubble">${basisInput.value}</span>`
    );

jawOpenLabel.insertAdjacentHTML(
    'beforeend',
    `<span class="bubble">${jawOpenInput.value}</span>`
    );

const rangeBubble = jawOpenLabel.children[1];

function positionBubble(input){
    const {min, max, value} = input;
    const total = Number(max) - Number(min);
    const perc = (Number(value) - Number(min)) / total;
    const offset = (thumbWidth / 2) - (thumbWidth * perc) + 40;

    rangeBubble.style.left = `calc(${perc * 100}% + ${offset}px)`;
    rangeBubble.textContent = value;
}

positionBubble(basisInput);
positionBubble(jawOpenInput);

rangeInput.addEventListener('input', positionBubble)
rangeInput.addEventListener('input', positionBubble)