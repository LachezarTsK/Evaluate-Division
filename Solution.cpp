
#include <unordered_map>
#include <unordered_set>
#include <iterator>
#include <vector>
using namespace std;

class Solution {

    struct Pair {
        string ID{};
        double value{};
        Pair(string ID, double value): ID{ID}, value{value}{}
        Pair() = default;
        ~Pair() = default;
    };
    
    inline static const int NOT_POSSIBLE = -1;
    unordered_map<string, vector<Pair>> graph;

public:
    vector<double> calcEquation(const vector<vector<string>>&equations, const vector<double>& values, const vector<vector<string>>&queries) {
        buildGraph(equations, values);
        vector<double> equationResult;
        for (const auto& query : queries) {
            equationResult.push_back(breadthFirstSearch(query[0], query[1]));
        }
        return equationResult;
    }

private:
    double breadthFirstSearch(const string& start, const string& end) {
        if (graph.find(start) == graph.end() || graph.find(end) == graph.end()) {
            return NOT_POSSIBLE;
        }
        if (start == end) {
            return 1;
        }

        queue<Pair> queue;
        unordered_set<string> visited;
        queue.push(Pair(start, 1));
        visited.insert(start);

        while (!queue.empty()) {

            Pair pair = queue.front();
            queue.pop();
            if (graph.find(pair.ID) == graph.end()) {
                continue;
            }

            vector<Pair>& neighbours = graph[pair.ID];
            for (const auto& neighbour : neighbours) {
                if (visited.find(neighbour.ID) == visited.end()) {
                    if (neighbour.ID == end) {
                        return pair.value * neighbour.value;
                    }
                    queue.push(Pair(neighbour.ID, (pair.value * neighbour.value)));
                    visited.insert(neighbour.ID);
                }
            }
        }
        return NOT_POSSIBLE;
    }

    void buildGraph(const vector<vector<string>>& equations, const vector<double>& values) {
        const size_t size = equations.size();
        int index = 0;
        for (const auto& equation : equations) {
            graph[equation[0]].push_back(Pair(equation[1], values[index]));
            graph[equation[1]].push_back(Pair(equation[0], (1 / values[index])));
            ++index;
        }
    }
};
