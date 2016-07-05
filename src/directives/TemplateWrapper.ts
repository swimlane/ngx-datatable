import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  EmbeddedViewRef,
  SimpleChange
} from "@angular/core";

@Directive({ selector: '[templateWrapper]' })
export class TemplateWrapper {

  private embeddedViewRef: EmbeddedViewRef<any>;

  @Input() templateWrapper: TemplateRef<any>;
  @Input() value: any;
  @Input() row: any;
  @Input() column: any;

  constructor(private viewContainer: ViewContainerRef) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['templateWrapper']) {
      if (this.embeddedViewRef) {
        this.embeddedViewRef.destroy();
      }

      this.embeddedViewRef = this.viewContainer.createEmbeddedView(
        this.templateWrapper, {
          value: this.value,
          row: this.row,
          column: this.column
        });
    }

    if (this.embeddedViewRef) {
      this.embeddedViewRef.context.value = this.value;
      this.embeddedViewRef.context.row = this.row;
      this.embeddedViewRef.context.column = this.column;
    }
  }
}
