import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifecycle-demo.html',
  styleUrls: ['./lifecycle-demo.css']
})
export class LifecycleDemoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() demoValue: string = '';

  logs: string[] = [];

  constructor() {
    console.log('✅ Constructor called');
    this.logs.push('Constructor called');
  }

  ngOnInit() {
    console.log('🚀 ngOnInit called — Component Initialized');
    this.logs.push('ngOnInit called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('🌀 ngOnChanges called — Input changed:', changes);
    this.logs.push('ngOnChanges called: ' + JSON.stringify(changes));
  }

  ngOnDestroy() {
    console.log('💥 ngOnDestroy called — Component Destroyed');
    this.logs.push('ngOnDestroy called');
  }
}
