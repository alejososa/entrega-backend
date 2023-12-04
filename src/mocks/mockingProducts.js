import { fakerFR as faker } from "@faker-js/faker";

export const generateProducts = () => {
    const mockProducts = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int(100),
        thumbnail: faker.image.url(),
        category: faker.commerce.department(),
    };
    return mockProducts;
}