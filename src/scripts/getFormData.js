'use strict';

module.exports = form => {
    const inputList = form.querySelectorAll('input');
    const result = {};

    for(let i = 0; i < inputList.length; i++) {
        const input = inputList[i];

        if (input.hasAttribute('name')) {
            const name  = input.getAttribute('name');
            const value = input.value;
    
            result[name] = value;
        } else {
            console.error('input не имеет атрибута "name".');
        }
    }

    return result;
};