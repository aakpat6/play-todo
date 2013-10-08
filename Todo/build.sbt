name := "Todo"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache
)

javascriptEntryPoints <<= baseDirectory(base =>
  base / "app" / "assets" / "javascripts" ** "main.js"
)

play.Project.playScalaSettings


