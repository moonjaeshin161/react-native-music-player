const initialState = {
    selected: {},
    list: [
        {
            id: '1',
            url: require('../../assets/music/test1.mp3'),
            title: 'Time',
            artist: 'NF',
        },
        {
            id: '2',
            url: require('../../assets/music/test2.mp3'),
            title: 'Let You Down',
            artist: 'NF',
        },
        {
            id: '3',
            url: require('../../assets/music/test3.mp3'),
            title: 'I miss the days',
            artist: 'NF',
        },
    ],
}

export const PlayerReducer = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
}