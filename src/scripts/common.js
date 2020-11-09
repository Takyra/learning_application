'use strict';

const getFormData = require('./getFormData');
const sendData    = require('./sendData');

const authorization = response => {
    if (response.access !== 'allowed') return false;

    const user = document.querySelectorAll('.login');

    for (let i = 0; i < user.length; i++) {
        const login = user[i];
        login.innerHTML = response.userInfo.login;
    }
}

const registration = response => {
    console.log('registration', response);
}

document.addEventListener('DOMContentLoaded', () => {
    const formList = document.querySelectorAll('form');

    for(let i = 0; i < formList.length; i++) {
        const form   = formList[i];
        const action = form.getAttribute('action');
        let callback = null;

        switch(action) {
            case 'authorization':
                callback = authorization;
            break;
            case 'registration':
                callback = registration;
            break;
            default:
                console.error('У формы нет атриута "action".');
            break;
        }

        form.addEventListener('submit', e => {
            e.preventDefault();

            const data = getFormData(form);

            sendData(data, action, callback);
        });
    };

    // Toggle show password
    const showPassButton = document.querySelectorAll('.showPass');

    for (let i = 0; i < showPassButton.length; i++) {
        const button = showPassButton[i];
        button.addEventListener('click', () => {
            const inputs = document.querySelectorAll('input[name="password"]');

            for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                const type  = input.getAttribute('type');
                let newType = 'password';

                if (type === 'password') {
                    newType = 'text';
                } else {
                    newType = 'password';
                }

                input.setAttribute('type', newType);
            };
        });
    };

    // Change language
    const langSelect = document.querySelectorAll('select[name="lang"]');

    for (let i = 0; i < langSelect.length; i++) {
        const select = langSelect[i];

        select.addEventListener('change', e => {
            sendData({lang: e.target.value}, ':lang', (res) => {
                if (res.ok) {
                    window.location.reload();
                }
            });
        });
    }

    // Change color theme
    const themeSelect = document.querySelectorAll('select[name="colorTheme"]');

    for (let i = 0; i < themeSelect.length; i++) {
        const select = themeSelect[i];

        select.addEventListener('change', e => {
            sendData({theme: e.target.value}, ':theme', (res) => {
                if (res.ok) {
                    window.location.reload();
                }
            });
        });
    }
});