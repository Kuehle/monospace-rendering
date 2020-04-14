import { Image, forI } from '../index'

export const mapImg = (
    img: Image,
    fun: (el: any, i: [number, number], img: Image) => string
): Image => {
    return forI(img.length, y => {
        return forI(img[0].length, x => {
            return fun(img[y][x], [y, x], img)
        }).join('|')
    })
}
