'use strict';

const getResponse = (data, callback) => {
    if (data === '') {
        console.error('Данные с сервера отсутствуют');

        return false;
    }

    data = JSON.parse(data);

    callback(data);
};

module.exports = (data, page, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', `/${page}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            getResponse(xhr.responseText, callback);
        }
    }
};