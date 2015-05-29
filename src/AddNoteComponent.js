/// <reference path="../typings/angular2/angular2.d.ts" />

import {ComponentAnnotation as Component, bootstrap, ViewAnnotation as View, EventEmitter} from "angular2/angular2";

/**
 * View layer component responsible for rendering the add note button
 *
 * @exportedAs AddNoteComponent
 */
@Component({
    selector: 'add-note',
    events: ['newnote']
})
@View({
    template: `
      <a href="#" class="yellowButton" (click)="handleClick($event, 'yellow')">+</a>
      <a href="#" class="redButton" (click)="handleClick($event, 'red')">+</a>
      <a href="#" class="blueButton" (click)="handleClick($event, 'blue')">+</a>
      <a href="#" class="greenButton" (click)="handleClick($event, 'green')">+</a>
    `
})
class AddNoteComponent {
    newnote: EventEmitter;
    colour: String;

    constructor() {
      this.newnote = new EventEmitter();
    }

    handleClick($event, colour){
      $event.preventDefault();
      //Not sure how to pass extra params in the custom event so fudge for now by setting a prop on the component
      this.colour = colour;
      this.newnote.next();
    }
}

export default AddNoteComponent;
