package models

import anorm._
import anorm.SqlParser._
import play.api.db._
import play.api.Play.current
import scala.util.parsing.json.JSONObject

case class Task(id: Long, label: String) {
  def toJSON(): JSONObject =  {
    val result = Map("id" -> id, "label" -> label)
    return JSONObject(result)
  }
}

object Task {
  val task = {
    get[Long]("id") ~
      get[String]("Label") map {
        case id ~ label => Task(id, label)
      }
  }

  def all(): List[Task] = DB.withConnection { implicit c =>
    SQL("SELECT * FROM tasks").as(task *)
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