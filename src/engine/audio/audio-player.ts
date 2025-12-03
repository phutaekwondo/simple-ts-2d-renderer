export class AudioPlayer
{
    private volume: number = 1; // 0-1
    private playingAudios: HTMLAudioElement[] = [];

    play(audio: HTMLAudioElement, loop: boolean = false, onComplete?: () => void, isSkipIfFailed: boolean = false): void
    {
        let touchEventName = ('ontouchend' in window) ? 'touchend' : 'mousedown';
        audio.loop = loop;
        audio.onended = () =>
        {
            this.onAudioEnded(audio);
            onComplete?.();
        };

        audio.volume = this.volume;
        audio.play().catch(() =>
        {
            if (isSkipIfFailed) return;

            window.addEventListener(touchEventName, () =>
            {
                audio.play();
            }, { once: true });
        });
    }

    setVolume(volume: number): void
    {
        this.volume = Math.max(0, Math.min(1, volume));
        this.playingAudios.forEach(audio => audio.volume = this.volume);
    }

    private onAudioEnded(endedAudio: HTMLAudioElement): void
    {
        this.playingAudios = this.playingAudios.filter(a => a !== endedAudio);
    }
}