/// <reference path="../typings/angular2/angular2.d.ts" />

import {ComponentAnnotation as Component, bootstrap, ViewAnnotation as View, NgFor} from "angular2/angular2";
import NoteComponent from "NoteComponent";
import AddNoteComponent from "AddNoteComponent";
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
    <add-note #addnote (newnote)="handleNewNote(addnote)"></add-note>
    `,
    directives: [NoteComponent, NgFor, AddNoteComponent]
})
class CanvasComponent {
    noteService: NoteService;
    canvasTitle: string;

    constructor(_noteService: NoteService) {
        this.noteService = _noteService;
        this.canvasTitle = 'Angular2 Canvas Example';
    }

    handleNoteChange(note){
        this.noteService.update(note);
    }

    handleNewNote(addnote){
        this.noteService.add(new Note('', addnote.colour));
    }
}

bootstrap(CanvasComponent);
