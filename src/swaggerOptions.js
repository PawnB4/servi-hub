export const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Servihub API",
            version:"1.0.0",
            description: "CRUD Express API - Franco Pascual - Aplicaciones Interactivas UADE 2023"
        },
        servers:[{
            url:"http://localhost:3000"
        }],
    
    },
    apis: ["./src/routes/*.js"]
}