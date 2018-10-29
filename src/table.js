import Table from 'quill/modules/table';

function toolbarHandler(options) {
    const table = this.quill.getModule('table');
    switch (options) {
        case 'insertTable':
            table.insertTable();
            break;
        case 'deleteTable':
            table.deleteTable();
            break;
        case 'deleteColumn':
            table.deleteColumn();
            break;
        case 'deleteRow':
            table.deleteRow();
            break;
        case 'insertColumnLeft':
            table.insertColumnLeft();
            break;
        case 'insertColumnRight':
            table.insertColumnRight();
            break;
        case 'insertRowAbove':
            table.insertRowAbove();
            break;
        case 'insertRowBelow':
            table.insertRowBelow();
            break;
        case 'combineColumnLeft':
            table.combineColumn(-1);
            break;
        case 'combineColumnRight':
            table.combineColumn(1);
            break;
        case 'combineRow':
            table.combineRow(-1);
            break;
        default:
            table.insertTable();
            break;
    }
}

function myTable(...args) {
    this.quill = args[0];
    const toolbar = this.quill.getModule('toolbar');
    toolbar.addHandler('table', toolbarHandler);
}
myTable.prototype = Object.create(Table.prototype);

myTable.prototype.combineColumn = function combineColumn(side) {
    const range = this.quill.getSelection();
    const [table, row, cell] = this.getTable(range);
    if (cell === null) return;
    const column = cell.cellOffset();
    const deletableColIndex = column + side;
    const colCount = row.children.length;
    if (deletableColIndex < 0 || deletableColIndex >= colCount) return;

    const deletableColumn = row.children.at(deletableColIndex);

    let prevContent;
    let nextContent;
    if (side === -1) {
        prevContent = deletableColumn.domNode.innerHTML;
        nextContent = cell.domNode.innerHTML;
    } else {
        prevContent = cell.domNode.innerHTML;
        nextContent = deletableColumn.domNode.innerHTML;
    }

    const colSpanDeletable = Number(deletableColumn.domNode.getAttribute('colspan')) || 1;
    deletableColumn.remove();

    const colSpanNow = Number(cell.domNode.getAttribute('colspan')) || 1;
    cell.domNode.setAttribute('colspan', colSpanNow + colSpanDeletable);
    cell.domNode.innerHTML = prevContent + nextContent;
};

// myTable.prototype.combineRow = function combineRow(side) {
//     const range = this.quill.getSelection();
//     const [table, row, cell] = this.getTable(range);
//     if (cell === null) return;
//     const column = cell.cellOffset();
//     let deletableRowIndex = row.rowOffset() + side;
//     const rowArr = table.children.at(0);
//     const rowCount = rowArr.children.length;

//     if (deletableRowIndex < 0 || deletableRowIndex >= rowCount) return;

//     if (side === 1) deletableRowIndex--;

//     const deletableCell = rowArr.children.at(deletableRowIndex).children.at(column);
//     const oldContent = cell.domNode.innerHTML;
//     console.log(oldContent);

//     const rowSpanDeletable = Number(deletableCell.domNode.getAttribute('rowspan')) || 1;
//     const rowSpanNow = Number(cell.domNode.getAttribute('rowspan')) || 1;

//     cell.remove();

//     deletableCell.domNode.setAttribute('rowspan', rowSpanNow + rowSpanDeletable);
//     deletableCell.domNode.innerHTML += oldContent;
// };

export default myTable;
