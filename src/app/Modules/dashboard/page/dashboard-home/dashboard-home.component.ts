import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.scss']
})
export class DashboardHomeComponent implements OnInit {

  data: any
  options: any

  constructor() {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      datasets: [
          {
              data: [540, 325, 702, 100, 10, 4000, 3450],
              backgroundColor: [
                documentStyle.getPropertyValue('--blue-500'),
                documentStyle.getPropertyValue('--yellow-500'),
                documentStyle.getPropertyValue('--green-500'),
                documentStyle.getPropertyValue('--red-500'),
                documentStyle.getPropertyValue('--purple-500'),
                documentStyle.getPropertyValue('--pink-500'),
                documentStyle.getPropertyValue('--gray-500'),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue('--blue-400'),
                documentStyle.getPropertyValue('--yellow-400'),
                documentStyle.getPropertyValue('--green-400'),
                documentStyle.getPropertyValue('--red-500'),
                documentStyle.getPropertyValue('--purple-500'),
                documentStyle.getPropertyValue('--pink-500'),
                documentStyle.getPropertyValue('--gray-500'),
              ]
          }
      ]
    };

    this.options = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor
              }
          }
      }
  };
  }
}
