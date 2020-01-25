import { createRect, compose, toTransparency, Image, rotate } from '../index'
import { reduce, forI } from '../util/array'

enum NoteLength {
    Full = 1,
    Half = 2,
    Quarter = 4,
    Eighth = 8,
}
const drawStaff = (width: number) => {
    const canvas = createRect({ width, height: 24, char: ' ' })
    const line = createRect({ width, height: 1, char: '_' })

    const result = reduce(
        Array(5),
        (result, _, i) => compose(result, line, { y: 4 + i * 4 }),
        canvas
    )

    return result
}

const createNote = (withStem = true, withHeadFull = true, withFlag = false) => {
    const noteHead = [
        '   ███████  ',
        ' ██       ██',
        '██       ██ ',
        '  ███████   ',
    ]

    const noteHeadFull = [
        '   ███████  ',
        ' ███████████',
        '███████████ ',
        '  ███████   ',
    ]

    const noteFlag = ['██     ', ' █████ ', '     ██', '     █ ']

    const noteStem = createRect({ width: 2, height: 13, char: '█' })
    const noteBackground = createRect({ width: 21, height: 16, char: ' ' })

    const NOTHING: Image = []
    const head = withHeadFull ? noteHeadFull : noteHead
    const stem = withStem ? noteStem : NOTHING
    const flag = withFlag ? noteFlag : NOTHING

    return compose(
        compose(compose(noteBackground, head, { y: 12 }), stem, {
            x: 10,
        }),
        flag,
        { x: 12, y: 1 }
    )
}

const drawNote = (noteLength: NoteLength) => {
    switch (noteLength) {
        case NoteLength.Full:
            return createNote(false, false, false)
        case NoteLength.Half:
            return createNote(true, false, false)
        case NoteLength.Quarter:
            return createNote(true, true, false)
        case NoteLength.Eighth:
            return createNote(true, true, true)
    }
}

const drawTrebbleNote = (
    noteName: string,
    noteLength: NoteLength,
    width: number = 40
) => {
    const notes = 'EFGA_BCD'
    const rotated = notes.split('_')[1]
    const yOffset = [7, 5, 3, 1, 0_0, 9, 7, 5]
    const staff = drawStaff(width)
    const shouldRotate = rotated.includes(noteName)
    const note = shouldRotate
        ? rotate(drawNote(noteLength), 2)
        : drawNote(noteLength)

    return compose(staff, toTransparency(note), {
        x: shouldRotate ? 3 : 8,
        y: yOffset[notes.indexOf(noteName)],
    })
}

const drawNotesFromNotation = (notation: string) => {
    const notes = parseNotation(notation)
    const NOTE_WIDTH = 40

    const staff = drawStaff(NOTE_WIDTH * notes.length)

    const notesImages = notes.map(note =>
        drawTrebbleNote(note.name, note.duration)
    )
    const result = reduce(
        notesImages,
        (staff, note, i) => compose(staff, note, { x: NOTE_WIDTH * i }),
        staff
    )
    return result
}

type NoteName = string

interface Note {
    name: NoteName
    duration: NoteLength
}

const parseNotation = (notation: string): Note[] => {
    const noteNamesWithDurations = notation.match(/(([a-g])([1248]))+/g)
    if (noteNamesWithDurations === null) return []
    return noteNamesWithDurations
        .map((match: string) => {
            const matchResult = match.match(/([a-g])([1248])/)
            const [, name, duration] = matchResult!
            return { name: name.toUpperCase(), duration: Number(duration) }
        })
        .filter(Boolean)
}

