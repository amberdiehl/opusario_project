const initialState = {
    componentId: "industry",
    componentName: "industry",
    items: [
        {key: 0, value: "- Please select -"},
    ]
};

export default function industry(state=initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
