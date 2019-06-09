export declare function createBrowserGetter<Launcher extends (opts: any)=> Promise<any>>(
    puppet: {launch:Launcher},
    opts?: Launcher extends (opts:infer R) => any ? (R & {debounce?:number}) : never
) : () => ReturnType<Launcher>
export default createBrowserGetter;
