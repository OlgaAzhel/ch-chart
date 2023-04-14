import './HarmonicaChart.css'
import { useState } from "react";
import * as harmonicaService from '../../utilities/harmonica-service'




export default function HarmonicaChart() {
    const [scale, setScale] = useState('Major Scale')
    const [playKey, setPlayKey] = useState('C')
    const [harmonicaKey, setHarmonicaKey] = useState('C')
    const [playNotes, setPlayNotes] = useState(harmonicaService.notesFinder(playKey, scale))
    const notes = harmonicaService.reorderBaseNotesByKey(harmonicaKey)


    function harmonicaKeyChange(evt) {
        const newHarmonicaKey = evt.target.value
        setHarmonicaKey(newHarmonicaKey)
    }
    function playScaleChange(evt) {
        const newScale = evt.target.value
        setScale(newScale)
        setPlayNotes(harmonicaService.notesFinder(playKey, newScale))
    }
    function playKeyChange(evt) {
        const newPlayKey = evt.target.value
        setPlayKey(newPlayKey)
        setPlayNotes(harmonicaService.notesFinder(newPlayKey, scale))
    }


    console.log("THESE ARE PLAY NOTES", playNotes)


    let currentHarmonicaPattern = harmonicaService.layoutPattern.concat(harmonicaService.layoutPattern).concat(harmonicaService.layoutPattern)
    let fullPattern = currentHarmonicaPattern.map((el, idx) => {
        return notes[el - 1]
    })

    let currentFullNotesLayout = []
    fullPattern.map((i, idx) => {
        if (idx <= 15) {
            currentFullNotesLayout.push({ 'note': i, 'block': 1, 'pos': idx + 1 })
        } else if (idx > 15 && idx < 32) {
            currentFullNotesLayout.push({ 'note': i, 'block': 2, 'pos': idx - 16 + 1 })
        } else {
            currentFullNotesLayout.push({ 'note': i, 'block': 3, 'pos': idx - 32 + 1 })
        }
    })

    let currentHighlighted = currentFullNotesLayout.filter(note => {
        return playNotes.includes(note.note)
    })

    console.log("ALL HIGHLIGHTED:", currentHighlighted)
    console.log("ALL NOTES SEQUENCE WE PLAY IN KEY OF:", playNotes[0], playNotes)

    let prefferedPositions = [2, 3, 6, 7, 10, 11, 14, 15]


    function resultSequenceFinder(notesInPlay, highlighted, noteSequence = [], order = 0, blocksQty) {


        for (let i = 0; i < highlighted.length; i++) {
            console.log("looking for note:", notesInPlay[order], "at ", highlighted[i].note)
            if (highlighted[i].note === notesInPlay[order]) {

                if (!prefferedPositions.includes(highlighted[i].pos) && harmonicaService.checkAheadPreferred(i, highlighted, notesInPlay[order], notesInPlay[order + 1])) {

                    noteSequence.push(harmonicaService.checkAheadPreferred(i, highlighted, notesInPlay[order], notesInPlay[order + 1]))
                    console.log("push from preffered..")
                    order++
                } else {
                    noteSequence.push(highlighted[i])
                    order++
                }
            }
            if (harmonicaService.chekBackwards(i, highlighted, notesInPlay[order])) {
                noteSequence.push(harmonicaService.chekBackwards(i, highlighted, notesInPlay[order]))
                i = i - 1
                order++
            }

        }



        // repeat sequence blocksQty times:
        let extendedSequence = [...noteSequence]
        console.log(extendedSequence)
        for (let i = 1; i < blocksQty; i++) {
            noteSequence.forEach(note => {
                let newNoteEl = { 'note': note.note, 'block': i + 1, 'pos': note.pos }
                extendedSequence.push(newNoteEl)
            })
        }
        return extendedSequence
    }




let resultSequence = resultSequenceFinder(playNotes, currentHighlighted, [], 0, 3)
console.log("Note Sequence:", resultSequence)






return (
    <>
        <p>THIS IS YOUR HARMONICA NOTES LAYOUT</p>
        <section id="settings">
            <div className="setting">
                <label>Harmonica key:</label>
                <select name="harmonica-key"
                    onChange={harmonicaKeyChange}
                    value={harmonicaKey}

                >
                    {
                        harmonicaService.baseNotes.map((note, idx) => {
                            return <option key={idx}>{note}</option>
                        })
                    }
                </select>
            </div>
            <div className="setting">
                <label>Scale:</label>
                <select name="play-scale"
                    onChange={playScaleChange}
                    value={scale}

                >
                    {
                        Object.keys(harmonicaService.scales).map((s, idx) => {
                            return <option key={idx}>{s}</option>
                        })
                    }
                </select>
            </div>
            <div className="setting">
                <label>Play Key:</label>
                <select name="play-key"
                    onChange={playKeyChange}
                    value={playKey}

                >

                    {
                        harmonicaService.baseNotes.map((k, idx) => {
                            return <option key={idx}>{k}</option>
                        })
                    }
                </select>
            </div>
        </section>
        <h4>{playNotes.map(n => <span className="note-span">{n}</span>)}</h4>
        <section id="layout">

            <div id='chart'>

                {
                    harmonicaService.layoutPattern.map((i, idx) => {


                        return <>
                            {playNotes.includes(notes[i - 1]) && <div
                                className="highlighted"
                                key={idx}
                                id={`1${idx + 1}`}
                            >
                                {
                                    resultSequence.find((el, index) => {
                                        return el.note === notes[i - 1] && el.pos === idx + 1 && index !== 0 && el.block === 1
                                    })

                                    && <span
                                        className='note'>
                                        🔹
                                    </span>
                                }
                                {
                                    resultSequence.find((el, index) => {
                                        return el.note === notes[i - 1] && el.pos === idx + 1 && index === 0 && el.block === 1
                                    })

                                    && <span
                                        className='note'>
                                        🔸
                                    </span>
                                }

                                {notes[i - 1]}
                            </div>
                            }

                            {!playNotes.includes(notes[i - 1]) && <div
                                key={idx}>
                                {notes[i - 1]}
                            </div>
                            }
                        </>
                    })
                }

            </div>
            <div id='chart'>

                {
                    harmonicaService.layoutPattern.map((i, idx) => {

                        return <>
                            {playNotes.includes(notes[i - 1]) && <div
                                className="highlighted"
                                key={idx}
                                id={`2${idx + 1}`}
                            >
                                {
                                    resultSequence.find((el, index) => {
                                        return el.note === notes[i - 1] && el.pos === idx + 1 && index !== resultSequence.length / 3 && el.block === 2
                                    })

                                    && <span
                                        className='note'>
                                        🔹
                                    </span>
                                }
                                {
                                    resultSequence.find((el, index) => {

                                        return el.note === notes[i - 1] && el.pos === idx + 1 && index === resultSequence.length / 3 && el.block === 2
                                    })

                                    && <span
                                        className='note'>
                                        🔸
                                    </span>
                                }

                                {notes[i - 1]}
                            </div>
                            }

                            {!playNotes.includes(notes[i - 1]) && <div
                                key={idx}>
                                {notes[i - 1]}
                            </div>
                            }
                        </>
                    })
                }

            </div>
            <div id='chart'>

                {
                    harmonicaService.layoutPattern.map((i, idx) => {

                        return <>
                            {playNotes.includes(notes[i - 1]) && <div
                                className="highlighted"
                                key={idx}
                                id={`3${idx + 1}`}
                            >
                                {
                                    resultSequence.find((el, index) => {

                                        return el.note === notes[i - 1] && el.pos === idx + 1 && index !== resultSequence.length / 3 * 2 && el.block === 3
                                    })

                                    && <span
                                        className='note'>
                                        🔹
                                    </span>
                                }
                                {
                                    resultSequence.find((el, index) => {
                                        return el.note === notes[i - 1] && el.pos === idx + 1 && index === resultSequence.length / 3 * 2 && el.block === 3
                                    })

                                    && <span
                                        className='note'>
                                        🔸
                                    </span>
                                }

                                {notes[i - 1]}
                            </div>
                            }

                            {!playNotes.includes(notes[i - 1]) && <div
                                key={idx}>
                                {notes[i - 1]}
                            </div>
                            }
                        </>
                    })
                }


            </div>
        </section>
    </>
)
}

