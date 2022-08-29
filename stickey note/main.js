const noteContainer = document.getElementById('app');
const addButton = noteContainer.querySelector('.add-note')

getNote().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    noteContainer.insertBefore(noteElement, addButton)
});

addButton.addEventListener('click', ()  => addNote());


function getNote() {
return JSON.parse(localStorage.getItem('stickyNotes-app') || "[]");
 };


 function saveNote(notes) {
localStorage.setItem("stickyNotes-app", JSON.stringify(notes));
 };


 function createNoteElement( id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = 'Enter new note';
     
    element.addEventListener("change", () => {
      updateNote(id, element.value);
    });

    element.addEventListener('dblclick', ()=> {
      const doDelete = confirm('you want to delete your note');
       if (doDelete) {
         deleteNote(id,element)
       }
    })
     

    return element;
 };



function addNote() {
const notes = getNote();
const noteObject ={
    id:Math.floor(Math.random() * 100000),
    content: ""
}

const noteElementa = createNoteElement(noteObject.id, noteObject.content);
noteContainer.insertBefore(noteElementa, addButton)

notes.push(noteObject);
saveNote(notes)

};



function updateNote(id, newContent) {

const notes = getNote();
const targetNote = notes.filter(note => note.id == id) [0];

targetNote.content = newContent;
saveNote(notes)


};

function deleteNote(id, element) {
const notes = getNote().filter(note => note.id != id);

saveNote(notes);
noteContainer.removeChild(element);
};

