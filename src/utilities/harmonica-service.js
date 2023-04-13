
const baseNotes = [
    'C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#A♭', 'A', 'A#B♭', 'B'
]

const reorderBaseNotesByKey = (key) => {
    const index = baseNotes.indexOf(key)
    const part1 = baseNotes.slice(index)
    const part2 = baseNotes.slice(0, index)
    const result = part1.concat(part2)
    console.log('notes in key of:', key, ' ', result);
    return result
}

const layoutPattern = [2, 1, 3, 4, 6, 5, 6, 7, 9, 8, 10, 11, 2, 1, 12, 1]

const scales = {
    'Major Scale': ['whole', 'whole', 'half', 'whole', 'whole', 'whole', 'half'],
    'Natural Minor Scale': ['whole', 'half', 'whole', 'whole', 'half', 'whole', 'whole',]
}

const noteSteps = [
    { note: 'A', whole: 'B', half: 'A#B♭' },
    { note: 'A#B♭', whole: 'C', half: 'B' },
    { note: 'B', whole: 'C#/D♭', half: 'C' },
    { note: 'C', whole: 'D', half: 'C#/D♭' },
    { note: 'C#/D♭', whole: 'D#/E♭', half: 'D' },
    { note: 'D', whole: 'E', half: 'D#/E♭' },
    { note: 'D#/E♭', whole: 'F', half: 'E' },
    { note: 'E', whole: 'F#/G♭', half: 'F' },
    { note: 'F', whole: 'G', half: 'F#/G♭' },
    { note: 'F#/G♭', whole: 'G#A♭', half: 'G' },
    { note: 'G', whole: 'A', half: 'G#A♭' },
    { note: 'G#A♭', whole: 'A#B♭', half: 'A' },

]


function notesFinder(playKey, scale) {

    let playNotes = [playKey]
    let currentNote = playKey
    console.log("We are going to play in key of:",currentNote)
    for (let i = 0; i < scales[scale].length - 1; i++) {
        let noteStep = noteSteps.find((n) => { return n.note === currentNote })
        console.log("Notestep",noteStep)
        playNotes.push(noteStep[scales[scale][i]])
        currentNote = noteStep[scales[scale][i]]
    }
    console.log(playNotes)
    return playNotes
}




module.exports = {
    baseNotes,
    reorderBaseNotesByKey,
    layoutPattern,
    scales, 
    notesFinder,
    noteSteps
}