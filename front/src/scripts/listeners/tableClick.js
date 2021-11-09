import { deletePerson, editNumber } from '../api/api'
import { loadTable } from '../dom/loadTable'
import iziToast from 'izitoast'

let addedListener = false

export async function onTableClick(event) {
    if (event.target.classList.contains('delete')) {
        const id = event.target.dataset.id
        const res = await deletePerson(id)
        if (res) {
            iziToast.error({
                title: 'Number',
                message: 'Deleted',
            })
            loadTable()
        }
    }
}

export async function onTableDBLClick(event) {
    if (event.target.classList.contains('number')) {
        if (!addedListener) {
            event.target.setAttribute('contenteditable', 'true')
            event.target.addEventListener('focus', onNumberFocus)
            event.target.focus()
        }
    }
}

function onNumberFocus(event) {
    addedListener = true
    event.target.addEventListener('blur', onNumberBlur)
    event.target.addEventListener('keydown', onEnterKey)
}

function onEnterKey(e) {
    if (e.key === 'Enter') {
        e.target.blur()
    }
}

function onNumberBlur(event) {
    removeAllListener(event.target)
    saveNewData(event.target.nextSibling.dataset.id, event.target.innerText)
}

function removeAllListener(target) {
    addedListener = false
    target.setAttribute('contenteditable', 'false')
    target.removeEventListener('blur', this)
    target.removeEventListener('focus', onNumberFocus)
    target.removeEventListener('keydown', onEnterKey)
}

async function saveNewData(id, number) {
    await editNumber(id, number)
    loadTable()
}
