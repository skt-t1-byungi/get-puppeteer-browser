export declare function createBrowserGetter<Launcher extends (opts: any)=> Promise<any> >(
    puppet: {launch:Launcher},
    opts?: Parameters<Launcher>[0]
) : () => ReturnType<Launcher>
export default createBrowserGetter;
