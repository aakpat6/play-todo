package controllers

import models.Task
import play.api.data.Form
import play.api.data.Forms
import play.api.mvc.Action
import play.api.mvc.Controller
import play.api.libs.json._

object Application extends Controller {
  def index = Action {
    Ok(views.html.index())
  }

  def getTasks = Action {
    val labels = Task.all() map (_.toJSON)
    Ok(Json.stringify(JsArray(labels)))
  }

  def newTask = Action { implicit request =>
    val params = request.body.asFormUrlEncoded
    val label = params.get("label")(0)
    if (label.length() > 0) {
      val task = Task.create(label)
      Ok(Json.stringify(task.toJSON()))
    } else {
      BadRequest("")
    }
  }

  def deleteTask = Action { request =>
    val params = request.body.asFormUrlEncoded
    val id: Long = params.get("id")(0).toLong
    Task.delete(id)
    val labels = Task.all() map (_.toJSON)
    Ok(Json.stringify(JsArray(labels)))
  }
}