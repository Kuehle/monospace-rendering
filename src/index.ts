import { map } from 'util/array'

interface CreateRectOptions {
    width: number
    height: number
    char: string
}

// work as much with string[] as possible
export const createRect = ({
    width,
    height,
    char,
}: CreateRectOptions): string[] => {
    return Array(height).fill(char.repeat(width))
}

interface CoordinateOption {
    x?: number
    y?: number
}

export const compose = (
    bottom: string[],
    top: string[],
    offset: CoordinateOption = { x: 0, y: 0 }
) => {
    const xOffset = offset.x || 0
    const yOffset = offset.y || 0

    const result = map(bottom, (bottomLine, y) =>
        map(
            bottomLine.split('').slice(),
            (bottomChar, x) =>
                (top[y - yOffset] && top[y - yOffset][x - xOffset]) ||
                bottomChar
        ).join('')
    )
    return result
}
