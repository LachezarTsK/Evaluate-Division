
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
    this.NOT_POSSIBLE = -1;
    this.graph = new Map();

    buildGraph(equations, values);
    const equationResult = new Array(queries.length);
    for (let i = 0; i < queries.length; ++i) {
        equationResult[i] = breadthFirstSearch(queries[i][0], queries[i][1]);
    }
    return equationResult;
};

/**
 * @param {string} start
 * @param {string} end
 * @return {number}
 */
function breadthFirstSearch(start, end) {
    if (!this.graph.has(start) || !this.graph.has(end)) {
        return this.NOT_POSSIBLE;
    }
    if (start === end) {
        return 1;
    }

    const queue = new Queue();
    const visited = new Set();
    queue.enqueue(new Pair(start, 1));
    visited.add(start);

    while (!queue.isEmpty()) {

        const pair = queue.dequeue();
        if (!this.graph.has(pair.ID)) {
            continue;
        }

        const neighbours = this.graph.get(pair.ID);
        for (let i = 0; i < neighbours.length; ++i) {
            if (!visited.has(neighbours[i].ID)) {
                if (neighbours[i].ID === end) {
                    return pair.value * neighbours[i].value;
                }
                queue.enqueue(new Pair(neighbours[i].ID, (pair.value * neighbours[i].value)));
                visited.add(neighbours[i].ID);
            }
        }
    }
    return this.NOT_POSSIBLE;
}

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @return {void}
 */
function buildGraph(equations, values) {

    const size = equations.length;
    for (let i = 0; i < size; ++i) {
        let ID_first = equations[i][0];
        let ID_second = equations[i][1];

        if (!this.graph.has(ID_first)) {
            this.graph.set(ID_first, []);
        }
        this.graph.get(ID_first).push(new Pair(ID_second, values[i]));

        if (!this.graph.has(ID_second)) {
            this.graph.set(ID_second, []);
        }
        this.graph.get(ID_second).push(new Pair(ID_first, (1 / values[i])));
    }
}

/**
 * @param {string} ID
 * @param {number} value
 */
function Pair(ID, value) {
    this.ID = ID;
    this.value = value;
}
