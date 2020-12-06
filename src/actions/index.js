import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
        await dispatch(fetchPosts());

                //lodash chain method
        _.chain(getState().posts)
                .map('userId')
                .uniq()
                .forEach(id=> dispatch(fetchUser(id)))
                //if you just list out the chain methods like so
                //it's not gonna execute if you don't put .value() like in the
                // row below
                .value() 
};

export const fetchPosts = () =>  async  dispatch => { 
        const response = await jsonPlaceholder.get('/posts');
 
       dispatch ({ type: 'FETCH_POSTS', payload: response.data });
        };
    
export const fetchUser = id => async  dispatch => { 
//memoize function outside the action creator
        const response = await jsonPlaceholder.get(`/users/${id}`);
                dispatch ({ type: 'FETCH_USER', payload: response.data });
};      


 //export const fetchUser = id =>  dispatch => {
   //     _fetchUser(id, dispatch);
//};

//memoize function outside the action creator
//const _fetchUser =_.memoize(async (id, dispatch) => {

  //      const response = await jsonPlaceholder.get(`/users/${id}`);


    //    dispatch ({ type: 'FETCH_USER', payload: response.data });
//});
 

