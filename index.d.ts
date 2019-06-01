export declare function createBrowserGetter<Launcher extends (opts: any)=> Promise<any>>(
    puppet: {launch:Launcher},
    opts?: Launcher extends (opts:infer R) => Promise<any> ? R : never
) : () => ReturnType<Launcher>
export default createBrowserGetter;
