import profileReducer, { addPostActionCreator, deletePostCreator } from "./profileReducer";

let state = {
    posts: [
        { id: 0, text: "Post 1 About ocean", likesCount: 3 },
        { id: 1, text: "Post 2 About Sun", likesCount: 42 }
    ],
};


it("should add post", () => {
    let action = addPostActionCreator("New post");
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
})

it("should add correct post at the head of list", () => {
    let action = addPostActionCreator("New post about Rain");
    let newState = profileReducer(state, action);
    expect(newState.posts[0].text).toBe("New post about Rain");
})

//TDD
it("should delete post from list", () => {
    let action = deletePostCreator(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(1);
})
it("should not be delete post if post id is incorrect", () => {
    let action = deletePostCreator(4);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
})