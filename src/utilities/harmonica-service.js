
const baseNotes = [
    'C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#A♭', 'A', 'A#B♭', 'B'
]

const reorderBaseNotesByKey = (key) => {
    const index = baseNotes.indexOf(key)
    const part1 = baseNotes.slice(index)
    const part2 = baseNotes.slice(0, index)
    const result = part1.concat(part2)
    console.log('notes in harmonicas key of:', key, ' ', result);
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
        let noteStep = noteSteps.find((n) =>   n.note === currentNote )
        playNotes.push(noteStep[scales[scale][i]])
        currentNote = noteStep[scales[scale][i]]
    }
    return playNotes
}


function chekBackwards(index, highlightedArr, note) {
    // console.log("check backwards run...")
    if (highlightedArr[index - 2] && highlightedArr[index - 2].note === note) {
        return highlightedArr[index - 2]
    }
    return null
}
function checkAheadPreferred(index, highlightedArr, note, nextNote) {
    let prefferedPositions = [2, 3, 6, 7, 10, 11, 14, 15]
    let pushingToSequence
    for (let i = index + 1; i < index + 3; i++) {
        if (highlightedArr[i] && prefferedPositions.includes(highlightedArr[i].pos) && highlightedArr[i].note === note) {
            pushingToSequence = highlightedArr[i]
        }
    }
    
    console.log("Check ahead returns..", pushingToSequence)
    return pushingToSequence
}


module.exports = {
    baseNotes,
    reorderBaseNotesByKey,
    layoutPattern,
    scales, 
    notesFinder,
    noteSteps, 
    chekBackwards,
    checkAheadPreferred
}