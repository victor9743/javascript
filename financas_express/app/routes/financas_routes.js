module.exports = (application)=>{

    application.get("/",(req, res)=>{
        application.app.controller.financas_controller.home(application, req, res);

    })
   




}