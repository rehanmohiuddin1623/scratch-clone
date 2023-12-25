export default function Square(x, y, color, text) {
    this.x = x
    this.y = y;
    this.color = color
    this.text = text;

    this.move = (context) => {
        context.moveTo(x,y)
    }
    this.getCoordinates=()=>{
        return [this.x,this.y]
    }

    this.getText=()=>{
        return this.text
    }
}