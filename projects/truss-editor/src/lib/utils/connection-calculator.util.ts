/**
 * Get the port rectangular coordinates
 * 
 * @param nodeId 
 * @param portName 
 */
export const getPortRect = (nodeId: string, portName: string) =>
    document
        .querySelector(`[data-node-id="${nodeId}"] [data-port-name="${portName}"]`)
        .getBoundingClientRect();


/**
 * Get the rectangular cooridnates of a node
 * 
 * @param nodes 
 * @param forEachConnection 
 */
export const getPortRectsByNodes: any = (nodes: any, forEachConnection: any = null) =>
    Object.values(nodes).reduce((obj, node: any) => {
        if (node.connections && node.connections.inputs) {
            Object.entries(node.connections.inputs).forEach(([inputName, outputs]) => {
                (outputs as any[]).forEach((output: any) => {
                    const toRect = getPortRect(node.id, inputName);
                    const fromRect = getPortRect(output.nodeId, output.portName);

                    if (forEachConnection) {
                        forEachConnection({
                            to: toRect,
                            from: fromRect,
                            name: `${output.nodeId}${output.portName}${node.id}${inputName}`
                        });
                    }

                    obj[`${node.id}${inputName}`] = toRect;
                    obj[`${output.nodeId}${output.portName}`] = fromRect;
                });
            });
        }
        return obj;
    }, {});
