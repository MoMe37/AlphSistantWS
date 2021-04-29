class Photosphere {

    constructor(x, z, src){
        this.x = x;
        this.z = z;
        this.src = src;
        this.neighbourList = [];
    }

    addNeighbour(ps){
        this.neighbourList.push(ps);
    }

}