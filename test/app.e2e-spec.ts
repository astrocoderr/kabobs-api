import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe(`AppController (e2e)`, () => {
  let app: INestApplication;
  let httpServer: any;

  let userData: any,
      roleData: any,
      addressData: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });


  // Auth Controller
  describe(`AuthController`, () => {
    describe(`/v1/auth/signin/ (POST)`, () => {
      it(`should receive a token`, async() => {
        const createUserStub = {
          lastName: 'Test',
          firstName: 'Test',
          password: 'qwerty1234',
          privilegeID: 1,
          email: `test${Math.ceil(Math.random() * 10000)}@gmail.com`,
          role: 1
        }

        let response = await request((app.getHttpServer())).post(`/v1/users`)
          .send(createUserStub)
        expect(response.status).toBe(201)

        userData = response.body

        const authStub = {
          email: createUserStub.email,
          password: createUserStub.password
        }

        response = await request((app.getHttpServer())).post(`/v1/auth/signin`).send(authStub)
        expect(response.status).toBe(201)
      })

      it(`should receive 401 status on invalid email`, async() => {
        const authStub = {
          email: `test${Math.ceil(Math.random() * 10000)}@gmail.com`,
          password: userData.password
        }

        const response = await request((app.getHttpServer())).post(`/v1/auth/signin`).send(authStub)
        expect(response.status).toBe(401)
      })


      it(`should receive 401 status on invalid password`, async() => {
        const authStub = {
          email: userData.email,
          password: 'createUserStub.password'
        }

        let response = await request((app.getHttpServer())).post(`/v1/auth/signin`).send(authStub)
        expect(response.status).toBe(401)

        response = await request((app.getHttpServer())).delete(`/v1/users/${userData.id}`)
        expect(response.status).toBe(200)
      })
    })
  })


  // Roles Controller
  describe(`RolesController`, () => {
    describe(`/v1/roles/ (POST)`, () => {
      it(`should create a role`, async() => {
        const createRoleStub = {
          name: 'test',
          description: 'role for test'
        }

        let response = await request((app.getHttpServer())).post(`/v1/roles`)
          .send(createRoleStub)
        expect(response.status).toBe(201)

        roleData = response.body
      })
    })

    describe('/v1/roles/ (GET)', () => {
      it(`should receive roles`, async() => {
        const response = await request((app.getHttpServer())).get(`/v1/roles`)
        expect(response.status).toBe(200)
      })
    })

    describe('/v1/roles/:id (GET)', () => {
      it(`should receive a role`, async() => {
        let response = await request((app.getHttpServer())).get(`/v1/roles/${roleData.id}`)
        expect(response.status).toBe(200)
      })
    })

    describe('/v1/roles/:id (DELETE)', () => {
      it(`should remove a role`, async() => {
        let response = await request((app.getHttpServer())).delete(`/v1/roles/${roleData.id}`)
        expect(response.status).toBe(200)
      })
    })
  })


  // User Controller
  describe(`UserController`, () => {
    describe(`/v1/users/ (POST)`, () => {
      it(`should create a user`, async() => {
        const createUserStub = {
          firstName: 'Test',
          lastName: 'Test',
          password: 'qwerty',
          privilegeID: 1,
          email: `test${Math.ceil(Math.random() * 10000)}@gmail.com`,
          role: 1
        }
        const response = await request((app.getHttpServer())).post(`/v1/users/`)
          .send(createUserStub)
        expect(response.status).toBe(201)

        userData = response.body
      })

      it(`should receive an error on invalid email`, async () => {
        const createUserStub = {
          firstName: 'Test',
          lastName: 'Test',
          password: 'qwerty',
          privilegeID: 1,
          email: `test_gmail.com`, // not email format
          role: 1
        }

        const response = await request((app.getHttpServer())).post(`/v1/users`)
          .send(createUserStub)
        expect(response.status).toBe(500)
      })

      it(`should receive an error on invalid role`, async () => {
        const createUserStub = {
          firstName: 'Test',
          lastName: 'Test',
          password: 'qwerty',
          privilegeID: 1,
          email: `test${Math.ceil(Math.random() * 10000)}@gmail.com`,
          role: -1  // role with value '-1' doesn't exist in database
        }

        const response = await request((app.getHttpServer())).post(`/v1/users`)
          .send(createUserStub)
        expect(response.status).toBe(500)
      })

      it(`should receive an error on invalid password`, async () => {
        const createUserStub = {
          firstName: 'Test',
          lastName: 'Test',
          password: 'qw', // password must contain minimum 8 digit
          privilegeID: 1,
          email: `test${Math.ceil(Math.random() * 10000)}@gmail.com`,
          role: 1
        }

        const response = await request((app.getHttpServer())).post(`/v1/users`)
          .send(createUserStub)
        expect(response.status).toBe(500)
      })

      it(`should receive an error on missing parameter(s)`, async() => {
        const createUserStub = {
          firstName: 'Test',
          // lastName: 'Test',
          password: 'qwerty',
          privilegeID: 1,
          email: `test${Math.ceil(Math.random() * 10000)}@gmail.com`,
          role: 1
        }
        const response = await request((app.getHttpServer())).post(`/v1/users`)
          .send(createUserStub)
        expect(response.status).toBe(500)
      })
    })

    describe(`/v1/users/ (GET)`, () => {
      it(`should receive users`, async() => {
        const response = await request((app.getHttpServer())).get(`/v1/users`)
        expect(response.status).toBe(200)
      })
    })

    describe(`/v1/users/:id (GET)`, () => {
      it(`should receive a user`, async() => {
        const response = await request((app.getHttpServer())).get(`/v1/users/${userData.id}`)
        expect(response.status).toBe(200)
      })
    })

    describe(`/v1/users/:id (UPDATE)`, () => {
      it(`should update a user`, async() => {
        const response = await request((app.getHttpServer()))
          .put(`/v1/users/${userData.id}`)
          .send({ lastName: 'TEST' })
        expect(response.status).toBe(200)
      })
    })

    describe(`/v1/users/ (DELETE)`, () => {
      it(`should remove a user`, async() => {
        const response = await request((app.getHttpServer())).delete(`/v1/users/${userData.id}`)
        expect(response.status).toBe(200)
      })
    })

    describe(`/v1/users/roles (POST)`, () => {
      it(`should add user role`, async() => {
        const createRoleStub = {
          name: 'test2',
          description: 'role for test2'
        };

        let response = await request((app.getHttpServer())).post(`/v1/roles`)
          .send(createRoleStub)
        expect(response.status).toBe(201)

        roleData = response.body

        const createUserStub = {
          firstName: 'Test',
          lastName: 'Test',
          password: 'qwerty1234',
          privilegeID: 1,
          email: `test${Math.ceil(Math.random() * 10000)}@gmail.com`,
          role: 1
        }

        response = await request((app.getHttpServer())).post(`/v1/users`)
          .send(createUserStub)
        expect(response.status).toBe(201)

        userData = response.body

        const addUserRole = {
          userID: userData.id,
          roleID: roleData.id
        }

        response = await request((app.getHttpServer()))
          .post(`/v1/users/roles`)
          .send(addUserRole)
        expect(response.status).toBe(201)
      })
    })

    describe(`/v1/users/roles (DELETE)`, () => {
      it(`should remove user role`, async() => {
        let response = await request((app.getHttpServer()))
          .delete(`/v1/users/${userData.id}/roles/${roleData.id}`)
        expect(response.status).toBe(200)

        response = await request((app.getHttpServer())).delete(`/v1/roles/${roleData.id}`)
        expect(response.status).toBe(200)
      })
    })

    describe(`/v1/users/ban (POST)`, () => {
      it(`should ban a user`, async() => {
        const banUserStub = {
          userID: userData.id,
          description: 'test'
        };

        let response = await request((app.getHttpServer())).post(`/v1/users/ban`)
          .send(banUserStub)
        expect(response.status).toBe(201)
      })
    })

    describe(`/v1/users/ban (GET)`, () => {
      it(`should receive banned users`, async() => {
        let response = await request((app.getHttpServer())).get(`/v1/users/ban`)
        expect(response.status).toBe(200)
      })
    })

    describe(`/v1/users/unban (POST)`, () => {
      it(`should ban a user`, async() => {
        const unbanUserStub = {
          userID: userData.id,
          unbanReason: 'test'
        };

        let response = await request((app.getHttpServer())).post(`/v1/users/unban`)
          .send(unbanUserStub)
        expect(response.status).toBe(201)

        response = await request((app.getHttpServer())).delete(`/v1/users/${userData.id}`)
        expect(response.status).toBe(200)
      })
    })
  })


  // Addresses Controller
  describe(`AddressesController`, () => {
    describe(`/v1/addresses/ (POST)`, () => {
      it(`should create an address`, async() => {
        const createAddressStub = {
          text: 'Delaware, St. Riston 1A-22',
          lat: 12.345678,
          lon: 23.456798,
          road: 'Avenue, 1C',
          houseNumber: '42a BBC',
          neighbourhood: 'smth',
          zipcode: 12345
        }

        let response = await request((app.getHttpServer())).post(`/v1/addresses`)
          .send(createAddressStub)
        expect(response.status).toBe(201)

        addressData = response.body
      })
    })

    describe('/v1/addresses/ (GET)', () => {
      it(`should receive addresses`, async() => {
        const response = await request((app.getHttpServer())).get(`/v1/addresses`)
        expect(response.status).toBe(200)
      })
    })

    describe('/v1/addresses/:id (GET)', () => {
      it(`should receive an addresses`, async() => {
        let response = await request((app.getHttpServer())).get(`/v1/addresses/${addressData.id}`)
        expect(response.status).toBe(200)
      })
    })

    describe('/v1/addresses/:id (DELETE)', () => {
      it(`should remove an address`, async() => {
        let response = await request((app.getHttpServer())).delete(`/v1/addresses/${addressData.id}`)
        expect(response.status).toBe(200)
      })
    })
  })




  // it('/v1/users/ (GET)', async () => {
  //   const response = await request(app.getHttpServer()).get('/v1/users/')
  //
  //   expect(response.status).toBe(200);
  //   expect(response.body).toMatchObject([{
  //     active: Boolean,
  //     banReason: String || null,
  //     banned: Boolean || null,
  //     birthday: Date || null,
  //     bitrixID: Number || null,
  //     branchID: Number || null,
  //     createdAt: Date,
  //     email: String,
  //     firstName: String,
  //     lastName: String,
  //     password: String,
  //     privilegeID: Number,
  //     role: Array
  //   }])
  // });
});
