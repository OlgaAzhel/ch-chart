import './HarmonicaChart.css'
import { useState } from "react";
import { baseNotes, layoutPattern, notesFinder, reorderBaseNotesByKey, resultSequenceFinder, scales } from '../../utilities/harmonica-service'
import Xarrow from "react-xarrows";
import Selection from './Selection';
import CurrentKeyNotes from './CurrentKeyNotes';
import { Layout } from './Layout';



export default function HarmonicaChart() {
    const [scale, setScale] = useState(localStorage.getItem('scale') || 'Major Scale')
    const [playKey, setPlayKey] = useState(localStorage.getItem('playKey') || 'C')
    const [harmonicaKey, setHarmonicaKey] = useState(localStorage.getItem('harmonicaKey') || 'C')
    const [playNotes, setPlayNotes] = useState(notesFinder(playKey, scale))
    const notes = reorderBaseNotesByKey(harmonicaKey)


    function harmonicaKeyChange(evt) {
        const newHarmonicaKey = evt.target.value
        setHarmonicaKey(newHarmonicaKey)
        localStorage.setItem('harmonicaKey', newHarmonicaKey);
    }
    function playScaleChange(evt) {
        const newScale = evt.target.value
        setScale(newScale)
        setHarmonicaKey(harmonicaKey)
        setPlayNotes(notesFinder(playKey, newScale))
        localStorage.setItem('scale', newScale);
    }
    function playKeyChange(evt) {
        const newPlayKey = evt.target.value
        setPlayKey(newPlayKey)
        setPlayNotes(notesFinder(newPlayKey, scale))
        localStorage.setItem('playKey', newPlayKey);
    }
    const blockQty = 3

    console.log("THESE ARE PLAY NOTES", playNotes)


    let currentHarmonicaPattern = layoutPattern.concat(layoutPattern).concat(layoutPattern)
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

    // console.log("ALL HIGHLIGHTED:", currentHighlighted)
    // console.log("ALL NOTES SEQUENCE WE PLAY IN KEY OF:", playNotes[0], playNotes)


    let resultSequence = resultSequenceFinder(playNotes, currentHighlighted, [], 0, blockQty)

    // console.log("Layout pattern:", layoutPattern.length)


    let notesLayout = []
    for (let block = 1; block <= blockQty; block++) {
        layoutPattern.forEach((i, idx) => {
            let newNoteObj = { 'note': notes[i - 1], 'block': block, 'pos': idx + 1 }
            let sequenceIdx = resultSequence.findIndex(el => {
       
                return el.note === newNoteObj.note && el.block === newNoteObj.block && el.pos === newNoteObj.pos
            })
            if (sequenceIdx > - 1) {
                newNoteObj.id = sequenceIdx
            }

            notesLayout.push(newNoteObj)
        })
        // console.log("This is notes layout:",notesLayout)
    }




    return (
        <>
            <div className="d-flex mt-5 justify-content-center">
                <h5>Choose your harmonica settings and scale/key you would like to play:</h5>
            </div>

            <section id="settings">
                <Selection
                    label='Harmonica key'
                    value={harmonicaKey}
                    onSelect={harmonicaKeyChange}
                    options={baseNotes}
                />

                <Selection 
                    label='Scale' 
                    value={scale}
                    onSelect={playScaleChange}
                    options={Object.keys(scales)}
                    />

                <Selection
                    label='Play Key'
                    value={playKey}
                    onSelect={playKeyChange}
                    options={baseNotes}
                />
                
            </section>

            <div className='d-flex justify-content-center'>  
                <CurrentKeyNotes playNotes={playNotes} />
            </div>

            <section className="layout">

                <div className='chart'>

                    {
                        notesLayout.slice(0, 16).map((i, idx) => {


                            return <div key={'lay'+ idx}>
                                {playNotes.includes(i.note) && <div
                                    className="cell highlighted"
                                    key={idx}

                                >
                                    {i.note}
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === i.note && el.pos === idx + 1 && index !== 0 && el.block === 1
                                        })

                                        && <span
                                            className='note'
                                            key={'span' + idx}
                                            id={i.id}>
                                                {notesLayout.find((e)=>{ return e.id === i.id + 1}) && <Xarrow
                                                start={i.id.toString()}
                                                end={(i.id + 1).toString()}
                                                showHead={false}
                                                strokeWidth={2}
                                                tailSize={2}
                                            />
                                            }
                                            🔹
                                        </span>

                                    }
                                    
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === i.note && el.pos === idx + 1 && index === 0 && el.block === 1
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}>
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) && <Xarrow
                                                    start={i.id.toString()}
                                                    end={(i.id + 1).toString()}
                                                    showHead={false}
                                                    strokeWidth={2}
                                                    tailSize={2}
                                                />
                                                
                                                }
                                            🔸
                                        </span>
                                    }

                                    
                                </div>
                                }

                                {!playNotes.includes(i.note) && <div
                                    key={idx}
                                    className="cell"
                                >
                                    {i.note}
                                </div>
                                }
                            </div>
                        })
                    }

                </div>
                <div className='chart'>

                    {
                        notesLayout.slice(16, 32).map((i, idx) => {

                            return <>
                                {playNotes.includes(i.note) && <div
                                    className="highlighted cell"
                                    key={idx}
                                >
                                    {i.note}
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === i.note && el.pos === idx + 1 && index !== resultSequence.length / 3 && el.block === 2
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}>
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) &&<Xarrow
                                                start={(i.id).toString()}
                                                end={(i.id + 1).toString()}
                                                showHead={false}
                                                strokeWidth={2}
                                                tailSize={2}
                                            />
                                                }
                                            🔹
                                        </span>
                                    }
                                    {
                                        resultSequence.find((el, index) => {

                                            return el.note === i.note && el.pos === idx + 1 && index === resultSequence.length / 3 && el.block === 2
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}
                                        >
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) && <Xarrow
                                                    start={i.id.toString()}
                                                    end={(i.id + 1).toString()}
                                                    showHead={false}
                                                    strokeWidth={2}
                                                    tailSize={2}
                                                />
                                                }
                                            🔸
                                        </span>
                                    }

                                    
                                </div>
                                }

                                {!playNotes.includes(i.note) && <div
                                    key={idx}
                                    className="cell"
                                >
                                    {i.note}
                                </div>
                                }
                            </>
                        })
                    }

                </div>
                <div className='chart'>

                    {
                        notesLayout.slice(32).map((i, idx) => {

                            return <>
                                {playNotes.includes(i.note) && <div
                                    className="cell highlighted"
                                    key={idx}
                                >
                                    {i.note}
                                    {
                                        resultSequence.find((el, index) => {

                                            return el.note === i.note && el.pos === idx + 1 && index !== resultSequence.length / 3 * 2 && el.block === 3
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}
                                        >
                                            🔹
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) &&<Xarrow
                                                start={i.id.toString()}
                                                end={(i.id + 1).toString()}
                                                showHead={false}
                                                strokeWidth={2}
                                                tailSize={2}
                                                
                                            />
                                                }
                                        </span>
                                    }
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === i.note && el.pos === idx + 1 && index === resultSequence.length / 3 * 2 && el.block === 3
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}
                                        >
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) && <Xarrow
                                                    start={i.id.toString()}
                                                    end={(i.id + 1).toString()}
                                                    showHead={false}
                                                    strokeWidth={2}
                                                    tailSize={2}
                                    
                                                />
                                                }
                                            🔸
                                        </span>
                                    }

                                    
                                </div>
                                }

                                {!playNotes.includes(i.note) && <div
                                    key={idx}
                                    className="cell"
                                >
                                    {i.note}
                                </div>
                                }
                            </>
                        })
                    }


                </div>
            </section>


            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            
            <Layout 
                harmonicaKey={harmonicaKey} 
                playKey={playKey} 
                scaleMode={scale}
                playNotes={playNotes}
            />
        </>
    )
}

