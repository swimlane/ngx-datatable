import {
    Component, Input, Output, EventEmitter, ElementRef, OnDestroy, ViewChild, NgZone, HostBinding
  } from '@angular/core';

/**
 * ResizeObserverComponent is used to detect individual div resizes independent from a window resize event
 * The code has been derived from from the original work css-element-queries.
 *
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */

// tslint:disable-next-line
const style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
const styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

@Component({
    selector: '[resizeObserver]',
    template: `
        <ng-content></ng-content>
        <div class="resize-sensor hi2" style="${style}" #resizeSensor>
            <div class="resize-sensor-expand" style="${style}" #expand>
                <div style="${styleChild}" #expandChild></div>
            </div>
            <div class="resize-sensor-shrink" style="${style}" #shrink>
                <div style="${styleChild} width: 200%; height: 200%"></div>
            </div>
        </div>
    `
})
export class ResizeObserverComponent implements OnDestroy {

    @Output() resize: EventEmitter<undefined> = new EventEmitter();

    @Input() set enabled(val: boolean) {
        this._enabled = val;
        if(val) {
            this.attach();
        } else {
            this.detach();
        }
    }
    get enabled(): boolean {
        return this._enabled;
    }

    private resizeElement: HTMLElement;
    
    @ViewChild('expand')
    private set expandRef(val: ElementRef) {
        this.expand = val.nativeElement;
    }

    @ViewChild('expandChild')
    private set expandChildRef(val: ElementRef) {
        this.expandChild = val.nativeElement;
    }

    @ViewChild('shrink')
    private set shrinkRef(val: ElementRef) {
        this.shrink = val.nativeElement;
    }

    @ViewChild('resizeSensor')
    private set resizeSensorRef(val: ElementRef) {
        this.resizeSensor = val.nativeElement;
    }

    private expand: Element;
    private expandChild: HTMLElement;
    private shrink: Element;
    private resizeSensor: HTMLElement;

    private _enabled: boolean = false;
    private onResized: () => void;
    private onScroll: () => void;
    
    constructor(element: ElementRef, private zone: NgZone) {
        this.resizeElement = element.nativeElement;

        let dirty: boolean;
        let rafId: number;
        let newWidth: number;
        let newHeight: number;
        let lastWidth = this.resizeElement.offsetWidth;
        let lastHeight = this.resizeElement.offsetHeight;
        this.onResized = () => {
            rafId = 0;
            
            if (!dirty) return;

            lastWidth = newWidth;
            lastHeight = newHeight;
            this.resize.emit(undefined);
        };
        this.onScroll = () => {
            newWidth = this.resizeElement.offsetWidth;
            newHeight = this.resizeElement.offsetHeight;
            dirty = newWidth !== lastWidth || newHeight !== lastHeight;

            if (dirty && !rafId) {
                rafId = requestAnimationFrame(this.onResized);
            }

            this.reset();
        };
    }

    ngOnDestroy(): void {
        this.detach();
    }

    private attach() {
        if (this.resizeSensor.offsetParent !== this.resizeElement) {
            this.resizeElement.style.position = 'relative';
        }

        this.reset();

        this.expand.addEventListener('scroll', this.onScroll);
        this.shrink.addEventListener('scroll', this.onScroll);
    }

    private detach() {
        this.expand.removeEventListener('scroll', this.onScroll);
        this.shrink.removeEventListener('scroll', this.onScroll);
    }

    private reset() {
        this.expandChild.style.width = '100000px';
        this.expandChild.style.height = '100000px';

        this.expand.scrollLeft = 100000;
        this.expand.scrollTop = 100000;

        this.shrink.scrollLeft = 100000;
        this.shrink.scrollTop = 100000;
    }
}
