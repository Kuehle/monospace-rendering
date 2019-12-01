export declare const map: <T, K>(arr: T[], fun: (el: T, i: number, arr: T[]) => K) => K[];
export declare const reduce: <T, K>(arr: T[], fun: (acc: K, el: T, i: number, arr: T[]) => K, acc: K) => K;
export declare const forI: <T>(i: number, fun: (i: number) => T) => T[];
