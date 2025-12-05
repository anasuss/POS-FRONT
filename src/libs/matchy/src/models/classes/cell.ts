export class Cell {
  value: string;
  row_index: number;
  col_index: number;

  constructor(value: string, rowIndex: number, colIndex: number) {
    this.value = value;
    this.row_index = rowIndex;
    this.col_index = colIndex;
  }
}