describe('Can draw a note', () => {
    test('with full length', () => {
        const note = drawNote(NoteLength.Full)

        expect(note).toMatchInlineSnapshot(`
            Array [
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "   ███████           ",
              " ██       ██         ",
              "██       ██          ",
              "  ███████            ",
            ]
        `)
    })
    test('with half length', () => {
        const note = drawNote(NoteLength.Half)

        expect(note).toMatchInlineSnapshot(`
            Array [
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "   █████████         ",
              " ██       ██         ",
              "██       ██          ",
              "  ███████            ",
            ]
        `)
    })
    test('with quarter length', () => {
        const note = drawNote(NoteLength.Quarter)

        expect(note).toMatchInlineSnapshot(`
            Array [
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "   █████████         ",
              " ███████████         ",
              "███████████          ",
              "  ███████            ",
            ]
        `)
    })
    test('with eighth length', () => {
        const note = drawNote(NoteLength.Eighth)

        expect(note).toMatchInlineSnapshot(`
            Array [
              "          ██         ",
              "          ████       ",
              "          ██ █████   ",
              "          ██     ██  ",
              "          ██     █   ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "   █████████         ",
              " ███████████         ",
              "███████████          ",
              "  ███████            ",
            ]
        `)
    })
    test('with eighth length (rotated)', () => {
        const note = rotate(drawNote(NoteLength.Eighth), 2)

        expect(note).toMatchInlineSnapshot(`
            Array [
              "            ███████  ",
              "          ███████████",
              "         ███████████ ",
              "         █████████   ",
              "         ██          ",
              "         ██          ",
              "         ██          ",
              "         ██          ",
              "         ██          ",
              "         ██          ",
              "         ██          ",
              "   █     ██          ",
              "  ██     ██          ",
              "   █████ ██          ",
              "       ████          ",
              "         ██          ",
            ]
        `)
    })
})

