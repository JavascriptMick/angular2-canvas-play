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
    template: `<textarea 
      #notetext 
      [style.top]="top" 
      [style.left]="left" 
      [class-name]="noteClass" 
      (mousedown)="handleMouseDown($event, notetext)" 
      (mouseup)="handleMouseUp($event, notetext)" 
      (mousemove)="handleMouseMove($event, notetext)" 
      (blur)="handleBlur($event, notetext)">{{ note.noteText }}</textarea>
      `
})
class NoteComponent {
    note: Note;
    notechanged: EventEmitter;  //the local needs to be the same name as the event... stoopid

    constructor() {
      this.note = new Note("Default Note", "yellow");
      this.notechanged = new EventEmitter();

      //default positioning
      this._top = 150;
      this._left = 300;
    }

    get noteClass() : string {
      return this.note.colour + '-note'; 
    }

    handleBlur($event, inputElement){
      this.note.noteText = inputElement.value;
      this.notechanged.next('notechanged');
    }

    //** drag and drop functionality ** (TODO - move into a directive)
    
    //positioning
    _top: number = 10;
    get top(){
      return this._top + 'px';
    }

    _left: number = 10;
    get left(){
      return this._left + 'px';
    }

    //enable dragging of the note with some mathemajiks
    isDragging: boolean;
    _originalClientX: number;
    _originalClientY: number;
    _originalTop: number;
    _originalLeft: number;

    handleMouseDown($event, notetext){
      this.isDragging = true;
      this._originalTop = this._top;
      this._originalLeft = this._left;
      this._originalClientX = $event.clientX;
      this._originalClientY = $event.clientY;
    }
    
    handleMouseMove($event, notetext){
      if(this.isDragging){
        this._left = this._originalLeft + ($event.clientX - this._originalClientX);
        this._top = this._originalTop + ($event.clientY - this._originalClientY);
      }
    }
    
    handleMouseUp($event, notetext){
      this.isDragging = false;
    }
}

export default NoteComponent;
