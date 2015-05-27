/// <reference path="../typings/angular2/angular2.d.ts" />

import {ComponentAnnotation as Component, bootstrap, ViewAnnotation as View, NgFor} from "angular2/angular2";
import NoteComponent from "NoteComponent";
import NoteService from "NoteService";
import Note from "Note";

/**
 * Top level component responsible for rendering the canvas.
 *
 * bootstrapped from index.html
 */
@Component({
    selector: 'my-canvas',
    appInjector:[NoteService]
})
@View({
    template: `
    <h1>{{ canvasTitle }}</h1>    
    <my-note *ng-for="#note of noteService.list" [note]="note" (notechanged)="handleNoteChange(note)"></my-note>
    <ul><li *ng-for="#anote of noteService.list">{{anote.noteText}}</li></ul>
    `,
    directives: [NoteComponent, NgFor]
})
class CanvasComponent {
    noteService: NoteService;
    canvasTitle: string;

    constructor(_noteService: NoteService) {
        this.noteService = _noteService;
        this.canvasTitle = 'I am a CanvasComponent';
        
        this.noteService.add(new Note('this is the first note', 'red'));
        this.noteService.add(new Note('this is the second note', 'orange'));
        this.noteService.add(new Note('one more note', 'green'));
    }

    handleNoteChange(note){
        this.noteService.update(note);
    }
}

bootstrap(CanvasComponent);
