import readDB from "../constructors/readDb";
export default function toJSON() : object | any {
    return JSON.parse(readDB())
}