describe('Draws notes on staff:', () => {
    test('quater note in lowest gap in staff (F in trebble)', () => {
        const staff = drawStaff(30)
        const note = drawNote(NoteLength.Quarter)

        const result = compose(staff, toTransparency(note), { x: 8, y: 5 })
        expect(result).toMatchInlineSnapshot(`
            Array [
              "                              ",
              "                              ",
              "                              ",
              "                              ",
              "______________________________",
              "                  ██          ",
              "                  ██          ",
              "                  ██          ",
              "__________________██__________",
              "                  ██          ",
              "                  ██          ",
              "                  ██          ",
              "__________________██__________",
              "                  ██          ",
              "                  ██          ",
              "                  ██          ",
              "__________________██__________",
              "           █████████          ",
              "         ███████████          ",
              "        ███████████           ",
              "__________███████_____________",
              "                              ",
              "                              ",
              "                              ",
            ]
        `)
    })

    test('draws eighth note middle of the stuff (B on trebble)', () => {
        const image = drawTrebbleNote('C', NoteLength.Eighth, 30)
        expect(image).toMatchInlineSnapshot(`
            Array [
              "                              ",
              "                              ",
              "                              ",
              "                              ",
              "______________________________",
              "                              ",
              "                              ",
              "               ███████        ",
              "_____________███████████______",
              "            ███████████       ",
              "            █████████         ",
              "            ██                ",
              "____________██________________",
              "            ██                ",
              "            ██                ",
              "            ██                ",
              "____________██________________",
              "            ██                ",
              "      █     ██                ",
              "     ██     ██                ",
              "______█████_██________________",
              "          ████                ",
              "            ██                ",
              "                              ",
            ]
        `)
    })

    test('draws multiple notes', () => {
        const NOTE_WIDTH = 40
        const noteNames = 'AFDGEF'
        const staff = drawStaff(noteNames.length * NOTE_WIDTH)
        const noteLenghts = [
            NoteLength.Full,
            NoteLength.Quarter,
            NoteLength.Eighth,
            NoteLength.Eighth,
            NoteLength.Half,
            NoteLength.Quarter,
        ]

        const notes = forI(noteNames.length, i =>
            drawTrebbleNote(noteNames[i], noteLenghts[i], NOTE_WIDTH)
        )

        const result = reduce(
            notes,
            (staff, note, i) => compose(staff, note, { x: NOTE_WIDTH * i }),
            staff
        )

        expect(result.join('\n')).toMatchInlineSnapshot(`
            "                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                            
                                                                                                                                                      ██                                                                                                    
            __________________________________________________________________________________________________________________________________________████__________________________________________________________________________________________________
                                                                      ██                                   ███████                                    ██ █████                                                                        ██                    
                                                                      ██                                 ███████████                                  ██     ██                                                                       ██                    
                                                                      ██                                ███████████                                   ██     █                                ██                                      ██                    
            __________________________________________________________██________________________________█████████_____________________________________██______________________________________██______________________________________██____________________
                                                                      ██                                ██                                            ██                                      ██                                      ██                    
                                                                      ██                                ██                                            ██                                      ██                                      ██                    
                                                                      ██                                ██                                            ██                                      ██                                      ██                    
            __________________________________________________________██________________________________██____________________________________________██______________________________________██______________________________________██____________________
                       ███████                                        ██                                ██                                            ██                                      ██                                      ██                    
                     ██       ██                                      ██                                ██                                            ██                                      ██                                      ██                    
                    ██       ██                                       ██                                ██                                     █████████                                      ██                                      ██                    
            __________███████_________________________________________██__________________________█_____██___________________________________███████████______________________________________██______________________________________██____________________
                                                               █████████                         ██     ██                                  ███████████                                       ██                               █████████                    
                                                             ███████████                          █████ ██                                    ███████                                         ██                             ███████████                    
                                                            ███████████                               ████                                                                             █████████                            ███████████                     
            __________________________________________________███████___________________________________██___________________________________________________________________________██_______██______________________________███████_______________________
                                                                                                                                                                                    ██       ██                                                             
                                                                                                                                                                                      ███████                                                               
                                                                                                                                                                                                                                                            "
        `)
    })

    test('draws from notation string (inspired by lilypond)', () => {
        const input = 'c4 g8 g8 a2 e8 f8 a1'

        const result = drawNotesFromNotation(input)

        expect(result).toMatchInlineSnapshot(`
            Array [
              "                                                                                                                                                                                                                                                                                        ",
              "                                                                                                                                          ██                                                                                                                                            ",
              "                                                                                                                                          ██                                                                                                                                            ",
              "                                                          ██                                      ██                                      ██                                                                                                                                            ",
              "__________________________________________________________████____________________________________████____________________________________██____________________________________________________________________________________________________________________________________________",
              "                                                          ██ █████                                ██ █████                                ██                                                                              ██                                                            ",
              "                                                          ██     ██                               ██     ██                               ██                                                                              ████                                                          ",
              "               ███████                                    ██     █                                ██     █                                ██                                      ██                                      ██ █████                                                      ",
              "_____________███████████__________________________________██______________________________________██______________________________________██______________________________________████____________________________________██_____██_____________________________________________________",
              "            ███████████                                   ██                                      ██                                      ██                                      ██ █████                                ██     █                                                      ",
              "            █████████                                     ██                                      ██                                      ██                                      ██     ██                               ██                                                            ",
              "            ██                                            ██                                      ██                                      ██                                      ██     █                                ██                                                            ",
              "____________██____________________________________________██______________________________________██______________________________________██______________________________________██______________________________________██____________________________________________________________",
              "            ██                                            ██                                      ██                               █████████                                      ██                                      ██                               ███████                      ",
              "            ██                                            ██                                      ██                             ██       ██                                      ██                                      ██                             ██       ██                    ",
              "            ██                                     █████████                               █████████                            ██       ██                                       ██                                      ██                            ██       ██                     ",
              "____________██___________________________________███████████_____________________________███████████______________________________███████_________________________________________██______________________________________██______________________________███████_______________________",
              "            ██                                  ███████████                             ███████████                                                                               ██                               █████████                                                            ",
              "            ██                                    ███████                                 ███████                                                                                 ██                             ███████████                                                            ",
              "            ██                                                                                                                                                             █████████                            ███████████                                                             ",
              "____________██___________________________________________________________________________________________________________________________________________________________███████████______________________________███████_______________________________________________________________",
              "            ██                                                                                                                                                          ███████████                                                                                                     ",
              "            ██                                                                                                                                                            ███████                                                                                                       ",
              "                                                                                                                                                                                                                                                                                        ",
            ]
        `)
    })
})
