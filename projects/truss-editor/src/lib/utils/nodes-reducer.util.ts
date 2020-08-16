const addConnection = (nodes: any, input: any, output: any) => ({
    ...nodes,
    [input.nodeId]: {
        ...nodes[input.nodeId],
        connections: {
            ...nodes[input.nodeId].connections,
            inputs: {
                ...nodes[input.nodeId].connections.inputs,
                [input.portName]: [
                    ...(nodes[input.nodeId].connections.inputs[input.portName] || []),
                    {
                        nodeId: output.nodeId,
                        portName: output.portName
                    }
                ]
            }
        }
    },
    [output.nodeId]: {
        ...nodes[output.nodeId],
        connections: {
            ...nodes[output.nodeId].connections,
            outputs: {
                ...nodes[output.nodeId].connections.outputs,
                [output.portName]: [
                    ...(nodes[output.nodeId].connections.outputs[output.portName] || []),
                    {
                        nodeId: input.nodeId,
                        portName: input.portName
                    }
                ]
            }
        }
    }
});

const nodesReducer = (nodes: any, action: any = {}) => {
    switch (action.type) {
        case 'ADD_CONNECTION':
            const { input, output } = action;
            const inputIsNotConnected = !nodes[input.nodeId].connections.inputs[input.portName];
            if (inputIsNotConnected) {
                return addConnection(nodes, input, output);
            }
            else {
                return nodes;
            }
        default:
            return nodes;
    }
};

export const addNewConnection = addConnection;

export default nodesReducer;
