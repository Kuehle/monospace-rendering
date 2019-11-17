interface RenderOptions {
    // offset
    // dimensions
}

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

interface Coordinate {
    x: number
    y: number
}

interface CoordinateOption {
    x?: number
    y?: number
}

export const map = <T, K>(
    arr: Array<T>,
    fun: (el: T, i: number, arr: Array<T>) => K
): Array<K> => {
    const result: Array<K> = []
    for (let i = 0; i < arr.length; i++) {
        result[i] = fun(arr[i], i, arr)
    }
    return result
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

// maybe switch options for easier curring
export const render = (str: string, options?: RenderOptions) => {
    return str
}
