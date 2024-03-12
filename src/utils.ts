type ABIElements = {
    internalType: string;
    name: string;
    type: string;
    indexed?: boolean;
    components?: Array<ABIElements>;
};

type ABIElement = {
    inputs: Array<ABIElements>;
    name: string;
    type: string;
    stateMutability?: string;
    outputs?: Array<ABIElements>;
    anonymous?: boolean;
};

export const isNullOrUndefined = (
    value: string | Array<ABIElements> | undefined
) => {
    return value === undefined || value === null;
};

const _verifyABIArray = (abi: Array<ABIElement>) => {
    if (abi.length === 0) {
        return;
    }
    abi.forEach((element: ABIElement) => {
        if (
            isNullOrUndefined(element.name) ||
            isNullOrUndefined(element.type) ||
            isNullOrUndefined(element.inputs)
        ) {
            if (
                isNullOrUndefined(element.name) &&
                element.type !== "constructor"
            ) {
                throw new Error(
                    "Invalid ABI: Missing ABIElement (name | type | inputs) on " +
                        element.name
                );
            }
        }

        if (!Array.isArray(element.inputs)) {
            throw new Error("Invalid ABI: Inputs is not an array");
        }

        if (
            !isNullOrUndefined(element.outputs) &&
            !Array.isArray(element.outputs)
        ) {
            throw new Error("Invalid ABI: Outputs is not an array");
        }

        if (element.inputs.length > 0) {
            element.inputs.forEach((input: ABIElements) => {
                if (
                    isNullOrUndefined(input.name) &&
                    isNullOrUndefined(input.type)
                ) {
                    throw new Error(
                        "Invalid ABI: Missing InputElements|OutputElements (name | type | internalType) on " +
                            input.name
                    );
                }

                if (
                    !isNullOrUndefined(input.components) &&
                    !Array.isArray(input.components)
                ) {
                    throw new Error("Invalid ABI: Components is not an array");
                }
            });
        }

        if (!isNullOrUndefined(element.outputs)) {
            const outputs = element.outputs as Array<ABIElements>;
            if (outputs.length > 0) {
                outputs.forEach((output: ABIElements) => {
                    if (
                        isNullOrUndefined(output.name) &&
                        isNullOrUndefined(output.type)
                    ) {
                        throw new Error(
                            "Invalid ABI: Missing InputElements|OutputElements (name | type | internalType) on " +
                                output.name
                        );
                    }

                    if (
                        !isNullOrUndefined(output.components) &&
                        !Array.isArray(output.components)
                    ) {
                        throw new Error(
                            "Invalid ABI: Components is not an array"
                        );
                    }
                });
            }
        }
    });
};
export const verifyABI = (json: string) => {
    const abi = JSON.parse(json);
    const LOG = console;
    LOG.info(abi);
    if (Array.isArray(abi)) {
        _verifyABIArray(abi);
    } else {
        // find key 'abi' in object abi
        const abiKey = Object.keys(abi).find((key) => key === "abi");
        if (isNullOrUndefined(abiKey)) {
            throw new Error("Invalid ABI: Missing ABI key in abi object");
        } else {
            const abiValue = abi[abiKey as string];
            if (Array.isArray(abiValue)) {
                _verifyABIArray(abiValue);
            } else {
                throw new Error("Invalid ABI: ABI value is not an array");
            }
        }
    }
};
