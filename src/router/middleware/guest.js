const guest = ({next, store}) => {
    if (!store._modules.root.state.login.loggedIn) {
        return next({path: 'home'})
    }

    return next()
}

export default guest