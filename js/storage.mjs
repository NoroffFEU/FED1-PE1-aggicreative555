export function save (key, value) {
    localStorage.setItem(key, JSON.stringify(value));

}

export function load(key) {
    try {
        // const value = localStorage.getItem(key);
        // return value;
        const profile = JSON.parse(load("profile"));
        console.log(profile);

    } catch {
        return {};
    }
}

export function remove(key) {
    localStorage.remove(key);
}

