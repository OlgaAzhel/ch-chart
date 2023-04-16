
export const baseNotes = [
    'C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#A♭', 'A', 'A#B♭', 'B'
]

export const reorderBaseNotesByKey = (key) => {
    const index = baseNotes.indexOf(key)
    const part1 = baseNotes.slice(index)
    const part2 = baseNotes.slice(0, index)
    const result = part1.concat(part2)
    // console.log('notes in harmonicas key of:', key, ' ', result);
    return result
}

export const layoutPattern = [2, 1, 3, 4, 6, 5, 6, 7, 9, 8, 10, 11, 2, 1, 12, 1]

export const scales = {
    'Major Scale': ['whole', 'whole', 'half', 'whole', 'whole', 'whole', 'half'],
    'Natural Minor Scale': ['whole', 'half', 'whole', 'whole', 'half', 'whole', 'whole',]
}

export const noteSteps = [
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


export function notesFinder(playKey, scale) {

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

export function chekBackwards(index, highlightedArr, note) {
    // console.log("check backwards run...")
    if (highlightedArr[index - 2] && highlightedArr[index - 2].note === note) {
        return highlightedArr[index - 2]
    }
    return null
}


export function checkAheadPreferred(index, highlightedArr, note, nextNote) {
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


export const prefferedPositions = [2, 3, 6, 7, 10, 11, 14, 15]


export const resultSequenceFinder = (notesInPlay, highlighted, noteSequence = [], order = 0, blocksQty) => {
    
    for (let i = 0; i < highlighted.length; i++) {
        console.log("looking for note:", notesInPlay[order], "at ", highlighted[i].note)
        // if (notesInPlay[order] === 'G#A♭' && notesInPlay[order-1] === 'G' ) {
        //     noteSequence.push(highlighted[i-2])
        //     order++
        // }
        if (highlighted[i].note === notesInPlay[order]) {

            if (!prefferedPositions.includes(highlighted[i].pos) && checkAheadPreferred(i, highlighted, notesInPlay[order], notesInPlay[order + 1])) {

                noteSequence.push(checkAheadPreferred(i, highlighted, notesInPlay[order], notesInPlay[order + 1]))

                order++
            } else {
                noteSequence.push(highlighted[i])

                order++
            }
        }
        if (chekBackwards(i, highlighted, notesInPlay[order])) {
            noteSequence.push(chekBackwards(i, highlighted, notesInPlay[order]))

            i = i - 1
            order++
        }

    }


    console.log("Note sequence", noteSequence)
    // repeat sequence blocksQty times:

    console.log("EXTENDED BEFORE ADDING NEXT BLOCKS",[...noteSequence] )


    let extendedSequenceFinder = (seq) => {
        let newSeq = []
        for (let i = 1; i < blocksQty; i++) {
            seq.forEach(note => {
                let newBlock = note.block + i
                let newNoteEl = { 'note': note.note, 'block': newBlock, 'pos': note.pos }
                console.log("Pushing into extended sequence",newSeq, newNoteEl)
                newSeq.push(newNoteEl)
            })
        }
        console.log("Full sequence AFTER:", seq.concat(newSeq))
        return seq.concat(newSeq)
    }



    const extendedSequence = extendedSequenceFinder(noteSequence)
    
    return extendedSequence
}