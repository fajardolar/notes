const initialState = {
    list: [],
};

export default (state = initialState, action) => {
    let newList = [...state.list];

    switch (action.type) {
        case "ADD_CATEGORY":
            newList.push({
                title: action.payload.title,
                done: false,
            });

            break;

        case "EDIT_CATEGORY":
            if (newList[action.payload.key]) {
                newList[action.payload.key] = {
                    title: action.payload.title,
                    done: action.payload.done,
                };
            }
            break;

        case "DELETE_CATEGORY":
            newList = newList.filter((item, index) => index !== action.payload.key);
            break;

        case "SUCCESS_CATEGORY":
            if (newList[action.payload.key]) {
                newList[action.payload.key] = {
                    title: action.payload.title,
                    done: true,
                };
            }
            break;

        case "UNCHECK_CATEGORY":
            if (newList[action.payload.key]) {
                newList[action.payload.key] = {
                    title: action.payload.title,
                    done: false,
                };
            }
            break;
    }

    return { ...state, list: newList };
};