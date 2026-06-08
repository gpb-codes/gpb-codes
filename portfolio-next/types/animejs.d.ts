declare module 'animejs' {
  interface AnimeParams {
    targets?: any;
    [key: string]: any;
  }
  interface AnimeInstance {
    play: () => void;
    pause: () => void;
    reverse: () => void;
    seek: (time: number) => void;
    finished: Promise<void>;
  }
  function anime(params: AnimeParams): AnimeInstance;
  namespace anime {
    function stagger(val: number, opts?: { start?: number; from?: string }): any;
  }
  export default anime;
}
