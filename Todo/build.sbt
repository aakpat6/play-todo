name := "Todo"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache
)

// Mustache settings
resolvers += Resolver.url("julienba.github.com", url("http://julienba.github.com/repo/"))(Resolver.ivyStylePatterns)
mustacheEntryPoints <<= (sourceDirectory in Compile)(base => base / "assets" / "mustache" ** "*.html")
mustacheOptions := Seq.empty[String]
resourceGenerators in Compile <+= MustacheFileCompiler

play.Project.playScalaSettings


