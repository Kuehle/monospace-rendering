import { createRect } from '../../index'
import { mapImg } from '../image'

test('mapImg', () => {
    const input = createRect({ width: 5, height: 2, char: '.' })
    const result = mapImg(input, (_, i) => {
        return i + ''
    })
    expect(result).toEqual(['0,0|0,1|0,2|0,3|0,4', '1,0|1,1|1,2|1,3|1,4'])
})
