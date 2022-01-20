const chalk = require('chalk')
const fs = require('fs')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('note_store.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(error) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('note_store.json', dataJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    }
    else {
        console.log(chalk.red.inverse('Note title already taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => note.title !== title)

    if (notes.length > remainingNotes.length) {
        saveNotes(remainingNotes)
        console.log(chalk.green('Note removed!'))
    }
    else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const currentNote = notes.find((note) => note.title === title)

    if (currentNote) {
        console.log(chalk.bold(currentNote.title))
        console.log(currentNote.body)
    }
    else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.blue('Your notes:'))

    notes.forEach((note) => console.log(note.title))
}

module.exports = {
    readNote: readNote,
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote
}