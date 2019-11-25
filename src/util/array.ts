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

export const reduce = <T, K>(
    arr: Array<T>,
    fun: (acc: K, el: T, i: number, arr: Array<T>) => K,
    acc: K
): K => {
    for (let i = 0; i < arr.length; i++) {
        acc = fun(acc, arr[i], i, arr)
    }
    return acc
}

export const forI = <T>(i: number, fun: (i: number) => T): T[] => {
    const results = []
    for (let n = 0; n < i; n++) {
        results[n] = fun(n)
    }
    return results
}
