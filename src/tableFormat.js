import { TableCell } from 'quill/formats/table';
import Block from 'quill/blots/block';

const ATTRIBUTES = ['data-row', 'colspan', 'rowspan'];

function myFormat() {}
myFormat.prototype = Object.create(TableCell.prototype);

myFormat.formats = function formats(domNode) {
    return ATTRIBUTES.reduce((tableFormats, attribute) => {
        if (domNode.hasAttribute(attribute)) {
            tableFormats[attribute] = domNode.getAttribute(attribute);
        }
        return tableFormats;
    }, {});
};

myFormat.prototype.format = function format(name, value) {
    if (~ATTRIBUTES.indexOf(name)) {
        if (value) {
            this.domNode.setAttribute(name, value);
        } else {
            this.domNode.removeAttribute(name);
        }
    } else {
        Block.format(name, value);
    }
};

myFormat.blotName = TableCell.blotName;
myFormat.tagName = TableCell.tagName;
myFormat.requiredContainer = TableCell.requiredContainer;

export default myFormat;
