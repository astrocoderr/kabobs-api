export const jwtFactory = (configService) => ({
  secret: configService.get('JWT.SECRET'),
  signOptions: {
    expiresIn: configService.get('JWT.EXPIRES_IN')
  }
})