import { createRect, compose } from '../index'
import { map, reduce } from 'util/array'

test('map', () => {
    const arr = [1, 1, 1, 1]
    const fun = (el: number, i: number, arr: number[]) => el * i * arr.length

    const result = map(arr, fun)
    expect(result).toEqual(arr.map(fun))
})

test('reduce', () => {
    const arr = [1, 1, 1, 1]
    const fun = (acc: number, el: number, i: number, arr: number[]) =>
        acc + el * i * arr.length

    const result = reduce(arr, fun, 0)
    expect(result).toEqual(arr.reduce(fun, 0))
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
