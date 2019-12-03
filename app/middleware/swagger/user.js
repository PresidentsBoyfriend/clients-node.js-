const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API",
      description: "test",
      contact: {
        name: "presidents_boyfriend"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["./routers/user.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};