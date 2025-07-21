// config/index.js
module.exports = {
    port: process.env.PORT || 3000,

    mongoURI: process.env.MONGO_URI || 'mongodb+srv://wfmendez:SkullCluster@wfmendezdevcluster.gv6cena.mongodb.net/adorable-turtles-db?retryWrites=true&w=majority&appName=WFMendezDevCluster'
}