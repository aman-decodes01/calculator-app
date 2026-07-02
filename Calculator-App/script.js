let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('.buttons-grid button');
let calculator = document.querySelector('.calculator');
let historyBtn = document.getElementById('history-btn');
let historyContainer = document.getElementById('history-container');
let historyList = document.getElementById('history-list');
let themeToggleBtn = document.getElementById('theme-toggle-btn');

let string = "";
let history = [];
let arr = Array.from(buttons);


function updateHistoryDisplay() {
    historyList.innerHTML = '';
    history.slice(-10).reverse().forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `${item.expression} = <span>${item.result}</span>`;
        li.addEventListener('click', () => {
            string = item.result.toString();
            input.value = string;
            historyContainer.classList.add('history-hidden');
            historyBtn.innerHTML = '⏱️';
        });
        historyList.appendChild(li);
    });
}

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerHTML;

        if (buttonText === '=') {
            try {
                let expression = string;
                let result = eval(string);


                history.push({ expression: expression, result: result });
                updateHistoryDisplay();

                string = result.toString();
                input.value = string;

            } catch (error) {
                input.value = "Error";
                string = "";
            }

        } else if (buttonText === 'AC') {
            string = "";
            input.value = string;

        } else if (buttonText === 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;

        } else {
            string += buttonText;
            input.value = string;
        }
    });
});


historyBtn.addEventListener('click', () => {
    const isHidden = historyContainer.classList.toggle('history-hidden');
    historyBtn.innerHTML = isHidden ? '⏱️' : '❌';
});



themeToggleBtn.addEventListener('click', () => {
    if (calculator.classList.contains('theme-dark')) {
        calculator.classList.remove('theme-dark');
        calculator.classList.add('theme-light');
        themeToggleBtn.innerHTML = '☀️';
        document.body.style.background = 'linear-gradient(45deg, #a6a6a6, #ffffff)';
    } else {
        calculator.classList.remove('theme-light');
        calculator.classList.add('theme-dark');
        themeToggleBtn.innerHTML = '🌙';
        document.body.style.background = 'linear-gradient(45deg, #0a0a0a, #3a4452)';
    }
});
updateHistoryDisplay();

