package models

import anorm._
import anorm.SqlParser._
import play.api.db._
import play.api.Play.current
import play.api.libs.json._

case class Task(id: Long, label: String) {
  def toJSON(): JsObject = {
    return Json.obj("id" -> id, "label" -> label)
  }
}

object Task {
  def all(): List[Task] = DB.withConnection { implicit c =>
    SQL("SELECT * FROM tasks") as (long("id") ~ str("label") *) map {
      case id ~ label => Task(id, label)
    }
  }

  def create(label: String) {
    DB.withConnection { implicit c =>
      SQL("INSERT INTO tasks (label) VALUES ({label})") on ('label -> label) executeUpdate ()
    }
  }

  def delete(id: Long) {
    DB.withConnection { implicit c =>
      SQL("DELETE FROM tasks where id=({id})") on ('id -> id) executeUpdate ()
    }
  }
}