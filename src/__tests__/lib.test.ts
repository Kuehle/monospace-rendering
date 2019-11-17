import { render, createRect, compose } from '../index'

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
        expect(compose(canvas, rect).join('\n')).toBe(5)
    })
    // it('renders str in container', () => {
    //     const canvas =

    //     const result = render()

    //     expect(result).toBe(5)
    // })
    it.todo('renders str in container (with offset)')
})
