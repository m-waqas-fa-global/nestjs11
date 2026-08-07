import { faker } from "@faker-js/faker";

export function createFakeUser(){
     return {
         firstName:faker.person.firstName(),
         lastName:faker.person.firstName(),
         email:faker.internet.email(),
         password: faker.internet.password(),
         avatar: faker.image.avatar(),
         createdAt: faker.date.past(),

         books:`${faker.book.title()} = ${faker.book.author()} = ${faker.book.format()} = ${faker.book.series()}: pub : ${faker.book.publisher()}`,
         finance:  `acctName:${faker.finance.accountName()} = acctNumber:${faker.finance.accountNumber()} = CVV:${faker.finance.creditCardCVV()}`
     }
}