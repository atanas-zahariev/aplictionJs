function lockedProfile() {
    getAllUsers()
    function getAllUsers() {
        let url = `http://localhost:3030/jsonstore/advanced/profiles`;
    
        const main = document.getElementById("main");
        main.replaceChildren();
    
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let result = Object.values(data)
                result.forEach((el, i) => {
                    const { username, email, age } = el;
    
                    const divElementInfo = createElement('div', { class: 'profile' }, undefined, undefined);
    
                    createElement('img', { src: './iconProfile2.png', class: 'userIcon' }, undefined, divElementInfo);
                    createElement('label', undefined, 'Lock', divElementInfo);
                    createElement('input', { type: 'radio', name: `user${i + 1}Locked`, value: 'lock', checked: '' }, undefined, divElementInfo);
                    createElement('label', undefined, 'Unlock', divElementInfo);
                    createElement('input', { type: 'radio', name: `user${i + 1}Locked`, value: 'unlock' }, undefined, divElementInfo);
                    createElement('br', undefined, undefined, divElementInfo);
    
                    const hrForUser = createElement('hr', undefined, undefined, undefined);
    
                    createElement('label', undefined, 'Username', hrForUser);
                    createElement('input', { type: 'text', name: `user${i + 1}Username`, value: `${username}`, disabled: '', readonly: '' }, undefined, hrForUser);
    
                    const divId = createElement('div', { id: `user${i + 1}Username` }, undefined, undefined);
                    divId.style.display = 'none';
    
                    hrForUser.appendChild(divId);
                    divElementInfo.appendChild(hrForUser);
    
                    createElement('label', undefined, 'Email', divId);
                    createElement('input', { type: 'email', name: `user${i + 1}Email`, value: `${email}`, disabled: '', readonly: '' }, undefined, divId);
                    createElement('label', undefined, 'Age:', divId);
                    createElement('input', { type: 'email', name: `user${i + 1}Age`, value: `${age}`, disabled: '', readonly: '' }, undefined, divId)
    
                    const showBtn = createElement('button', undefined, 'Show more', undefined);
                    showBtn.addEventListener('click', onShow)
    
                    divElementInfo.appendChild(showBtn);
    
                    main.appendChild(divElementInfo);
    
                })
            })
    }
    
    function onShow(e) {
        const parent = e.target.parentElement;
    
        const targetDiv = parent.querySelector('div');
    
        const button = parent.querySelector('button');
    
        const target = parent.querySelector('input[value=unlock]');
    
        
        if (target.checked && button.textContent == 'Show more') {
            button.textContent = 'Hide it'
            targetDiv.style.display = 'block'
        }else if(target.checked && button.textContent == 'Hide it'){
            button.textContent = 'Show more'
            targetDiv.style.display = 'none'
        }
    }
    
    function createElement(type, listOfAtribute, text, parent) {
        const element = document.createElement(type);
        if (listOfAtribute) {
            const entries = Object.entries(listOfAtribute)
            for (let [key, value] of entries) {
                element.setAttribute(key, value)
            }
        }
    
        if (text) {
            element.textContent = text;
        }
    
        if (parent) {
            parent.appendChild(element);
            return;
        }
    
        return element;
    }
}
