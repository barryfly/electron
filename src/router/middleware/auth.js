const auth = ({next, store}) => {
    if (!store._modules.root.state.login.loggedIn) {
        return next({path: 'login'})
    }

    return next()
}

export default auth