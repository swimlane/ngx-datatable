import {
  Component,
  Input,
  ViewContainerRef,
  ComponentResolver,
  ComponentFactory,
  ComponentMetadata,
  Directive,
  ReflectiveInjector
} from '@angular/core';

export function createComponentFactory(
  resolver: ComponentResolver,
  metadata: ComponentMetadata): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
}

@Directive({ selector: 'dynamic-html-outlet' })
export class DynamicHTMLOutlet {

  @Input() src: string;

  @Input() row: any;
  @Input() cellValue: any;
  @Input() column: any;

  constructor(
    private vcRef: ViewContainerRef,
    private resolver: ComponentResolver) {
  }

  // ngOnChanges() {
  ngAfterViewInit() {
    if (!this.src) return;

    const metadata = new ComponentMetadata({
      selector: 'dynamic-html',
      template: this.src
    });

    createComponentFactory(this.resolver, metadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        let ref = this.vcRef.createComponent(factory, 0, injector, []);

        ref.instance.row = this.row;
        ref.instance.cellValue = this.cellValue;
        ref.instance.column = this.column;
      });
  }
}
