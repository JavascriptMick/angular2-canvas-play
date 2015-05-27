/**
 * Simple Model object to encapsulate properties of a note.
 *
 * @exportedAs Note
 */
class Note {
  noteText: string;
  colour: string;

  constructor(theNoteText: string, theColour: string) {
    this.noteText = theNoteText;
    this.colour = theColour;
  }
}

export default Note;

