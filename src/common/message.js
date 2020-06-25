export default class Message {
    constructor(text) {
        this.text = new PIXI.Text(text, {
            font : '22px Arial',
            fill : 0x000000,
            align : 'center',
            cacheAsBitmap: true, // for better performance
        });
        this.text.anchor.set(0.5,0.5);
    }

    update(text) {
        this.text = text;
    }
}