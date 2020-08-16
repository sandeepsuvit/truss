import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';

/**
 * Reference: https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
 *
 * @export
 * @class ConnectorService
 */
@Injectable()
export class ConnectorService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    appendComponentToElement<T>(component: any, componentProps: any, elementId: string): ComponentRef<T> {
        // 1. Create a component reference from the component
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory<T>(component)
            .create(this.injector);

        Object.entries(componentProps).forEach(([key, value]) => {
            (componentRef.instance as any)[key] = value;
        });

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the reference element
        document.getElementById(elementId).appendChild(domElem);

        return componentRef;
    }

    removeComponent<T>(componentRef: ComponentRef<T>) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}