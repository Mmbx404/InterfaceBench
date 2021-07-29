import {Component, OnInit} from '@angular/core';
import {Sites} from './controller/models/sites.model';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'UI2';
  fileName = 'Benchmark-R/O.xlsx';
  dateDebut = '01/05/2012';
  dateFin = '31/05/2021';
  buttonValidClass = 'choice btn btn-block btn-sm';
  spanValidClass = 'span-black';
  iconValidClass = 'icon-hidden bi bi-x-circle';
  buttonAwaitClass = 'choice btn btn-block btn-sm';
  spanAwaitClass = 'span-black';
  iconAwaitClass = 'icon-hidden bi bi-x-circle';
  buttonRejectedClass = 'choice btn btn-block btn-sm';
  spanRejectedClass = 'span-black';
  iconRejectedClass = 'icon-hidden bi bi-x-circle';
  Sitess: Array<Sites> = new Array<Sites>();
  mixedSitess: Array<Sites> = new Array<Sites>();
  roActionPrimaireSum = 0;
  roActionSecondaireSum = 0;
  roActionTotalSum = 0;
  selectedOne = 0;
  selectedTwo = 0;
  selectedName: string ;
  changeCssValid() {
    if (this.buttonValidClass === 'choice btn btn-block btn-sm') {
      this.buttonValidClass = 'choice-clicked btn btn-block btn-sm';
      this.spanValidClass = 'span-clicked';
      this.iconValidClass = 'icon-clicked bi bi-x-circle';
    } else {
      this.buttonValidClass = 'choice btn btn-block btn-sm';
      this.spanValidClass = 'span-black';
      this.iconValidClass = 'icon-hidden bi bi-x-circle';
    }
  }
  changeCssAwait() {
    if (this.buttonAwaitClass === 'choice btn btn-block btn-sm') {
      this.buttonAwaitClass = 'choice-clicked btn btn-block btn-sm';
      this.spanAwaitClass = 'span-clicked';
      this.iconAwaitClass = 'icon-clicked  bi bi-x-circle';
    } else {
      this.buttonAwaitClass = 'choice btn btn-block btn-sm';
      this.spanAwaitClass = 'span-black';
      this.iconAwaitClass = 'icon-hidden  bi bi-x-circle';
    }
  }
  changeCssRejected() {
    if (this.buttonRejectedClass === 'choice btn btn-block btn-sm') {
      this.buttonRejectedClass = 'choice-clicked btn btn-block btn-sm';
      this.spanRejectedClass = 'span-clicked';
      this.iconRejectedClass = 'icon-clicked  bi bi-x-circle';
    } else {
      this.buttonRejectedClass = 'choice btn btn-block btn-sm';
      this.spanRejectedClass = 'span-black';
      this.iconRejectedClass = 'icon-hidden  bi bi-x-circle';
    }
  }
  selectTr(i: number, name: string) {
    this.selectedName = name;
    this.selectedOne = this.Sitess.findIndex(value => value.name === this.selectedName) + 1;
    this.selectedTwo = this.mixedSitess.findIndex(value => value.name === this.selectedName) + 1;
  }

  ngOnInit(): void {
    this.selectedName = '';
    this.createArrays();
    this.roActionPrimaireSum = Math.floor(this.roActionPrimaireSum / this.Sitess.length);
    this.roActionSecondaireSum = Math.floor(this.roActionSecondaireSum / this.Sitess.length);
    this.roActionTotalSum = Math.floor(this.roActionTotalSum / this.Sitess.length);
  }
  createArrays() {
    this.Sitess.push(new Sites(1, 'MA-Cns', 50, 90, 0),
      new Sites(2, 'CIV-ABID', 90, 80, 0),
      new Sites(3, 'MA-Oujda', 80, 70, 0),
      new Sites(4, 'MU-PHX', 40, 50, 0),
      new Sites(5, 'FR-Boigny', 70, 20, 0),
      new Sites(6, 'MG-TANA', 60, 10, 0));
    this.Sitess.forEach((s) => {
      s.roTotal = (s.roActionSecondaire + s.roActionPrimaire) / 2;
      this.roActionPrimaireSum = this.roActionPrimaireSum + s.roActionPrimaire;
      this.roActionSecondaireSum = this.roActionSecondaireSum + s.roActionSecondaire;
      this.roActionTotalSum = this.roActionTotalSum + s.roTotal;
    });
    this.mixedSitess.push(new Sites(1, 'MA-Cns', 50, 90, 0),
      new Sites(2, 'CIV-ABID', 90, 80, 0),
      new Sites(3, 'MA-Oujda', 80, 70, 0),
      new Sites(4, 'MU-PHX', 40, 50, 0),
      new Sites(5, 'FR-Boigny', 70, 20, 0),
      new Sites(6, 'MG-TANA', 60, 10, 0));
    this.mixedSitess.forEach((s) => {
      s.roTotal = (s.roActionSecondaire + s.roActionPrimaire) / 2;
    });
    this.mixedSitess.sort((a, b) => {
      if (a.roActionSecondaire > b.roActionSecondaire) {
        return 1;
      }
      if (a.roActionSecondaire < b.roActionSecondaire) {
        return -1;
      }
      return 0;
    });
    console.log(this.Sitess);
    console.log(this.mixedSitess);
  }

  exportExcel(): void {
    const table1: HTMLElement = document.getElementById('excel-table1');
    const table2: HTMLElement = document.getElementById('excel-table2');
    const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table1);
    const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table2);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'RO Corporate');
    XLSX.utils.book_append_sheet(wb, ws2, 'RO Site');
    XLSX.writeFile(wb, this.fileName);
  }
}
