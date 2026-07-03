// In-memory per-user conversation state. Fine for a single-instance deployment;
// swap for Redis (see README > Future Improvements) if you scale to multiple instances.
const sessions = new Map();

function get(userId) {
    return sessions.get(userId) || null;
}

function set(userId, state) {
    sessions.set(userId, state);
}

function clear(userId) {
    sessions.delete(userId);
}

module.exports = { get, set, clear };
