import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectAllForms } from '../store/form/form.selectors';
import { Observable } from 'rxjs';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, NgxEchartsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: {echarts} // Empty object is enough
    }
  ]
})
export class DashboardComponent implements OnInit {
  forms$!: Observable<any[]>;
  totalForms = 0;
  miniForms = 0;
  dynamicForms = 0;

  chartOptions: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.forms$ = this.store.select(selectAllForms);

    this.forms$.subscribe(forms => {
      this.totalForms = forms.length;
      this.miniForms = forms.filter(f => f.name).length;
      this.dynamicForms = forms.filter(f => f.fields).length;

      this.chartOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: { color: '#fff' }
        },
        series: [
          {
            name: 'Forms',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: '#1a1a2e',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside',
              color: '#fff',
              formatter: '{b}: {d}%'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff'
              }
            },
            data: [
              { value: this.miniForms, name: 'Mini Forms' },
              { value: this.dynamicForms, name: 'Dynamic Forms' }
            ]
          }
        ]
      };
    });
  }
}
