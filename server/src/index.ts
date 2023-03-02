let express = require("express")
const routes = require("./Routes/routes")
const {midd} = require("./middleware/app.ts")
const {sequelizeCon} = require("./dataBase/sequelize.ts")

require("./dataBase/models/users.ts")
require("./dataBase/models/videos.ts")

const app = express()

const port = process.env.PORT || 4000

app.use(midd)

app.use("/", routes);

main()

// Start the server and create the database.

async function main(){
    try {
        await sequelizeCon.sync()
        app.listen(port, ()=>{
            console.log(`server open in port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}



