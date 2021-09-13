const createModal = (options) => {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    
    modal.insertAdjacentHTML('afterbegin', `
    <div class="backdrop">
    <div class="modal-window">
        <form id="form-${options}" class="modal_form">
        <label for="name">Name</label>
        <input type="text" name="name" id="name-${options}">
        <label for="desc">Description</label>
        <input type="text" name="desc" id="desc-${options}">
        <label for="data">Data</label>
        <input type="date" name="date" min="2000-01-01" id="date-${options}">
        <div class="modal_controls">
            <button type="reset" data-close="true">Cancel</button>
            <button id="submit-${options}" type="submit">Add</button>
        </div>
        </form>
    </div>
    </div>
    `)
    document.body.appendChild(modal)
    return modal
}

export const modalWindow = function(options) {
    const modal = createModal(options)
    let closing = false
    
    const mod = {
        open() {
            !closing && modal.classList.add('open');
            this.isOpen = true
        },
        close() {
            closing = true;
            modal.classList.remove('open');
            modal.classList.add('hide');
            setTimeout(() => {
                modal.classList.remove('hide');
                closing = false;
            }, 200)
        }   
    }

    modal.addEventListener('click', event => {
        if(event.target.dataset.close) {
            mod.close()
        }
    })

    return mod
}

