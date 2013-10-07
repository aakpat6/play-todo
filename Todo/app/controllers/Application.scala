package controllers

import models.Task
import play.api.data.Form
import play.api.data.Forms
import play.api.mvc.Action
import play.api.mvc.Controller
import play.api.libs.json._

object Application extends Controller {

  val taskForm = Form("label" -> Forms.nonEmptyText)

  def index = Action {
    Ok(views.html.index(Task.all(), taskForm))
  }

  def getTasks = Action {
    val labels = Task.all() map (_.toJSON)
    Ok(Json.stringify(JsArray(labels)))
  }

  def newTask = Action { implicit request =>
    taskForm.bindFromRequest fold (
      errors => BadRequest(views.html.index(Task.all(), errors)),
      label => {
        Task create label
        Redirect(routes.Application.index)
      })
  }

  def deleteTask = Action { request =>
    val params = request.body.asFormUrlEncoded
    val id: Long = params.get("id")(0).toLong
    Task.delete(id)
    Ok("")
  }
}