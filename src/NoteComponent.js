/// <reference path="../typings/angular2/angular2.d.ts" />

import {ComponentAnnotation as Component, bootstrap, ViewAnnotation as View} from "angular2/angular2";
import Note from "Note";

/**
 * View layer component responsible for rendering the note to the DOM and handling DOM events.
 *
 * @exportedAs NoteComponent
 */
@Component({
    selector: 'my-note',
    properties:{'note': 'note'}
})
@View({
    template: '<textarea #notetext [class-name]="noteClass" (blur)="handleBlur($event, notetext)">{{ note.noteText }}</textarea>'
})
class NoteComponent {
    note: Note;

    constructor() {
      this.note = new Note("Default Note", "yellow");
    }

    get noteClass() : string {
      return this.note.colour + '-note'; 
    }

    handleBlur($event, inputElement){
      console.log('blur occur' + inputElement.value);
      this.note.noteText = inputElement.value;
    }
}

export default NoteComponent;
