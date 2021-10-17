import { unref } from 'vue';
import { useRouter } from 'vue-router';

function handleError(e) {
  console.error(e);
}

// page switch
export function useGo(_router) {
    let router;
    if (!_router) {
        router = useRouter();
    }
    const { push, replace } = _router || router;

    function go(opt, isReplace = false) {
        if (!opt) {
            return;
        }
        isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    }

    return go;
}

export const useRedo = (_router) => {
    let router;
    if (!_router) {
        router = useRouter();
    }
    const { push, currentRoute } = _router || router;
    const { query, params } = currentRoute.value;
    function redo() {
        return new Promise((resolve) => {
            push({
                path: '/redirect' + unref(currentRoute).fullPath,
                query,
                params,
            }).then(() => resolve(true));
        });
    }
    return redo;
};