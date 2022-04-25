class GeoResource {
    constructor(id, url, position, role, ttl, trophies) {
        this.id = id; // String "toto"
        // String "http://example.com/users/toto/avatar.png" (image)
        this.url = url;
        this.position = position; // LatLng pos (position)
        this.role = role; // String "player" (survivor?)
        this.ttl = ttl; // int 0
        this.trophies = trophies; // Trophy []
    }
}

module.exports = GeoResource;