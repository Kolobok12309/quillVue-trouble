<template>
  <div id="app">
    <div ref="editor">

    </div>
  </div>
</template>

<script>
import Quill from 'quill';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import './tableStyles.css';

import Table from './table.js';
import TableFormat from './tableFormat.js';
import { audioBlock, audioModule } from './audio.js';
import { modalButton, modalModule } from './modal.js';

Quill.register('modules/table', Table);
Quill.register(audioBlock);
Quill.register('modules/audio', audioModule);
Quill.register(modalButton);
Quill.register('modules/modal', modalModule);

const toolbar = [
    // [{ table: tableOptions }, { table: 'append-row' }, { table: 'append-col' }],
    [{ table: ['insertTable', 'deleteTable', 'deleteColumn', 'deleteRow', 'insertColumnLeft', 'insertColumnRight', 'insertRowAbove', 'insertRowBelow'] }],
    // 'combineColumnLeft', 'combineColumnRight'
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block', 'formula'],

    ['audio', 'modal'],
];

export default {
  name: 'app',
  data() {
    return {
      quill: null,
    }
  },
  mounted() {
    this.quill = new Quill(this.$refs.editor, {
      theme: 'snow',
      modules: {
        audio: {},
        modal: {},
        table: true,
        toolbar,
      }
    })
  }
}
</script>