package controllers

import models.Task
import play.api.data.Form
import play.api.data.Forms
import play.api.mvc.Action
import play.api.mvc.Controller

object Application extends Controller {

  val taskForm = Form("label" -> Forms.nonEmptyText)

  def index = Action {
    Ok(views.html.index(Task.all(), taskForm))
  }

  def newTask = Action { implicit request =>
    taskForm.bindFromRequest fold (
      errors => BadRequest(views.html.index(Task all (), errors)),
      label => {
        Task create label
        Redirect(routes.Application.index)
      })
  }

  def deleteTask(id: Long) = Action {
    println(id)
    Task delete id
    Redirect(routes.Application.index)
  }
}