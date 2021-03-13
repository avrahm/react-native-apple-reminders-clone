export default function generateID() {
    return Math.random().toString(20).substr(2, 10);
}
