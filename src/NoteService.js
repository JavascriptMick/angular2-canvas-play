/// <reference path="../typings/angular2/angular2.d.ts" />

import {Injectable} from "angular2/di";
import Note from "Note";

/**
 * Service layer component responsible for encapsulating business logic and orchestrating persistence operations.
 *
 * @exportedAs NoteService
 */
@Injectable()
class NoteService {
  list: List<Note>;

  constructor() {
    this.list = [];
  }

  add(note: Note) {
    this.list.push(note);
    console.log('TODO - add Note to backend store, decorate with id');
  }

  update(note: Note){
    console.log('TODO - Persist Note to backend')
  }

}

export default NoteService;
