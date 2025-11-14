import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  template: '' // 👈 Empty template, no UI rendering
})
export class LifecycleDemoComponent implements OnInit, OnChanges, OnDestroy {

  @Input() demoValue: string = '';

  constructor() {
    console.log('✅ Constructor called');
  }

  ngOnInit() {
    console.log('🟢 ngOnInit called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('🔄 ngOnChanges called:', changes);
  }

  ngOnDestroy() {
    console.log('❌ ngOnDestroy called');
  }
}
