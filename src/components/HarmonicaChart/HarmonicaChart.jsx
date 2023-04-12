import './HarmonicaChart.css'
import { useState } from "react";


const baseNotes = [
    'C','C#/D♭','D','D#/E♭','E','F','F#/G♭','G','G#/A♭','A','A#/B♭','B'
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


export default function HarmonicaChart() {
    const [scale, setScale] = useState(null)
    const [playKey, setPlayKey] = useState(null)

    const [harmonicaKey, setHarmonicaKey] = useState('C')
    const notes = reorderBaseNotesByKey(harmonicaKey)

    function harmonicaKeyChange(evt) {
        const newHarmonicaKey = evt.target.value
        setHarmonicaKey(newHarmonicaKey)
    }



    return <>
        <p>THIS IS YOUR HARMONICA NOTES LAYOUT</p>

        <h5>Harmonica key:</h5>
        <select name="harmonica-key"
        onChange={harmonicaKeyChange}
        value={harmonicaKey}

        >
            {
                baseNotes.map((note) => {
                    return <option>{note}</option>
                })
            }
        </select>
        
        <br />
        <br />

        <div id='chart'>

            {
                layoutPattern.map((i, idx) => {
                    console.log('note', notes[i -1], idx)
                    return <div>
                        {notes[i - 1]}
                        </div>
                })
            }
    
        </div>
    </>
}