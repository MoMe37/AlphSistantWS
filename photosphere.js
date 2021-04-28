class Photosphere {

    constructor(id, x, z, src){
        this.id = id;
        this.x = x;
        this.z = z;
        this.src = src;
        this.neighbourList = [];
    }

    addNeighbour(ps){
        this.neighbourList.push(ps);
    }

}