import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const DocsConfig = (app) => {
  const config = new DocumentBuilder()
    .setTitle('user-service')
    .setDescription('Rest API swagger-docs')
    .setVersion('1.0.0')
    .addTag('user-service')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/v1/docs', app, document)
}