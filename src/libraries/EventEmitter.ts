import { ReplaySubject } from "rx-lite";
import { Constants } from "../configuration/constants";

/**
 * Implementation of EventEmitter that utilizes the ReactiveX (RxJs) Subject.
 * See more at:
 * https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/eventemitter.md
 */
// tslint:disable:ban-types
export class EventEmitter {
    public subjects: Object;
    public readonly hasOwnProp: any = {}.hasOwnProperty;
    private constructor() {
        this.subjects = {};
    }

    // tslint:disable:no-string-literal
    /**
     * Singleton for the page so we capture all the Observers and Observables in one global array;
     */
    public static getInstance(): EventEmitter {
        if (!window["LmsEventEmitter"]) {
            window["LmsEventEmitter"] = new EventEmitter();
        }
        return window["LmsEventEmitter"];
    }

    /**
     * Emitts (broadcasts) event to Observers (Subscribers).
     * @param type type of event
     * @param data event data
     */
    public emit(fnName: string, data: Object): void {
        if (!this.subjects[fnName]) {
            this.subjects[fnName] = new ReplaySubject(1);
        }
        this.subjects[fnName].onNext(data);
    }

    /**
     * Subscribes for event stream.
     * If the event is broadcasted then handler (method)
     * would be triggered and would receive data from the broadcasted event as method param.
     * @param type type of event
     * @param handler event handler (method)
     */
    public on(fnName: string, handler: any): void {
        if (!this.subjects[fnName]) {
            this.subjects[fnName] = new ReplaySubject(1);
        }
        this.subjects[fnName].subscribe(handler);
    }

    /**
     * Unsubscribes Observer (Subscriber) from event.
     * @param type type of event
     */
    public off(fnName: string): void {
        if (this.subjects[fnName]) {
            this.subjects[fnName].dispose();
            delete this.subjects[fnName];
        }
    }

    /**
     * Not tested.
     */
    public dispose(): void {
        const subjects: Object = this.subjects;
        for (const prop in subjects) {
            if (this.hasOwnProp.call(subjects, prop)) {
                subjects[prop].dispose();
            }
        }
        this.subjects = {};
    }
}
// we need to put this constructor for both broadcaster and receiver
// private readonly eventEmitter: EventEmitter = EventEmitter.getInstance();
// to broadcast
// this._eventEmitter.emit(LmsEventType.Bill, { Items: BillValue } as EventData);
// to receive event
// this._eventEmitter.on(LmsEventType.Bill, this.receivedEvent.bind(this));
// function defined on receiver tsx
// protected receivedEvent(data: EventData): void { }

// tslint:disable:jsdoc-format
/**
 * const singleton = Symbol();
const singletonEnforcer = Symbol()

class SingletonTest {

  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new SingletonTest(singletonEnforcer);
    }
    return this[singleton];
  }
}

export default SingletonTest
 */
