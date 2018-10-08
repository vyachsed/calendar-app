module.exports = {
    apps: [
        {
            name: "Slava project",
            script: "index.js",
            watch: true,
            ignore_watch: ["client", "node_modules", "uploads", ".git"],
        }
    ]
}
