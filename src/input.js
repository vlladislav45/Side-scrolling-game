export default class InputHandler {
    constructor(character) {
        document.addEventListener('keydown', event => {
            let key = event.keyCode;
 
            switch(key) {
                /*MOVE UP*/
                case 38: {
                    character.moveTop();
                }break;
                /*MOVE DOWN*/
                case 40: {
                    character.moveDown();
                }break;
            }
         });
 
         document.addEventListener('keyup', event => {
             let key = event.keyCode;
 
             switch(key) {
                 /*MOVE UP*/
                 case 38: {
                     if(character.ySpeed < 0) {
                         character.stop();
                     }
                 }break;
                //  Move Down
                 case 40: {
                     if (character.ySpeed > 0) {
                         character.stop();
                    }
                }break;
             }
         });
    }
}