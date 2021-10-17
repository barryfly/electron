const isSubscribed = ({next, store}) => {
    if (!store._modules.root.state.login.isSubscribed) {
        return next({path: '/home'})
    }

    return next()
}

export default isSubscribed