export class InputManager
{
    static instance = new InputManager();
    private keys = new Set<string>();

    constructor()
    {
        window.addEventListener("keydown", (e) => this.keys.add(e.key));
        window.addEventListener("keyup", (e) => this.keys.delete(e.key));
    }

    //see available keys [https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values]
    isDown(key: string)
    {
        return this.keys.has(key);
    }
}
