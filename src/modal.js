import Quill from 'quill';

import './modal.css';

const BlockEmbed = Quill.import('blots/block/embed');

export class modalButton extends BlockEmbed {
    static create({ text, id }) {
        const node = super.create();
        node.classList.add('modalButton');
        node.classList.add('btn', 'btn-primary');
        node.textContent = text;
        node.setAttribute('type', 'button');
        node.setAttribute('data-modal', id);
        return node;
    }

    static value(node) {
        return {
            text: node.textContent,
            id: node.getAttribute('data-modal'),
        };
    }
}

modalButton.blotName = 'modal';
modalButton.tagName = 'button';

export class modalModule {
    constructor(quill, options) {
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('modal', () => {
            const text = prompt('Введите текст кнопки');
            if (text !== null) {
                const id = prompt('Введите ID модального окна');
                if (id !== null) {
                    const range = quill.getSelection(true);
                    quill.insertText(range.index, '\n', Quill.sources.USER);
                    quill.insertEmbed(range.index + 1, 'modal', { id, text }, Quill.sources.USER);
                    quill.setSelection(range.index + 2, Quill.sources.SILENT);
                }
            }
        });
    }
}
