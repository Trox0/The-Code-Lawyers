export interface LampSceneOptions {
 signal?: AbortSignal;
 onProgress?: (progress: number) => void;
 paused?: boolean;
 onError?: (error: Error) => void;
}
export interface LampSceneController {
 dispose(): void;
 setPaused(paused: boolean): void;
 pulse(): void;
 setScrollProgress(progress: number): void;
}
export function initLampScene(container: HTMLElement, options?: LampSceneOptions): Promise<LampSceneController>;
