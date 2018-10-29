import Quill from 'quill';

import './audio.css';

import { BlockEmbed } from 'quill/blots/block';

import { transform } from '@babel/core';

// const BlockEmbed = Quill.import('blots/block/embed');

console.log(BlockEmbed);

class audioBlock extends BlockEmbed {
    // constructor(...args) {
    //     super(...args);

    //     this.constructor = audioBlock;
    //     this.__proto__ = audioBlock.prototype;
    // }

    static create({ src }) {
        const node = BlockEmbed.create.call(this);
        // let audio = document.createElement('audio');
        // node.appendChild(audio);
        node.setAttribute('src', src);
        node.setAttribute('controls', true);
        return node;
    }

    static value(node) {
        return {
            src: node.getAttribute('src'),
        };
    }
}
audioBlock.blotName = 'audio';
audioBlock.tagName = 'AUDIO';

console.log(audioBlock);

class audioModule {
    constructor(quill, options) {
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('audio', () => {
            const url = prompt('Введите адрес аудиозаписи');
            if (url !== null) {
                const range = quill.getSelection(true);
                quill.insertText(range.index, '\n', Quill.sources.USER);
                quill.insertEmbed(range.index + 1, 'audio', { src: url }, Quill.sources.USER);
                quill.setSelection(range.index + 2, Quill.sources.SILENT);
            }
        });
    }
}

function cEr(obj, text) {
    console.error(text);
    console.log(obj);
    console.error(text);
}

cEr(transform(audioBlock).code, 'babelAudio');
cEr(audioBlock, 'Audio');
cEr(transform(BlockEmbed).code, 'babelBlockEmbed');
cEr(BlockEmbed, 'BlockEmbed');

export { audioBlock, audioModule };
