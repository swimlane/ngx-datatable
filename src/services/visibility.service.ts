import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class VisibilityService {
    private readonly intersectionObserverSupported: boolean;
    private readonly observersMap = new Map<HTMLElement, IVisibilityObserver>();
    constructor(private readonly zone: NgZone) {
        this.intersectionObserverSupported = 'IntersectionObserver' in window;
    }

    public observe(element: HTMLElement): Observable<boolean> {
        return this.zone.runOutsideAngular(() => {
            if (this.observersMap.has(element)) {
                return this.observersMap.get(element).visibilityChange;
            }
            const observer = this.intersectionObserverSupported ?
                new IntersectionVisibilityObserver(element, this.zone) :
                new OffsetCalculationVisibilityObserver(element, this.zone);
    
            this.observersMap.set(element, observer);
            observer.start();
            return observer.visibilityChange;
        });
    }

    public unobserve(element: HTMLElement): void {
        this.zone.runOutsideAngular(() => {
            if (!this.observersMap.has(element)) {
                return;
            }
            const observer = this.observersMap.get(element);
            observer.stop();
            this.observersMap.delete(element);
        });
    }
}

export interface IVisibilityObserver {
    visibilityChange: Subject<boolean>;
    start(): void;
    stop(): void;
}

export class IntersectionVisibilityObserver implements IVisibilityObserver {
    public readonly visibilityChange: Subject<boolean> = new Subject();
    private intersectionObserver: IntersectionObserver;
    constructor(private readonly element: HTMLElement, private readonly zone: NgZone) {
    }

    public start(): void {
        if (typeof this.intersectionObserver !== 'undefined') {
            return;
        }
        this.intersectionObserver = new IntersectionObserver(
            this.onIntersectionChanged.bind(this),
            {
              threshold: [0],
            });
        this.intersectionObserver.observe(this.element);
    }

    public stop(): void {
        if (typeof this.intersectionObserver === 'undefined') {
            return;
        }
        this.intersectionObserver.unobserve(this.element);
        this.intersectionObserver.disconnect();
        this.intersectionObserver = undefined;
        this.visibilityChange.complete();
    }

    private onIntersectionChanged(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
        this.zone.run(() => {
            let isVisible = false;
            for (const entry of entries) {
            if (entry.intersectionRatio > 0) {
                isVisible = true;
                break;
            }
            }
            this.visibilityChange.next(isVisible);
        });
      }
}

export class OffsetCalculationVisibilityObserver implements IVisibilityObserver {
    public visibilityChange: Subject<boolean> = new Subject();
    private timeout: any;
    constructor(private readonly element: HTMLElement, private readonly zone: NgZone) {

    }

    public start(): void {
        if (this.timeout) {
            return;
        }
        this.runCheck();
    }

    public stop(): void {
        if (!this.timeout) {
            return;
        }
        clearTimeout(this.timeout);
        this.timeout = undefined;
        this.visibilityChange.complete();
    }

    private runCheck(): void {
        const check = () => {
          // https://davidwalsh.name/offsetheight-visibility
          const { offsetHeight, offsetWidth } = this.element;
    
          if (offsetHeight && offsetWidth) {
            clearTimeout(this.timeout);
            this.onVisibilityChange();
          } else {
            clearTimeout(this.timeout);
            this.zone.runOutsideAngular(() => {
              this.timeout = setTimeout(() => check(), 50);
            });
          }
        };
    
        this.timeout = setTimeout(() => check());
      }

    private onVisibilityChange(): void {
        // trigger zone recalc for columns
        this.zone.run(() => {
          this.visibilityChange.next(true);
        });
      }
}
