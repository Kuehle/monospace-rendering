import { map, createRect, compose } from '../index'

test('map', () => {
    const result = map([1, 1, 1, 1], (el, i, arr) => el * i * arr.length)
    expect(result).toEqual([0, 4, 8, 12])
})

describe('The Lib', () => {
    it('can create a rect', () => {
        expect(createRect({ width: 3, height: 2, char: 'x' })).toEqual([
            'xxx',
            'xxx',
        ])
    })
    it('can compose 2 elements', () => {
        const canvas = createRect({ width: 5, height: 4, char: 'X' })
        const rect = createRect({ width: 3, height: 2, char: '0' })
        expect(compose(canvas, rect)).toEqual([
            '000XX',
            '000XX',
            'XXXXX',
            'XXXXX',
        ])
    })
    it('can compose 2 elements with x offset', () => {
        const canvas = createRect({ width: 5, height: 4, char: 'X' })
        const rect = createRect({ width: 3, height: 2, char: '0' })
        expect(compose(canvas, rect, { x: 1 })).toEqual([
            'X000X',
            'X000X',
            'XXXXX',
            'XXXXX',
        ])
    })
    it('can compose 2 elements with x and y offset', () => {
        const canvas = createRect({ width: 5, height: 4, char: 'X' })
        const rect = createRect({ width: 3, height: 2, char: '0' })
        expect(compose(canvas, rect, { x: 1, y: 2 })).toEqual([
            'XXXXX',
            'XXXXX',
            'X000X',
            'X000X',
        ])
    })
})
