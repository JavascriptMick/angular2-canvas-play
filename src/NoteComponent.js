/// <reference path="../typings/angular2/angular2.d.ts" />

import {ComponentAnnotation as Component, bootstrap, ViewAnnotation as View, EventEmitter} from "angular2/angular2";
import Note from "Note";

/**
 * View layer component responsible for rendering the note to the DOM and handling DOM events.
 *
 * @exportedAs NoteComponent
 */
@Component({
    selector: 'my-note',
    events: ['notechanged'],
    properties:{'note': 'note'}
})
@View({
    template: '<textarea #notetext [class-name]="noteClass" (blur)="handleBlur($event, notetext)">{{ note.noteText }}</textarea>'
})
class NoteComponent {
    note: Note;
    notechanged: EventEmitter;  //the local needs to be the same name as the event... stoopid

    constructor() {
      this.note = new Note("Default Note", "yellow");
      this.notechanged = new EventEmitter();
    }

    get noteClass() : string {
      return this.note.colour + '-note'; 
    }

    handleBlur($event, inputElement){
      this.note.noteText = inputElement.value;
      this.notechanged.next('notechanged');
    }
}

export default NoteComponent;
